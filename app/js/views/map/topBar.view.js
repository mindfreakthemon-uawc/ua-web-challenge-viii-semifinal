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
				'submit': 'submit'
			},

			initialize: function (options) {
				this.addresses = options.addresses;

				this.listenTo(this.addresses, 'add remove reset', this.render);
			},

			render: function () {
				this.el.innerHTML = this.template({
					sidebarСondition: this.addresses.length ? 'default' : 'first'
				});

				this.$(':text')
					.suggestAddress({
						select: this.onSelect.bind(this)
					});

				return this;
			},

			onSelect: function (e, ui) {
				var $target = $(e.target);

				$target.val('');

				vent.trigger('map:address:add', ui.item);
			},

			submit: function (e) {
				e.preventDefault();
			}
		});
	});