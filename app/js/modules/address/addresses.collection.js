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