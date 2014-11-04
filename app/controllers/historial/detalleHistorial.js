var args = arguments[0] || {};
var moment = require('alloy/moment');
var userData = Ti.App.Properties.getObject("user");
Ti.API.info("row2" + args.tipo);
Ti.API.info("id" + args.id);

if (userData) {
	Ti.API.info("userData:" + JSON.stringify(userData));
	$.email.text = userData.email;
	$.noServicio.text = userData.noServicio;
}

$.numero.text = $.numero.text + " " + args.id;

var collection;

if (args.tipo == " falla") {
	$.title2.text = "Falla";
	$.numero.text = $.numero.text + " Falla:";
	collection = Alloy.Collections.fallas;
	collection.fetch({
		query : "SELECT * FROM fallas WHERE id_falla='" + args.id + "'"
	});
	collection.forEach(function(e) {
		Ti.API.info("data guardada:" + JSON.stringify(e));
		if (e.get("imagen") == "") {
			$.tableView.deleteRow(6);
		} else {
			$.image.image = e.get("imagen");
		}
		$.title.text = e.get("tipo");
		$.fecha.text = moment(e.get("fecha_creacion")).format("DD-MM-YY");
		$.descripcion.text = e.get("descripcion");
		$.direccion.text = e.get("direccion");
		$.estatus.text = $.estatus.text + " " + e.get("status");
	});
} else {
	$.tableView.deleteRow(4);
	$.title2.text = "Queja";
	$.numero.text = $.numero.text + " Queja:";
	collection = Alloy.Collections.quejas;
	collection.fetch({
		query : "SELECT * FROM quejas WHERE id_queja='" + args.id + "'"
	});
	collection.forEach(function(e) {
		Ti.API.info("data guardada:" + JSON.stringify(e));
		if (e.get("imagen") == "") {
			$.tableView.deleteRow(6);
		} else {
			$.image.image = e.get("imagen");
		}
		$.title.text = e.get("tipo");
		$.fecha.text = moment(e.get("fecha_creacion")).format("DD-MM-YY");
		$.descripcion.text = e.get("descripcion");
		$.estatus.text = $.estatus.text + " " + e.get("status");
	});
}
collection.fetch();

Ti.API.info("title" + $.title2.text);

function close() {
	$.detalleHistorial.close();
}

$.detalleHistorial.open();
