/**
 * ValiNum v2
 *
 * Zimbabwe
 *
 * +263, 9-digit mobile number, trunk prefix 0.
 * Fixed lines (variable length) are not supported yet.
 *
 * 077 123 4567 / +263 77 123 4567
 */
import { ValidationOptions, ValidationResult } from "../types.js";
import { CountryDefinition } from "../core/engine.js";
export declare const ZIMBABWE: CountryDefinition;
/**
 * Validate a Zimbabwe phone number.
 */
export declare function validateZimbabwe(input: string, options?: ValidationOptions): ValidationResult;
