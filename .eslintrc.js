module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    es6: true,
    'react-native/react-native': true,
  },
  settings: {
    'import/extensions': ['.ts'],
    react: {
      version: 'detect',
    },
    'import/ignore': ['node_modules'],
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  plugins: ['@typescript-eslint', 'import', 'filenames', 'prettier', 'react', 'react-native'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none', varsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': 0,
    'filenames/match-exported': [2, ['pascal', 'camel']],
    'import/newline-after-import': 2,
    'import/no-duplicates': 2,
    'import/order': [
      2,
      {
        'newlines-between': 'always',
        groups: ['external'],
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/named': 2,
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
  },
};
