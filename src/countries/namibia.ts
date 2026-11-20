/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Namibia
 *
 * +264, 9-digit mobile number, trunk prefix 0.
 * Fixed lines (variable length) are not supported yet.
 *
 * 081 123 4567 / +264 81 123 4567
 */

import { ValidationOptions, ValidationResult } from "../types.js";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine.js";

export const NAMIBIA: CountryDefinition = {
  info: {
    iso2: "NA",
    dialCode: "264",
    name: "Namibia",
  },

  nationalLength: 9,
  trunkPrefix: "0",

  ranges: [
    ...ranges("MTC", "mobile", ["81"]),
    ...ranges("TN Mobile", "mobile", ["85"]),
    ...ranges("Telecom Namibia", "mobile", ["60", "82"]),
  ],

  ...groupedFormats("264", [2, 3, 4], "0"),
};

/**
 * Validate a Namibia phone number.
 */
export function validateNamibia(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, NAMIBIA, options);
}
