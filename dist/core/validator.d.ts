export interface BasicValidationResult {
    valid: boolean;
    error: "EMPTY_INPUT" | "INVALID_CHARACTERS" | "TOO_SHORT" | "TOO_LONG" | null;
}
/**
 * Validate the basic structure of a national number.
 */
export declare function validateBasic(nationalNumber: string, expectedLength: number): BasicValidationResult;
