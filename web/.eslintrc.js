module.exports = {
	parser: 'babel-eslint',

	root: true,
	env: {
		browser: true,
		es6: true,
		node: true,
		jest: true
	},
	settings: {
		react: { version: 'detect', },
	},
	plugins: ['react', 'babel', 'import'],
	extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:import/errors'],
	rules: {
		'array-element-newline': ['error', 'consistent'],
		'arrow-parens': ['error', 'as-needed'],
		'babel/no-invalid-this': 'error',
		'brace-style': ['error', 'stroustrup'],
		'comma-dangle': ['error', 'always-multiline'],
		'eol-last': ['error', 'always'],
		'global-require': ['error'],
		'import/no-unresolved': ['error', { ignore: ['^sharedJs/'] }],
		'indent': ['error', 'tab', { SwitchCase: 1 }],
		'new-parens': ['error'],
		'no-console': 'off',
		// 'no-invalid-this': ['error'],
		'no-multiple-empty-lines': ['error', { max: 3 }],
		'no-trailing-spaces': 'error',
		'no-unused-vars': ['error', { argsIgnorePattern: '^_dummy' }],
		'nonblock-statement-body-position': ['error', 'beside'],
		'one-var': ['error', 'never'],
		'quote-props': ['error', 'as-needed'],
		'react/no-unescaped-entities': ['warn'],
		'react/prop-types': 'off',
		// 'react/jsx-no-literals': ['error', { noStrings: true }],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		strict: ['error', 'global'],

		'no-unreachable': 'off', // С этим неплохо справляется сама студия. А линтер удаляет куски кода, если случайно скобку лишнюю напишет. Поэтому - нах
	},

};
