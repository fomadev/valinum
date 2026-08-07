/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
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