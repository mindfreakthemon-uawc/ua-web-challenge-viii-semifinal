define([
		'jquery',
		'underscore',
		'entities/vent',
		'views/base.view',
		'lib/contextMenu',
		'modules/address/addresses.collection',
		'tmpls'
	],
	function ($, _, vent, BaseView, ContextMenu, AddressesCollection, tmpls) {
		/**
		 * Caching of the map object is required due to memory leak of Google Maps API v3
		 */
		var map, contextMenu, $map = $('<div id="map" class="map" />');

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

				this.$('#map-wrapper').append($map);

				this._initMap();
				this._setupContextMenu();

				google.maps.event.addListener(contextMenu, 'menu_item_selected', this._onSelect.bind(this));

				return this;
			},

			close: function () {
				google.maps.event.clearListeners(contextMenu, 'menu_item_selected');

				this._cleanAll();

				BaseView.prototype.close.apply(this, arguments);
			},

			/* private */

			/**
			 * Cleaning all the markers and routes on the map
			 * @private
			 */
			_cleanAll: function () {
				this.paths.forEach(function (item) {
					item.path.setMap(null);

					item.markers.forEach(function (marker) {
						marker.setMap(null);
					});
				});

				this.path = [];
			},

			/**
			 * Initialize map object singleton
			 * @private
			 */
			_initMap: function () {
				if (map) {
					return;
				}

				map = new google.maps.Map($map[0], {
					center: new google.maps.LatLng(50.4390949, 30.524734),
					zoom: 8,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				});
			},

			/**
			 * Setting up context menu for right mouse click.
			 * @private
			 */
			_setupContextMenu: function () {
				if (contextMenu) {
					return;
				}

				contextMenu = new ContextMenu(map, {
					classNames: {
						menu: 'context_menu',
						menuSeparator: 'context_menu_separator'
					},
					menuItems: [
						{
							label: 'Маршрут звідси',
							className: 'menu_item',
							eventName: 'map:address:unshift'
						},
						{
							label: 'Маршрут сюди',
							className: 'menu_item',
							eventName: 'map:address:add'
						}
					],
					pixelOffset: new google.maps.Point(10, -5),
					zIndex: 5
				});

				google.maps.event.addListener(map, 'rightclick', function (mouseEvent) {
					contextMenu.show(mouseEvent.latLng);
				});
			},

			/* events */

			_onSelect: function (latLng, eventName) {
				AddressesCollection.suggest({
					lat: latLng.lat(),
					lng: latLng.lng()
				}, this._onSuggest.bind(this, eventName));
			},

			_onSuggest: function (eventName, data) {
				var address = data.shift();

				vent.trigger(eventName, address);
			},

			/**
			 * Big drawing method. @TODO split
			 * Draws all markers and paths
			 * @private
			 */
			_redraw: function () {
				this._cleanAll();

				var boundBox = new google.maps.LatLngBounds();

				this.routes.forEach(function (route) {
					var markers = [],
						accidents = route.get('accidents'),
						routeCoordinates = route.get('routeCoordinates'),
						path = new google.maps.Polyline({
							path: routeCoordinates,
							geodesic: true,
							strokeColor: this._safetyLevelToColor(route.get('safetyLevel')),
							strokeOpacity: .8,
							strokeWeight: 5
						});

					routeCoordinates.forEach(function (routeCoordinate) {
						boundBox.extend(new google.maps.LatLng(routeCoordinate.lat, routeCoordinate.lng));
					});

					path.setMap(map);

					if (accidents.length) {
						accidents.forEach(function (accident) {
							var marker = new google.maps.Marker({
								position: accident,
								icon: '/img/accident-marker.png',
								title: this._generateTitle(accident)
							});

							marker.setMap(map);

							boundBox.extend(new google.maps.LatLng(accident.lat, accident.lng));

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
					map.setCenter(boundBox.getCenter());
				}
			},

			/**
			 * Toggling all markers and paths according to display settings
			 * @private
			 */
			_toggle: function () {
				this.paths.forEach(function (item) {
					var display = item.route.get('display'),
						displayAccidents = item.route.get('displayAccidents');

					item.path.setVisible(display);

					item.markers.forEach(function (marker) {
						marker.setVisible(display && displayAccidents);
					});
				});
			},

			/* utils */

			/**
			 * Util for generating marker title
			 * @param accident
			 * @returns {string}
			 * @private
			 */
			_generateTitle: function (accident) {
				return 'За рік ' + accident.accidentsCount + ' аварій, ' +
					accident.victimsCount + ' постраждалих, ' + accident.deathsCount + ' загинуло';
			},

			/**
			 * Util for setting path's color
			 * @param safetyLevel
			 * @returns {*}
			 * @private
			 */
			_safetyLevelToColor: function (safetyLevel) {
				switch (safetyLevel) {
					case 'yellow':
						return '#e2aa00';
					case 'red':
						return '#dd335b';
					default:
						return '#4bc382';
				}
			}
		});
	});