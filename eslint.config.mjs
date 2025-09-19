import antfu from '@antfu/eslint-config';
import wrap from '@seahax/eslint-plugin-wrap';
import pluginImport from 'eslint-plugin-import';

export default antfu({
  react: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true,
    trailingComma: 'all',
    arrowParens: 'always',
    overrides: {
      'style/max-len': [
        'warn',
        {
          code: 100,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreComments: true,
        },
      ],
    },
    // more specific stylistic customizations are added in the global rules section below
  },
  unicorn: {
    allRecommended: true,
  },
  plugins: {
    'plugin-import': pluginImport,
  },
  rules: {
    /**
     * style rule customizations
     */
    'style/arrow-parens': ['error', 'always'],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'style/quote-props': 'off',
    'perfectionist/sort-imports': 'off',
    'perfectionist/sort-named-imports': 'off',
    /**
     * unicorn rule customizations
     */
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/no-null': 'off',
    // ignore react hook-based filenames, LICENSE, and README
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        ignore: [
          // This regex matches files that start with 'use' followed by an uppercase letter
          // and then any sequence of characters, ending with '.ts'. Useful for React hooks.
          String.raw`^use[A-Z].*\.ts$`,
          'LICENSE',
          'README',
          'CHANGELOG',
          'AGENTS',
        ],
      },
    ],
    /**
     * React rule customizations
     */
    'react/no-leaked-conditional-rendering': 'off',
    /**
     * jsonc rule customizations
     */
    'jsonc/sort-keys': 'off',
    /**
     * import rule customizations
     */
    'plugin-import/order': [
      'warn',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          'type',
          'parent',
          'sibling',
          'index',
          'object',
        ],
        'pathGroups': [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react-dom',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react-**',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@*/**',
            group: 'external',
            position: 'before',
          },
        ],
        'pathGroupsExcludedImportTypes': ['react', 'react-dom', 'react-**'],
        'newlines-between': 'ignore',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'unused-imports/no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: 'res|next|^err|^_',
        varsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    /**
     * node rule customizations
     */
    'node/prefer-global/process': 'off',
    /**
     * javascript rule customizations
     */
    'no-console': 'off',
    'no-unused-vars': 'off',
    /**
     * Antfu rule customizations
     */
    'antfu/no-top-level-await': 'off',
    /**
     * other rule customizations
     */
    'react-refresh/only-export-components': 'off',
  },

  /**
   * TypeScript rule customizations
   * Note: Typescript overrides must be put here rather than in the global rules scope.
   * Reason unknown, but discussed here: https://github.com/antfu/eslint-config/issues/570
   */
  typescript: {
    tsconfigPath: 'tsconfig.eslint.json',
    overrides: {
      'ts/consistent-type-definitions': 'off',
      'ts/no-misused-promises': 'off',
    },
    // discussion that necessitated this workaround:
    // https://github.com/antfu/eslint-config/issues/570#issuecomment-2349192906
    overridesTypeAware: {
      'ts/no-unsafe-argument': 'off',
      'ts/no-unsafe-assignment': 'off',
      'ts/no-unsafe-call': 'off',
      'ts/no-unsafe-member-access': 'off',
      'ts/no-unsafe-return': 'off',
      'ts/strict-boolean-expressions': 'off',
      'ts/no-misused-promises': [
        'error',
        {
          'checksVoidReturn': false,
        },
      ],
    },
  },

  /**
   * eslint ignore settings
   */
  ignores: [
    // enable if you want to ignore the default shadcn component directory
    '**/components/ui/**',
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
},
/**
 * Wrap plugin configuration
 */
wrap.config({
  maxLen: 100, // keep in sync with @stylistic/max-len
  tabWidth: 2, // matches your TS default
  autoFix: true, // let `eslint --fix` rewrite long lines
}),
/**
 * File-specific rule overrides for markdown and YAML files
 */
{
  files: ['**/*.md', '**/*.yml', '**/*.yaml'],
  rules: {
    'style/max-len': 'off',
  },
});
