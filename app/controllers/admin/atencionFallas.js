var args = arguments[0] || {};
var moment = require('alloy/moment');

function close() {
	$.atencionFallas.close();
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
		latitudeDelta : 0.2,
		longitudeDelta : 0.2
	};

	Ti.API.info('{"latitude":' + e.coords.latitude + ', "longitude":' + e.coords.longitude + '}');
	//setData(e.coords.latitude, e.coords.longitude);
});

function setData() {
	var url = "http://pixeleate.com/propuestacfe/api/v1/CFEFallasMap";
	var dataMap = [];
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {

			Ti.API.info("Received text: " + this.responseText);
			var response = JSON.parse(this.responseText).markers;
			for (falla in response) {
				var latLng;
				//Ti.API.info(JSON.stringify(response[falla]));
				// try {
				// latLng = JSON.parse(response[falla].latLng);
				// latLng = latLng.split(",");
				// Ti.API.info(latLng);
				// //intento algo que puede producir un error
				// } catch(mierror) {
				// //hago algo cuando el error se ha detectado
				// }

				$.tableView.appendRow(Alloy.createController("admin/historialRow", {
					id : response[falla].folio,
					title : response[falla].descripcion,
					status : response[falla].estatusFalla,
					fecha : response[falla].fechaReporte,
					data : response[falla]
				}).getView());
				Ti.API.info(response[falla].latitude + response[falla].longitude);
				//Ti.API.info(latLng[0] + latLng[1]);

				var annotation = Alloy.Globals.Map.createAnnotation({
					title : response[falla].descripcion,
					subtitle : response[falla].fechaReporte,
					//draggable : true,
					image : "/images/ico_localizacion_3.png",
					latitude : Number(response[falla].latitude),
					longitude : Number(response[falla].longitude)
				});
				dataMap.push(annotation);
				//$.mapview.addAnnotation(annotation);
				annotation = null; 

			}
			$.mapview.annotations = dataMap;
			Ti.API.info('success');
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout : 5000 // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url);
	// Send the request.
	client.send();
}

setData();

// $.tableView.appendRow(Alloy.createController("admin/historialRow", {
// id : 0,
// title : "No hay luz",
// status : "En revisión",
// fecha : moment(),
// }).getView());
//
// $.tableView.appendRow(Alloy.createController("admin/historialRow", {
// id : 0,
// title : "Corto Circuito",
// status : "En revisión",
// fecha : moment(),
// }).getView());

$.atencionFallas.open();
