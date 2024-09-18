import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['**/node_modules/**', 'build/**', '**/dist/**'],
    globals: true,
    includeSource: ['test/**/*.ts', '**/*.spec.ts'],
    coverage: {
      all: true,
    },
    reporters: 'verbose',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
