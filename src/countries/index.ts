/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

import { CountryCode, CountryInfo } from "../types";
import { CountryDefinition } from "../core/engine";
import { DRC } from "./drc";
import { CONGO } from "./congo";
import { CAMEROON } from "./cameroon";
import { IVORY_COAST } from "./ivory-coast";
import { SENEGAL } from "./senegal";
import { ANGOLA } from "./angola";
import { GABON } from "./gabon";
import { CENTRAL_AFRICAN_REPUBLIC } from "./central-african-republic";
import { EQUATORIAL_GUINEA } from "./equatorial-guinea";
import { NIGERIA } from "./nigeria";
import { BENIN } from "./benin";
import { TOGO } from "./togo";
import { GHANA } from "./ghana";
import { ZAMBIA } from "./zambia";
import { BURKINA_FASO } from "./burkina-faso";

export const COUNTRIES: Record<CountryCode, CountryDefinition> = {
  // Since 2.1.0
  CD: DRC,
  CG: CONGO,
  CM: CAMEROON,
  CI: IVORY_COAST,
  SN: SENEGAL,

  // Since 2.2.0
  AO: ANGOLA,
  GA: GABON,
  CF: CENTRAL_AFRICAN_REPUBLIC,
  GQ: EQUATORIAL_GUINEA,
  NG: NIGERIA,
  BJ: BENIN,
  TG: TOGO,
  GH: GHANA,
  ZM: ZAMBIA,
  BF: BURKINA_FASO,
};

/**
 * Countries grouped by the release that added them.
 *
 * Auto-detection of national numbers tries older groups
 * first, so adding a country never changes how a number
 * that ValiNum already recognized is interpreted.
 */
export const DETECTION_TIERS: CountryCode[][] = [
  ["CD", "CG", "CM", "CI", "SN"],
  ["AO", "GA", "CF", "GQ", "NG", "BJ", "TG", "GH", "ZM", "BF"],
];

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
