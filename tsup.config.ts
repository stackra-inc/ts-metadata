import { defineConfig } from 'tsup';

/**
 * Build configuration for @stackra/ts-metadata
 *
 * Outputs both ESM and CJS formats with TypeScript declarations.
 */
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: false,
  treeshake: true,
  sourcemap: false,
  minify: false,
  target: 'es2022',
  outDir: 'dist',
});
