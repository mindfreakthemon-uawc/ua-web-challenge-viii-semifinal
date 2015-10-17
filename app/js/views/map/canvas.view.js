define([
		'underscore',
		'entities/vent',
		'views/base.view',
		'tmpls'
	],
	function (_, vent, BaseView, tmpls) {

		return BaseView.extend({
			template: tmpls.canvas,

			className: 'map-wrap',

			events: {},

			initialize: function (options) {
				this.addresses = options.addresses;
				this.routes = options.routes;

				this.paths = [];

				this.listenTo(this.routes, 'add remove reset', this._redraw);
				this.listenTo(this.routes, 'change:display change:displayAccidents', this._toggle);
			},

			render: function () {
				this.el.innerHTML = this.template();

				this.map = new google.maps.Map(this.$('#map')[0], {
					center: new google.maps.LatLng(50.4390949, 30.524734),
					zoom: 8,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				});


				return this;
			},

			/* private */

			_cleanAll: function () {
				this.paths.forEach(function (item) {
					item.path.setMap(null);

					item.markers.forEach(function (marker) {
						marker.setMap(null);
					});
				});

				this.path = [];
			},

			/* events */

			_redraw: function () {
				this._cleanAll();

				var boundBox = new google.maps.LatLngBounds();

				this.routes.forEach(function (route) {
					var markers = [],
						accidentsCoordinates = route.get('accidentsCoordinates'),
						routeCoordinates = route.get('routeCoordinates'),
						path = new google.maps.Polyline({
							path: routeCoordinates,
							geodesic: true,
							strokeColor: route.get('safetyLevel'),
							strokeOpacity: 1.0,
							strokeWeight: 2
						});

					routeCoordinates.forEach(function (routeCoordinate) {
						boundBox.extend(new google.maps.LatLng(routeCoordinate.lat, routeCoordinate.lng));
					});

					path.setMap(this.map);

					if (accidentsCoordinates.length) {
						accidentsCoordinates.forEach(function (accidentCoordinate) {
							var marker = new google.maps.Marker({
								position: accidentCoordinate,
								icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png'
							});

							marker.setMap(this.map);

							boundBox.extend(new google.maps.LatLng(accidentCoordinate.lat, accidentCoordinate.lng));

							markers.push(marker);
						}, this);
					}

					this.paths.push({
						route: route,
						path: path,
						markers: markers
					})
				}, this);

				if (this.routes.length) {
					this.map.setCenter(boundBox.getCenter());
				}
			},

			_toggle: function () {
				this.paths.forEach(function (item) {
					item.path.setVisible(item.route.get('display'));

					item.markers.forEach(function (marker) {
						marker.setVisible(item.route.get('displayAccidents'));
					});
				});
			}
		});
	});