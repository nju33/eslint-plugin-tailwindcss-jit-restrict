const rulesDirPlugin = require('eslint-plugin-rulesdir')
rulesDirPlugin.RULES_DIR = './src/rules'

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  plugins: ['simple-import-sort', 'tsdoc', 'react-hooks', 'rulesdir'],
  rules: {
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': [
      'error',
      { groups: [['^\\u0000', '^@?\\w', '^[^.]', '^\\.']] }
    ]
  },
  parser: '@typescript-eslint/parser',
  parserOptions: { project: './tsconfig.json' },
  extends: ['standard-with-typescript', 'standard-react', 'prettier'],
  overrides: [
    { files: ['*.ts', '*.tsx'], rules: { 'tsdoc/syntax': 'warn' } },
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: { 'react/prop-types': 'off' }
    },
    {
      files: ['src/fixtures/**/*.ts', 'src/fixtures/**/*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'react/react-in-jsx-scope': 'off',
        'rulesdir/restrict': 'off'
      }
    }
  ],
  env: { jest: true, browser: true, node: true },
  settings: {
    'tailwindcss-jit-restrict': {
      whiteList: ['w-\\[@(762|766)px\\]', 'h-*']
    }
  }
}
