define([
		'backbone'

	],
	function (Backbone) {

		return Backbone.Model.extend({

			defaults: {
				// internal properties

				display: true,
				displayAccidents: true,
				displayDetailed: false,

				// suggested model properties

				keyStreet: '<string>',
				distance: '<number in meters>',
				timeSpan: '<number in seconds>',

				accidentsCount: '<number>',
				victimsCount: '<number>',
				deathsCount: '<number>',

				safetyLevel: '<enum of green,yellow,red>',

				navigation: [{
					type: '<enum of left,right,turn,forward>',
					distance: '<number>',
					comment: '<string>' // could be either street name or
				}],

				accidents: [{
					lat: '<number>',
					lng: '<number>',
					accidentsCount: '<number>',
					victimsCount: '<number>',
					deathsCount: '<number>',
				}],

				routeCoordinates: [{
					lat: '<number>',
					lng: '<number>'
				}]
			}
		});
	});