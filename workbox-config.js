module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{css,ico,svg,png,html,js,json}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};