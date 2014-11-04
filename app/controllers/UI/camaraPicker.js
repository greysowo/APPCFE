var args = arguments[0] || {};
var image = args.image;
var list = ["Camara", "Galería"];
//Ti.API.info(args);

for (item in list) {
	//Ti.API.info(list[item]);
	$.list.appendRow(Alloy.createController("UI/pickerItem", {
		title : list[item]
	}).getView());
}

function setValue(e) {
	//Ti.API.info(JSON.stringify(e));
	if (e.row.value == "Camara") {
		showCamara();
	} else {
		showCarrete();
	}
	cancel();
	// setTimeout(function() {
	// cancel();
	// }, 400);
}

function showCarrete() {
	Titanium.Media.openPhotoGallery({
		success : function(event) {
			var photo = event.media.imageAsResized(500, 500);
			image.image = photo;

		},
		cancel : function() {
			Ti.API.info("cancelado!");
			// called when user cancels taking a picture
		},
		error : function(error) {
			// called when there's an error
			var a = Titanium.UI.createAlertDialog({
				title : 'Camara'
			});
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('Lo sentimos hubo un error');
			} else {
				a.setMessage('Unexpected error: ' + error.code);
			}
			a.show();
		},
		//allowEditing : true
		// mediaTypes : [Ti.Media.MEDIA_TYPE_VIDEO, Ti.Media.MEDIA_TYPE_PHOTO]

	});
}

function showCamara() {
	Titanium.Media.showCamera({
		success : function(event) {
			// called when media returned from the camera

			var photo = event.media.imageAsResized(500, 500);
			image.image = photo;
		},
		cancel : function() {
			// called when user cancels taking a picture
		},
		error : function(error) {
			// called when there's an error
			var a = Titanium.UI.createAlertDialog({
				title : 'Camara'
			});
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('Lo sentimos pero es necesario la camara del dispositivo');
			} else {
				a.setMessage('Unexpected error: ' + error.code);
			}
			a.show();
		},
		// saveToPhotoGallery : false,
		// allowEditing and mediaTypes are iOS-only settings
		// mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
	});
}

function cancel() {
	args.view.remove($.camaraPicker);
} 