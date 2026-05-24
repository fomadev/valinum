# ValiNum (v1.0.3)

**ValiNum** is a lightweight, universal JavaScript library designed to validate and identify mobile phone numbers. The current version is specifically optimized for the **Democratic Republic of the Congo (DRC)**.

[![NPM Version](https://img.shields.io/npm/v/valinum.svg)](https://www.npmjs.com/package/valinum)
[![License: FPL](https://img.shields.io/badge/License-FPL-orange.svg)](#license)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)

---

## Features
- **Operator Identification**: Instantly detects if a number belongs to **Vodacom, Orange, Airtel, or Africell**.
- **Real-time Validation**: Detects if a number is incomplete, too long, or valid.
- **Smart Sanitization**: Automatically handles spaces, dashes, parentheses, and prefixes like `+243`, `243`, or the initial `0`.
- **Exception & Service Handling**: Intercepts and flags official carrier short codes (customer care lines) and financial USSD strings (M-Pesa, Orange Money, Airtel Money, AfriMoney) to prevent them from altering standard subscriber registration forms.
- **Strict vs Tolerant Modes (New in v1.0.3)**: Gives developers the choice between flexible user inputs (allowing local formatting like leading 0) or strict infrastructural conformity (enforcing the +243 country prefix and preventing post-indicatif zero bugs).
- **Universal**: Compatible with React, React Native, Vue, Node.js, TypeScript, PHP, and Django.

## Installation

### Via NPM (For React, Vite, Node.js, etc.)
```bash
npm install valinum
```

## Via CDN (For Classic HTML, PHP, Django)
Add this script tag before the closing `</body>` tag:
```html
<script src="https://cdn.jsdelivr.net/gh/fomadev/valinum@v1.0.3/dist/valinum.js"
```

## Usage

### 1. Basic Integration (Standard JS / CDN)

By default, the engine runs in tolerant mode. The script exposes a global object named `ValiNum`.

```js
const result = ValiNum.validateDRC("081 234-56-78");

console.log(result.isValid);   // true
console.log(result.operator);  // "Vodacom"
console.log(result.formatted); // "+243812345678"
```

### 2. Modern Integration (ES6 / TypeScript)

```js
import { validateDRC } from 'valinum';

const { isValid, operator, error } = validateDRC("+243 844 000 000");

if (isValid) {
    console.log(`Successfully identified ${operator} number.`);
} else {
    console.error(error); // e.g., "Incomplete Vodacom number..."
}
```

### 3. Strict Mode Configuration (New in v1.0.3)

For critical backend integrations or strict validation fields (such as SMS OTP gateways), you can pass `{ strict: true }` in options. This enforces the international country code prefix and rejects local leading zeros.

```js
import { validateDRC } from 'valinum';

// This will fail in strict mode because it lacks the +243 / 243 prefix
const localCheck = validateDRC("081234567", { strict: true });
console.log(localCheck.isValid); // false
console.log(localCheck.error);   // "Indicatif international (+243) obligatoire en mode strict"

// This will fail because the 0 after the country code is invalid structure
const zeroCheck = validateDRC("+243081234567", { strict: true });
console.log(zeroCheck.isValid);  // false
console.log(zeroCheck.error);   // "Le chiffre 0 après l'indicatif international est interdit"

// This passes perfectly (spaces and hyphens are still sanitized)
const validCheck = validateDRC("+243 812-34-56-78", { strict: true });
console.log(validCheck.isValid); // true
```

### 4. Special Service & USSD Detection

By default, official platform short codes or financial menus return `isValid: false` to avoid polluting user profile setups.

```js
import { validateDRC } from 'valinum';

// Testing a Mobile Money USSD string
const resultUSSD = validateDRC("*1122#");
console.log(resultUSSD.isServiceNumber); // true
console.log(resultUSSD.serviceType);     // "USSD"
console.log(resultUSSD.operator);        // "Vodacom"
console.log(resultUSSD.isValid);         // false (blocked by default)

// Bypassing restriction using options
const customResult = validateDRC("1111", { allowServices: true });
console.log(customResult.isValid);       // true
```

### 5. Real-time UX Shield

To prevent users from typing invalid characters while preserving USSD capabilities, update your input filter as follows:

```js
const input = document.getElementById('phone');

input.addEventListener('input', (e) => {
    // Block characters that are not digits, +, -, spaces, parentheses, * or #
    e.target.value = e.target.value.replace(/[^\d+ \-()*#]/g, '');
    
    const res = ValiNum.validateDRC(e.target.value);
    // Apply your UI logic (badges, colors, etc.) here
});
```

## API Parameter Options

The `validateDRC` function accepts an optional secondary configuration object:

<table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-family: sans-serif; box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);">
    <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>forceCountry</td>
            <td>boolean</td>
            <td>false</td>
            <td>Considers the entry as part of the local country context even without explicit data declaration.</td>
        </tr>
        <tr>
            <td>allowServices</td>
            <td>boolean</td>
            <td>false</td>
            <td>Set to true if your specific application explicitly permits or collects utility short codes or active USSD strings.</td>
        </tr>
        <tr>
            <td>strict</td>
            <td>boolean</td>
            <td>false</td>
            <td>Enforces structural validation requiring +243 or 243 and flags programmatic errors such as leading zero combinations.</td>
        </tr>
    </tbody>
</table>


## API Response Schema

The object returned by `validateDRC()` contains the following fields:

<table>
    <thead>
        <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>isValid</code></td>
            <td><code class="type-boolean">boolean</code></td>
            <td>True if the number is standard, structure-compliant, and belongs to a known operator.</td>
        </tr>
        <tr>
            <td><code>operator</code></td>
            <td><code class="type-string">string</code> | <code class="type-null">null</code></td>
            <td>Returns "Vodacom", "Orange", "Airtel", or "Africell".</td>
        </tr>
        <tr>
            <td><code>formatted</code></td>
            <td><code class="type-string">string</code></td>
            <td>Normalized international format string prefixed with +243, or the clean USSD expression.</td>
        </tr>
        <tr>
            <td><code>error</code></td>
            <td><code class="type-string">string</code> | <code class="type-null">null</code></td>
            <td>Explicit localized error string describing validation failure reasons.</td>
        </tr>
        <tr>
            <td><code>isServiceNumber</code></td>
            <td><code class="type-boolean">boolean</code></td>
            <td>True if the string matches an ARPTC-regulated system node (USSD code or customer service short dial).</td>
        </tr>
        <tr>
            <td><code>serviceType</code></td>
            <td><code class="type-string">string</code> | <code class="type-null">null</code></td>
            <td>Explicitly returns "USSD" or "ShortCode" if a service pattern matches, otherwise null.</td>
        </tr>
    </tbody>
</table>

## Operator Mapping (DRC)

<table>
  <thead>
      <tr>
          <th>Operator</th>
          <th>Prefixes (NDC)</th>
      </tr>
  </thead>
  <tbody>
      <tr>
          <td class="operator-name">Vodacom</td>
          <td><code>81, 82, 83</code></td>
      </tr>
      <tr>
          <td class="operator-name">Orange</td>
          <td><code>80, 84, 85, 89</code></td>
      </tr>
      <tr>
          <td class="operator-name">Airtel</td>
          <td><code>97, 98, 99</code></td>
      </tr>
      <tr>
          <td class="operator-name">Africell</td>
          <td><code>90, 91</code></td>
      </tr>
  </tbody>
</table>

## License

This project is licensed under the FomaDev Public License (FPL).

* **Free** for personal and educational use.

* **Free** for integration into commercial projects (compiled version).

* **Paid License required** for selling modified versions or creating competing derivative works.
See the [LICENSE](LICENSE) file for full details.

## Contributing

Contributions to add support for other countries are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file before submitting a merge request.