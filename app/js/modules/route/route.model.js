define([
		'backbone'

	],
	function (Backbone) {
		return Backbone.Model.extend({
			defaults: {
				keyAddress: '<instance of Address>',
				distance: '<number in meters>',
				timeSpan: '<number in seconds>',

				accidentsCount: '<number>',
				victimsCount: '<number>',
				deathsCount: '<number>',

				safetyLevel: '<enum of low,mid,high>'
			},

			initialize: function () {

			}
		});
	});