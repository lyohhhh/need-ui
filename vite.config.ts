import { defineConfig, type UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), vueJsx()],

	base: './',
	resolve: {
		alias: {
			'@': resolve('./packages'),
		},
		extensions: ['.js', '.tsx', '.vue', '.json', '.ts'],
	},
	esbuild: {
		jsxFactory: 'h',
		jsxFragment: 'Fragment',
		jsxInject: "import { h } from 'vue';",
	},
	server: {
		open: true,
		host: true,
		port: 3008,
		hmr: true,
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@import "./src/styles/mixins.scss";@import "./src/styles/index.scss";',
			},
		},
	},
	test: {
		include: ['**/*.spec.{ts,tsx}'],
		exclude: ['**/node_modules/**', '**/dist/**'],
		environment: 'jsdom',
		globals: true,
		transformMode: {
			web: [/.[tj]sx$/],
		},
	},
} as UserConfig);
