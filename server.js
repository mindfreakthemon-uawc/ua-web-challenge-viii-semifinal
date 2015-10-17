var express = require('express'),
	app = express();

app.use(express.static('./public'));

app.get('/api/addresses', function (req, res) {
	var street = req.query.contains || 'Street Name';

	console.log(req.query);
	setTimeout(function () {

		res.jsonp({
			success: true,
			data: [
				{
					id: Math.floor(Math.random() * 10000),
					street: street,
					number: Math.floor(Math.random() * 255)
				},
				{
					id: Math.floor(Math.random() * 10000),
					street: street,
					number: Math.floor(Math.random() * 255)
				},
				{
					id: Math.floor(Math.random() * 10000),
					street: street,
					number: Math.floor(Math.random() * 255)
				}
			]
		});
	}, 500);
});

app.get('/api/routes', function (req, res) {
	console.log(req.query);

	setTimeout(function () {
		res.jsonp({
			success: true,
			data: [
				{
					id: Math.floor(1000 * Math.random()),
					keyStreet: 'asdasd',
					distance: Math.floor(Math.random() * 255),
					timeSpan: Math.floor(Math.random() * 255),

					accidentsCount: Math.floor(Math.random() * 255),
					victimsCount: Math.floor(Math.random() * 255),
					deathsCount: Math.floor(Math.random() * 255),

					safetyLevel: 'green'
				}, {
					id: Math.floor(1000 * Math.random()),
					keyStreet: 'asdasd',
					distance: Math.floor(Math.random() * 255),
					timeSpan: Math.floor(Math.random() * 255),

					accidentsCount: Math.floor(Math.random() * 255),
					victimsCount: Math.floor(Math.random() * 255),
					deathsCount: Math.floor(Math.random() * 255),

					safetyLevel: 'yellow'
				}, {
					id: Math.floor(1000 * Math.random()),
					keyStreet: 'asdasd',
					distance: Math.floor(Math.random() * 255),
					timeSpan: Math.floor(Math.random() * 255),

					accidentsCount: Math.floor(Math.random() * 255),
					victimsCount: Math.floor(Math.random() * 255),
					deathsCount: Math.floor(Math.random() * 255),

					safetyLevel: 'red'
				}
			]
		});
	}, 1000);

});

app.use(function (req, res) {
	res.json({
		error: '404'
	});
});

app.listen(8001);