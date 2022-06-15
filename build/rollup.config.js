import { name } from '../package.json';
import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import commonjs from 'rollup-plugin-commonjs';
import tailwindcss from 'tailwindcss';
import { terser } from 'rollup-plugin-terser';

// typescript 配置
const overrides = {
	compilerOptions: { declaration: true }, // 是否生成 声明文件
	exclude: ['node_modules', 'vite.config.ts'],
};

// 文件名称
const file = type => `dist/${name}.${type}.js`;

export { name, file };
export default {
	// 入口文件
	input: 'src/index.ts',
	// 输出文件
	output: {
		name,
		file: file('esm'),
		format: 'es',
		global: {
			vue: 'vue',
		},
	},
	plugins: [
		// 读取依赖文件 不适用该插件文件的引入路径是完整的
		nodeResolve(),
		// 打包 ts 文件 生成声明文件
		typescript({ tsconfigOverride: overrides, lib: ['es5', 'es6', 'dom'], target: 'es5' }),
		// css 文件
		postcss({
			// 转换的文件拓展名
			extensions: ['.css', '.scss'],
			// 输出的文件
			extract: 'css/need-ui.css',
			// 插件 css 引入
			// tailwind
			plugins: [postcssImport(), tailwindcss()],
		}),
		// 使用 babel
		babel({
			babelHelpers: 'bundled',
			// 转换的文件拓展名
			extensions: ['.ts', '.js', '.tsx'],
		}),
		// 只压缩自己项目的代码
		commonjs({
			include: ['node_modules/**'],
		}),
		// 压缩代码
		terser(),
	],
	// 不打包 vue 代码 从用户的依赖中获取
	external: ['vue'],
};
