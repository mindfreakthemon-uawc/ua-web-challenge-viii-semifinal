define([
		'backbone',
		'modules/address/address.model'

	],
	function (Backbone, Address) {

		return Backbone.Collection.extend({
			model: Address,

			url: 'http://localhost:8001/api/addresses',

			initialize: function () {

			}
		});
	});