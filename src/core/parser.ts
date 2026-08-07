/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

export interface ParsedPhoneNumber {
    countryCode: string | null;
    nationalNumber: string;
    international: boolean;
}

export function parse(input: string): ParsedPhoneNumber {
    const normalized = input;

    if (normalized.startsWith("+")) {
        const digits = normalized.slice(1);

        /*
         * Le code pays sera déterminé à partir
         * du registre des pays supportés.
         */
        const countryCode = detectCountryCode(digits);

        if (!countryCode) {
            return {
                countryCode: null,
                nationalNumber: digits,
                international: true,
            };
        }

        return {
            countryCode,
            nationalNumber: digits.slice(countryCode.length),
            international: true,
        };
    }

    return {
        countryCode: null,
        nationalNumber: normalized,
        international: false,
    };
}