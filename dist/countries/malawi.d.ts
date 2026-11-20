/**
 * ValiNum v2
 *
 * Malawi
 *
 * +265, 9-digit mobile number, trunk prefix 0.
 * Fixed lines (7 digits) are not supported yet.
 *
 * 0991 23 45 67 / +265 991 23 45 67
 */
import { ValidationOptions, ValidationResult } from "../types.js";
import { CountryDefinition } from "../core/engine.js";
export declare const MALAWI: CountryDefinition;
/**
 * Validate a Malawi phone number.
 */
export declare function validateMalawi(input: string, options?: ValidationOptions): ValidationResult;
