var args = arguments[0] || {};
var list = args.list;
//Ti.API.info(args);

for (item in list) {
	//Ti.API.info(list[item]);
	$.list.appendRow(Alloy.createController("UI/pickerItem", {
		title : list[item]
	}).getView());
}

function setValue(e) {
	//Ti.API.info(JSON.stringify(e));
	if (e.row.value == "Otro") {
		setTimeout(function() {
			$.pickerView.remove($.picker);
			$.otroView.visible = true;
		}, 400);
		//alert("Otro");
	} else {
		args.label.text = e.row.value;
		setTimeout(function() {
			cancel();
		}, 400);
	}
}

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
	args.view.remove($.pickerView);
}

$.textInfo.text = $.textInfo.text + " " + args.tipo;
$.nuevoTipo.value = $.nuevoTipo.value + " " + args.tipo;
$.nuevoTipo.text = $.nuevoTipo.text + " " + args.tipo;

function otroValue(e) {
	// Ti.API.info(JSON.stringify(e));
	// Ti.API.info($.nuevoTipo.value);
	if ($.nuevoTipo.value == $.nuevoTipo.text || $.nuevoTipo.value == "") {
		$.nuevoTipo.blur();
		alert("Debes introducir un nuevo tipo de " + args.tipo);
	} else {
		args.label.text = $.nuevoTipo.value;
		setTimeout(function() {
			cancel();
		}, 400);
		$.nuevoTipo.blur();
	}
}
