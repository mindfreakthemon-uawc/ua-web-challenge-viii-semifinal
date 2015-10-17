define([
		'entities/vent',
		'views/base.view',
		'tmpls'
	],
	function (vent, BaseView, tmpls) {

		return BaseView.extend({
			template: tmpls.routes,

			className: 'left-sidebar__block',
			tagName: 'section',

			events: {
				'change .fn-display-flag': '_toggleRoute',
				'click .fn-display-accidents-flag': '_toggleAccidents',
				'click .fn-display-detailed': '_toggleDetailed'
			},

			initialize: function (options) {
				this.addresses = options.addresses;
				this.routes = options.routes;

				this.listenTo(this.addresses, 'add remove sort reset', this.recalculate);
				this.listenTo(this.routes, 'add remove reset change:displayAccidents', this.render);
				this.listenTo(this.addresses, 'fetch', this.showLoading);
				this.listenTo(this.routes, 'fetch', this.showLoading);
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

				this.routes.fetch({
					reset: true,
					data: {
						addressId: this.addresses.pluck('id')
					}
				})
			},

			/* events */

			_toggleRoute: function (e) {
				var $target = $(e.target),
					index = $target.data('index'),
					item = this.routes.at(index);

				item.set('display', $target.is(':checked'));
			},

			_toggleDetailed: function (e) {
				var $target = $(e.target),
					index = $target.data('index'),
					item = this.routes.at(index);

				item.set('displayDetailed', true);
			},

			_toggleAccidents: function (e) {
				var $target = $(e.target),
					index = $target.data('index'),
					item = this.routes.at(index);

				item.set('displayAccidents', !item.get('displayAccidents'));
			}
		});
	});