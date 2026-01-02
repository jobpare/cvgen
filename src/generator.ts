import fs from "fs-extra";
import path from 'path'
import chalk from "chalk";
import puppeteer from 'puppeteer';
import Handlebars from 'handlebars';
import { configureAjv } from "./libs/ajv.js";
import { schema as ValidationSchema } from './validation/schema.js';
import type { CVProfile } from './validation/schema.types.js';
import type { ValidateFunction, JSONSchemaType } from "ajv";

interface options {
    template: string
    input: string
    output: string
    htmlOnly: boolean
    validateOnly: boolean
}

const validator = Validator<CVProfile>(ValidationSchema)

async function loadJsonData(filePath: string) {
    try {
        const data = await fs.readJson(filePath);
        const valid = validator(data);
        if (!valid) {
            console.log(chalk.red('❌ Input data validation failed. See details below:'));
            validator.errors?.forEach((err, idx) => {
                const field = err.instancePath ? err.instancePath : '(root)';
                const message = err.message;
                const expected = err.params && err.params.type ? `Expected type: ${err.params.type}` : '';
                console.log(chalk.yellow(`${idx + 1}. Field: ${field} - ${message} ${expected}`));
            });
            throw new Error('Input data validation failed. See above for details.');
        }
        return data;
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            throw new Error(`Input file '${filePath}' not found.`);
        } else if (error instanceof SyntaxError) {
            throw new Error(`Invalid JSON in '${filePath}': ${error.message}`);
        }
        throw error;
    }
}

async function loadTemplate(templatePath: string) {
    try {
        const templateContent = await fs.readFile(templatePath, 'utf-8');

        // Register Handlebars helpers
        Handlebars.registerHelper('join', function (array) {
            if (!array || !Array.isArray(array)) return '';
            return array.join(', ');
        });

        return Handlebars.compile(templateContent);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            throw new Error(`Template file '${templatePath}' not found.`);
        }
        throw new Error(`Error loading template: ${(error as Error).message}`);
    }
}

function renderHtml<T>(template: HandlebarsTemplateDelegate<T>, data: T) {
    try {
        return template(data);
    } catch (error) {
        throw new Error(`Error rendering template: ${(error as Error).message}`);
    }
}

async function saveHtml(htmlContent: string, outputPath: string) {
    try {
        await fs.ensureDir(path.dirname(outputPath));
        await fs.writeFile(outputPath, htmlContent, 'utf-8');
        console.log(chalk.green(`✅ HTML file generated successfully: ${outputPath}`));
        console.log(chalk.blue('💡 Tip: Open this file in your browser and use "Print to PDF" to create a PDF version.'));
    } catch (error) {
        throw new Error(`Error saving HTML file: ${(error as Error).message}`);
    }
}

async function generatePdf(htmlContent: string, outputPath: string) {
    let browser = null;

    try {
        browser = await puppeteer.launch({
            headless: 'shell',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        // Set content and wait for fonts to load
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        // Generate PDF with proper settings
        await page.pdf({
            path: outputPath,
            format: 'A4',
            margin: {
                top: '0mm',
                right: '0mm',
                bottom: '0mm',
                left: '0mm'
            },
            printBackground: true,
            preferCSSPageSize: true
        });

        console.log(chalk.green(`✅ PDF generated successfully: ${outputPath}`));

    } catch (error) {
        console.log(chalk.red(`❌ Error generating PDF: ${(error as Error).message}`));
        console.log(chalk.yellow('🔄 Falling back to HTML generation...'));
        const htmlPath = outputPath.replace('.pdf', '.html');
        await saveHtml(htmlContent, htmlPath);
    } finally {
        await browser?.close();
    }
}

async function generate(options: options) {
    const { template: templatePath, input: inputPath, output: outputPath, htmlOnly, validateOnly } = options;

    console.log(chalk.blue('🚀 Starting CV generation...'));
    console.log(chalk.gray(`📄 Template: ${templatePath}`));
    console.log(chalk.gray(`📊 Data: ${inputPath}`));
    if (outputPath) console.log(chalk.gray(`📁 Output: ${outputPath}`));

    console.log();

    // Load and validate data
    console.log(chalk.blue('📋 Loading JSON data...'));

    try {
        const data = await loadJsonData(inputPath);

        if (validateOnly) {
            console.log(chalk.green('✅ Data validation completed successfully!'));
            return;
        }

        // Load template
        console.log(chalk.blue('🎨 Loading HTML template...'));
        const template = await loadTemplate(templatePath);

        // Render HTML
        console.log(chalk.blue('🔧 Rendering HTML...'));
        const htmlContent = renderHtml(template, data);

        // Generate output based on file extension and options
        if (htmlOnly || (outputPath && outputPath.endsWith('.html'))) {
            console.log(chalk.blue('📄 Generating HTML file...'));
            await saveHtml(htmlContent, outputPath);
        } else if (outputPath && outputPath.endsWith('.pdf')) {
            console.log(chalk.blue('📄 Generating PDF...'));
            await generatePdf(htmlContent, outputPath);
        } else if (outputPath) {
            // Default to HTML if extension is unclear
            console.log(chalk.blue('📄 Generating HTML file (use .pdf extension for PDF output)...'));
            const htmlPath = outputPath + '.html';
            await saveHtml(htmlContent, htmlPath);
        }

        console.log();
        console.log(chalk.green('🎉 CV generation completed successfully!'));
        if (outputPath) {
            if (outputPath.endsWith('.html') || htmlOnly) {
                console.log(chalk.gray(`📄 Your CV is ready: ${outputPath}`));
                console.log(chalk.blue('💡 Open in your browser and use "Print to PDF" for a PDF version.'));
            } else {
                console.log(chalk.gray(`📄 Your CV is ready: ${outputPath}`));
            }
        }
    }
    catch (error) {
        console.log(chalk.red('❌ CV generation aborted due to input validation errors.'));
        process.exit(1);
    }
}

function Validator<T>(schema: JSONSchemaType<T>): ValidateFunction<T> {
    const validator = configureAjv().compile(schema);
    return validator;
}

export { generate }