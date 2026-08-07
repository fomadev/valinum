/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

/**
 * ValiNum v2
 */

import { validateDRC } from "./countries/drc";

export * from "./types";
export * from "./core/normalize";
export * from "./core/parser";
export * from "./core/validator";
export * from "./core/formatter";

export const validate = validateDRC;

export default validate;