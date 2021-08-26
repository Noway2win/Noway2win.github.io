module.exports = {
	env: {
		browser: true,
		es2020: true,
	},
	extends: ["airbnb", "prettier"],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["prettier"],
	rules: {
		"import/no-extraneous-dependencies": ["error", { devDependencies: true }],
		"react/prefer-stateless-function": [0],
		"max-classes-per-file": ['off']
	}
};
