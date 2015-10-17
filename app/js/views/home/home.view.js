define([
		'jquery',
		'entities/vent',
		'views/base.view',
		'tmpls',

		'modules/address/address.model'

	],
	function ($, vent, BaseView, tmpls, Address) {

		return BaseView.extend({
			template: tmpls.home,

			className: 'main-page',

			events: {
				'submit': 'submit'
			},

			initialize: function () {
				this.values = {};
			},

			render: function () {
				this.el.innerHTML = this.template();

				this.$(':text')
					.suggestAddress({
						select: this.onSelect.bind(this)
					});

				return this;
			},

			submit: function (e) {
				e.preventDefault();

				vent.trigger('home:submitted');
				vent.trigger('map:address:add', this.values.source);
				vent.trigger('map:address:add', this.values.destination);
			},

			onSelect: function (e, ui) {
				var $target = $(e.target);

				$target.val(Address.formatRaw(ui.item));

				this.values[$target.data('type')] = ui.item;

				this.toggleSubmit();

				return false;
			},

			toggleSubmit: function () {
				var disabled = !(this.values.source && this.values.destination);

				this.$('button')
					.prop('disabled', disabled)
					.toggleClass('disabled', !disabled);
			}
		});
	});