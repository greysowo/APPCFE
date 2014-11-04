var args = arguments[0] || {};
var moment = require('alloy/moment');
$.title.text = args.title;
$.historialRow.id = args.id;
$.estatus.text = args.status;
$.fecha.text = moment(args.fecha).format("DD-MM-YY");

function getReport(e) {
	Alloy.createController("admin/fallasDetalle", {
		id : args.id,
		tipo : args.tipo,
		data : args.data
	}).getView();
}