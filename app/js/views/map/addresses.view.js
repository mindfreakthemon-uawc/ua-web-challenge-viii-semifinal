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
				'submit': '_submit',
				'click .fn-remove': '_removeAddress'
			},

			initialize: function (options) {
				this.addresses = options.addresses;

				this.listenTo(this.addresses, 'add remove sort reset', this.render);
			},

			render: function () {
				this.detachAllWidgets();

				this.el.innerHTML = this.template({
					addresses: this.addresses
				});

				this.attachWidget(
					this.$(':text')
						.suggestAddress({
							select: this._onSelect.bind(this)
						})
						.data('custom-suggestAddress')
				);

				this.attachWidget(
					this.$('#addresses')
						.sortable({
							handle: '.fn-handle',
							update: this._onUpdate.bind(this)
						})
						.data('ui-sortable')
				);

				return this;
			},

			/* events */

			_onSelect: function (e, ui) {
				var $target = $(e.target);

				$target.val('');

				vent.trigger('map:address:add', ui.item);
			},

			_onUpdate: function (e, ui) {
				var array = this.$('#addresses li')
					.map(function () {
						return $(this).data('id');
					})
					.get();

				this.addresses.comparator = function (a, b) {
					return array.indexOf(a.id) - array.indexOf(b.id);
				};

				this.addresses.sort();

				delete this.addresses.comparator;
			},

			_submit: function (e) {
				e.preventDefault();

				this.$(':text').focus();
			},

			_removeAddress: function (e) {
				e.preventDefault();

				var $target = $(e.target),
					id = $target.closest('.fn-remove').data('id');

				this.addresses.remove([id]);
			}
		});
	});