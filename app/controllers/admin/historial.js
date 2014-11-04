var args = arguments[0] || {};
var moment = require('alloy/moment');

function close() {
	$.historial.close();
}

var fallasCollection = Alloy.Collections.fallas;
fallasCollection.fetch();

fallasCollection.forEach(function(e) {
	//var dataArray = [];
	Ti.API.info("fallas guardadas:" + JSON.stringify(e));

	var data = {
		id : e.get("id_falla"),
		title : e.get("tipo"),
		status : e.get("status"),
		fecha : e.get("fecha_creacion"),
		admin : true
	};
	$.tableView.appendRow(Alloy.createController("admin/historialRow", data).getView());
	//var row = Alloy.createController("admin/historialRow", data).getView();
});

//
// $.tableView.appendRow(Alloy.createController("admin/historialRow", data).getView());

$.historial.open();
