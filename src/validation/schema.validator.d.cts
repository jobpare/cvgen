import { ValidateFunction } from "ajv";
import { CVProfile } from "./schema.types";

declare const validator: ValidateFunction<CVProfile>;

export default validator;