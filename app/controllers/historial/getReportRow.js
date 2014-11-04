var args = arguments[0] || {};
var tipo = args.tipo;
$.tipo.text = $.tipo.text + tipo + "\nPresiona aqui para agregar una.";

//Ti.API.info(tipo);

function getReport(e) {
	if (tipo == " falla") {
		Alloy.createController("fallas/fallas").getView();
	} else {
		Alloy.createController("quejas/quejas", {
			id : e.row.id
		}).getView();
	}

}
