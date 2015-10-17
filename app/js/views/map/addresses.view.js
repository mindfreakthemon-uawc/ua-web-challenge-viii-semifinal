define([
		'entities/vent',
		'views/base.view',
		'tmpls'

	],
	function (vent, BaseView, tmpls) {

		return BaseView.extend({
			template: tmpls.addresses,

			className: 'route-build-block',

			events: {
				'submit': 'submit',
				'click .fn-remove': 'removeAddress'
			},

			initialize: function (options) {
				this.addresses = options.addresses;

				this.listenTo(this.addresses, 'add remove reset', this.render);
			},

			render: function () {
				this.el.innerHTML = this.template({
					addresses: this.addresses
				});

				return this;
			},

			submit: function (e) {
				e.preventDefault();

				this.addresses.add({
					id: Math.floor(Math.random() * 1000),
					street: 'asdasdas',
					number: 42
				});

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