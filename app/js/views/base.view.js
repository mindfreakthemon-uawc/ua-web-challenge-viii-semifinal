define([
		'backbone',
		'tmpls'

	],
	function (Backbone, tmpls) {

		return Backbone.View.extend({

			/**
			 * Logs errors. Heh
			 */
			showError: function () {
				console.error.apply(console, arguments);
			},

			/**
			 * Displays loading template inside the view
			 */
			showLoading: function () {
				this.el.innerHTML = tmpls.loading();
			},


			/**
			 * @type Array|null
			 */
			widgets: null,

			/**
			 * Adding jQueryUI widget to keep track of
			 * @param widget
			 */
			attachWidget: function (widget) {
				if (!this.widgets) {
					this.widgets = [];
				}

				this.widgets.push(widget);
			},

			/**
			 * Removing all widgets for nice cleanup
			 */
			detachAllWidgets: function () {
				if (!this.widgets) {
					return;
				}

				this.widgets.forEach(function (widget) {
					widget.destroy();
				});
			},


			/**
			 * @type Array|null
			 */
			childViews: null,

			/**
			 * Adding child Backbone View to keep track of
			 * @param view
			 */
			addChildView: function (view) {
				if (!this.childViews) {
					this.childViews = [];
				}

				this.childViews.push(view);
			},

			/**
			 * Closing particular child views.
			 * Useful for sidebars and stuff..
			 * @param view
			 */
			closeChildView: function (view) {
				if (!this.childViews) {
					return;
				}

				var index = this.childViews.indexOf(view);

				if (index > -1) {
					this.childViews[index].close();
				}
			},

			/**
			 * Closing all child views for nice cleanup
			 */
			closeAllChildViews: function () {
				if (!this.childViews) {
					return;
				}

				this.childViews.forEach(function (view) {
					view.close();
				});
			},

			/**
			 * Renders itself and all its' child views
			 * @returns {*}
			 */
			renderAll: function () {
				if (this.childViews) {
					this.childViews.forEach(function (view) {
						view.render();
					});
				}

				return this.render();
			},

			/**
			 * Removes all attached widgets from jqueryUI
			 * and all child views.
			 */
			close: function () {
				this.closeAllChildViews();
				this.detachAllWidgets();

				this.remove();
			}
		});
	});