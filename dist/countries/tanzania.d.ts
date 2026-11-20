/**
 * ValiNum v2
 *
 * Tanzania
 *
 * +255, 9-digit mobile number, trunk prefix 0.
 * Fixed lines are not supported yet.
 *
 * 0754 123 456 / +255 754 123 456
 */
import { ValidationOptions, ValidationResult } from "../types.js";
import { CountryDefinition } from "../core/engine.js";
export declare const TANZANIA: CountryDefinition;
/**
 * Validate a Tanzania phone number.
 */
export declare function validateTanzania(input: string, options?: ValidationOptions): ValidationResult;
