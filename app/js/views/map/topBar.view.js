define([
		'entities/vent',
		'views/base.view',
		'tmpls'

	],
	function (vent, BaseView, tmpls) {

		return BaseView.extend({
			template: tmpls.topBar,

			className: 'map-header-sidebar',

			events: {
				'submit': '_submit',
				'click .fn-hide-detailed': '_hideDetailed'
			},

			initialize: function (options) {
				this.addresses = options.addresses;
				this.routes = options.routes;

				this.listenTo(this.addresses, 'add remove reset', this.render);
				this.listenTo(this.routes, 'change:displayDetailed', this.render);
			},

			render: function () {
				this.detachAllWidgets();

				this.el.innerHTML = this.template({
					detailed: this.routes.findWhere({ displayDetailed: true }),
					addresses: this.addresses,
					routes: this.routes
				});

				this.attachWidget(
					this.$(':text')
						.suggestAddress({
							select: this._onSelect.bind(this)
						})
						.data('custom-suggestAddress')
				);

				return this;
			},

			/* events */

			_onSelect: function (e, ui) {
				var $target = $(e.target);

				$target.val('');

				vent.trigger('map:address:add', ui.item);
			},

			_hideDetailed: function (e) {
				e.preventDefault();

				var route = this.routes.findWhere({ displayDetailed: true });

				route.set('displayDetailed', false);
			},

			_submit: function (e) {
				e.preventDefault();
			}
		});
	});