define([
		'jquery',
		'backbone',
		'modules/address/address.model'

	],
	function ($, Backbone, Address) {

		var AddressesCollection = Backbone.Collection.extend({
			model: Address,

			url: 'http://localhost:8001/api/addresses',

			parse: function (response) {
				return response.data;
			},

			fetch: function (options) {
				options = options || {};

				options.dataType = 'jsonp';

				return Backbone.Collection.prototype.fetch.apply(this, arguments);
			}
		}, {
			suggest: function (request, response) {
				$.ajax({
					url: AddressesCollection.prototype.url,
					dataType: 'jsonp',
					data: {
						contains: request.term
					},
					success: function (data) {
						response(data.data);
					}
				});
			}
		});

		return AddressesCollection;
	});