define([
		'backbone'

	],
	function (Backbone) {
		return Backbone.Model.extend({
			defaults: {
				street: '<street name>',
				number: '<number>'
			},

			initialize: function () {

			}
		}, {
			formatRaw: function (data) {
				return data.street + ', ' + data.number
			}
		});
	});