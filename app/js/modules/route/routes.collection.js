define([
		'backbone',
		'modules/route/route.model'

	],
	function (Backbone, Route) {

		return Backbone.Collection.extend({
			model: Route,

			url: 'http://localhost:8001/api/routes',

			parse: function (response) {
				return response.data;
			},

			fetch: function (options) {
				options = options || {};

				options.dataType = 'jsonp';

				this.trigger('fetch');

				return Backbone.Collection.prototype.fetch.apply(this, arguments);
			}
		});
	});