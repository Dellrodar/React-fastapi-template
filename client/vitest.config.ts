/// <reference types="vitest" />
import { defineConfig, mergeConfig } from 'vitest/config';
import config from './vite.config';

export default mergeConfig(config, defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
}));
