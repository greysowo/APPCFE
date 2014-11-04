var args = arguments[0] || {};
var userData = Ti.App.Properties.getObject("user").user;
var userDataPhone = require('userData').userData();
var moment = require('alloy/moment');
var optionsList = ["Aclarar recibo", "Mala atención a clientes", "Corrupción", "Otro"];
var value;

if (userData) {
	Ti.API.info("userData:" + JSON.stringify(userData));
	$.email.value = userData.email ? userData.email : "Email";
	$.noServicio.value = userData.no_servicio ? userData.no_servicio : "# de Servicio";
}

function close() {
	$.quejas.close();
}

function options() {
	$.quejas.add(Alloy.createController("UI/picker", {
		list : optionsList,
		view : $.quejas,
		label : $.textPicker,
		tipo : "quejas"
	}).getView());

}

function changeTF(e) {
	value = e.source.text;
	if (e.value == e.source.text) {
		this.value = "";
	}
}

function validatedTF(e) {
	if (e.value.length == 0) {
		this.value = value;
	}
}

function camaraPicker() {
	$.quejas.add(Alloy.createController("UI/camaraPicker", {
		view : $.quejas,
		image : $.imageDescripcion
	}).getView());
}

function imageDetalle() {
	//Ti.API.info($.imageDescripcion.image);
	if ($.imageDescripcion.image != null) {
		$.imageDescripcion.touchEnabled = false;
		Alloy.createController("UI/imageDetalle", {
			window : $.quejas,
			image : $.imageDescripcion
		}).getView();
	}
}

function enviar() {
	if ($.noServicio.value != "# de Servicio") {
		$.container.touchEnabled = false;
		$.activityIndicator.show();
		var url = "http://pixeleate.com/propuestacfe/api/v1/CFEReporteQuejas";
		var photo = savePhoto();
		var email = $.email.value != "Email" ? $.email.value : "";
		var descrip = $.descripcion.value != "Descripción" ? $.descripcion.value : "N/A";
		var photoPath = photo.nativePath ? photo.nativePath : "";
		var fechaCreacion = moment().format();
		var tipo = $.textPicker.text;
		var dataSend = {
			queja : {
				no_servicio : $.noServicio.value,
				email : email,
				coordenadas : "21.1248165,-101.6726551",
				// coordenadas : userDataPhone.ubicacion,
				descripcion : descrip,
				tipo_queja : tipo
			}
		};
		Ti.API.info("data:" + JSON.stringify(dataSend));
		//Ti.API.info("photo:" + photo);
		//Ti.API.info("photoPath:" + photoPath);

		var quejasCollection = Alloy.Collections.quejas;

		var client = Ti.Network.createHTTPClient({
			// function called when the response data is available
			onload : function(e) {
				var response = JSON.parse(this.responseText);
				var recibido = moment().format();
				var dataSave = {
					id_queja : response.mensaje.folio,
					tipo : tipo,
					descripcion : descrip,
					imagen : photoPath,
					status : "Recibido",
					fecha_creacion : fechaCreacion,
					fecha_recibido : recibido
				};
				//Ti.API.info("data:" + JSON.stringify(dataSave));
				var model = Alloy.createModel('quejas', dataSave);
				quejasCollection.add(model);
				model.save();
				//Ti.API.info("Received text: " + this.responseText);
				$.container.touchEnabled = true;
				$.activityIndicator.hide();

				var dialog = Ti.UI.createAlertDialog({
					buttonNames : ['Aceptar'],
					message : 'Tu queja ha sido enviada y recibida de manera satisfactoria.',
					title : 'Queja enviada'
				});
				dialog.addEventListener('click', function(e) {
					$.quejas.close();
				});
				dialog.show();
				//alert('success');
			},
			// function called when an error occurs, including a timeout
			onerror : function(e) {
				Ti.API.info('error: ' + client.status + ' - ' + client.statusText);
				Ti.API.info(JSON.stringify(e));
				var id = moment() + "queja";
				var dataSave = {
					id_queja : id,
					tipo : tipo,
					descripcion : descrip,
					imagen : photoPath,
					status : "No enviado",
					fecha_creacion : fechaCreacion,
				};
				Ti.API.info("data:" + JSON.stringify(dataSave));
				var model = Alloy.createModel('quejas', dataSave);
				quejasCollection.add(model);
				model.save();
				//Ti.API.info("Received text: " + this.responseText);
				$.container.touchEnabled = true;
				$.activityIndicator.hide();

				var dialog = Ti.UI.createAlertDialog({
					buttonNames : ['Aceptar'],
					message : 'Tu queja no ha sido enviada pero se guardara en tu historial.',
					title : 'Queja no enviada'
				});
				dialog.addEventListener('click', function(e) {
					$.quejas.close();
				});
				dialog.show();
				$.container.touchEnabled = true;
				$.activityIndicator.hide();
				//alert('error');
			},
			timeout : 10000 // in milliseconds
		});
		// Prepare the connection.
		//client.open("POST", url);
		client.open("POST", url);
		client.setRequestHeader("Content-Type", "text/plain");
		// Send the request.
		//Ti.API.info("datasend" + JSON.stringify(dataSend));
		client.send(JSON.stringify(dataSend));

		photo = null;
	} else {
		alert("Es necesario introducir un número de servicio");
	}
}

function savePhoto() {
	if ($.imageDescripcion.image != null) {
		var fileName = moment() + 'fallas.png';
		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, fileName);
		f.write($.imageDescripcion.toBlob());
		return f;
	} else {
		return "";
	}

}

$.quejas.open();
