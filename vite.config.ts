import { defineConfig, loadEnv } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './src/manifest';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [crx({ manifest: manifest(env) })],
    build: {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        output: { entryFileNames: (chunk) => `${chunk.name}.js`, assetFileNames: `[name][extname]` }
      }
    }
  };
});
