var userData = require('userData').userData;
function changeTF(e) {
	value = e.source.text;
	if (e.value == e.source.text) {
		this.value = "";
		if (e.source.id == "pass") {
			this.passwordMask = true;
		}
	}
}

function validatedTF(e) {
	if (e.value.length == 0) {
		this.value = value;
		if (e.source.id == "pass") {
			this.passwordMask = false;
		}
	}
}

function blur(){
	$.user.blur();
	$.pass.blur();
}

function login() {
	$.activityIndicator.show();
	$.login.touchEnabled = false;
	if ($.user.value == "Usuario") {
		alert("Es necesario introducir un usuario.");
		$.user.focus();
		$.activityIndicator.hide();
		$.login.touchEnabled = true;
	} else {
		if ($.pass.value == "") {
			alert("Es necesario introducir una contraseña.");
			$.activityIndicator.hide();
			$.login.touchEnabled = true;
		} else {
			if ($.user.value == "cfe" && $.pass.value == "cfe") {
				alert('success');
				$.activityIndicator.hide();
				Ti.App.Properties.setBool("login", true);
				Ti.App.Properties.setBool("adminUser", true);
				//Ti.App.Properties.setObject("user", user);
				Alloy.createController("admin/adminHome").getView();
				Ti.API.info(Ti.App.Properties.getString("tokenID"));
				$.login.close();
			} else {
				var data = {
					login : {
						username : $.user.value,
						pass : $.pass.value,
						token_id : Ti.App.Properties.getString("tokenID")
						//token_id : "7878788"
					}
				};
				Ti.App.Properties.setString("user", $.user.value);
				Ti.App.Properties.setString("pass", $.pass.value);
				Ti.API.info(JSON.stringify(data));
				var dataUser = userData();
				var url = "http://pixeleate.com/propuestacfe/api/v1/login";
				var client = Ti.Network.createHTTPClient({
					// function called when the response data is available
					onload : function(e) {
						var user = {
							user : {}
						};
						Ti.API.info("Received text: " + this.responseText);
						alert('success');
						var response = JSON.parse(this.responseText);
						user.user = response.datos;
						//$.activityIndicator.hide();
						Ti.App.Properties.setBool("login", true);
						Ti.App.Properties.setObject("user", user);
						Alloy.createController("home").getView();
						$.login.close();
					},
					// function called when an error occurs, including a timeout
					onerror : function(e) {
						Ti.API.info(JSON.stringify(e));
						alert('error');
						$.activityIndicator.hide();
						$.login.touchEnabled = true;
					},
					timeout : 5000 // in milliseconds
				});
				// Prepare the connection.
				client.open("POST", url);
				client.setRequestHeader("Content-Type", "text/plain");
				// Send the request.
				client.send(JSON.stringify(data));
			}
		}
	}
}

function next() {
	$.pass.focus();
}

function registro() {
	Alloy.createController("registro").getView();
}

function noRegistro() {
	Ti.App.Properties.setBool("noLogin", true);
	Alloy.createController("home").getView();
	$.login.close();
}

function loginFB() {
	$.activityIndicator.show();
	$.login.touchEnabled = false;
	var fb = require('facebook');
	fb.appid = "877132405632142";
	fb.authorize();
	fb.addEventListener('login', function(e) {
		// alert(JSON.stringify(e));
		if (fb.loggedIn) {
			Ti.API.info("Logged");
			var data = {
				name : e.data.name,
				email : e.data.email
			};
			Ti.API.info(JSON.stringify(e));
			Ti.API.info(JSON.stringify(data));
			Alloy.createController("registro", {
				data : data
			}).getView();
			$.activityIndicator.hide();
			$.login.touchEnabled = true;
		} else {
			Ti.API.info("Error");
			Ti.API.info(JSON.stringify(e));
			$.activityIndicator.hide();
			$.login.touchEnabled = true;
		}
	});
}

function loginTW(e) {
	var social = require('alloy/social').create({
		consumerSecret : 'c4ZrvFdTnSLfI42MG1QnOkrvVDNTc4AbJwngxLts0VnPKbvYae',
		consumerKey : 'WZXbKDi3MNNGsy3I6ddc8MY6H'
	});
	if (!social.isAuthorized()) {
		social.authorize(function(e1) {
			Ti.API.info("Logged");
			Ti.API.info(JSON.stringify(e1));
		});
	} else {
		Ti.API.info("Logged");
		Ti.API.info(JSON.stringify(e));
	}

	// Deauthorize the application
	//social.deauthorize();
}

if (Alloy.Globals.OSIOS) {
	$.login.addEventListener("focus", function() {
		Titanium.UI.iPhone.setAppBadge(0);
	});
}

$.login.open();
