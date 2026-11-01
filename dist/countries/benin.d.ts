/**
 * ValiNum v2
 *
 * Benin
 *
 * +229, 10-digit national number since November 2024,
 * no trunk prefix: every number starts with 01.
 *
 * 01 97 12 34 56 / +229 01 97 12 34 56
 */
import { ValidationOptions, ValidationResult } from "../types";
import { CountryDefinition } from "../core/engine";
export declare const BENIN: CountryDefinition;
/**
 * Validate a Benin phone number.
 */
export declare function validateBenin(input: string, options?: ValidationOptions): ValidationResult;
