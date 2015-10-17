require({
	baseUrl: '/js',
	paths: {
		jquery: '../lib/jquery/dist/jquery.min',
		underscore: '../lib/underscore/underscore-min',
		'perfect.scrollbar': '../lib/perfect-scrollbar/js/perfect-scrollbar',
		'jquery.ui': '../lib/jquery-ui/jquery-ui.min',
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
	'jquery.ui',

	// custom widgets
	'widgets/suggestAddress.widget'
], function (Backbone, AppView) {
	new AppView();

	Backbone.history.start({
		//pushState: true
	});
});