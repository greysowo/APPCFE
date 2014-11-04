var args = arguments[0] || {};
var data = [];
var moment = require('alloy/moment');

function close() {
	$.recordatorios.close();
}

function newRecordatorio() {

	$.recordatorios.add(Alloy.createController("herramientas/nuevoRecordatorio", {
		win : $.recordatorios,
		setData : setData
	}).getView());
}

function setData() {
	data = [];
	var recordatoriosCollection = Alloy.Collections.recordatorios;
	recordatoriosCollection.fetch();
	//Ti.API.info(JSON.stringify(recordatoriosCollection));

	recordatoriosCollection.forEach(function(e) {
		var days;
		var fechaRecord = moment(e.get("fecha"), "DD-MM-YY");
		var today = moment();
		var today2 = moment().date(fechaRecord.date());
		Ti.API.info("dates:" + today.date() + " " + today2.date());

		if (today.date() > today2.date()) {
			var fechaRecord2 = today2.add(1, "month");
			days = fechaRecord2.diff(today, "days");
			Ti.API.info("dates:" + today.format() + ", " + fechaRecord2.format());
			Ti.API.info("days:" + days);
		} else {
			days = today2.diff(today, "days");
			Ti.API.info("dates2:" + today.format() + ", " + today2.format());
			Ti.API.info("days2:" + days);
		}
		//var days = fechaRecord.diff(today, "days");
		//Ti.API.info(fechaRecord + " " + days);
		var row = Alloy.createController("herramientas/rowRecordatorio", {
			id : e.get("id_recordatorio"),
			title : e.get("nombre"),
			fecha : e.get("fecha"),
			days : days
		}).getView();
		data.push(row);
		$.recordatoriosTable.appendRow(row);
	});
	$.recordatoriosTable.data = data;

}

setData();

Alloy.Globals.setDataRecord = setData;

$.recordatorios.open();
