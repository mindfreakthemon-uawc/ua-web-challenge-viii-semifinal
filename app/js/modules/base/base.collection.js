define([
		'backbone'

	],
	function (Backbone) {

		return Backbone.Collection.extend({
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