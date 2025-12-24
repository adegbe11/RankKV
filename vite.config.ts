import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        guides: 'guides.html',
        longTail: 'article-long-tail.html',
        amazonSeo: 'article-amazon-seo.html',
        youtubeSeo: 'article-youtube-vseo.html',
        tiktokTrends: 'article-tiktok-trends.html'
      }
    }
  }
});