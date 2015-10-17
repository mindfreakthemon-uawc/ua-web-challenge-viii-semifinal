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
			},

			render: function () {
				this.el.innerHTML = this.template({
					detailed: this.detailed
				});

				return this;
			}
		});
	});