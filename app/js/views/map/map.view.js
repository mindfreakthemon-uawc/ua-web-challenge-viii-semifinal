define([
		'entities/vent',
		'views/base.view',
		'tmpls',

		'views/map/topBar.view',

		'modules/address/addresses.collection'

	],
	function (vent, BaseView, tmpls, TopBarView, AddressesCollection) {

		return BaseView.extend({
			template: tmpls.map,

			initialize: function () {
				this.routeDestinations = new AddressesCollection();

				this.topBarView = new TopBarView({
					routeDestinations: this.routeDestinations
				});

				this.addChildView(this.topBarView);
			},

			render: function () {
				this.el.innerHTML = this.template();

				this.topBarView.render().$el.prependTo('header');

				return this;
			}
		});
	});