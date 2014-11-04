var args = arguments[0] || {};

function setData() {
	var fallasCollection = Alloy.Collections.fallas;
	fallasCollection.fetch();
	var quejasCollection = Alloy.Collections.quejas;
	quejasCollection.fetch();

	//Ti.API.info("len" + quejasCollection.length);
	//Ti.API.info("len" + fallasCollection.length);

	if (fallasCollection.length == 0) {
		$.fallas.add(Alloy.createController("historial/getReportRow", {
			tipo : " " + "falla"
		}).getView());
	} else {
		fallasCollection.forEach(function(e) {
			Ti.API.info("fallas guardadas:" + JSON.stringify(e));
			var fecha = e.get("fecha_recibido") != null ? e.get("fecha_recibido") : e.get("fecha_creacion");
			var data = {
				id : e.get("id_falla"),
				title : e.get("tipo"),
				status : e.get("status"),
				fecha : fecha,
				tipo : " " + "falla",
			};

			$.fallas.add(Alloy.createController("historial/historialRow", data).getView());
		});
	}

	if (quejasCollection.length == 0) {
		$.quejas.add(Alloy.createController("historial/getReportRow", {
			tipo : " " + "queja"
		}).getView());
	} else {
		quejasCollection.forEach(function(e) {
			Ti.API.info("quejas guardadas:" + JSON.stringify(e));
			var fecha = e.get("fecha_recibido") != null ? e.get("fecha_recibido") : e.get("fecha_creacion");
			var data = {
				id : e.get("id_queja"),
				title : e.get("tipo"),
				status : e.get("status"),
				fecha : fecha,
				tipo : " " + "queja"
			};

			$.quejas.add(Alloy.createController("historial/historialRow", data).getView());
		});
	}
}

function close() {
	$.historial.close();
}

setData();

$.historial.open();
