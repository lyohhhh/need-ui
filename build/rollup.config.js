import { name } from '../package.json';
import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import commonjs from 'rollup-plugin-commonjs';
import tailwindcss from 'tailwindcss';

const overrides = {
	compilerOptions: { declaration: true },
	exclude: ['node_modules', 'vite.config.ts'],
};
const file = type => `dist/${name}.${type}.js`;

export { name, file };
export default {
	input: 'src/index.ts',
	output: {
		name,
		file: file('esm'),
		format: 'es',
		global: {
			vue: 'vue',
		},
	},
	plugins: [
		nodeResolve(),
		typescript({ tsconfigOverride: overrides, lib: ['es5', 'es6', 'dom'], target: 'es5' }),
		postcss({
			extensions: ['.css', '.scss'],
			extract: 'css/lui.css',
			plugins: [postcssImport(), tailwindcss()],
		}),
		babel({ babelHelpers: 'bundled', extensions: ['.ts', '.js', '.tsx'] }),
		commonjs({
			include: ['node_modules/**'],
		}),
	],
	external: ['vue'],
};
