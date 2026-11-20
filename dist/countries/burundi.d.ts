/**
 * ValiNum v2
 *
 * Burundi
 *
 * +257, 8-digit national number, no trunk prefix.
 *
 * 79 12 34 56 / +257 79 12 34 56
 */
import { ValidationOptions, ValidationResult } from "../types.js";
import { CountryDefinition } from "../core/engine.js";
export declare const BURUNDI: CountryDefinition;
/**
 * Validate a Burundi phone number.
 */
export declare function validateBurundi(input: string, options?: ValidationOptions): ValidationResult;
