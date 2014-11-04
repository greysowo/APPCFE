// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
Alloy.Globals.Map = require("ti.map");
Alloy.Collections.fallas = Alloy.createCollection('fallas');
Alloy.Collections.quejas = Alloy.createCollection('quejas');
Alloy.Collections.recordatorios = Alloy.createCollection('recordatorios');
Alloy.Globals.OSIOS = Titanium.Platform.osname !== "android" ? true : false;
Alloy.Globals.windowHeight = Ti.Platform.displayCaps.platformHeight; 