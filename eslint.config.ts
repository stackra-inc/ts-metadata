/**
 * @fileoverview ESLint configuration for @stackra/ts-metadata
 */

import type { Linter } from 'eslint';
import { baseConfig } from '@stackra/eslint-config';

const config: Linter.Config[] = [
  ...baseConfig,
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.js', '*.config.ts', '.examples/**'],
  },
  {
    rules: {
      'turbo/no-undeclared-env-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

export default config;
