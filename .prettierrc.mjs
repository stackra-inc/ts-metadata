/**
 * @fileoverview Prettier configuration for @stackra/ts-metadata
 *
 * Inlined config so `format:check` works in CI without needing
 * @stackra/prettier-config to be built first.
 * Keep in sync with @stackra/prettier-config src/presets/base.ts.
 *
 * @see https://prettier.io/docs/en/configuration
 */

/** @type {import("prettier").Config} */
export default {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  bracketSameLine: false,
  htmlWhitespaceSensitivity: 'css',
  embeddedLanguageFormatting: 'auto',
  insertPragma: false,
  requirePragma: false,
  overrides: [
    { files: '*.json', options: { printWidth: 80, trailingComma: 'none' } },
    { files: '*.md', options: { printWidth: 80, proseWrap: 'always' } },
    { files: '*.yml', options: { tabWidth: 2, singleQuote: false } },
  ],
};
