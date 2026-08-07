/**
 * Build E.164 representation.
 *
 * Example:
 *
 * countryCode = "243"
 * nationalNumber = "824708027"
 *
 * Result:
 *
 * +243824708027
 */
export declare function formatE164(dialCode: string, nationalNumber: string): string;
/**
 * Build international representation.
 *
 * Example:
 *
 * +243 824 708 027
 */
export declare function formatInternational(dialCode: string, nationalNumber: string): string;
/**
 * Build national representation.
 *
 * Example:
 *
 * 082 470 8027
 */
export declare function formatNational(nationalNumber: string): string;
