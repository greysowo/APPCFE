var args = arguments[0] || {};
var optionsList = ["Resuelta", "En proceso", "No Atendida"];
$.folio.text = args.id;

function close() {
	$.atenderFalla.close();
}

function options() {
	$.atenderFalla.add(Alloy.createController("UI/picker", {
		list : optionsList,
		view : $.atenderFalla,
		label : $.textPicker
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
	$.atenderFalla.add(Alloy.createController("UI/camaraPicker", {
		view : $.atenderFalla,
		image : $.imageDescripcion
	}).getView());
}

function imageDetalle() {
	//Ti.API.info($.imageDescripcion.image);
	if ($.imageDescripcion.image != null) {
		$.imageDescripcion.touchEnabled = false;
		Alloy.createController("UI/imageDetalle", {
			window : $.atenderFalla,
			image : $.imageDescripcion
		}).getView();
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

function enviar() {
	var dialog = Ti.UI.createAlertDialog({
		buttonNames : ['Aceptar'],
		message : '\nTu reporte de atención\nse ha enviado exotosamente',
		title : 'Reporte enviado'
	});
	dialog.addEventListener('click', function(e) {
		Alloy.Globals.adminFallaDetalleClose();
		$.atenderFalla.close();
	});
	dialog.show();
}

$.atenderFalla.open();

