import path from 'path';
import fs from 'fs-extra';
import process from 'process';
const globalComponents = [
	'LButton',
	// 'LAside',
	'LDialog',
	'LFooter',
	'LForm',
	'LFormItem',
	'LIcon',
	'LInput',
	'LList',
	'LLoading',
	'LMasker',
	// 'LNavbar',
	// 'LSidebar',
	'LSkeleton',
	'LScroll',
	'LLink',
	'LRadio',
	'LRadioGroup',
	'LCheckbox',
	'LCheckboxGroup',
	'LInputNumber',
];
const ROOT = process.cwd();

const excludeComponents = [];

function exist(path) {
	return fs.existsSync(path);
}

function parseComponentsDeclaration(code) {
	if (!code) {
		return {};
	}
	return Object.fromEntries(
		Array.from(code.matchAll(/(?<!\/\/)\s+\s+['"]?(.+?)['"]?:\s(.+?)\n/g)).map(i => [i[1], i[2]])
	);
}

async function generateComponentsType() {
	const components = {};
	globalComponents.forEach(key => {
		const entry = `typeof import('need-ui')['${key}']`;
		if (!excludeComponents.includes(key)) {
			components[key] = entry;
		}
	});
	const originalContent = exist(path.resolve(ROOT, 'component.d.ts'))
		? await fs.readFile(path.resolve(ROOT, 'component.d.ts'), 'utf-8')
		: '';

	const originImports = parseComponentsDeclaration(originalContent);
	const lines = Object.entries({
		...originImports,
		...components,
	})
		.filter(([name]) => {
			return components[name];
		})
		.map(([name, v]) => {
			if (!/^\w+$/.test(name)) {
				name = `'${name}'`;
			}
			return `${name}: ${v}`;
		});
	const code = `
// auto register component types
declare module 'vue' {
  export interface GlobalComponents {
    ${lines.join('\n    ')}
    [key: string]: any
  }
}
export {}
`;
	if (code !== originalContent) {
		await fs.writeFile(path.resolve(`${ROOT}/dist`, 'component.d.ts'), code, 'utf-8');
	}
}
generateComponentsType();
