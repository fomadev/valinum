/**
 * ValiNum v2
 *
 * Angola
 *
 * +244, 9-digit national number, no trunk prefix.
 * Mobile numbers start with 9.
 *
 * 923 123 456 / +244 923 123 456
 */
import { ValidationOptions, ValidationResult } from "../types.js";
import { CountryDefinition } from "../core/engine.js";
export declare const ANGOLA: CountryDefinition;
/**
 * Validate an Angola phone number.
 */
export declare function validateAngola(input: string, options?: ValidationOptions): ValidationResult;
