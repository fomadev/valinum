# Contributing to ValiNum

First of all, thank you for considering contributing to **ValiNum**! By contributing, you help make phone number validation more reliable for everyone across Africa.

---

## License Agreement

By contributing to this repository, you agree that:

1. Your contributions will be licensed under the **Fordima Public License (FPL) v1.0**.
2. Fordima Inc. retains full authority over the project.
3. Independent or permanent forks created to bypass the official project are strictly prohibited.

---

## How Can I Contribute?

### 1. Reporting Bugs

- Check the **Issues** tab to see if the bug has already been reported.
- If not, open a new issue.
- Describe the problem clearly, including the input used (e.g., the phone number) and the expected vs. actual result.

### 2. Suggesting Enhancements

- We are always looking to improve the UX and logic.
- If you want to add support for a new country (e.g., Mali, Kenya), please provide the official numbering plan: number length, trunk prefix, and the operator of each prefix, with a source (regulator or ITU document).
- If an operator received a new prefix or changed its name, open an issue with the prefix and a source.

### 3. Pull Requests (The Process)

Forks are authorized **ONLY** for the purpose of submitting a Pull Request to the official FomaDev repository.

1. **Fork** the repository to your own account.
2. **Clone** the project locally: `git clone https://github.com/fomadev/valinum.git`
3. **Create a branch** for your feature: `git checkout -b feature/amazing-feature`
4. **Commit your changes**: `git commit -m 'feat: add support for new operator'`
5. **Run tests**: Ensure that `npm test` passes.
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request** against the `main` branch of the official FomaDev repository.

---

## Development Setup

1. **Install dependencies**:

```bash
   npm install
```

2. **Build the project**:

```bash
   npm run build
```

3. **Run tests**:

```bash
   npm test
```

---

## Coding Standards

- Use **TypeScript** for any logic changes.
- Add or update **tests** for every change (`tests/`).
- Run `npm run build` and **commit the `dist/` folder**: CDNs serve it straight from GitHub, and the CI fails if it does not match the sources.
- Add your change to **`CHANGELOG.md`**.
- Keep the `ValidationResult` interface consistent to avoid breaking changes for existing users.
- A new country must not change the result for numbers that are already recognized: add it to a new group in `DETECTION_TIERS`.

Adding a country step by step is explained in [The ValiNum Course, Chapter 17.2](DOCUMENTATION.md#172-adding-a-country), and how the code is organized in [Chapter 14](DOCUMENTATION.md#chapter-14-how-valinum-works-inside).

---

## Questions?

If you have questions about the logic or the FPL license, please reach out to the maintainers via GitHub Issues.

**Thank you for building the future of digital tools with us!**