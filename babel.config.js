module.exports = {
	presets: [
		['@babel/preset-env', { targets: { browsers: ['ie >= 8'], node: 'current' } }],
		'@babel/preset-typescript',
	],
	plugins: [['@vue/babel-plugin-jsx']],
};
