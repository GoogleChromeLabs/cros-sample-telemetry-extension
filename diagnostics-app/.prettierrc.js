

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
