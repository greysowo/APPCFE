var args = arguments[0] || {};
var lat;
var longi;

function close() {
	$.centros.close();
}

Titanium.Geolocation.getCurrentPosition(function(e) {
	if (e.error) {
		alert('CFE APP no pudó obtener tu ubicación actual');
		Ti.API.info("error: " + e.error);
		return;
	}
	$.mapview.region = {
		latitude : e.coords.latitude,
		longitude : e.coords.longitude,
		latitudeDelta : 0.08,
		longitudeDelta : 0.08
	};

	Ti.API.info('{"latitude":' + e.coords.latitude + ', "longitude":' + e.coords.longitude + '}');
	setData(e.coords.latitude, e.coords.longitude);
});

function currentLocation() {
	Titanium.Geolocation.getCurrentPosition(function(e) {
		if (e.error) {
			alert('CFE APP no pudo obtener tu ubicación actual');
			Ti.API.info("error: " + e.error);
			return;
		}
		$.mapview.region = {
			latitude : e.coords.latitude,
			longitude : e.coords.longitude,
			latitudeDelta : 0.08,
			longitudeDelta : 0.08
		};
	});
}

function setData(lat, longi) {
	var annArray = [];
	var db = Ti.Database.open(Ti.App.Properties.getString('databaseName'));

	// radius of bounding circle in kilometers
	var rad = 10;

	// earth's mean radius, km
	var R = 6371;
	// first-cut bounding box (in degrees)
	var maxLat = (lat + rad2deg(rad / R));
	// Ti.API.info("maxlat:" + (lat + rad2deg(rad / R)));
	var minLat = (lat - rad2deg(rad / R));
	// Ti.API.info("minlat:" + (lat - rad2deg(rad / R)));

	// compensate for degrees longitude getting smaller with increasing latitude
	var maxLon = (longi + rad2deg((rad / R / deg2rad(lat))));
	//Ti.API.info("maxLong:" + (longi + rad2deg((rad / R / deg2rad(lat)))));
	var minLon = (longi - rad2deg((rad / R / deg2rad(lat))));

	Ti.API.info(maxLat + " " + minLat + " " + maxLon + " " + minLon);

	//$sql = "Select Id, Postcode, Lat, Lon From MyTable Where Lat Between :minLat And :maxLat And Lon Between :minLon And :maxLon";
	var sql = "SELECT * FROM centros WHERE lat Between'" + minLat + "' AND '" + maxLat + "' AND longi Between '" + minLon.toFixed(6) + "' AND '" + maxLon.toFixed(6) + "'";
	var resultSet = db.execute(sql);
	//Ti.API.info("sql:" + sql);
	Ti.API.info("count:" + resultSet.rowCount);

	while (resultSet.isValidRow()) {
		var annotation = Alloy.Globals.Map.createAnnotation({
			latitude : resultSet.fieldByName("lat"),
			longitude : resultSet.fieldByName("longi"),
			title : resultSet.fieldByName("ciudad"),
			subtitle : resultSet.fieldByName("dias") + " : " + resultSet.fieldByName("horario"),
			image : "/images/ico_localizacion_3.png"
			//pincolor : Alloy.Globals.Map.ANNOTATION_RED,
			//myid : 1 // Custom property to uniquely identify this annotation.
		});
		annArray.push(annotation);

		resultSet.next();
	}
	$.mapview.annotations = annArray;
	db.close();
}

function rad2deg(rad) {
	var pi = Math.PI;
	var ra_de = (rad * (180 / pi));
	//Ti.API.info("degrees:" + ra_de);
	return ra_de;
}

function deg2rad(deg) {
	var pi = Math.PI;
	var de_ra = (deg * (pi / 180));
	var cos = Math.cos(de_ra);
	//Ti.API.info("radians:" + de_ra);
	return cos;
}

$.centros.open();
