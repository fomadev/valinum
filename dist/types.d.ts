/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

export interface ValidationResult {
    isValid: boolean;
    operator: string | null;
    formatted: string;
    error: string | null;
    isServiceNumber: boolean;
    serviceType: 'USSD' | 'ShortCode' | null;
    lineType: 'Mobile' | 'Fixe' | null;
    region: string | null;
}
export interface ValidationOptions {
    forceCountry?: boolean;
    allowServices?: boolean;
    strict?: boolean;
}
