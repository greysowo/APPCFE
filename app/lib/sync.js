var userData = Ti.App.Properties.getObject("user").user;
var noServicio = userData.no_servicio;
var moment = require('alloy/moment');
function sync(spin) {
	if (Ti.Network.online) {
		if (noServicio) {
			spin.show();
			syncQuejas();
			syncFallas(spin);
		} else {
			Ti.API.info("No hay servicio registrado");
		}
	} else {
		Ti.API.info("No existe conexión a internet");
	}
}

function syncQuejas() {
	var url = "http://pixeleate.com/propuestacfe/api/v1/CFEQuejas/" + noServicio;
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			Ti.API.info("Received text: " + this.responseText);
			Ti.API.info('success');
			var quejasCollection = Alloy.Collections.quejas;
			var response = JSON.parse(this.responseText);
			for (falla in response) {
				Ti.API.info(JSON.stringify(response[falla]));
				var fecha = moment(response[falla].fecha_recepcion).format();
				var dataSave = {
					id_queja : response[falla].folio,
					tipo : response[falla].descripcion,
					descripcion : response[falla].descripcion,
					//direccion : response[falla].dir,
					//imagen : photoPath,
					status : response[falla].estatus_queja,
					//fecha_creacion : response[falla].fechaCreacion,
					fecha_recibido : fecha,
					//ubicacion : response[falla].latLng
				};
				Ti.API.info(fecha);
				var model = Alloy.createModel('quejas', dataSave);
				quejasCollection.add(model);
				model.save();
			}
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.info(JSON.stringify(e));
			Ti.API.info('error');
		},
		timeout : 5000 // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url);
	// Send the request.
	client.send();
}

function syncFallas(spin) {
	var url = "http://pixeleate.com/propuestacfe/api/v1/CFEFallas/" + noServicio;
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			Ti.API.info("Received text: " + this.responseText);
			var fallasCollection = Alloy.Collections.fallas;
			var response = JSON.parse(this.responseText);
			for (falla in response) {
				Ti.API.info(JSON.stringify(response[falla]));
				var fecha = moment(response[falla].fecha_recepcion).format();
				var dataSave = {
					id_falla : response[falla].folio,
					tipo : response[falla].descripcion,
					descripcion : response[falla].descripcion,
					//direccion : response[falla].dir,
					//imagen : photoPath,
					status : response[falla].estatus_falla,
					//fecha_creacion : response[falla].fechaCreacion,
					fecha_recibido : fecha,
					//ubicacion : response[falla].latLng
				};
				Ti.API.info(fecha);
				var model = Alloy.createModel('fallas', dataSave);
				fallasCollection.add(model);
				model.save();
			}

			Ti.API.info('success');
			spin.hide();
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.info(JSON.stringify(spin));
			spin.hide();
			Ti.API.info(JSON.stringify(e));
			Ti.API.info('error');
		},
		timeout : 5000 // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url);
	// Send the request.
	client.send();
}

module.exports.sync = sync;
