module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  arrowParens: 'always',
  endOfLine: 'auto',
  jsxSingleQuote: true,
  svelteSortOrder: 'options-scripts-markup-styles',
  svelteStrictMode: false,
  svelteAllowShorthand: true,
  plugins: ['prettier-plugin-svelte'],
  pluginSearchDirs: ['.'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
  svelteIndentScriptAndStyle: false,
}
