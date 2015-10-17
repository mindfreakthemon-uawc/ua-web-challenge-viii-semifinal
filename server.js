var express = require('express'),
	app = express();

app.use(express.static('./public'));

app.get('/api/addresses', function (req, res) {
	res.jsonp({
		success: true,
		data: [
			{
				id: Math.floor(Math.random() * 10000),
				street: req.query.contains,
				number: 1
			},
			{
				id: Math.floor(Math.random() * 10000),
				street: req.query.contains,
				number: 2
			},
			{
				id: Math.floor(Math.random() * 10000),
				street: req.query.contains,
				number: 3
			}
		]
	});
});

app.use(function (req, res) {
	res.json({
		error: '404'
	});
});

app.listen(8001);