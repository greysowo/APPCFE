var args = arguments[0] || {};
var tutorialShow = false;

function close() {
	$.tarifas.close();
}

function tutorial() {
	$.tarifas.add(Alloy.createController("herramientas/tutorial", {
		win : $.tarifas,
		tutorialShow : tutorialShow
	}).getView());
}

function tipoList() {
	var tipoLista = ["Doméstica", "Doméstica de Alto Consumo"];
	$.tarifas.add(Alloy.createController("UI/picker", {
		list : tipoLista,
		view : $.tarifas,
		label : $.tipo
	}).getView());

}

function tarifaList() {
	var tarifasLista;
	if ($.tipo.text = "Doméstica") {
		tarifasLista = ["1", "1A", "1B", "1C", "1D", "1E", "1F"];

	} else {
		tarifasLista = ["1 (250kwh)", "1A (300kwh)", "1B (400kwh)", "1C (850kwh)", "1D (1000kwh)", "1E (2000kwh)", "1F (2500kwh)"];
	}
	$.tarifas.add(Alloy.createController("UI/picker", {
		list : tarifasLista,
		view : $.tarifas,
		label : $.tarifa
	}).getView());
}

function rangoList() {
	// $.tarifas.add(Alloy.createController("UI/picker", {
	// list : rangoLista,
	// view : $.tarifas,
	// label : $.rango
	// }).getView());
}

function options() {
	// $.tarifas.add(Alloy.createController("UI/picker", {
	// list : optionsList,
	// view : $.tarifas,
	// label : $.textPicker
	// }).getView());

}

$.tarifas.open();
