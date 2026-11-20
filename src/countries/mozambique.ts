/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Mozambique
 *
 * +258, 9-digit mobile number, no trunk prefix.
 * Fixed lines (8 digits) are not supported yet.
 *
 * 84 123 4567 / +258 84 123 4567
 */

import { ValidationOptions, ValidationResult } from "../types.js";
import {
  CountryDefinition,
  groupedFormats,
  ranges,
  validateWithDefinition,
} from "../core/engine.js";

export const MOZAMBIQUE: CountryDefinition = {
  info: {
    iso2: "MZ",
    dialCode: "258",
    name: "Mozambique",
  },

  nationalLength: 9,
  trunkPrefix: null,

  ranges: [
    // Formerly mcel.
    ...ranges("Tmcel", "mobile", ["82", "83"]),
    ...ranges("Vodacom", "mobile", ["84", "85"]),
    ...ranges("Movitel", "mobile", ["86", "87"]),
  ],

  ...groupedFormats("258", [2, 3, 4]),
};

/**
 * Validate a Mozambique phone number.
 */
export function validateMozambique(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, MOZAMBIQUE, options);
}
