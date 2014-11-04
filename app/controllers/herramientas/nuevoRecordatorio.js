var args = arguments[0] || {};
var moment = require('alloy/moment');

function changeTF(e) {
	value = e.source.text;
	if (e.value == e.source.text) {
		this.value = "";
	}
}

function validatedTF(e) {
	if (e.value.length == 0) {
		this.value = value;
	}
}

function cancel() {
	args.win.remove($.nuevoRecordatorio);
}

function agregar() {
	if ($.nombre.value == "Nombre recordatorio") {
		alert("Es necesario introducir un nombre");
	} else if ($.fecha.text == "Fecha") {
		alert("Es necesario introduir una fecha");
	} else {
		var recordatoriosCollection = Alloy.Collections.recordatorios;

		var creado = moment().format();
		var dataSave = {
			nombre : $.nombre.value,
			fecha : $.fecha.text
		};
		Ti.API.info("data:" + JSON.stringify(dataSave));
		var model = Alloy.createModel('recordatorios', dataSave);
		recordatoriosCollection.add(model);
		model.save();
		//args.setData();
		Alloy.Globals.setDataRecord();
		args.win.remove($.nuevoRecordatorio);
	}
}

function showDate() {
	var top = Titanium.UI.createAnimation({
		top : -250,
		//visible : true,
		duration : 700
	});
	var top2 = Titanium.UI.createAnimation({
		bottom : 0,
		//visible : true,
		duration : 700
	});
	$.agregarView.animate(top);
	$.pickerView.animate(top2);
}

// $.picker.minDate = moment("1990-01-01");
// $.picker.maxDate = moment("2050-11-31");
// $.picker.value = moment();

function aceptarP() {
	var bottom = Titanium.UI.createAnimation({
		bottom : -280,
		//visible : true,
		duration : 700
	});
	var top2 = Titanium.UI.createAnimation({
		top : Alloy.Globals.windowHeight / 4,
		//visible : true,
		duration : 700
	});
	$.fecha.text = moment($.picker.value).format("DD-MM-YY");
	Ti.API.info($.picker.value);
	$.agregarView.animate(top2);
	$.pickerView.animate(bottom);
}

function cancelP() {
	var bottom = Titanium.UI.createAnimation({
		bottom : -280,
		//visible : true,
		duration : 700
	});
	var top2 = Titanium.UI.createAnimation({
		top : Alloy.Globals.windowHeight / 4,
		//visible : true,
		duration : 700
	});

	Ti.API.info(Alloy.Globals.windowHeight / 4);
	$.agregarView.animate(top2);
	$.pickerView.animate(bottom);
}

// var view = Ti.UI.createView({
// width : Ti.UI.FILL,
// backgroundColor : 'transparent',
// bottom : 0,
// zIndex : 3,
// visible : false
// });
// var viewOpacty = Ti.UI.createView({
// width : Ti.UI.FILL,
// backgroundColor : 'black',
// opacity : 0.8
// });
// var pickerDate = Ti.UI.createPicker({
// top : 15,
// type : Ti.UI.PICKER_TYPE_DATE,
// minDate : new Date(1990, 01, 01),
// maxDate : new Date(2050, 11, 31),
// value : new Date(),
// });
// var btn = Ti.UI.createButton({
// width : Ti.UI.FILL,
// title : 'Aceptar',
// width : '50%',
// bottom : 10
// }); 