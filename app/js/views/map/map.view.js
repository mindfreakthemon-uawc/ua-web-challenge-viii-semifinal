define([
		'entities/vent',
		'views/base.view',
		'tmpls',

		'views/map/topBar.view',
		'views/map/addresses.view',
		'views/map/routes.view',

		'modules/address/addresses.collection',
		'modules/route/routes.collection'


	],
	function (vent, BaseView, tmpls, TopBarView, AddressesView, RoutesView, AddressesCollection, RoutesCollection) {

		return BaseView.extend({
			template: tmpls.map,

			className: 'map-page',

			events: {
				'click .fn-reset': '_reset'
			},

			initialize: function (options) {
				this.addresses = new AddressesCollection();
				this.routes = new RoutesCollection();

				this.topBarView = new TopBarView({
					addresses: this.addresses
				});

				this.addressesView = new AddressesView({
					addresses: this.addresses
				});

				this.routesView = new RoutesView({
					addresses: this.addresses,
					routes: this.routes
				});

				this.addChildView(this.topBarView);
				this.addChildView(this.addressesView);
				this.addChildView(this.routesView);

				// statically link topBar to header
				this.topBarView.render().$el.prependTo('header');

				this.listenTo(vent, 'map:address:add', this.addAddress);
				this.listenTo(this.addresses, 'add remove reset', this._change);


				if (options.list) {
					this.preloadAddresses(options.list.split(':'));

				}
			},

			render: function () {
				this.el.innerHTML = this.template({
					addresses: this.addresses
				});

				this.toggleSidebarVisibility();

				this.routesView.$el.prependTo(this.$('#sections'));
				this.addressesView.$el.prependTo(this.$('#sections'));

				return this;
			},

			toggleSidebarVisibility: function () {
				this.$('#left-sidebar').toggle(this.addresses.length > 0);
			},

			addAddress: function (address) {
				this.addresses.add(address);
			},

			preloadAddresses: function (array) {
				this.addresses.fetch({
					reset: true,
					data: {
						id: array
					}
				});
			},

			/* events */

			_change: function () {
				this.toggleSidebarVisibility();

				vent.trigger('app:navigate',
					this.addresses.models.length
						? 'map/' + _.pluck(this.addresses.models, 'id').join(':')
						: 'map');
			},

			_reset: function (e) {
				e.preventDefault();

				this.addresses.reset();
			}
		});
	});