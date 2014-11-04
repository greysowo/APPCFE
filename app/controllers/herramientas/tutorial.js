var args = arguments[0] || {};
var numberPages = 4;
args.tutorialShow = true;

function close() {
	args.tutorialShow = false;
	args.win.remove($.tutorial);
}

function scroll(e) {
	var currentPage = e.currentPage;

	$.scrollableView.active.backgroundImage = "/images/tutorial/circulo_inactive.png";
	$.padding.children[currentPage].backgroundImage = "/images/tutorial/circulo_active.png";
	$.scrollableView.active = $.padding.children[currentPage];
}

for (var i = 0; i < numberPages; i++) {

	var viewP = Ti.UI.createView({
		index : i,
		backgroundImage : "/images/tutorial/circulo_inactive.png",
		height : 15,
		width : 15,
		left : 5,
	});

	if (i == 0) {
		viewP.backgroundImage = "/images/tutorial/circulo_active.png";
		$.scrollableView.active = viewP;
	}
	$.padding.add(viewP);
}

args.win.addEventListener("androidback", function() {
	if(args.tutorialShow){
		args.tutorialShow = false;
		args.win.remove($.tutorial);
	} else {
		args.win.close();
	}
	
}); 