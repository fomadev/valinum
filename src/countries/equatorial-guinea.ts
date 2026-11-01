/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Equatorial Guinea
 *
 * +240, 9-digit national number, no trunk prefix.
 *
 * 222 123 456 / +240 222 123 456
 */

import { ValidationOptions, ValidationResult } from "../types";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine";

export const EQUATORIAL_GUINEA: CountryDefinition = {
  info: {
    iso2: "GQ",
    dialCode: "240",
    name: "Equatorial Guinea",
  },

  nationalLength: 9,
  trunkPrefix: null,

  ranges: [
    // Mobile
    ...ranges("GETESA", "mobile", ["222"]),
    ...ranges("Muni", "mobile", ["55"]),

    // Fixed
    ...ranges(
      "GETESA",
      "fixed",
      ["3"],
      /^(?:33[0-24-9]\d[46]\d{4}|3(?:33|5\d)\d[7-9]\d{4})$/
    ),
  ],

  ...groupedFormats("240", [3, 3, 3]),
};

/**
 * Validate an Equatorial Guinea phone number.
 */
export function validateEquatorialGuinea(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, EQUATORIAL_GUINEA, options);
}
