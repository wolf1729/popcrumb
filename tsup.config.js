import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.js'],
  format: ['cjs', 'esm'],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.js': 'jsx',
    };
    options.banner = {
      js: '"use client";',
    };
  },
});
