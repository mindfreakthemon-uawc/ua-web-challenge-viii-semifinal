define([
		'entities/vent',
		'views/base.view',
		'tmpls',

		'views/map/topBar.view',
		'views/map/sidebar/sidebar.default.view',
		'views/map/sidebar/sidebar.detailed.view',
		'views/map/canvas.view',

		'modules/address/addresses.collection',
		'modules/route/routes.collection'
	],
	function (vent, BaseView, tmpls, TopBarView, SidebarDefaultView, SidebarDetailedView, CanvasView, AddressesCollection, RoutesCollection) {

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
					addresses: this.addresses,
					routes: this.routes
				});

				this.canvasView = new CanvasView({
					addresses: this.addresses,
					routes: this.routes
				});

				this.addChildView(this.topBarView);
				this.addChildView(this.canvasView);

				this.listenTo(this.routes, 'change:displayDetailed', this._setupSidebar);
				this.listenTo(this.addresses, 'add remove sort reset', this._change);

				if (options.list) {
					this._preloadAddresses(options.list);
				}
			},

			render: function () {
				this.el.innerHTML = this.template();

				this.topBarView.render().$el.prependTo('header');
				this.canvasView.render().$el.appendTo(this.$el);

				this._setupSidebar();
				this._toggleSidebarVisibility();

				return this;
			},

			/* private */

			_toggleSidebarVisibility: function () {
				this.$('#left-sidebar').toggle(this.addresses.length > 0);
			},

			_setupSidebar: function () {
				if (this.sidebarView) {
					this.closeChildView(this.sidebarView);
				}

				var detailed = this.routes.findWhere({ displayDetailed: true });

				if (detailed) {
					this.sidebarView = new SidebarDetailedView({
						detailed: detailed
					});
				} else {
					this.sidebarView = new SidebarDefaultView({
						addresses: this.addresses,
						routes: this.routes
					});
				}

				this.addChildView(this.sidebarView);

				this.sidebarView.renderAll().$el.appendTo(this.$('#left-sidebar'));
			},

			_preloadAddresses: function (list) {
				var array = list.split(':');

				this.addresses.fetch({
					reset: true,
					data: {
						id: array
					}
				});
			},

			/* events */

			_change: function () {
				this._toggleSidebarVisibility();

				vent.trigger('app:navigate',
					this.addresses.models.length
						? 'map/' + this.addresses.pluck('id').join(':')
						: 'map');
			},

			_reset: function (e) {
				e.preventDefault();

				this.addresses.reset();
			}
		});
	});