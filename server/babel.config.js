module.exports = {
	ignore: [],
	presets: [
		['@babel/preset-env', { targets: { node: true } }],
	],
	plugins: [
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-object-rest-spread',
		'@babel/plugin-proposal-optional-chaining',
		'@babel/plugin-proposal-nullish-coalescing-operator',
	],
	env: {
		debug: {
			sourceMaps: 'inline',
			retainLines: true,
		},
	},
};
