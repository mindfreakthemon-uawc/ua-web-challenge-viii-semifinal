define([
		'underscore',
		'entities/vent',
		'views/base.view',
		'tmpls'
	],
	function (_, vent, BaseView, tmpls) {

		return BaseView.extend({
			template: tmpls.canvas,

			className: 'map-wrap',

			events: {
			},

			initialize: function (options) {
				this.addresses = options.addresses;
				this.routes = options.routes;



			},

			render: function () {
				this.el.innerHTML = this.template();

				this.map = new google.maps.Map(this.$('#map')[0], {
					center: new google.maps.LatLng(44.5403, -78.5463),
					zoom: 8,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				});


				return this;
			}
		});
	});