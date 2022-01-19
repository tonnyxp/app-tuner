module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{js,ico,png,html,json,css}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};