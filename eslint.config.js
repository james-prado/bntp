import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
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
			globals: {
				Shopify: 'readonly',
				...globals.browser,
				...globals.webextensions,
			},
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'react/prop-types': ['off'],
		},
	},
]);
