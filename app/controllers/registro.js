var args = arguments[0] || {};
Ti.API.info("args" + args.length);
var index = 2;

if (args.length != undefined) {
	Ti.API.info(JSON.stringify(args.data));
	$.nombre.value = args.data.name;
	$.email.value = args.data.email;
}

function close() {
	$.registro.close();
}

function changeTF(e) {
	index = Number(e.source.index);
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

function next() {
	Ti.API.info(JSON.stringify($.container.children[index + 1]));
	Ti.API.info("index:" + index);
	var tf = $.container.children[index + 1].focus();
}

function registro() {
	$.activityIndicator.show();
	$.registro.touchEnabled = false;
	if ($.noServicio.value == "No. de servicio") {
		alert("Es necesario Introducir un número de servicio.");
		$.activityIndicator.hide();
		$.registro.touchEnabled = true;
		return;
	} else {
		if (isNaN($.noServicio.value)) {
			alert("El valor de No. de Servicio no es número.");
			$.activityIndicator.hide();
			$.registro.touchEnabled = true;
			return;
		} else {
			var values = {
				user : {
					full_name : $.nombre.value,
					// dir : $.dir.value,
					email : $.email.value,
					phone : "111111",
					no_servicio : $.noServicio.value,
					username : $.user.value,
					pass : $.pass.value
				}
			};
			Ti.API.info(JSON.stringify(values));
			var url = "http://pixeleate.com/propuestacfe/api/v1/registro";
			var client = Ti.Network.createHTTPClient({
				// function called when the response data is available
				onload : function(e) {
					Ti.API.info("Received text: " + this.responseText);
					alert('success');
					$.activityIndicator.hide();
					$.registro.touchEnabled = true;
					Ti.App.Properties.setBool("login", true);
					Ti.App.Properties.setObject("user", values);
					//Ti.App.Properties.setObject("user", user);
					Alloy.createController("home").getView();
					$.registro.close();
				},
				// function called when an error occurs, including a timeout
				onerror : function(e) {
					Ti.API.info(e.error);
					alert('error');
					$.activityIndicator.hide();
					$.registro.touchEnabled = true;
				},
				timeout : 5000 // in milliseconds
			});
			// Prepare the connection.
			client.open("POST", url);
			client.setRequestHeader("Content-Type", "text/plain");
			// Send the request.
			//client.send(values);
			client.send(JSON.stringify(values));
		}

	}
}

$.registro.open();
