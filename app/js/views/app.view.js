define([
		'entities/router',
		'entities/vent',
		'views/base.view',

		'views/home/home.view',
		'views/map/map.view'

	],
	function (router,
	          vent,
	          BaseView,
	          HomeView,
	          MapView) {

		return BaseView.extend({
			el: '#application',

			events: {
				'click a': 'redirect'
			},

			initialize: function () {
				router.route('', 'home', this.showHome.bind(this));
				router.route('map(/:list)', 'map', this.showMap.bind(this));

				// page flow events
				this.listenTo(vent, 'home:submitted', function () {
					this.navigate('map');
					this.showMap();
				});

				// util events
				this.listenTo(vent, 'app:navigate', this.navigate.bind(this));
			},

			showHome: function () {
				this.showView(new HomeView());
			},

			showMap: function (list) {
				this.showView(new MapView({
					list: list
				}));
			},

			currentView: null,

			showView: function (view) {
				if (this.currentView) {
					this.currentView.close();
				}

				this.currentView = view;

				this.$el.empty().append(view.render().el);
			},

			navigate: function (path) {
				router.navigate(path);
			},

			redirect: function (e) {
				if (e.isDefaultPrevented()) {
					return;
				}

				e.preventDefault();

				router.navigate(e.target.pathname, { trigger: true });
			}
		});
	});