var lat;
var longi;
Titanium.Geolocation.getCurrentPosition(function(e) {
	if (e.error) {
		//alert('CFE APP no pudó obtener tu ubicación actual');
		Ti.API.info("error: " + e.error);
		lat = null;
		longi = null;
		return;
	}
	lat = e.coords.latitude;
	longi = e.coords.longitude;
	// Ti.API.info('{"latitude":' + e.coords.latitude + ', "longitude":' + e.coords.longitude + '}');
});

function userData() {
	var userData = {
		modelo : Ti.Platform.manufacturer + " " + Ti.Platform.model,
		pass : Ti.App.Properties.getString("pass"),
		resolucion : Ti.Platform.displayCaps.platformWidth + "x" + Ti.Platform.displayCaps.platformHeight,
		so : Ti.Platform.name,
		ip : Ti.Platform.macaddress,
		tipo : Alloy.isHandheld ? "Teléfono" : "Tableta",
		usuario : Ti.App.Properties.getString("user"),
		versionOS : Ti.Platform.version,
		ubicacion : lat + "," + longi,
		token : Ti.App.Properties.getString("tokenID")
	};

	Ti.API.info("User Data:" + JSON.stringify(userData));
	return userData;
}

module.exports.userData = userData;
