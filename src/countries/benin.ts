/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Benin
 *
 * +229, 10-digit national number since November 2024,
 * no trunk prefix: every number starts with 01.
 *
 * 01 97 12 34 56 / +229 01 97 12 34 56
 */

import { ValidationOptions, ValidationResult } from "../types";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine";

export const BENIN: CountryDefinition = {
  info: {
    iso2: "BJ",
    dialCode: "229",
    name: "Benin",
  },

  nationalLength: 10,
  trunkPrefix: null,

  ranges: [
    // Mobile
    ...ranges("MTN", "mobile", [
      "0142", "0146",
      "015",
      "0161", "0162", "0166", "0167", "0169",
      "0190", "0191", "0196", "0197",
    ]),
    ...ranges("Moov", "mobile", [
      "0145",
      "0155", "0158",
      "0160", "0163", "0164", "0165", "0168",
      "0194", "0195", "0198", "0199",
    ]),
    // SBIN.
    ...ranges("Celtiis", "mobile", ["0128", "014", "0192", "0193"]),

    // Fixed
    ...ranges("Celtiis", "fixed", ["0120", "0121", "0122", "0123", "0124"]),
  ],

  ...groupedFormats("229", [2, 2, 2, 2, 2]),
};

/**
 * Validate a Benin phone number.
 */
export function validateBenin(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, BENIN, options);
}
