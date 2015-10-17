define([
		'jquery',
		'modules/base/base.collection',
		'modules/address/address.model'

	],
	function ($, BaseCollection, Address) {

		var AddressesCollection = BaseCollection.extend({
			model: Address,

			url: 'http://localhost:8001/api/addresses'
		}, {
			suggest: function (request, response) {
				$.ajax({
					url: AddressesCollection.prototype.url,
					dataType: 'jsonp',
					data: request,
					success: function (data) {
						response(data.data);
					}
				});
			}
		});

		return AddressesCollection;
	});