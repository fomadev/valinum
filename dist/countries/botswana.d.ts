/**
 * ValiNum v2
 *
 * Botswana
 *
 * +267, 8-digit mobile number, no trunk prefix.
 * Fixed lines (7 digits) are not supported yet.
 *
 * 71 123 456 / +267 71 123 456
 */
import { ValidationOptions, ValidationResult } from "../types.js";
import { CountryDefinition } from "../core/engine.js";
export declare const BOTSWANA: CountryDefinition;
/**
 * Validate a Botswana phone number.
 */
export declare function validateBotswana(input: string, options?: ValidationOptions): ValidationResult;
