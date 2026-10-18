/**
 * ISO 3166-1 alpha-2 codes of the supported countries.
 *
 * - CD: Democratic Republic of the Congo
 * - CG: Republic of the Congo (Congo-Brazzaville)
 * - CM: Cameroon
 * - CI: Côte d'Ivoire
 * - SN: Senegal
 */
export type CountryCode = "CD" | "CG" | "CM" | "CI" | "SN";
/**
 * Kind of line a number belongs to.
 */
export type LineType = "mobile" | "fixed";
export interface CountryInfo {
    iso2: string;
    dialCode: string;
    name: string;
}
export interface OperatorInfo {
    name: string;
    prefix: string;
}
export interface NumberInfo {
    national: string;
    international: string;
    e164: string;
}
export type ValidationError = "EMPTY_INPUT" | "INVALID_CHARACTERS" | "INVALID_COUNTRY_CODE" | "INVALID_LENGTH" | "INVALID_PREFIX" | "TOO_SHORT" | "TOO_LONG" | null;
export interface ValidationOptions {
    /**
     * Accept 00 as international dialing prefix.
     *
     * Example:
     * 00243824708027 === +243824708027
     *
     * Default: true
     */
    accept00Prefix?: boolean;
    /**
     * Strict international validation.
     *
     * When enabled, a national number without an international
     * country code is rejected.
     */
    strict?: boolean;
    /**
     * Force validation against a single country.
     *
     * When set, auto-detection is disabled and numbers
     * from any other country are rejected.
     */
    country?: CountryCode;
    /**
     * Country tried first for national numbers
     * (numbers written without a country code).
     *
     * Default: "CD"
     */
    defaultCountry?: CountryCode;
    /**
     * Restrict auto-detection to these countries.
     *
     * Default: every supported country.
     */
    countries?: CountryCode[];
}
export interface ValidationResult {
    valid: boolean;
    country: CountryInfo | null;
    operator: OperatorInfo | null;
    number: NumberInfo | null;
    /**
     * "mobile" or "fixed" when the number is valid.
     */
    lineType?: LineType | null;
    error: ValidationError;
}
