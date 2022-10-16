// vite.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  define: {
    'import.meta.vitest': false,
  },
  test: {
    includeSource: ['core/**/*.{js,ts}'],
    environment: 'happy-dom'
  }
})
