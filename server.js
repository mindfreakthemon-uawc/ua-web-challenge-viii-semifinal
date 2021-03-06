var express = require('express'),
	app = express();

var THROTTLING = 500;

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

		accidents: [
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

app.use(express.static('./public'));

app.get('/api/addresses', function (req, res) {
	var street = req.query.term,
		ids = req.query.id,
		lat = req.query.lat,
		lng = req.query.lng;


	setTimeout(function () {
		var data = [];

		if (lat && lng) {
			// asking for addresses near latLng, maybe some radius param?
			data = [
				randomAddress(street), randomAddress(street), randomAddress(street)
			];
		} else if (ids && ids.length) {
			// asking array of addresses by theirs' ids
			ids.forEach(function (id) {
				data.push(randomAddress(null, id));
			});
		} else {
			// asking for streets that match @contains
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