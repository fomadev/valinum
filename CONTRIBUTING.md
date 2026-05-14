# Contributing to ValiNum

First of all, thank you for considering contributing to **ValiNum**! By contributing, you help make mobile number validation more reliable for everyone in the DRC and beyond.

---

## ⚖️ License Agreement
By contributing to this repository, you agree that:
1. Your contributions will be licensed under the **FomaDev Public License (FPL)**.
2. FomaDev retains full authority over the project.
3. Independent or permanent forks created to bypass the official project are strictly prohibited.

---

## 🚀 How Can I Contribute?

### 1. Reporting Bugs
- Check the **Issues** tab to see if the bug has already been reported.
- If not, open a new issue. 
- Describe the problem clearly, including the input used (e.g., the phone number) and the expected vs. actual result.

### 2. Suggesting Enhancements
- We are always looking to improve the UX and logic.
- If you want to add support for a new country (e.g., Congo-Brazzaville, Angola), please provide the official NDC (National Destination Code) mapping for the operators.

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

## 🛠️ Development Setup

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

## Coding Standards

* Use **TypeScript** for any logic changes.

* Ensure the `dist/` folder is updated before submitting (via `npm run build`).

* Keep the `ValidationResult` interface consistent to avoid breaking changes for existing users.

## Questions?

If you have questions about the logic or the FPL license, please reach out to **FomaDev** via GitHub Issues.

**Thank you for building the future of digital tools with us!**