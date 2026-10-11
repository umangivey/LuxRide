import { defineConfig } from 'vite';

// "artifact" mode bundles everything into one JS file so scripts/build_artifact.py
// can inline it into a single self-contained HTML page.
export default defineConfig(({ mode }) => ({
  base: './',
  server: { host: '0.0.0.0', port: 5173 },
  build: {
    outDir: mode === 'artifact' ? 'dist-artifact' : 'dist',
    chunkSizeWarningLimit: 1500,
    rollupOptions: mode === 'artifact' ? { output: { inlineDynamicImports: true } } : {},
  },
}));
