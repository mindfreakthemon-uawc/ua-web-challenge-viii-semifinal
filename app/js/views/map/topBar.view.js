define([
		'views/base.view',
		'tmpls',

		'modules/address/addresses.collection'


	],
	function (BaseView, tmpls, AddressesCollection) {

		return BaseView.extend({
			template: tmpls.topBar,

			className: 'map-header-sidebar',

			events: {
				'submit': 'submit'
			},

			initialize: function (options) {
				this.routeDestinations = options.routeDestinations;
				this.suggester = new AddressesCollection();

				this.listenTo(options.routeDestinations, 'add remove change', this.render);
			},

			render: function () {
				this.el.innerHTML = this.template({
					sidebarCondition: this.routeDestinations.length ? 'default' : 'first'
				});

				return this;
			},

			submit: function (e) {
				e.preventDefault();

				alert('dont submit yet')
			}
		});
	});