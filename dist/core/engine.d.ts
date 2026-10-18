/**
 * Country-agnostic validation engine.
 *
 * Every country module only describes its numbering plan
 * (a CountryDefinition). The engine applies the same
 * pipeline to all of them:
 *
 * normalize → strict check → parse → trunk prefix
 *           → length → operator/range → formatting
 */
import { CountryInfo, LineType, ValidationOptions, ValidationResult } from "../types";
/**
 * One allocated block of the national numbering plan.
 */
export interface NumberRange {
    /** Leading digits of the national number. */
    prefix: string;
    operator: string;
    lineType: LineType;
}
export interface CountryDefinition {
    info: CountryInfo;
    /** Length of the national significant number. */
    nationalLength: number;
    /**
     * Trunk prefix dialled before national numbers
     * ("0" in the DRC), or null when the country has none.
     */
    trunkPrefix: string | null;
    ranges: NumberRange[];
    formatNational(nationalNumber: string): string;
    formatInternational(nationalNumber: string): string;
}
/**
 * Build ranges sharing the same operator and line type.
 */
export declare function ranges(operator: string, lineType: LineType, prefixes: string[]): NumberRange[];
/**
 * Find the most specific range matching a national number.
 */
export declare function findRange(nationalNumber: string, numberRanges: NumberRange[]): NumberRange | null;
/**
 * Validate a phone number against one country definition.
 */
export declare function validateWithDefinition(input: string, definition: CountryDefinition, options?: ValidationOptions): ValidationResult;
