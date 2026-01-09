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