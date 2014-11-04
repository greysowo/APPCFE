var args = arguments[0] || {};
var moment = require('alloy/moment');
var userData = Ti.App.Properties.getObject("user").user;
var optionsList = ["Revisar Medidor", "No hay luz en la cuadra", "No hay luz en la casa", "Variación de voltaje en la cuadra", "El CFEmatico no funciona", "Otro"];

if (userData) {
	Ti.API.info("userData:" + JSON.stringify(userData));
	$.email.value = userData.email ? userData.email : "Email";
	$.noServicio.value = userData.no_servicio ? userData.no_servicio : "# de Servicio";
}

function close() {
	$.fallas.close();
}

function options() {
	$.fallas.add(Alloy.createController("UI/picker", {
		list : optionsList,
		view : $.fallas,
		label : $.textPicker,
		tipo : "fallas"
	}).getView());

}

function changeTF(e) {
	value = e.source.text;
	if (e.value == e.source.text) {
		this.value = "";
	}
}

// function changeTF2(e) {
// Ti.API.info(this.value);
//
// value = e.source.text;
// if (e.value == e.source.text) {
// this.value = "";
// }
//
// }

function validatedTF(e) {
	if (e.value.length == 0) {
		this.value = value;
	}
}

function camaraPicker() {
	$.fallas.add(Alloy.createController("UI/camaraPicker", {
		view : $.fallas,
		image : $.imageDescripcion
	}).getView());
}

function imageDetalle() {
	//Ti.API.info($.imageDescripcion.image);
	if ($.imageDescripcion.image != null) {
		$.imageDescripcion.touchEnabled = false;
		Alloy.createController("UI/imageDetalle", {
			window : $.fallas,
			image : $.imageDescripcion
		}).getView();
	}
}

function ubicacion() {
	Alloy.createController("UI/ubicacion", {
		dirTF : $.direccion
	}).getView();
}

function enviar() {
	if ($.noServicio.value != "# de Servicio") {
		$.container.touchEnabled = false;
		$.activityIndicator.show();
		var url = "http://pixeleate.com/propuestacfe/api/v1/CFEReporteFallas";
		var photo = savePhoto();
		var email = $.email.value != "Email" ? $.email.value : "";
		var dir = $.direccion.value != "Dirección" ? $.direccion.value : "N/A";
		var descrip = $.descripcion.value != "Descripción" ? $.descripcion.value : "N/A";
		var photoPath = photo.nativePath ? photo.nativePath : "";
		var fechaCreacion = moment().format();
		var tipo = $.textPicker.text;
		var data = {
			falla : {
				no_servicio : $.noServicio.value,
				email : email,
				coordenadas : "21.1248165, -101.6726551",
				direccion : dir,
				descripcion : descrip,
				//foto : photo,
				tipo_falla : tipo
			}
		};
		Ti.API.info("data:" + JSON.stringify(data));
		//Ti.API.info("photo:" + photo);
		// Ti.API.info("size" + photo.size);
		// Ti.API.info("photoPath:" + photoPath);

		var fallasCollection = Alloy.Collections.fallas;

		var client = Ti.Network.createHTTPClient({
			// function called when the response data is available
			onload : function(e) {
				var response = JSON.parse(this.responseText);
				var recibido = moment().format();
				var dataSave = {
					id_falla : response.mensaje.folio,
					tipo : tipo,
					descripcion : descrip,
					direccion : dir,
					imagen : photoPath,
					status : "Recibido",
					fecha_creacion : fechaCreacion,
					fecha_recibido : recibido
				};

				Ti.API.info("data:" + JSON.stringify(dataSave));
				var model = Alloy.createModel('fallas', dataSave);
				fallasCollection.add(model);
				model.save();
				Ti.API.info("Received text: " + this.responseText);
				$.container.touchEnabled = true;
				$.activityIndicator.hide();

				var dialog = Ti.UI.createAlertDialog({
					buttonNames : ['Aceptar'],
					message : 'Tu falla ha sido enviada y recibida de manera satisfactoria.',
					title : 'Falla enviada'
				});
				dialog.addEventListener('click', function(e) {
					$.fallas.close();
				});
				dialog.show();
				//alert('success');
			},
			// function called when an error occurs, including a timeout
			onerror : function(e) {
				Ti.API.info(e.error);
				var id = moment() + "queja";
				var dataSave = {
					id_falla : id,
					tipo : tipo,
					descripcion : descrip,
					direccion : dir,
					imagen : photoPath,
					status : "No enviado",
					fecha_creacion : fechaCreacion,
				};
				Ti.API.info("data:" + JSON.stringify(dataSave));
				var model = Alloy.createModel('fallas', dataSave);
				fallasCollection.add(model);
				model.save();
				//Ti.API.info("Received text: " + this.responseText);
				$.container.touchEnabled = true;
				$.activityIndicator.hide();

				var dialog = Ti.UI.createAlertDialog({
					buttonNames : ['Aceptar'],
					message : 'Tu falla no ha sido enviada pero se guardara en tu historial.',
					title : 'Falla no enviada'
				});
				dialog.addEventListener('click', function(e) {
					$.fallas.close();
				});
				dialog.show();
				$.container.touchEnabled = true;
				$.activityIndicator.hide();
				//alert('error');
			},
			timeout : 5000 // in milliseconds
		});
		// Prepare the connection.
		client.open("POST", url);
		client.setRequestHeader("Content-Type", "text/plain");
		//client.setRequestHeader('enctype', 'multipart/form-data');
		// Send the request.
		client.send(JSON.stringify(data));

		photo = null;
	} else {
		alert("Es necesario introducir un número de servicio");
	}

}

function savePhoto() {
	if ($.imageDescripcion.image != null) {
		var fileName = moment() + 'fallas.png';
		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, fileName);
		var photo = $.imageDescripcion.toBlob();
		if (f.write(photo) === false) {
			// handle write error
			Ti.API.info("error");
		}
		f.write(photo);
		//Ti.API.info("size" + f.size);
		return f;
	} else {
		return "";
	}

}

$.fallas.open();
