export interface NormalizedInput {
    value: string;
    international: boolean;
}
/**
 * Normalize a phone number's syntax.
 *
 * Examples:
 *
 * 082 470-80-27
 *     ↓
 * 0824708027
 *
 * +243 824 708 027
 *     ↓
 * +243824708027
 *
 * 00243 824 708 027
 *     ↓
 * +243824708027
 *
 * The function does not remove country codes.
 */
export declare function normalize(input: string, accept00Prefix?: boolean): NormalizedInput;
