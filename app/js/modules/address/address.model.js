define([
		'backbone'

	],
	function (Backbone) {

		return Backbone.Model.extend({
			defaults: {
				street: '<street name>',
				number: '<number>'
			},

			format: function () {
				return this.get('street') + ', ' + this.get('number');
			}
		}, {
			formatRaw: function (data) {
				return data.street + ', ' + data.number
			}
		});
	});