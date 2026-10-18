/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 *
 * Democratic Republic of the Congo (DRC)
 *
 * +243, 9-digit national number, trunk prefix 0.
 *
 * 082 470 8027 / +243 824 708 027
 */

import { ValidationOptions, ValidationResult } from "../types";
import {
  CountryDefinition,
  ranges,
  validateWithDefinition,
} from "../core/engine";
import {
  formatInternational,
  formatNational,
} from "../core/formatter";

export const DRC: CountryDefinition = {
  info: {
    iso2: "CD",
    dialCode: "243",
    name: "Democratic Republic of the Congo",
  },

  nationalLength: 9,
  trunkPrefix: "0",

  ranges: [
    ...ranges("Vodacom", "mobile", ["81", "82", "83", "86"]),
    ...ranges("Orange", "mobile", ["80", "84", "85", "89"]),
    ...ranges("Africell", "mobile", ["90", "91"]),
    ...ranges("Airtel", "mobile", ["97", "98", "99"]),
  ],

  formatNational,
  formatInternational: (national) =>
    formatInternational("243", national),
};

/**
 * Validate a DRC phone number.
 */
export function validateDRC(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  return validateWithDefinition(input, DRC, options);
}
