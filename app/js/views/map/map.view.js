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

			events: {
				'click .fn-reset': 'reset'
			},

			initialize: function () {
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

				// statically link topBar against header
				this.topBarView.render().$el.prependTo('header');

				this.listenTo(vent, 'map:address:add', this.addAddress);
				this.listenTo(this.addresses, 'add remove reset', this.toggleSidebarVisibility.bind(this));
			},

			render: function () {
				this.el.innerHTML = this.template({
					addresses: this.addresses
				});

				this.toggleSidebarVisibility();

				this.addressesView.$el.appendTo(this.$('#destinations'));
				this.routesView.$el.appendTo(this.$('#routes'));

				return this;
			},

			toggleSidebarVisibility: function () {
				this.$('#left-sidebar').toggle(this.addresses.length > 0);
			},

			addAddress: function (address) {
				this.addresses.add(address);
			},

			reset: function (e) {
				e.preventDefault();

				this.addresses.reset();
			}
		});
	});