/**
 * ValiNum v2
 *
 * Côte d'Ivoire
 *
 * +225, 10-digit national number since January 2021,
 * no trunk prefix. The first two digits identify the
 * operator: 01/21 Moov, 05/25 MTN, 07/27 Orange.
 *
 * 07 07 12 34 56 / +225 07 07 12 34 56
 */
import { ValidationOptions, ValidationResult } from "../types";
import { CountryDefinition } from "../core/engine";
export declare const IVORY_COAST: CountryDefinition;
/**
 * Validate a Côte d'Ivoire phone number.
 */
export declare function validateIvoryCoast(input: string, options?: ValidationOptions): ValidationResult;
