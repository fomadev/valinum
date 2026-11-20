/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Burundi
 *
 * +257, 8-digit national number, no trunk prefix.
 *
 * 79 12 34 56 / +257 79 12 34 56
 */

import { ValidationOptions, ValidationResult } from "../types.js";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine.js";

export const BURUNDI: CountryDefinition = {
  info: {
    iso2: "BI",
    dialCode: "257",
    name: "Burundi",
  },

  nationalLength: 8,
  trunkPrefix: null,

  ranges: [
    // Mobile
    // Econet Leo.
    ...ranges("Leo", "mobile", ["29", "71", "72", "76", "79"]),
    // Viettel Burundi.
    ...ranges("Lumitel", "mobile", [
      "61", "62", "63", "64", "65", "66", "67", "68", "69",
    ]),
    // Onamob.
    ...ranges("Onatel", "mobile", ["77"]),
    // 75 and 78 (Smart) closed in 2022.

    // Fixed
    ...ranges("Onatel", "fixed", ["22"]),
  ],

  ...groupedFormats("257", [2, 2, 2, 2]),
};

/**
 * Validate a Burundi phone number.
 */
export function validateBurundi(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, BURUNDI, options);
}
