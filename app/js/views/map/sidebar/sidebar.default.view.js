define([
		'entities/vent',
		'views/base.view',
		'tmpls',

		'views/map/sidebar/addresses.view',
		'views/map/sidebar/routes.view'


	],
	function (vent, BaseView, tmpls, AddressesView, RoutesView) {

		return BaseView.extend({
			template: tmpls.sidebarDefault,

			className: 'left-sidebar__inner',
			id: 'sections',

			initialize: function (options) {
				this.addresses = options.addresses;
				this.routes = options.routes;

				this.addressesView = new AddressesView({
					addresses: this.addresses
				});

				this.routesView = new RoutesView({
					addresses: this.addresses,
					routes: this.routes
				});

				this.addChildView(this.addressesView);
				this.addChildView(this.routesView);
			},

			render: function () {
				this.el.innerHTML = this.template();

				this.routesView.$el.prependTo(this.$el);
				this.addressesView.$el.prependTo(this.$el);

				return this;
			}
		});
	});