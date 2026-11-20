/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Kenya
 *
 * +254, 9-digit mobile number, trunk prefix 0.
 * Fixed lines (variable length) are not supported yet.
 *
 * 0712 345 678 / +254 712 345 678
 */

import { ValidationOptions, ValidationResult } from "../types.js";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine.js";

export const KENYA: CountryDefinition = {
  info: {
    iso2: "KE",
    dialCode: "254",
    name: "Kenya",
  },

  nationalLength: 9,
  trunkPrefix: "0",

  ranges: [
    ...ranges("Safaricom", "mobile", [
      "70", "71", "72", "74", "757", "758", "759", "768", "769", "79",
      "11", "140", "141", "142", "143", "144", "145", "146", "18",
    ]),
    ...ranges("Airtel", "mobile", [
      "73", "75", "76", "78",
      "100", "101", "102", "103", "104", "105", "106", "107", "108",
      "135", "136", "137", "138", "139",
    ]),
    ...ranges("Telkom", "mobile", ["77", "761", "120"]),
    // Equitel.
    ...ranges("Finserve", "mobile", ["124"]),
    // Faiba.
    ...ranges("JTL", "mobile", ["747"]),
    ...ranges("Homeland Media", "mobile", ["744"]),
    ...ranges("Infura", "mobile", ["121"]),
    ...ranges("NRG Media", "mobile", ["130"]),
  ],

  ...groupedFormats("254", [3, 3, 3], "0"),
};

/**
 * Validate a Kenya phone number.
 */
export function validateKenya(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, KENYA, options);
}
