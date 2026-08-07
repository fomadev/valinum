/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

export function normalize(input: string): string {
    if (typeof input !== "string") {
        throw new TypeError("Phone number must be a string");
    }

    let value = input.trim();

    if (value.length === 0) {
        return "";
    }

    // Remove common formatting characters.
    value = value.replace(/[\s().-]/g, "");

    // International dialing prefix:
    // 00XXXXXXXX → +XXXXXXXX
    if (value.startsWith("00")) {
        value = "+" + value.slice(2);
    }

    return value;
}