# ValiNum

ValiNum is a lightweight JavaScript and TypeScript library for validating and formatting phone numbers in the Democratic Republic of the Congo. Version 2.0.0 keeps the API simple and easy to use.

For the full beginner-friendly guide, see [DOCUMENTATION.md](DOCUMENTATION.md).

## What ValiNum can do

- validate local and international DRC phone numbers
- normalize common formatting such as spaces, hyphens, dots, and parentheses
- detect known DRC operators
- return results in national, international, and E.164 formats

## Installation

```bash
npm install valinum
```

## Quick example

```ts
import { validate } from "valinum";

const result = validate("0824708027");

console.log(result.valid); // true
console.log(result.number?.e164); // "+243824708027"
```

## Main API

```ts
validate(input: string, options?: ValidationOptions)
```

### Supported options

- `accept00Prefix`: allows `00` to be treated as the international prefix. Default: `true`
- `strict`: only accepts explicit international forms such as `+243...`, `243...`, or `00243...`. Default: `false`

## Result shape

```ts
{
  valid: boolean;
  country: CountryInfo | null;
  operator: OperatorInfo | null;
  number: NumberInfo | null;
  error: ValidationError;
}
```

## Development

```bash
npm install
npm test
npm run build
```

## More information

The complete documentation, including a full tutorial from the basics to advanced usage, is available in [DOCUMENTATION.md](DOCUMENTATION.md).
