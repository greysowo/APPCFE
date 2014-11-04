var args = arguments[0] || {};
var lati = args.lati;
var longi = args.longi;
var values;
var dirTF = args.dirTF;
var searching = false;
var annotation = {
	latitude : 0,
	longitude : 0
};

// Ti.API.info("value" + view.value);

$.mapview.userLocation = true;

function openCoord() {
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

		//Ti.API.info('{"latitude":' + e.coords.latitude + ', "longitude":' + e.coords.longitude + '}');
		//view.value = '{"latitude":' + e.coords.latitude + ', "longitude":' + e.coords.longitude + '}';
		annotation = Alloy.Globals.Map.createAnnotation({
			// title : pois[i].title,
			// subtitle : pois[i].subtitle,
			//draggable : true,
			image : "/images/ico_localizacion_3.png",
			latitude : e.coords.latitude,
			longitude : e.coords.longitude
		});

		$.mapview.addAnnotation(annotation);
		geoReverse(e.coords.latitude, e.coords.longitude);
	});
}

// $.mapview.userLocation = true;

function close() {
	$.ubicacion.close();
}

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
		annotation.latitude = e.coords.latitude;
		annotation.longitude = e.coords.longitude;
	});
}

$.mapview.addEventListener('regionchanged', function(e) {
	annotation.latitude = e.latitude;
	annotation.longitude = e.longitude;
	geoReverse(e.latitude, e.longitude);
	//Ti.API.info("value" + view.value);
	// Ti.API.info("value" + JSON.parse($.geolocationView.value));
});

$.mapview.addEventListener('pinchangedragstate', function(e) {
	// Ti.API.info(JSON.stringify(e));
	//Ti.API.info("value" + view.value);
});

$.ubicacion.open();

function buscar() {
	$.tf.blur();
	geoCoding($.tf.value);
}

function aceptar() {
	args.dirTF.value = $.tf.value;
	$.ubicacion.close();
}

function geoReverse(lat, longi) {
	if (!searching) {
		searching = true;
		var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + longi + "&sensor=true";
		var client = Ti.Network.createHTTPClient({
			// function called when the response data is available
			onload : function(e) {
				//Ti.API.info("Received text: " + this.responseText);
				var data = JSON.parse(this.responseText);
				if (data.status == "OK") {
					Ti.API.info(data.results.length);
					var dataDir = data.results[0];
					$.tf.value = dataDir.formatted_address;
					//Ti.API.info(JSON.stringify(data.results[0]));
					Ti.API.info(dataDir.formatted_addres);
					searching = false;
					//alert('success');
				} else {
					searching = false;
					alert('No se encontro ninguna dirección');
				}
			},
			// function called when an error occurs, including a timeout
			onerror : function(e) {
				Ti.API.info(e.error);
				searching = false;
				alert('error');
			},
			timeout : 5000 // in milliseconds
		});
		// Prepare the connection.
		client.open("GET", url);
		// Send the request.
		client.send();
	}

}

function geoCoding(address) {
	if (!searching) {
		searching = true;
		address = address.replace(" ", "+");
		var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&sensor=true";
		var client = Ti.Network.createHTTPClient({
			// function called when the response data is available
			onload : function(e) {
				//Ti.API.info("Received text: " + this.responseText);
				var data = JSON.parse(this.responseText);
				if (data.status == "OK") {
					Ti.API.info(data.results.length);
					var dataDir = data.results[0];
					var coord = dataDir.geometry.location;
					annotation.latitude = coord.lat;
					annotation.longitude = coord.lng;
					$.mapview.region = {
						latitude : coord.lat,
						longitude : coord.lng,
						latitudeDelta : 0.1,
						longitudeDelta : 0.1
					};
					//$.tf.value = dataDir.formatted_address;
					//Ti.API.info("data 0" + JSON.stringify(data.results[0]));
					//Ti.API.info(JSON.stringify(dataDir.geometry.location));
					searching = false;
					//alert('success');
				} else {
					searching = false;
					alert('No se encontro ninguna dirección');
				}
			},
			// function called when an error occurs, including a timeout
			onerror : function(e) {
				Ti.API.info(e.error);
				searching = false;
				alert('error');
			},
			timeout : 5000 // in milliseconds
		});
		// Prepare the connection.
		client.open("GET", url);
		// Send the request.
		client.send();
	}
}
