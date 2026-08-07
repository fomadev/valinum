# ValiNum v2.0.0 Documentation

## Introduction

ValiNum is a lightweight JavaScript and TypeScript library for validating and formatting phone numbers for the Democratic Republic of the Congo (DRC). Version 2.0.0 introduces a cleaner architecture based on a small set of reusable core modules:

- normalization for input cleaning
- parsing for country-aware structure analysis
- validation for rule-based checks
- formatting for consistent output

The library is designed to be simple to integrate in browsers, Node.js applications, and modern JavaScript build pipelines.

## What ValiNum v2.0.0 Provides

ValiNum v2.0.0 currently supports:

- validation of DRC national and international phone numbers
- normalization of common formatting styles such as spaces, hyphens, dots, and parentheses
- support for both `+243` and `00` international prefixes
- operator detection for major DRC mobile networks
- generation of consistent formatted outputs in national, international, and E.164 forms

The current version focuses on the DRC and uses the dialing code `243` as a country-specific rule in the DRC country module.

## Supported Scope

At this stage, ValiNum targets the Democratic Republic of the Congo.

Supported operators:

- Vodacom: `81`, `82`, `83`, `86`
- Orange: `80`, `84`, `85`, `89`
- Africell: `90`, `91`
- Airtel: `97`, `98`, `99`

## Installation

### npm

```bash
npm install valinum
```

### CDN

For browser usage, you can include the UMD build directly:

```html
<script src="https://cdn.jsdelivr.net/gh/fomadev/valinum@v2.0.0/dist/valinum.js"></script>
```

For the minified browser build:

```html
<script src="https://cdn.jsdelivr.net/gh/fomadev/valinum@v2.0.0/dist/valinum.min.js"></script>
```

For ES module usage:

```html
<script type="module">
  import { validate } from "https://cdn.jsdelivr.net/gh/fomadev/valinum@v2.0.0/dist/valinum.mjs";

  const result = validate("+243824708027");
  console.log(result);
</script>
```

## Quick Start

### CommonJS / Node.js

```js
const { validate } = require("valinum");

const result = validate("0824708027");

console.log(result);
```

### ES Modules

```js
import { validate } from "valinum";

const result = validate("+243824708027");

console.log(result);
```

## Public API

The main public entry point is:

```ts
validate(input: string, options?: ValidationOptions): ValidationResult
```

You can also import the DRC-specific validator directly:

```ts
import { validateDRC } from "valinum";
```

## Validation Options

The `validate` function accepts an optional options object.

### `accept00Prefix`

Default: `true`

Allows the international dialing prefix `00` to be treated as `+`.

```ts
validate("00243824708027");
```

### `strict`

Default: `false`

When enabled, the validator only accepts numbers that explicitly use the DRC international format, such as:

- `+243...`
- `243...`
- `00243...`

```ts
validate("0824708027", { strict: true });
```

## Result Object

The validation function returns a `ValidationResult` object.

```ts
interface ValidationResult {
  valid: boolean;
  country: CountryInfo | null;
  operator: OperatorInfo | null;
  number: NumberInfo | null;
  error: ValidationError;
}
```

### Example result

```js
const result = validate("0824708027");

console.log(result);
```

Example output:

```js
{
  valid: true,
  country: {
    iso2: "CD",
    dialCode: "243",
    name: "Democratic Republic of the Congo"
  },
  operator: {
    name: "Vodacom",
    prefix: "82"
  },
  number: {
    national: "082 470 8027",
    international: "+243 824 708 027",
    e164: "+243824708027"
  },
  error: null
}
```

## Supported Input Formats

ValiNum normalizes common input forms automatically.

### Valid examples

```js
validate("0824708027");
validate("+243824708027");
validate("243824708027");
validate("00243824708027");
validate("082 470 80 27");
validate("082-470-80-27");
validate("082.470.80.27");
validate("(082) 470 80 27");
validate("+243 824 708 027");
```

### Invalid examples

```js
validate("+2430824708027");
validate("082470802");
validate("08247080270");
validate("0872345678");
validate("");
```

## Normalization Behavior

The normalization layer removes common formatting characters such as spaces, hyphens, dots, and parentheses. It also converts `00` prefixes into `+` when enabled.

Examples:

```txt
082 470-80-27        -> 0824708027
+243 824 708 027     -> +243824708027
00243 824 708 027    -> +243824708027
```

## Formatting Outputs

The library can return the same number in three formats:

### National format

```js
const result = validate("0824708027");
console.log(result.number?.national);
// 082 470 8027
```

### International format

```js
const result = validate("0824708027");
console.log(result.number?.international);
// +243 824 708 027
```

### E.164 format

```js
const result = validate("0824708027");
console.log(result.number?.e164);
// +243824708027
```

## Error Codes

Validation failures return a standard error code.

Available error values:

- `EMPTY_INPUT`
- `INVALID_CHARACTERS`
- `INVALID_COUNTRY_CODE`
- `INVALID_LENGTH`
- `INVALID_PREFIX`
- `TOO_SHORT`
- `TOO_LONG`
- `null`

Example:

```js
const result = validate("082470802");

console.log(result.valid); // false
console.log(result.error); // "TOO_SHORT"
```

## Architecture Overview

The v2.0.0 structure is intentionally modular.

```txt
src/
├── core/
│   ├── normalize.ts
│   ├── parser.ts
│   ├── validator.ts
│   └── formatter.ts
├── countries/
│   └── drc.ts
├── types.ts
└── index.ts
```

### Core modules

- `normalize.ts` handles syntax normalization and formatting cleanup
- `parser.ts` analyzes the structure of the input and extracts the country and national parts
- `validator.ts` performs basic structural validation rules
- `formatter.ts` builds national, international, and E.164 representations

### Country module

- `countries/drc.ts` contains DRC-specific rules such as the dialing code `243`, the expected national length, and operator prefixes

This separation keeps the library extensible for future country modules.

## Development

### Install dependencies

```bash
npm install
```

### Run tests

```bash
npm test
```

### Build the library

```bash
npm run build
```

The build produces:

- `dist/valinum.js`
- `dist/valinum.min.js`
- `dist/valinum.mjs`

## Testing

The project uses Vitest for automated tests.

To run the full test suite:

```bash
npm test
```

## Publishing and Distribution

The package is prepared for publishing as a library with:

- npm distribution
- browser UMD builds
- ES module build for modern applications

The version number is maintained in the package manifest and should be aligned with the Git tag used for release.

## License

This project is distributed under the FomaDev Public License.

Please refer to the LICENSE file for full terms and conditions.

## Contributing

Contributions are welcome. If you want to add support for another country, the recommended path is to add a new country module under `src/countries` and keep the core normalization and validation logic reusable.
