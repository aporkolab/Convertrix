import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginPrettier from 'eslint-plugin-prettier/recommended';

export default [
  {
    ignores: [
      'karma.conf.js',
      'src/assets/js/scribbler.js',
      'dist/**',
      '.angular/**',
      'vendor/**',
    ],
  },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  pluginPrettier,
];
