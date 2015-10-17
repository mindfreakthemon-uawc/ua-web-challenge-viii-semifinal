define([
		'entities/vent',
		'views/base.view',
		'tmpls',

		'modules/address/addresses.collection'

	],
	function (
		vent,
		BaseView,
		tmpls,
		AddressesCollection
	) {

		return BaseView.extend({
			template: tmpls.home,

			className: 'main-page',

			events: {
				'submit': 'submit',
				'input': 'input'
			},

			initialize: function () {
				console.log('rendering home');
			},

			render: function () {
				this.el.innerHTML = this.template();

				return this;
			},


			_request: null,

			submit: function (e) {
				e.preventDefault();

				vent.trigger('home:submitted', { data: 'stuff' });
			},

			input: _.debounce(function (e) {
				if (this._request) {
					this._request.abort();
				}

				this.toggleSubmit(false);

				var addresses = new AddressesCollection();

				this._request = addresses.fetch({
					data: {
						query: e.target.value
					},
					dataType: 'jsonp'
				});

				this._request
					.done(this.toggleSubmit.bind(this, true))
					.fail(this.error.bind(this));
			}, 500),

			toggleSubmit: function (bool) {
				this.$('button')
					.prop('disabled', !bool)
					.toggleClass('disabled', bool);
			}


		});
	});