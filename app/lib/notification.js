var Cloud = require("ti.cloud");
if (!Alloy.Globals.OSIOS) {
	var CloudPush = require('ti.cloudpush');
	CloudPush.debug = true;
}

function notification() {
	var token = Ti.App.Properties.getBool("token");
	Ti.API.info("init suscribe:" + token);

	if (!token) {
		//alert("init suscribe1");
		if (Ti.Platform.name == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
			//alert("plataforma name" + Ti.Platform.version);
			function registerForPush() {
				Ti.Network.registerForPushNotifications({
					success : subscribeToChannel,
					error : Fail,
					callback : receivePush
				});
				// Remove event listener once registered for push notifications
				Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush);
			};

			// Wait for user settings to be registered before registering for push notifications
			Ti.App.iOS.addEventListener('usernotificationsettings', registerForPush);

			// Register notification types to use
			Ti.App.iOS.registerUserNotificationSettings({
				types : [Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE]
			});

		} else {
			if (!Alloy.Globals.OSIOS) {

				CloudPush.retrieveDeviceToken({
					success : subscribeToChannel,
					error : Fail
				});
				//CloudPush.addEventListener('callback', receivePush);
			} else {
				// For iOS 7 and earlier
				Ti.Network.registerForPushNotifications({
					// Specifies which notifications to receive
					types : [Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND],
					success : subscribeToChannel,
					error : Fail,
					callback : receivePush
				});

			}
		}
		function subscribeToChannel(e) {
			// alert("init suscribe2");
			//Ti.API.info("init suscribe");
			//Ti.API.info(JSON.stringify(e));
			var token = e.deviceToken;
			Cloud.PushNotifications.subscribeToken({
				device_token : token,
				//channel : 'ios',
				channel : 'test',
				type : Ti.Platform.name == 'android' ? 'android' : 'ios'
			}, function(e) {
				if (e.success) {
					//Ti.API.info('Subscribed1:' + JSON.stringify(e));
					Ti.API.info('Subscribed token:' + token);
					//alert("Suscribed" + token);
					Ti.App.Properties.setBool("token", true);
					Ti.App.Properties.setString("tokenID", token);
				} else {
					alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
					// Ti.API.info('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
				}
			});
		}

		function Fail(e) {
			//alert("fail suscription" + e.error);
			Ti.API.info("fail suscription" + e.error);
		}

		function receivePush(e) {
			//Ti.API.info('Received push: ' + JSON.stringify(e));
			//alert(e.data.alert);
		}

	} else {
		Ti.API.info(" DEVICE REGISTERED");
		// var unsus = Ti.App.Properties.getBool("unsubscribe");
		// if (!recepcion && !unsus) {
		// var unregistred = require("unresgistred2").unregistred;
		// unregistred();
		// } else {
		// Ti.API.info(" DEVICE REGISTERED or RECEPCION OFF");
		// }
	}
}

module.exports.notification = notification;
