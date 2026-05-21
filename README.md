# ValiNum (v1.0.2)

**ValiNum** is a lightweight, universal JavaScript library designed to validate and identify mobile phone numbers. The current version is specifically optimized for the **Democratic Republic of the Congo (DRC)**.

[![NPM Version](https://img.shields.io/npm/v/valinum.svg)](https://www.npmjs.com/package/valinum)
[![License: FPL](https://img.shields.io/badge/License-FPL-orange.svg)](#license)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)

---

## Features
- **Operator Identification**: Instantly detects if a number belongs to **Vodacom, Orange, Airtel, or Africell**.
- **Real-time Validation**: Detects if a number is incomplete, too long, or valid.
- **Smart Sanitization**: Automatically handles spaces, dashes, parentheses, and prefixes like `+243`, `243`, or the initial `0`.
- **Exception & Service Handling (v1.0.2)**: Intercepts and flags official carrier short codes (customer care lines) and financial USSD strings (M-Pesa, Orange Money, Airtel Money, AfriMoney) to prevent them from altering standard database forms.
- **Universal**: Compatible with React, React Native, Vue, Node.js, TypeScript, PHP, and Django.

## Installation

### Via NPM (For React, Vite, Node.js, etc.)
```bash
npm install valinum
```

## Via CDN (For Classic HTML, PHP, Django)
Add this script tag before the closing `</body>` tag:
```html
<script src="https://cdn.jsdelivr.net/gh/fomadev/valinum@v1.0.2/dist/valinum.js"
```

## Usage

### 1. Basic Integration (Standard JS / CDN)

The script exposes a global object named `ValiNum`.

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

### 3. Special Service & USSD Detection (New in v1.0.2)

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

### 4. Real-time UX Shield

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