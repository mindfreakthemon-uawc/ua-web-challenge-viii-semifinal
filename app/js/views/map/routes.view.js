define([
		'entities/vent',
		'views/base.view',
		'tmpls'
	],
	function (vent, BaseView, tmpls) {

		return BaseView.extend({
			template: tmpls.routes,

			initialize: function (options) {
				this.addresses = options.addresses;
				this.routes = options.routes;

				this.listenTo(this.addresses, 'add remove reset', this.recalculate);
				this.listenTo(this.routes, 'add remove reset', this.render);
			},

			render: function () {
				this.el.innerHTML = this.template({
					addresses: this.addresses,
					routes: this.routes
				});

				return this;
			},

			recalculate: function () {
				if (this.addresses.length < 2) {
					this.routes.reset();
					return;
				}

				this.routes.reset([{
					id: Math.floor(1000 * Math.random()),
					keyStreet: 'asdasd',
					distance: 123123,
					timeSpan: 34353,

					accidentsCount: 2,
					victimsCount: 3,
					deathsCount: 245,

					safetyLevel: 'green'
				}, {
					id: Math.floor(1000 * Math.random()),
					keyStreet: 'asdasd',
					distance: 123123,
					timeSpan: 34353,

					accidentsCount: 2,
					victimsCount: 3,
					deathsCount: 245,

					safetyLevel: 'yellow'
				}, {
					id: Math.floor(1000 * Math.random()),
					keyStreet: 'asdasd',
					distance: 123123,
					timeSpan: 34353,

					accidentsCount: 2,
					victimsCount: 3,
					deathsCount: 245,

					safetyLevel: 'red'
				}])
			}
		});
	});