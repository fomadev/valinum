/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Gabon
 *
 * +241, 8-digit national number since November 2019,
 * dialled with a leading 0 inside the country.
 *
 * 077 12 34 56 / +241 77 12 34 56
 */

import { ValidationOptions, ValidationResult } from "../types";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine";

export const GABON: CountryDefinition = {
  info: {
    iso2: "GA",
    dialCode: "241",
    name: "Gabon",
  },

  nationalLength: 8,
  trunkPrefix: "0",

  ranges: [
    // Mobile
    ...ranges("Airtel", "mobile", ["74", "76", "77"]),
    // Gabon Telecom (formerly Libertis and Moov).
    ...ranges("Moov Africa", "mobile", [
      "600", "601", "602", "603", "604",
      "610",
      "62", "65", "66",
    ]),

    // Fixed
    ...ranges("Moov Africa", "fixed", ["11"]),
  ],

  ...groupedFormats("241", [2, 2, 2, 2], "0"),
};

/**
 * Validate a Gabon phone number.
 */
export function validateGabon(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, GABON, options);
}
