var login = Ti.App.Properties.getBool("login");
var noLogin = Ti.App.Properties.getBool("noLogin");
var notification = require("notification").notification;
var userAdmin = Ti.App.Properties.getBool("adminUser");

if (login || noLogin) {
	if (userAdmin) {
		Alloy.createController("admin/adminHome").getView();
	} else {
		Alloy.createController("home").getView();
	}
} else {
	Ti.App.Properties.setString('databaseName', 'database01');
	Ti.Database.install("/centros.sqlite", Ti.App.Properties.getString('databaseName'));
	Alloy.createController("login").getView();
}

notification();
