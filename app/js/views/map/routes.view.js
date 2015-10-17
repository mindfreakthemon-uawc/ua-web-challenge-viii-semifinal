define([
		'underscore',
		'entities/vent',
		'views/base.view',
		'tmpls'
	],
	function (_, vent, BaseView, tmpls) {

		return BaseView.extend({
			template: tmpls.routes,

			className: 'left-sidebar__block',
			tagName: 'section',

			events: {
				'change .fn-display-flag': '_toggleRoute',
				'click .fn-display-accidents-flag': '_toggleAccidents'
			},

			initialize: function (options) {
				this.addresses = options.addresses;
				this.routes = options.routes;

				this.listenTo(this.addresses, 'add remove sort reset', this.recalculate);
				this.listenTo(this.routes, 'add remove reset change:displayAccidents', this.render);
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
						addressId: _.pluck(this.addresses.models, 'id')
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

			_toggleAccidents: function (e) {
				var $target = $(e.target),
					index = $target.data('index'),
					item = this.routes.at(index);

				item.set('displayAccidents', !item.get('displayAccidents'));
			}
		});
	});