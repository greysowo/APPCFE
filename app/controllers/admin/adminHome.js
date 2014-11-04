var animation = require('alloy/animation');
var active = 0;
var activeButton = 0;
var numberPages = 3;
var animationActive = false;
$.buttons.active = $.buttons.children[0];

for (var i = 0; i < numberPages; i++) {

	var viewP = Ti.UI.createView({
		index : i,
		//backgroundColor : "white",
		backgroundImage : "/images/paginacion_2.png",
		height : 25,
		width : 25,
		left : 0,
	});

	if (i == 0) {
		viewP.backgroundImage = "/images/paginacion_1.png";
		//viewP.backgroundColor = "black";
		$.viewContainer.active = viewP;
	}
	$.padding.add(viewP);
}

function scroll() {
	//Ti.API.info("scrollView" + JSON.stringify($.padding.children));
	var currentPage = active;

	$.viewContainer.active.backgroundImage = "/images/paginacion_2.png";
	$.buttons.active.opacity = 0.3;
	$.padding.children[currentPage].backgroundImage = "/images/paginacion_1.png";
	$.buttons.children[active].opacity = 1;
	$.viewContainer.active = $.padding.children[currentPage];
	$.buttons.active = $.buttons.children[currentPage];
}

function swipe(e) {
	// Ti.API.info(JSON.stringify(e));
	if (!animationActive) {
		if (e.direction == "right") {
			left();
		} else if (e.direction == "left") {
			right();
		}
	}
}

function left() {
	animationActive = true;
	if (active > 0) {
		var viewTo = Number(active) - 1;
		if ($.viewContainer.children[viewTo].visible == false) {
			setTimeout(function() {
				$.viewContainer.children[viewTo].visible = true;
			}, 500);
		}
		animation.crossFade($.viewContainer.children[active], $.viewContainer.children[viewTo], 500, animationOff);
		active = viewTo;
	} else {
		if ($.viewContainer.children[2].visible == false) {
			setTimeout(function() {
				$.viewContainer.children[2].visible = true;
			}, 500);

		}
		animation.crossFade($.viewContainer.children[0], $.viewContainer.children[2], 500, animationOff);
		active = 2;
	}
	scroll();
}

function right() {
	animationActive = true;
	if (active < 2) {
		var viewTo = Number(active) + 1;
		Ti.API.info(viewTo + "viewTo");
		if ($.viewContainer.children[viewTo].visible == false) {
			setTimeout(function() {
				$.viewContainer.children[viewTo].visible = true;
			}, 500);

		}
		animation.crossFade($.viewContainer.children[active], $.viewContainer.children[viewTo], 500, animationOff);
		active = viewTo;
	} else {
		if ($.viewContainer.children[0].visible == false) {
			setTimeout(function() {
				$.viewContainer.children[0].visible = true;
			}, 500);

		}
		animation.crossFade($.viewContainer.children[2], $.viewContainer.children[0], 500, animationOff);
		active = 0;
	}
	scroll();
}

function animationOff() {
	animationActive = false;
}

function setView(e) {
	//Ti.API.info(e.source.index);
	var viewTo = e.source.index;
	var oldActive = active;
	active = viewTo;
	scroll();
	if ($.viewContainer.children[viewTo].visible == false) {
		setTimeout(function() {
			$.viewContainer.children[viewTo].visible = true;
		}, 800);
	}
	animation.crossFade($.viewContainer.children[oldActive], $.viewContainer.children[viewTo], 800, animationOff);
	setWindow(viewTo);
}

function openW(e) {
	//Ti.API.info(e.source.id);
	setWindow(e.source.id);
}

function setWindow(idWindow) {
	//Ti.API.info(idWindow);
	var id = isNaN(idWindow);
	id = !id ? Number(idWindow) : idWindow;
	Ti.API.info(id);
	switch(id) {
	case 0:
	case "atencion":
		Ti.API.info(idWindow);
		Alloy.createController("admin/atencionFallas").getView();
		break;
	case 1:
	case "historial":
		Ti.API.info(idWindow);
		Alloy.createController("admin/historial").getView();
		break;
	case 2:
	case "herramientas":
		Ti.API.info(idWindow);
		Alloy.createController("herramientas/herramientas").getView();
		break;
	}
}

if (Alloy.Globals.OSIOS) {
	$.adminHome.addEventListener("focus", function() {
		Titanium.UI.iPhone.setAppBadge(0);
	});
}

Alloy.Globals.homeClose = $.adminHome;
Alloy.Globals.isAdmin = true;

$.adminHome.open();

