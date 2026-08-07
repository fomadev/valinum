export interface ParsedNumber {
    international: boolean;
    countryCode: string | null;
    nationalNumber: string;
}
/**
 * Parse a normalized number.
 *
 * IMPORTANT:
 * This parser does not contain country-specific rules.
 *
 * The country code is supplied by the country module.
 */
export declare function parse(normalized: string, dialCode: string): ParsedNumber;
