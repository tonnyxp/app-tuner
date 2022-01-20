module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{css,ico,ttf,svg,png,html,js,json,md}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};