import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
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
