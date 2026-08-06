/**
 * Normalise un numéro de téléphone.
 *
 * Exemples :
 * 0824708027
 * +243824708027
 * 00243824708027
 * 243824708027
 * 082 470-80-27
 */
export function normalize(input: string): string {
    let value = input.trim();

    // 00 devient +
    if (value.startsWith("00")) {
        value = "+" + value.slice(2);
    }

    // Supprime espaces, parenthèses, tirets et points
    value = value.replace(/[\s().-]/g, "");

    // Supprime le +
    if (value.startsWith("+")) {
        value = value.slice(1);
    }

    // Supprime le code pays 243
    if (value.startsWith("243")) {
        value = value.slice(3);
    }

    // Supprime le zéro local
    if (value.startsWith("0")) {
        value = value.slice(1);
    }

    return value;
}