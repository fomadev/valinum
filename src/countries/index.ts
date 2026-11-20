/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

import { CountryCode, CountryInfo } from "../types.js";
import { CountryDefinition } from "../core/engine.js";
import { DRC } from "./drc.js";
import { CONGO } from "./congo.js";
import { CAMEROON } from "./cameroon.js";
import { IVORY_COAST } from "./ivory-coast.js";
import { SENEGAL } from "./senegal.js";
import { ANGOLA } from "./angola.js";
import { GABON } from "./gabon.js";
import { CENTRAL_AFRICAN_REPUBLIC } from "./central-african-republic.js";
import { EQUATORIAL_GUINEA } from "./equatorial-guinea.js";
import { NIGERIA } from "./nigeria.js";
import { BENIN } from "./benin.js";
import { TOGO } from "./togo.js";
import { GHANA } from "./ghana.js";
import { ZAMBIA } from "./zambia.js";
import { BURKINA_FASO } from "./burkina-faso.js";
import { BOTSWANA } from "./botswana.js";
import { ZIMBABWE } from "./zimbabwe.js";
import { MOZAMBIQUE } from "./mozambique.js";
import { SOUTH_SUDAN } from "./south-sudan.js";
import { KENYA } from "./kenya.js";
import { UGANDA } from "./uganda.js";
import { RWANDA } from "./rwanda.js";
import { BURUNDI } from "./burundi.js";
import { TANZANIA } from "./tanzania.js";
import { MALAWI } from "./malawi.js";
import { NAMIBIA } from "./namibia.js";

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

  // Since 2.3.0
  BW: BOTSWANA,
  ZW: ZIMBABWE,
  MZ: MOZAMBIQUE,
  SS: SOUTH_SUDAN,
  KE: KENYA,
  UG: UGANDA,
  RW: RWANDA,
  BI: BURUNDI,
  TZ: TANZANIA,
  MW: MALAWI,
  NA: NAMIBIA,
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
  ["BW", "ZW", "MZ", "SS", "KE", "UG", "RW", "BI", "TZ", "MW", "NA"],
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
