var args = arguments[0] || {};
var moment = require('alloy/moment');
var dias = "8";

$.rowRecordatorio.idr = args.id;
$.title.text = args.title;
$.fecha.text = args.fecha;
$.diasRestantes.text = args.days + " días";

function getRecordatorio(e) {
	// Alloy.createController("herramientas/detalleRecordatorio", {
		// id : args.id
	// }).getView();
}