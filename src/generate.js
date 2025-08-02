#!/usr/bin/env node

/**
 * JobPare CV Generator
 * Generate beautiful CVs from JSON data and HTML templates
 */

import { program } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';
import puppeteer from 'puppeteer';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize JSON schema validator
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

class CVGenerator {
    constructor() {
        this.templates = {};
        this.schemas = {};
    }

    /**
     * Load and validate JSON data from file
     */
    async loadJsonData(filePath) {
        try {
            const data = await fs.readJson(filePath);
            return data;
        } catch (error) {
            if (error.code === 'ENOENT') {
                throw new Error(`Input file '${filePath}' not found.`);
            } else if (error instanceof SyntaxError) {
                throw new Error(`Invalid JSON in '${filePath}': ${error.message}`);
            }
            throw error;
        }
    }

    /**
     * Load HTML template from file
     */
    async loadTemplate(templatePath) {
        try {
            const templateContent = await fs.readFile(templatePath, 'utf-8');
            
            // Register Handlebars helpers
            Handlebars.registerHelper('join', function(array, options) {
                if (!array || !Array.isArray(array)) return '';
                return array.join(', ');
            });
            
            return Handlebars.compile(templateContent);
        } catch (error) {
            if (error.code === 'ENOENT') {
                throw new Error(`Template file '${templatePath}' not found.`);
            }
            throw new Error(`Error loading template: ${error.message}`);
        }
    }

    /**
     * Render HTML using Handlebars template and data
     */
    renderHtml(template, data) {
        try {
            return template(data);
        } catch (error) {
            throw new Error(`Error rendering template: ${error.message}`);
        }
    }

    /**
     * Save HTML content to file
     */
    async saveHtml(htmlContent, outputPath) {
        try {
            await fs.ensureDir(path.dirname(outputPath));
            await fs.writeFile(outputPath, htmlContent, 'utf-8');
            console.log(chalk.green(`✅ HTML file generated successfully: ${outputPath}`));
            console.log(chalk.blue('💡 Tip: Open this file in your browser and use "Print to PDF" to create a PDF version.'));
        } catch (error) {
            throw new Error(`Error saving HTML file: ${error.message}`);
        }
    }

    /**
     * Generate PDF from HTML content using Puppeteer
     */
    async generatePdf(htmlContent, outputPath) {
        let browser;
        try {
            browser = await puppeteer.launch({
                headless: 'new',
                executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
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
            console.log(chalk.red(`❌ Error generating PDF: ${error.message}`));
            console.log(chalk.yellow('🔄 Falling back to HTML generation...'));
            const htmlPath = outputPath.replace('.pdf', '.html');
            await this.saveHtml(htmlContent, htmlPath);
        } finally {
            if (browser) {
                await browser.close();
            }
        }
    }

    /**
     * Basic validation of CV data structure
     */
    validateData(data) {
        const requiredFields = ['personal_info', 'summary'];
        const warnings = [];
        
        for (const field of requiredFields) {
            if (!data[field]) {
                warnings.push(`Missing '${field}' in data`);
            }
        }
        
        if (data.personal_info && !data.personal_info.name) {
            warnings.push("Missing 'name' in personal_info");
        }
        
        if (warnings.length > 0) {
            warnings.forEach(warning => {
                console.log(chalk.yellow(`⚠️  Warning: ${warning}`));
            });
        }
    }

    /**
     * Main generation process
     */
    async generate(options) {
        const { template: templatePath, input: inputPath, output: outputPath, htmlOnly, validateOnly } = options;
        
        console.log(chalk.blue('🚀 Starting CV generation...'));
        console.log(chalk.gray(`📄 Template: ${templatePath}`));
        console.log(chalk.gray(`📊 Data: ${inputPath}`));
        if (outputPath) {
            console.log(chalk.gray(`📁 Output: ${outputPath}`));
        }
        console.log();
        
        // Load and validate data
        console.log(chalk.blue('📋 Loading JSON data...'));
        const data = await this.loadJsonData(inputPath);
        this.validateData(data);
        
        if (validateOnly) {
            console.log(chalk.green('✅ Data validation completed successfully!'));
            return;
        }
        
        // Load template
        console.log(chalk.blue('🎨 Loading HTML template...'));
        const template = await this.loadTemplate(templatePath);
        
        // Render HTML
        console.log(chalk.blue('🔧 Rendering HTML...'));
        const htmlContent = this.renderHtml(template, data);
        
        // Generate output based on file extension and options
        if (htmlOnly || (outputPath && outputPath.endsWith('.html'))) {
            console.log(chalk.blue('📄 Generating HTML file...'));
            await this.saveHtml(htmlContent, outputPath);
        } else if (outputPath && outputPath.endsWith('.pdf')) {
            console.log(chalk.blue('📄 Generating PDF...'));
            await this.generatePdf(htmlContent, outputPath);
        } else if (outputPath) {
            // Default to HTML if extension is unclear
            console.log(chalk.blue('📄 Generating HTML file (use .pdf extension for PDF output)...'));
            const htmlPath = outputPath + '.html';
            await this.saveHtml(htmlContent, htmlPath);
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
}

// CLI setup
program
    .name('jobpare-cv')
    .description('Generate beautiful CVs from JSON data and HTML templates')
    .version('1.0.0');

program
    .command('generate')
    .description('Generate a CV from JSON data and template')
    .requiredOption('-t, --template <path>', 'Path to HTML template file')
    .requiredOption('-i, --input <path>', 'Path to JSON input file')
    .option('-o, --output <path>', 'Path for output file (PDF or HTML)')
    .option('--html-only', 'Generate HTML file only (skip PDF generation)')
    .option('--validate-only', 'Only validate JSON data without generating output')
    .action(async (options) => {
        try {
            const generator = new CVGenerator();
            await generator.generate(options);
        } catch (error) {
            console.error(chalk.red(`❌ Error: ${error.message}`));
            process.exit(1);
        }
    });



// Default command
program
    .argument('[template]', 'Path to HTML template file')
    .argument('[input]', 'Path to JSON input file')
    .argument('[output]', 'Path for output file')
    .option('--html-only', 'Generate HTML file only')
    .option('--validate-only', 'Only validate JSON data')
    .action(async (template, input, output, options) => {
        if (!template || !input || !output) {
            console.log(chalk.yellow('Usage: jobpare-cv <template> <input> <output> [options]'));
            console.log(chalk.gray('Or use: jobpare-cv generate -t <template> -i <input> -o <output>'));
            process.exit(1);
        }
        
        try {
            const generator = new CVGenerator();
            await generator.generate({
                template,
                input,
                output,
                htmlOnly: options.htmlOnly,
                validateOnly: options.validateOnly
            });
        } catch (error) {
            console.error(chalk.red(`❌ Error: ${error.message}`));
            process.exit(1);
        }
    });

program.parse(); 