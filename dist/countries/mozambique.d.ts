/**
 * ValiNum v2
 *
 * Mozambique
 *
 * +258, 9-digit mobile number, no trunk prefix.
 * Fixed lines (8 digits) are not supported yet.
 *
 * 84 123 4567 / +258 84 123 4567
 */
import { ValidationOptions, ValidationResult } from "../types.js";
import { CountryDefinition } from "../core/engine.js";
export declare const MOZAMBIQUE: CountryDefinition;
/**
 * Validate a Mozambique phone number.
 */
export declare function validateMozambique(input: string, options?: ValidationOptions): ValidationResult;
