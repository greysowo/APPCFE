var args = arguments[0] || {};
var moment = require('alloy/moment');
$.title.text = args.title;
$.estatus.text = args.status;
$.fecha.text = moment(args.fecha).format("DD-MM-YY");

function getReport(e) {
	if (args.admin) {
		Alloy.createController("admin/fallasDetalle", {
			id : args.id
		}).getView();
	} else {
		Alloy.createController("historial/detalleHistorial", {
			id : args.id,
			tipo : args.tipo
		}).getView();
	}
}
