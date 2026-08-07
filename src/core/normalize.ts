/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

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
export function normalize(
  input: string,
  accept00Prefix = true
): NormalizedInput {
  if (typeof input !== "string") {
    throw new TypeError("Phone number must be a string");
  }

  let value = input.trim();

  if (value.length === 0) {
    return {
      value: "",
      international: false,
    };
  }

  /*
   * Keep only characters that are useful for phone notation.
   *
   * We remove:
   * - spaces
   * - -
   * - (
   * - )
   * - .
   */
  value = value.replace(/[\s().-]/g, "");

  /*
   * Convert international dialing prefix 00 to +.
   *
   * Example:
   *
   * 00243824708027
   *        ↓
   * +243824708027
   */
  if (accept00Prefix && value.startsWith("00")) {
    value = `+${value.slice(2)}`;
  }

  /*
   * Detect international notation.
   */
  const international = value.startsWith("+");

  return {
    value,
    international,
  };
}