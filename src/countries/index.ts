/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

import { CountryCode, CountryInfo } from "../types";
import { CountryDefinition } from "../core/engine";
import { DRC } from "./drc";
import { CONGO } from "./congo";
import { CAMEROON } from "./cameroon";
import { IVORY_COAST } from "./ivory-coast";
import { SENEGAL } from "./senegal";

export const COUNTRIES: Record<CountryCode, CountryDefinition> = {
  CD: DRC,
  CG: CONGO,
  CM: CAMEROON,
  CI: IVORY_COAST,
  SN: SENEGAL,
};

/**
 * Resolve a country code (case-insensitive).
 */
export function getCountryDefinition(
  code: string
): CountryDefinition {
  const definition =
    COUNTRIES[code.toUpperCase() as CountryCode];

  if (!definition) {
    throw new RangeError(`Unsupported country: ${code}`);
  }

  return definition;
}

/**
 * List every country ValiNum can validate.
 */
export function getSupportedCountries(): CountryInfo[] {
  return Object.values(COUNTRIES).map((c) => c.info);
}
