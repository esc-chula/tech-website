/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
import vercelPrettierOptions from '@vercel/style-guide/prettier';

const config = {
  ...vercelPrettierOptions,
  trailingComma: 'es5',
  semi: false,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'auto',
  printWidth: 80,
  singleQuote: true,
  jsxSingleQuote: true,
  proseWrap: 'preserve',
  arrowParens: 'always',
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    ...vercelPrettierOptions.plugins,
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  overrides: [
    {
      files: '*.json',
      options: {
        singleQuote: false,
      },
    },
    {
      files: '.*rc',
      options: {
        singleQuote: false,
        parser: 'json',
      },
    },
  ],
};

export default config;
