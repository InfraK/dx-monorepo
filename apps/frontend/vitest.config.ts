import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['**/*.test.tsx', '**/*.test.ts'],
    setupFiles: ['./src/test/setup.ts'],
  },
});
