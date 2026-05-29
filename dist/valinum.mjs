/* * Copyright (c) 2026 Fordi / FomaDev.
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */
const OPERATORS_RDC = {
    // Vodacom
    '81': { operator: 'Vodacom', lineType: 'Mobile', region: 'Kinshasa / Ouest' },
    '82': { operator: 'Vodacom', lineType: 'Mobile', region: 'Grand Katanga / Sud' },
    '83': { operator: 'Vodacom', lineType: 'Mobile', region: 'Grand Kivu / Est' },
    '86': { operator: 'Vodacom', lineType: 'Mobile', region: 'National / Extension' },
    // Orange
    '80': { operator: 'Orange', lineType: 'Fixe', region: 'National' }, // Historiquement lignes fixes/CDMA
    '84': { operator: 'Orange', lineType: 'Mobile', region: 'Kinshasa / Ouest' },
    '85': { operator: 'Orange', lineType: 'Mobile', region: 'Grand Katanga / Sud' },
    '89': { operator: 'Orange', lineType: 'Mobile', region: 'National / Est' },
    // Africell
    '90': { operator: 'Africell', lineType: 'Mobile', region: 'Kinshasa / Bas-Congo' },
    '91': { operator: 'Africell', lineType: 'Mobile', region: 'National' },
    // Airtel
    '97': { operator: 'Airtel', lineType: 'Mobile', region: 'Grand Kivu / Est' },
    '98': { operator: 'Airtel', lineType: 'Mobile', region: 'Grand Katanga / Sud' },
    '99': { operator: 'Airtel', lineType: 'Mobile', region: 'Kinshasa / Ouest' }
};
const SHORT_CODES_RDC = {
    '1111': { operator: 'Vodacom', label: 'Service Client' },
    '1115': { operator: 'Vodacom', label: 'Service Client Postpaid' },
    '1116': { operator: 'Vodacom', label: 'Service Client Distributeurs' },
    '1777': { operator: 'Orange', label: 'Service Client' },
    '4000': { operator: 'Orange', label: 'Service Client' },
    '4004': { operator: 'Orange', label: 'Messagerie Vocale' },
    '121': { operator: 'Airtel', label: 'Service Client' },
    '1211': { operator: 'Airtel', label: 'Service Client' },
    '111': { operator: 'Africell', label: 'Service Client' },
    '9111': { operator: 'Africell', label: 'Service Client' }
};
const identifyUssdOperator = (ussd) => {
    if (ussd.startsWith('*1122#') || ussd.startsWith('*100#') || ussd.startsWith('*1107#') || ussd.startsWith('*1141#') || ussd.startsWith('*1160#') || ussd.startsWith('*1489#'))
        return 'Vodacom';
    if (ussd.startsWith('*1234#') || ussd.startsWith('*1111#'))
        return 'Orange';
    if (ussd.startsWith('*501#') || ussd.startsWith('*502#') || ussd.startsWith('*171#') || ussd.startsWith('*131#'))
        return 'Airtel';
    if (ussd.startsWith('*1112#') || ussd.startsWith('*112#') || ussd.startsWith('*111#'))
        return 'Africell';
    return null;
};
const validateDRC = (phone, options = {}) => {
    const trimInput = phone.trim();
    let error = null;
    // 1. DÉTECTION DES CODES USSD
    if (trimInput.startsWith('*') && trimInput.endsWith('#')) {
        const cleanUssd = trimInput.replace(/\s/g, '');
        const operator = identifyUssdOperator(cleanUssd);
        return {
            isValid: options.allowServices || false,
            operator,
            formatted: cleanUssd,
            error: options.allowServices ? null : "Les codes USSD ne sont pas autorisés comme numéros d'abonnés",
            isServiceNumber: true,
            serviceType: 'USSD',
            lineType: null,
            region: null
        };
    }
    // 2. CONTRÔLE DU MODE STRICT
    if (options.strict) {
        if (!trimInput.startsWith('+243') && !trimInput.startsWith('243')) {
            return {
                isValid: false,
                operator: null,
                formatted: '',
                error: "Indicatif international (+243) obligatoire en mode strict",
                isServiceNumber: false,
                serviceType: null,
                lineType: null,
                region: null
            };
        }
        const cleanDigitsOnly = trimInput.replace(/\D/g, '');
        if (cleanDigitsOnly.startsWith('2430')) {
            return {
                isValid: false,
                operator: null,
                formatted: '',
                error: "Le chiffre 0 après l'indicatif international est interdit",
                isServiceNumber: false,
                serviceType: null,
                lineType: null,
                region: null
            };
        }
    }
    // 3. NETTOYAGE STANDARD
    let cleaned = trimInput.replace(/\D/g, '');
    // 4. DÉTECTION DES NUMÉROS COURTS
    if (SHORT_CODES_RDC[cleaned]) {
        const service = SHORT_CODES_RDC[cleaned];
        return {
            isValid: options.allowServices || false,
            operator: service.operator,
            formatted: cleaned,
            error: options.allowServices ? null : `Numéro court de service réservé (${service.label} ${service.operator})`,
            isServiceNumber: true,
            serviceType: 'ShortCode',
            lineType: 'Mobile',
            region: 'National'
        };
    }
    // 5. TRAITEMENT DE L'INDICATIF NATIONAL POUR EXTRAIRE LE NDC
    if (cleaned.startsWith('243')) {
        cleaned = cleaned.substring(3);
    }
    else if (cleaned.startsWith('0')) {
        cleaned = cleaned.substring(1);
    }
    const ndc = cleaned.substring(0, 2);
    const metadata = OPERATORS_RDC[ndc] || null;
    // Validation de la longueur finale d'abonné (9 chiffres restants)
    let isValid = metadata !== null && cleaned.length === 9;
    // Ajustement des messages d'erreur contextuels
    if (cleaned.length === 0) {
        error = "Numéro requis";
    }
    else if (!metadata && cleaned.length >= 2) {
        error = "Opérateur inconnu en RDC";
    }
    else if (metadata && cleaned.length < 9) {
        error = `Numéro ${metadata.operator} incomplet...`;
    }
    else if (cleaned.length > 9) {
        error = "Numéro trop long";
    }
    return {
        isValid,
        operator: metadata ? metadata.operator : null,
        formatted: cleaned.length > 0 ? `+243${cleaned}` : '',
        error,
        isServiceNumber: false,
        serviceType: null,
        lineType: metadata ? metadata.lineType : null,
        region: metadata ? metadata.region : null
    };
};

/* * Copyright (c) 2026 Fordi / FomaDev.
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */
const validate = validateDRC;

export { validate, validateDRC };
//# sourceMappingURL=valinum.mjs.map
