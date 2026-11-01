/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Central African Republic
 *
 * +236, 8-digit national number, no trunk prefix.
 * Mobile numbers start with 7.
 *
 * 75 12 34 56 / +236 75 12 34 56
 */

import { ValidationOptions, ValidationResult } from "../types";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine";

export const CENTRAL_AFRICAN_REPUBLIC: CountryDefinition = {
  info: {
    iso2: "CF",
    dialCode: "236",
    name: "Central African Republic",
  },

  nationalLength: 8,
  trunkPrefix: null,

  ranges: [
    // Mobile
    ...ranges("Orange", "mobile", ["72", "73", "74"]),
    ...ranges("Telecel", "mobile", ["75", "76"]),
    ...ranges("Moov Africa", "mobile", ["70"]),

    // Fixed
    ...ranges("Socatel", "fixed", ["21", "22"]),
  ],

  ...groupedFormats("236", [2, 2, 2, 2]),
};

/**
 * Validate a Central African Republic phone number.
 */
export function validateCentralAfricanRepublic(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(
    input,
    CENTRAL_AFRICAN_REPUBLIC,
    options
  );
}
