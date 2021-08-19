module.exports = {
	env: {
		browser: true,
		es2020: true,
	},
	extends: ['airbnb-base', 'prettier'],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': ['error'],
		'no-param-reassign': 0,
		'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
	},
};
