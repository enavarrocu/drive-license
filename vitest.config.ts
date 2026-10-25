import { defineConfig } from 'vitest/config'

// Tests unitaires (modules purs de app/) et test de fumée de l'API (.output, si présent).
export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
    testTimeout: 20_000,
    hookTimeout: 30_000,
  },
})
