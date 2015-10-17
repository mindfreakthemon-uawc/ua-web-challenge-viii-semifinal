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
				router.route('map', 'map', this.showMap.bind(this));

				this.listenTo(vent, 'home:submitted', this.showMap.bind(this));
			},

			showHome: function () {
				router.navigate('');

				this.showView(new HomeView());
			},

			showMap: function () {
				router.navigate('map');

				this.showView(new MapView());
			},

			currentView: null,

			showView: function (view) {
				if (this.currentView) {
					this.currentView.close();
				}

				this.currentView = view;

				this.$el.empty().append(view.render().el);
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