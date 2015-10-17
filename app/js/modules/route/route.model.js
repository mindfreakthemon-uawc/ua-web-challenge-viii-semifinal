define([
		'backbone'

	],
	function (Backbone) {

		return Backbone.Model.extend({

			defaults: {
				display: true,
				displayAccidents: true,

				keyStreet: '<string>',
				distance: '<number in meters>',
				timeSpan: '<number in seconds>',

				accidentsCount: '<number>',
				victimsCount: '<number>',
				deathsCount: '<number>',

				safetyLevel: '<enum of green,yellow,red>',

				navigation: [{
					type: '<enum of left, right, uturn, forward>',
					distance: '<number>',
					comment: '<string>'
				}],

				accidentPoints: [{
					latitude: '<number>',
					longitude: '<number>'
				}],

				routePoints: [{
					latitude: '<number>',
					longitude: '<number>'
				}]
			}
		});
	});