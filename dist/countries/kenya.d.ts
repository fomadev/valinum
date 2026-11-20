/**
 * ValiNum v2
 *
 * Kenya
 *
 * +254, 9-digit mobile number, trunk prefix 0.
 * Fixed lines (variable length) are not supported yet.
 *
 * 0712 345 678 / +254 712 345 678
 */
import { ValidationOptions, ValidationResult } from "../types.js";
import { CountryDefinition } from "../core/engine.js";
export declare const KENYA: CountryDefinition;
/**
 * Validate a Kenya phone number.
 */
export declare function validateKenya(input: string, options?: ValidationOptions): ValidationResult;
