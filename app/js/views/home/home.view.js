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
				'submit': '_submit'
			},

			initialize: function () {
				this.values = {};
			},

			render: function () {
				this.detachAllWidgets();

				this.el.innerHTML = this.template();

				this.attachWidget(
					this.$(':text')
						.suggestAddress({
							select: this._onSelect.bind(this),
							position: {
								// fix for main page only
								using: function (css, ui) {
									var isSource = ui.target.element.data('type') === 'source';

									if (isSource) {
										css.left += 50;
									}

									css.width = ui.element.width - 50;

									ui.element.element.css(css);
								}
							}
						})
						.data('custom-suggestAddress')
				);

				return this;
			},

			/* events */

			_submit: function (e) {
				e.preventDefault();

				vent.trigger('home:submitted');
				vent.trigger('map:address:add', this.values.source);
				vent.trigger('map:address:add', this.values.destination);
			},

			_onSelect: function (e, ui) {
				var $target = $(e.target);

				$target.val(Address.formatRaw(ui.item));

				// store selected address in the hash
				this.values[$target.data('type')] = ui.item;

				this._toggleSubmit();

				return false;
			},

			/**
			 * Toggles "Show Route" button
			 * @private
			 */
			_toggleSubmit: function () {
				var disabled = !(this.values.source && this.values.destination);

				this.$('button')
					.prop('disabled', disabled)
					.toggleClass('disabled', !disabled);
			}
		});
	});