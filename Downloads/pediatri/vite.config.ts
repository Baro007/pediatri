import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    // Production optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },
    // Chunk splitting strategy
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Chart.js and related
          charts: ['chart.js', 'react-chartjs-2'],
          // UI libraries
          ui: ['@headlessui/react', '@heroicons/react'],
          // Utils
          utils: ['clsx', 'tailwind-merge', 'zustand'],
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
    // Source maps for production debugging
    sourcemap: true,
    // Optimize bundle size
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  // Preview server configuration
  preview: {
    port: 8080,
    host: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'chart.js',
      'react-chartjs-2',
      '@headlessui/react',
      '@heroicons/react',
      'clsx',
      'tailwind-merge',
      'zustand',
    ],
  },
  // Define globals for better tree-shaking
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
})
