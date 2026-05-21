export interface ValidationResult {
    isValid: boolean;
    operator: string | null;
    formatted: string;
    error: string | null;
    isServiceNumber: boolean;
    serviceType: 'USSD' | 'ShortCode' | null;
}
export interface ValidationOptions {
    forceCountry?: boolean;
    allowServices?: boolean;
}
