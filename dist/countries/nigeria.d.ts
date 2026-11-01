/**
 * ValiNum v2
 *
 * Nigeria
 *
 * +234, 10-digit mobile number, trunk prefix 0.
 * Fixed lines are not supported yet.
 *
 * 0803 123 4567 / +234 803 123 4567
 */
import { ValidationOptions, ValidationResult } from "../types.js";
import { CountryDefinition } from "../core/engine.js";
export declare const NIGERIA: CountryDefinition;
/**
 * Validate a Nigeria phone number.
 */
export declare function validateNigeria(input: string, options?: ValidationOptions): ValidationResult;
