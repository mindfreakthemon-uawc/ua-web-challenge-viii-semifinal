var express = require('express'),
	app = express();

var THROTTLING = 500;

app.use(express.static('./public'));

app.get('/api/addresses', function (req, res) {
	var street = req.query.contains,
		ids = req.query.id;


	setTimeout(function () {
		var data = [];

		if (ids && ids.length) {
			ids.forEach(function (id) {
				data.push(randomAddress(null, id));
			});
		} else {
			data = [
				randomAddress(street), randomAddress(street), randomAddress(street)
			];
		}

		res.jsonp({
			success: true,
			data: data
		});
	}, THROTTLING);
});

function randomAddress(street, id) {
	return {
		id: id || Math.floor(Math.random() * 10000),
		street: street || randomStreetName(),
		number: Math.floor(Math.random() * 255)
	};
}

function random() {
	return arguments[Math.floor(Math.random() * arguments.length)];
}

function randomStreetName() {
	return random('Inferno Blv.', 'Good St.', 'Nice St.', 'Bad St.');
}

function randomNavigation() {
	return {
		type: random('forward', 'left', 'right', 'turn'),
		comment: randomStreetName(),
		distance: Math.floor(Math.random() * 10000)
	};
}

function randomCoords() {
	return {
		lat: 50.4390949 + Math.random() * 2,
		lng: 30.524734 + Math.random() * 2
	};
}

function randomAccidents() {
	return {
		lat: 50.4390949 + Math.random() * 2,
		lng: 30.524734 + Math.random() * 2,

		accidentsCount: Math.floor(Math.random() * 255),
		victimsCount: Math.floor(Math.random() * 255),
		deathsCount: Math.floor(Math.random() * 255)
	};
}

function generateRoute(safetyLevel) {
	return {
		id: Math.floor(1000 * Math.random()),
		keyStreet: randomStreetName(),
		distance: Math.floor(Math.random() * 255),
		timeSpan: Math.floor(Math.random() * 255),

		accidentsCount: Math.floor(Math.random() * 255),
		victimsCount: Math.floor(Math.random() * 255),
		deathsCount: Math.floor(Math.random() * 255),

		safetyLevel: safetyLevel,

		accidentsCoordinates: [
			randomAccidents(), randomAccidents(), randomAccidents(), randomAccidents()
		],

		routeCoordinates: [
			randomCoords(), randomCoords(), randomCoords(), randomCoords()
		],

		navigation: [
			randomNavigation(), randomNavigation(), randomNavigation(),
			randomNavigation(), randomNavigation(), randomNavigation()
		]
	}
}

app.get('/api/routes', function (req, res) {
	setTimeout(function () {
		res.jsonp({
			success: true,
			data: [generateRoute('green'), generateRoute('yellow'), generateRoute('red')]
		});
	}, THROTTLING);

});

app.use(function (req, res) {
	res.json({
		error: '404'
	});
});

app.listen(8001);