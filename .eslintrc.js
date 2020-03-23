module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['jest', 'react', 'react-hooks'],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'consistent-this': ['error', 'self'],
    semi: ['error', 'never'],
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/sort-prop-types': 'error',
    'react/forbid-prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'max-len': [
      'error',
      100,
      2,
      {
        ignoreUrls: true,
      },
    ],
    'import/no-extraneous-dependencies': 0,
  },
}
