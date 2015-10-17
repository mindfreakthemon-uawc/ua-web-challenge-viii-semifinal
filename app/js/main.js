require({
	baseUrl: '/js',
	paths: {
		jquery: '../lib/jquery/dist/jquery.min',
		underscore: '../lib/underscore/underscore-min',
		'perfect.scrollbar': '../lib/perfect-scrollbar/js/perfect-scrollbar',
		select2: '../lib/select2/dist/js/select2.full.min',
		backbone: '../lib/backbone/backbone',
		jade: '../lib/jade/runtime',
		templates: '../templates'
	},

	shim: {
		typeahead: {
			deps: ['jquery']
		}
	}
}, [
	'backbone',
	'views/app.view',

	// vendor plugins
	'perfect.scrollbar',
	'select2'
], function (Backbone, AppView) {
	new AppView();

	Backbone.history.start({
		//pushState: true
	});
});