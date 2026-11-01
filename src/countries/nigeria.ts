/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Nigeria
 *
 * +234, 10-digit mobile number, trunk prefix 0.
 * Fixed lines are not supported yet.
 *
 * 0803 123 4567 / +234 803 123 4567
 */

import { ValidationOptions, ValidationResult } from "../types.js";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine.js";

export const NIGERIA: CountryDefinition = {
  info: {
    iso2: "NG",
    dialCode: "234",
    name: "Nigeria",
  },

  nationalLength: 10,
  trunkPrefix: "0",

  ranges: [
    ...ranges("MTN", "mobile", [
      "703", "704", "706", "707", "7025", "7026",
      "803", "806", "810", "813", "814", "816",
      "903", "906", "910", "913", "916",
    ]),
    ...ranges("Airtel", "mobile", [
      "701", "708",
      "802", "808", "812",
      "901", "902", "904", "907", "911", "912",
    ]),
    ...ranges("Glo", "mobile", [
      "705",
      "805", "807", "811", "815",
      "905", "915",
    ]),
    ...ranges("9mobile", "mobile", [
      "809", "817", "818",
      "908", "909",
    ]),
    ...ranges("Ntel", "mobile", ["7021", "7022", "804"]),
    ...ranges("Smile", "mobile", ["7020"]),
    ...ranges("Prestel", "mobile", ["7024"]),
    ...ranges("Multilinks", "mobile", ["7027", "709"]),
    ...ranges("Starcomms", "mobile", ["7028", "7029", "8190", "8191"]),
    ...ranges("Lebara", "mobile", ["72"]),
    ...ranges("MAFAB", "mobile", ["801"]),
  ],

  ...groupedFormats("234", [3, 3, 4], "0"),
};

/**
 * Validate a Nigeria phone number.
 */
export function validateNigeria(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, NIGERIA, options);
}
