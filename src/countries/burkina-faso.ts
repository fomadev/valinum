/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Burkina Faso
 *
 * +226, 8-digit national number, no trunk prefix.
 *
 * 70 12 34 56 / +226 70 12 34 56
 */

import { ValidationOptions, ValidationResult } from "../types.js";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine.js";

export const BURKINA_FASO: CountryDefinition = {
  info: {
    iso2: "BF",
    dialCode: "226",
    name: "Burkina Faso",
  },

  nationalLength: 8,
  trunkPrefix: null,

  ranges: [
    // Mobile
    ...ranges("Orange", "mobile", [
      "04", "05", "06", "07",
      "44", "45", "46",
      "54", "55", "56", "57",
      "64", "65", "66", "67",
      "74", "75", "76", "77",
    ]),
    // ONATEL.
    ...ranges("Moov Africa", "mobile", [
      "01", "02", "03",
      "50", "51", "52", "53",
      "60", "61", "62", "63",
      "70", "71", "72", "73",
    ]),
    ...ranges("Telecel Faso", "mobile", ["58", "68", "69", "78", "79"]),

    // Fixed
    ...ranges(
      "Moov Africa",
      "fixed",
      ["2"],
      /^2(?:0(?:49|5[23]|6[5-7]|9[016-9])|4(?:4[569]|5[4-6]|6[5-7]|7[0179])|5(?:[34]\d|50|6[5-8]))\d{4}$/
    ),
  ],

  ...groupedFormats("226", [2, 2, 2, 2]),
};

/**
 * Validate a Burkina Faso phone number.
 */
export function validateBurkinaFaso(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, BURKINA_FASO, options);
}
