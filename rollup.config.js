/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts', // Le point d'entrée de notre code
  output: [
    {
      file: 'dist/valinum.js',
      format: 'umd',        // Format universel pour le navigateur
      name: 'ValiNum',      // Le nom de la variable globale (ex: ValiNum.validate())
      sourcemap: true,
    },
    {
      file: 'dist/valinum.mjs',
      format: 'es',         // Format moderne pour React/Vue
      sourcemap: true,
    }
  ],
  plugins: [
    typescript({ tsconfig: './tsconfig.json' })
  ]
};