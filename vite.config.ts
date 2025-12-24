import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    // Increased limit to 1000kb to accommodate the data visualization and AI libraries
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: 'index.html',
        guides: 'guides.html',
        longTail: 'article-long-tail.html',
        amazonSeo: 'article-amazon-seo.html',
        youtubeSeo: 'article-youtube-vseo.html',
        tiktokTrends: 'article-tiktok-trends.html'
      },
      output: {
        // Manual chunking strategy to separate heavy dependencies
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts') || id.includes('d3')) {
              return 'vendor-charts';
            }
            if (id.includes('@google/genai')) {
              return 'vendor-ai';
            }
            return 'vendor-core';
          }
        }
      }
    }
  }
});