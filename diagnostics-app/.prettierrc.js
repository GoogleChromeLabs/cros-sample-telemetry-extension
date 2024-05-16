/**
 * Copyright 2023 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

const shared = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'preserve',
  bracketSpacing: false,
  trailingComma: 'all',
  arrowParens: 'always',
  embeddedLanguageFormatting: 'off',
  htmlWhitespaceSensitivity: 'strict',
};

const config = {
  plugins: ['prettier-plugin-organize-imports'],
  overrides: [
    {
      files: '*.ts',
      options: shared,
    },
    {
      files: '*.js',
      options: shared,
    },
    {
      files: '*.html',
      options: {
        printWidth: 100,
      },
    },
  ],
};

module.exports = config;
