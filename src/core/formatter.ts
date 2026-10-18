/*
 * Copyright (c) 2026 Fordima Inc. All rights reserved.
 * Licensed under the Fordima Public License (FPL) v1.0.
 * See the LICENSE file in the project root for full license information.
 */

/**
 * Build E.164 representation.
 *
 * Example:
 *
 * countryCode = "243"
 * nationalNumber = "824708027"
 *
 * Result:
 *
 * +243824708027
 */
export function formatE164(
  dialCode: string,
  nationalNumber: string
): string {
  return `+${dialCode}${nationalNumber}`;
}

/**
 * Build international representation.
 *
 * Example:
 *
 * +243 824 708 027
 */
export function formatInternational(
  dialCode: string,
  nationalNumber: string
): string {
  return `+${dialCode} ${nationalNumber.slice(0, 3)} ${nationalNumber.slice(3, 6)} ${nationalNumber.slice(6)}`;
}

/**
 * Build national representation.
 *
 * Example:
 *
 * 082 470 8027
 */
export function formatNational(
  nationalNumber: string
): string {
  return `0${nationalNumber.slice(0, 2)} ${nationalNumber.slice(2, 5)} ${nationalNumber.slice(5)}`;
}

/**
 * Split digits into groups separated by spaces.
 *
 * Example:
 *
 * formatGroups("771234567", [2, 3, 2, 2])
 *
 * Result:
 *
 * 77 123 45 67
 */
export function formatGroups(
  digits: string,
  groups: number[]
): string {
  const parts: string[] = [];
  let index = 0;

  for (const size of groups) {
    if (index >= digits.length) {
      break;
    }

    parts.push(digits.slice(index, index + size));
    index += size;
  }

  if (index < digits.length) {
    parts.push(digits.slice(index));
  }

  return parts.join(" ");
}
