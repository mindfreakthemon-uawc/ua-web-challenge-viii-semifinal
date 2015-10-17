define([
		'backbone'

	],
	function (Backbone) {

		return Backbone.View.extend({

			error: function () {
				console.error.apply(console, arguments);
			},

			childViews: null,

			addChildView: function (view) {
				if (!this.childViews) {
					this.childViews = [];
				}

				this.childViews.push(view);
			},

			closeChildView: function (view) {
				if (!this.childViews) {
					return;
				}

				var index = this.childViews.indexOf(view);

				if (index > -1) {
					this.childViews[index].close();
				}
			},

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

				this.remove();
			}
		});
	});