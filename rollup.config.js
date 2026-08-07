/*
 * Copyright (c) 2026 Fordi / FomaDev.
 *
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts",

  output: [
    {
      // Browser / UMD
      file: "dist/valinum.js",
      format: "umd",
      name: "ValiNum",
      sourcemap: true,
    },

    {
      // Browser / UMD - minified
      file: "dist/valinum.min.js",
      format: "umd",
      name: "ValiNum",
      sourcemap: true,
      plugins: [terser()],
    },

    {
      // Modern JavaScript / ES Modules
      file: "dist/valinum.mjs",
      format: "es",
      sourcemap: true,
    },
  ],

  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
  ],
};