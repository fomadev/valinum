# ValiNum (v1.0.1)

**ValiNum** is a lightweight, universal JavaScript library designed to validate and identify mobile phone numbers. The current version is specifically optimized for the **Democratic Republic of the Congo (DRC)**.

[![NPM Version](https://img.shields.io/npm/v/valinum.svg)](https://www.npmjs.com/package/valinum)
[![License: FPL](https://img.shields.io/badge/License-FPL-orange.svg)](#license)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)

---

## Features
- **Operator Identification**: Instantly detects if a number belongs to **Vodacom, Orange, Airtel, or Africell**.
- **Real-time Validation**: Detects if a number is incomplete, too long, or valid.
- **Smart Sanitization (v1.0.1)**: Automatically handles spaces, dashes, parentheses, and prefixes like `+243`, `243`, or the initial `0`.
- **Universal**: Compatible with React, React Native, Vue, Node.js, TypeScript, PHP, and Django.

## Installation

### Via NPM (For React, Vite, Node.js, etc.)
```bash
npm install valinum
```

## Via CDN (For Classic HTML, PHP, Django)
Add this script tag before the closing `</body>` tag:
```html
<script src="https://cdn.jsdelivr.net/gh/fomadev/valinum@v1.0.1/dist/valinum.js"
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

### 3. Real-time UX Shield

To prevent users from typing invalid characters, combine ValiNum with a simple input filter

```js
const input = document.getElementById('phone');

input.addEventListener('input', (e) => {
    // Block non-numeric characters (except +)
    e.target.value = e.target.value.replace(/[^\d+]/g, '');
    
    const res = ValiNum.validateDRC(e.target.value);
    // Apply your UI logic (badges, colors, etc.) here
});
```

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

## Development

1. Clone the repository: git clone `https://github.com/fomadev/valinum.git`

2. Install dependencies: `npm install`

3. Build the project: `npm run build`

4. Run tests: `npm test`

## License

This project is licensed under the FomaDev Public License (FPL).

* **Free** for personal and educational use.

* **Free** for integration into commercial projects (compiled version).

* **Paid License required** for selling modified versions or creating competing derivative works.
See the [LICENSE](LICENSE) file for full details.

## Contributing

Contributions to add support for other countries are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file before submitting a merge request.