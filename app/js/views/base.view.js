define([
		'backbone'

	],
	function (Backbone) {

		return Backbone.View.extend({

			error: function () {
				console.error.apply(console, arguments);
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

			close: function () {
				this.closeAllChildViews();
				this.detachAllWidgets();

				this.remove();
			}
		});
	});