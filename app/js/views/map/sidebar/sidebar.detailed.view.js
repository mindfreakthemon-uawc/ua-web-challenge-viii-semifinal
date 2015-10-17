define([
		'entities/vent',
		'views/base.view',
		'tmpls'

	],
	function (vent, BaseView, tmpls) {

		return BaseView.extend({
			template: tmpls.sidebarDetailed,

			className: 'left-sidebar__inner',
			id: 'sections',

			initialize: function (options) {
				this.detailed = options.detailed;
				this.addresses = options.addresses;
			},

			render: function () {
				this.el.innerHTML = this.template({
					detailed: this.detailed,
					addresses: this.addresses
				});

				return this;
			}
		});
	});