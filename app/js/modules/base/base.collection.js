define([
		'backbone'

	],
	function (Backbone) {

		/**
		 * Base collection is used to generalize fetching behaviour
		 * of addresses and routes
		 */
		return Backbone.Collection.extend({
			parse: function (response) {
				return response.data;
			},

			fetch: function (options) {
				options = options || {};

				options.dataType = 'jsonp';

				// this event trigger exists here
				// so that we could create loading
				// spinners
				this.trigger('fetch');

				return Backbone.Collection.prototype.fetch.apply(this, arguments);
			}
		});
	});