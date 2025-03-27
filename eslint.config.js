// @ts-check

import eslint from '@eslint/js'
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
	{ ignores: ['.git', 'node_modules', 'dist', 'eslint.config.js', '.storybook'] },
	eslint.configs.recommended,
	eslintConfigPrettier,
	reactRecommended,
	reactJsxRuntime,
	{
		languageOptions: {
			parserOptions: {
				project: true,
			},
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'sort-imports': ['error'],
		},
	},
];
