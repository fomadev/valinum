/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

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

export type ValidationError =
  | "EMPTY_INPUT"
  | "INVALID_CHARACTERS"
  | "INVALID_COUNTRY_CODE"
  | "INVALID_LENGTH"
  | "INVALID_PREFIX"
  | "TOO_SHORT"
  | "TOO_LONG"
  | null;

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
}

export interface ValidationResult {
  valid: boolean;

  country: CountryInfo | null;

  operator: OperatorInfo | null;

  number: NumberInfo | null;

  error: ValidationError;
}