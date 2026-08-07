# ValiNum

ValiNum is a lightweight JavaScript and TypeScript library for validating and formatting phone numbers for the Democratic Republic of the Congo. Version 2.0.0 introduces a simpler and more maintainable structure based on modular core logic for normalization, parsing, validation, and formatting.

## Overview

ValiNum v2.0.0 provides:

- validation of DRC national and international numbers
- normalization of common input styles such as spaces, hyphens, dots, and parentheses
- support for both `+243` and `00` as international dialing prefixes
- operator detection for major DRC mobile networks
- consistent formatting in national, international, and E.164 forms

The library currently targets the Democratic Republic of the Congo and uses the dialing code `243` in the DRC-specific country module.

## Installation

### npm

```bash
npm install valinum
```

### Browser

UMD build:

```html
<script src="https://cdn.jsdelivr.net/gh/fomadev/valinum@v2.0.0/dist/valinum.js"></script>
```

Minified build:

```html
<script src="https://cdn.jsdelivr.net/gh/fomadev/valinum@v2.0.0/dist/valinum.min.js"></script>
```

ES module build:

```html
<script type="module">
  import { validate } from "https://cdn.jsdelivr.net/gh/fomadev/valinum@v2.0.0/dist/valinum.mjs";

  const result = validate("+243824708027");
  console.log(result);
</script>
```

## Usage

### Node.js / TypeScript

```ts
import { validate } from "valinum";

const result = validate("0824708027");

console.log(result.valid);
console.log(result.country?.name);
console.log(result.operator?.name);
console.log(result.number?.e164);
```

### Browser

```html
<script src="https://cdn.jsdelivr.net/gh/fomadev/valinum@v2.0.0/dist/valinum.js"></script>
<script>
  const result = ValiNum.validate("+243824708027");
  console.log(result);
</script>
```

## API

### `validate(input, options?)`

Validates a phone number and returns a structured result.

```ts
import { validate } from "valinum";

const result = validate("0824708027");
```

### Options

```ts
interface ValidationOptions {
  accept00Prefix?: boolean;
  strict?: boolean;
}
```

- `accept00Prefix`: allows `00` to be treated as the international prefix. Default: `true`
- `strict`: requires the number to use an explicit international form such as `+243...`, `243...`, or `00243...`. Default: `false`

## Result Shape

```ts
interface ValidationResult {
  valid: boolean;
  country: CountryInfo | null;
  operator: OperatorInfo | null;
  number: NumberInfo | null;
  error: ValidationError;
}
```

### Example

```ts
const result = validate("0824708027");

console.log(result.valid); // true
console.log(result.country?.dialCode); // "243"
console.log(result.operator?.name); // "Vodacom"
console.log(result.number?.national); // "082 470 8027"
console.log(result.number?.international); // "+243 824 708 027"
console.log(result.number?.e164); // "+243824708027"
```

## Supported Input Examples

```ts
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

## Supported Operators

- Vodacom: `81`, `82`, `83`, `86`
- Orange: `80`, `84`, `85`, `89`
- Africell: `90`, `91`
- Airtel: `97`, `98`, `99`

## Error Codes

The validator may return the following error values:

- `EMPTY_INPUT`
- `INVALID_CHARACTERS`
- `INVALID_COUNTRY_CODE`
- `INVALID_LENGTH`
- `INVALID_PREFIX`
- `TOO_SHORT`
- `TOO_LONG`
- `null`

## Development

### Install dependencies

```bash
npm install
```

### Run tests

```bash
npm test
```

### Build the package

```bash
npm run build
```

This produces:

- `dist/valinum.js`
- `dist/valinum.min.js`
- `dist/valinum.mjs`

## License

This project is distributed under the FomaDev Public License.

See the LICENSE file for full details.