define([
		'backbone',
		'modules/route/route.model'

	],
	function (Backbone, Route) {

		return Backbone.Collection.extend({
			model: Route,

			url: '/api/routes',

			initialize: function () {

			}
		});
	});