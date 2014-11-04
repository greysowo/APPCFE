var args = arguments[0] || {};

if (Alloy.Globals.isAdmin) {
	$.tableView.data = [$.cerrarSesion];
	// $.tableView.add($.centros);
	// $.tableView.deleteRow(1);
	// $.tableView.deleteRow(2);
}

function close() {
	$.herramientas.close();
}

function getWin(e) {
	if (e.row.url == "cerrar") {
		$.herramientas.close();
		Ti.App.Properties.setBool("login", false);
		Ti.App.Properties.setBool("noLogin", false);
		Ti.App.Properties.setBool("adminUser", false);
		Ti.App.Properties.setObject("user", null);
		Alloy.Globals.isAdmin = null;
		Alloy.createController("login").getView();

		if (Alloy.Globals.homeClose) {
			Alloy.Globals.homeClose.close();
		}

	} else {
		Alloy.createController(e.row.url).getView();
	}
}

$.herramientas.open();
