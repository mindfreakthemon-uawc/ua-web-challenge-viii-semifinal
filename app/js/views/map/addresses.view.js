define([
		'entities/vent',
		'views/base.view',
		'tmpls'

	],
	function (vent, BaseView, tmpls) {

		return BaseView.extend({
			template: tmpls.addresses,

			className: 'left-sidebar__block',
			tagName: 'section',

			events: {
				'submit': 'submit',
				'click .fn-remove': 'removeAddress'
			},

			initialize: function (options) {
				this.addresses = options.addresses;

				this.listenTo(this.addresses, 'add remove reset', this.render);
			},

			render: function () {
				this.detachAllWidgets();

				this.el.innerHTML = this.template({
					addresses: this.addresses
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

				this.$(':text').focus();
			},

			removeAddress: function (e) {
				e.preventDefault();

				var $target = $(e.target),
					id = $target.closest('.fn-remove').data('id');

				this.addresses.remove([id]);
			}
		});
	});