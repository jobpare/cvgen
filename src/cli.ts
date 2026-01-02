import chalk from "chalk";
import { generate as generator } from "./generator.js";
import { Command } from "commander";

// CLI setup
const program = new Command()

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
            await generator(options);
        } catch (error) {
            console.error(chalk.red(`❌ Error: ${(error as Error).message}`));
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
            await generator({
                template,
                input,
                output,
                htmlOnly: options.htmlOnly,
                validateOnly: options.validateOnly
            });
        } catch (error) {
            console.error(chalk.red(`❌ Error: ${(error as Error).message}`));
            process.exit(1);
        }
    });

export { program }