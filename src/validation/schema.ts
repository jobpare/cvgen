import fs from "fs-extra";
import chalk from "chalk";
import { configureAjv } from "../libs/ajv";
import standaloneCode from "ajv/dist/standalone/index.js";


async function generate() {
    const schemaPath = "src/validation/cv.schema.json"

    if (!(await fs.pathExists(schemaPath))) {
        console.log(chalk.red("Failed to locate schema file:"), `'${schemaPath}'`);
        process.exit(1);
    }

    const schema = await fs.readJson(schemaPath);
    const ajv = configureAjv()
    const validate = ajv.compile(schema);

    const validatorSource = standaloneCode(ajv, validate);

    // for dev purposes
    await fs.writeFile("./src/validation/schema.validator.cjs", validatorSource);

    // output to dist
    await fs.ensureDir("./dist/validation");
    await fs.writeFile("./dist/validation/schema.validator.cjs", validatorSource);
}

generate()