import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: './',
  resolve: {},
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Infinite-Custom-Text-Input',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs'],
    },
    outDir: './dist/',
    emptyOutDir: true,
  },
});
