/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

export * from './types';
export * from './drc';

// Petit bonus : une fonction générique
import { validateDRC } from './drc';
export const validate = validateDRC;