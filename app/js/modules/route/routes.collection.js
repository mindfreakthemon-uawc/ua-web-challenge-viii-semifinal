define([
		'modules/base/base.collection',
		'modules/route/route.model'

	],
	function (BaseCollection, Route) {

		return BaseCollection.extend({
			model: Route,

			url: 'http://localhost:8001/api/routes'
		});
	});