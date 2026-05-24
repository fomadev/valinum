/* * Copyright (c) 2026 Fordi / FomaDev.
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */
const OPERATORS_RDC = {
    '81': 'Vodacom', '82': 'Vodacom', '83': 'Vodacom',
    '80': 'Orange', '84': 'Orange', '85': 'Orange', '89': 'Orange',
    '90': 'Africell', '91': 'Africell',
    '97': 'Airtel', '98': 'Airtel', '99': 'Airtel'
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
            serviceType: 'USSD'
        };
    }
    // 2. CONTRÔLE DU MODE STRICT (Validation de la structure initiale de l'indicatif)
    if (options.strict) {
        // En mode strict, la saisie originale doit impérativement commencer par +243 ou 243
        if (!trimInput.startsWith('+243') && !trimInput.startsWith('243')) {
            return {
                isValid: false,
                operator: null,
                formatted: '',
                error: "Indicatif international (+243) obligatoire en mode strict",
                isServiceNumber: false,
                serviceType: null
            };
        }
        // Refuser explicitement l'écriture erronée de type +243081...
        const cleanDigitsOnly = trimInput.replace(/\D/g, '');
        if (cleanDigitsOnly.startsWith('2430')) {
            return {
                isValid: false,
                operator: null,
                formatted: '',
                error: "Le chiffre 0 après l'indicatif international est interdit",
                isServiceNumber: false,
                serviceType: null
            };
        }
    }
    // 3. NETTOYAGE STANDARD POUR LES NUMÉROS EN SÉRIE
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
            serviceType: 'ShortCode'
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
    const operator = OPERATORS_RDC[ndc] || null;
    // Validation de la longueur finale d'abonné (9 chiffres restants)
    let isValid = operator !== null && cleaned.length === 9;
    // Ajustement des messages d'erreur contextuels
    if (cleaned.length === 0) {
        error = "Numéro requis";
    }
    else if (!operator && cleaned.length >= 2) {
        error = "Opérateur inconnu en RDC";
    }
    else if (operator && cleaned.length < 9) {
        error = `Numéro ${operator} incomplet...`;
    }
    else if (cleaned.length > 9) {
        error = "Numéro trop long";
    }
    return {
        isValid,
        operator,
        formatted: cleaned.length > 0 ? `+243${cleaned}` : '',
        error,
        isServiceNumber: false,
        serviceType: null
    };
};

/* * Copyright (c) 2026 Fordi / FomaDev.
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */
const validate = validateDRC;

export { validate, validateDRC };
//# sourceMappingURL=valinum.mjs.map
