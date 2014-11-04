var args = arguments[0] || {};
var collection = Alloy.Collections.fallas;
Ti.API.info(JSON.stringify(args.data));

if (args.data) {
	$.mapview.region = {
		latitude : args.data.latitude,
		longitude : args.data.longitude,
		latitudeDelta : 0.09,
		longitudeDelta : 0.09
	};

	var annotation = Alloy.Globals.Map.createAnnotation({
		//title : response[falla].descripcion,
		//subtitle : response[falla].fechaReporte,
		//draggable : true,
		image : "/images/ico_localizacion_3.png",
		latitude : Number(args.data.latitude),
		longitude : Number(args.data.longitude)
	});
	$.mapview.addAnnotation(annotation);

	$.numero.text = $.numero.text + " " + args.data.folio;
	$.descripcion.text = args.data.descripcion;
}

function close() {
	$.fallasDetalle.close();
}

function atender() {
	var id = args.data ? args.data.folio : args.id;
	Alloy.createController("admin/atenderFalla", {
		id : id,
		//estatus : args.data.statusFalla
	}).getView();
}

Alloy.Globals.adminFallaDetalleClose = $.fallasDetalle.close;

$.fallasDetalle.open();
