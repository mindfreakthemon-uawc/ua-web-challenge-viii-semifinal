var express = require('express'),
	app = express();

app.use(express.static('./public'));

app.get('/api/addresses', function (req, res) {
	res.jsonp({
		success: true,
		data: [
			{
				id: 1,
				street: 'Pankivska',
				number: 1
			},
			{
				id: 2,
				street: 'Uritskogo',
				number: 2
			},
			{
				id: 3,
				street: 'Shmakivska',
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