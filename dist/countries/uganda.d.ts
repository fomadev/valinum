/**
 * ValiNum v2
 *
 * Uganda
 *
 * +256, 9-digit mobile number, trunk prefix 0.
 * Fixed lines are not supported yet.
 *
 * 0772 123 456 / +256 772 123 456
 */
import { ValidationOptions, ValidationResult } from "../types.js";
import { CountryDefinition } from "../core/engine.js";
export declare const UGANDA: CountryDefinition;
/**
 * Validate a Uganda phone number.
 */
export declare function validateUganda(input: string, options?: ValidationOptions): ValidationResult;
