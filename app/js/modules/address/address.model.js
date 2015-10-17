define([
		'backbone'

	],
	function (Backbone) {

		return Backbone.Model.extend({
			defaults: {
				street: '<street name>',
				number: '<number>'
			}
		}, {
			formatRaw: function (data) {
				return data.street + ', ' + data.number
			}
		});
	});