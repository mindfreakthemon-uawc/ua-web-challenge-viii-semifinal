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
				this.sidebarСondition = options.sidebarСondition;

				this.listenTo(this.addresses, 'add remove reset', this.render);
			},

			render: function () {
				this.detachAllWidgets();

				this.el.innerHTML = this.template({
					sidebarСondition: this.sidebarСondition ?
						this.sidebarСondition :
						(this.addresses.length ? 'default' : 'first')
				});

				this.attachWidget(
					this.$(':text')
						.suggestAddress({
							select: this.onSelect.bind(this)
						})
						.data('custom-suggestAddress')
				);

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