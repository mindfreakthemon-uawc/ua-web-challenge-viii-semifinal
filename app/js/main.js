require({
	baseUrl: '/js',
	paths: {
		jquery: '../lib/jquery/dist/jquery.min',
		underscore: '../lib/underscore/underscore-min',
		'perfect.scrollbar': '../lib/perfect-scrollbar/js/perfect-scrollbar',
		backbone: '../lib/backbone/backbone',
		bootstrap: '../lib/bootstrap/dist/js/bootstrap.min',
		jade: '../lib/jade/runtime',
		templates: '../templates'
	},
	shim: {
		bootstrap: { deps: ['jquery'] }
	}
}, [
	'backbone',

	'perfect.scrollbar'
], function (Backbone) {

});