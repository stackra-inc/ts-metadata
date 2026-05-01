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
      // Function type is correct for class constructors in metadata APIs (same as TypeORM/NestJS)
      '@typescript-eslint/no-unsafe-function-type': 'off',
      // Empty object type is used for generic metadata record accumulation
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
];

export default config;
