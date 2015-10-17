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

			/**
			 * Receive raw address objects by some criteria set in @var{request}
			 * @static
			 * @param request - object that will be formatted as query string for the request
			 * @param callback - callback function, receives [rawAddress, rawAddress, ...]
			 */
			suggest: function (request, callback) {
				$.ajax({
					url: AddressesCollection.prototype.url,
					dataType: 'jsonp',
					data: request,
					success: function (data) {
						callback(data.data);
					}
				});
			}
		});

		return AddressesCollection;
	});