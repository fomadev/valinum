export * from './types';
export * from './drc';

// Petit bonus : une fonction générique
import { validateDRC } from './drc';
export const validate = validateDRC;