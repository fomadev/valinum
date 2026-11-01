/**
 * ValiNum v2
 *
 * Togo
 *
 * +228, 8-digit national number, no trunk prefix.
 *
 * 90 12 34 56 / +228 90 12 34 56
 */
import { ValidationOptions, ValidationResult } from "../types.js";
import { CountryDefinition } from "../core/engine.js";
export declare const TOGO: CountryDefinition;
/**
 * Validate a Togo phone number.
 */
export declare function validateTogo(input: string, options?: ValidationOptions): ValidationResult;
