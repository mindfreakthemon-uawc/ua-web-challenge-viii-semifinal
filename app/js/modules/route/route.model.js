define([
		'backbone'

	],
	function (Backbone) {

		return Backbone.Model.extend({

			defaults: {
				display: true,
				displayAccidents: true,
				displayDetailed: false,

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

				accidentsCoordinates: [{
					lat: '<number>',
					lng: '<number>'
				}],

				routeCoordinates: [{
					lat: '<number>',
					lng: '<number>'
				}]
			}
		});
	});