/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

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
export function parse(
  normalized: string,
  dialCode: string
): ParsedNumber {
  if (normalized.startsWith("+")) {
    const digits = normalized.slice(1);

    if (!digits.startsWith(dialCode)) {
      return {
        international: true,
        countryCode: null,
        nationalNumber: digits,
      };
    }

    return {
      international: true,
      countryCode: dialCode,
      nationalNumber: digits.slice(dialCode.length),
    };
  }

  /*
   * Number without +.
   *
   * Example:
   * 243824708027
   */
  if (normalized.startsWith(dialCode)) {
    return {
      international: true,
      countryCode: dialCode,
      nationalNumber: normalized.slice(dialCode.length),
    };
  }

  /*
   * National number.
   *
   * Example:
   * 0824708027
   */
  return {
    international: false,
    countryCode: null,
    nationalNumber: normalized,
  };
}