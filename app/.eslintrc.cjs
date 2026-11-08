module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react/prop-types': 'off', // no PropTypes here; props are plain objects from content.js
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'camelcase': ['error', { properties: 'always' }],
    'quotes': ['error','single'],
    'semi': ['error', 'always'],
    'eqeqeq': ['error', 'always'],
    'indent': ['error', 2],
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'react/jsx-no-comment-textnodes': 'error'
  },
}
