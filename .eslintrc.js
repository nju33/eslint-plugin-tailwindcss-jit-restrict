/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  plugins: ['simple-import-sort', 'tsdoc', 'react-hooks', 'testing-library'],
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
    }
  ],
  env: { jest: true, browser: true, node: true }
}
