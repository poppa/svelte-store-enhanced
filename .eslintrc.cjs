module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte'],
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],

  rules: {
    'no-unused-vars': 'off',
    curly: 'error',
    yoda: 'error',
    'default-case': 'error',
    camelcase: 'off',
    eqeqeq: ['error', 'always'],
    'no-case-declarations': 'error',
    'no-new-wrappers': 'error',
    'no-return-await': 'error',
    'no-self-compare': 'error',
    'no-useless-call': 'error',
    'require-atomic-updates': 'error',
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'no-irregular-whitespace': 'error',
    'max-len': [
      'error',
      {
        code: 80,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],

    // ---------
    // no-shadow
    // ---------
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],

    // --------------------
    // no-use-before-define
    // --------------------
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],

    // -----------------------------
    // explicit-member-accessibility
    // -----------------------------
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { ignoredMethodNames: ['constructor'] },
    ],

    // --------------------------------------------------
    // Conflicts with explicit-function-return-type below
    // --------------------------------------------------
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // -----------------------------
    // explicit-function-return-type
    // -----------------------------
    '@typescript-eslint/explicit-function-return-type': ['error'],

    // --------------
    // no-unused-vars
    // --------------
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],

    // ----------
    // array-type
    // ----------
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],

    // -----------------
    // no-empty-function
    // -----------------
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: [
          'private-constructors',
          'protected-constructors',
          'decoratedFunctions',
        ],
      },
    ],
  },
}
