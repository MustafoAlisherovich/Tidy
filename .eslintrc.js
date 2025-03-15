module.exports = {
	extends: [
		'next/core-web-vitals',
		'next',
		'plugin:@typescript-eslint/recommended',
	],
	plugins: ['@typescript-eslint'],
	rules: {
		'react/no-unescaped-entities': 'off',
	},
}
