/**
 * ValiNum v2
 *
 * Republic of the Congo (Congo-Brazzaville)
 *
 * +242, 9-digit national number, no trunk prefix:
 * the leading 0 of mobile numbers is part of the number.
 *
 * 06 123 4567 / +242 06 123 4567
 */
import { ValidationOptions, ValidationResult } from "../types";
import { CountryDefinition } from "../core/engine";
export declare const CONGO: CountryDefinition;
/**
 * Validate a Republic of the Congo phone number.
 */
export declare function validateCongoBrazzaville(input: string, options?: ValidationOptions): ValidationResult;
