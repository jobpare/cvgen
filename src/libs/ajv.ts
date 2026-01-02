import Ajv, { type Options } from 'ajv';
import addFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';

export function configureAjv(options?: Options) {
    const ajv = new Ajv({
        allErrors: true,
        strict: false,
        ...options
    });

    addFormats(ajv);
    ajvErrors(ajv);

    return ajv;
}