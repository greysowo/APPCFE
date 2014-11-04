var args = arguments[0] || {};
Ti.API.info("id" + args.id);

function close(){
	$.detalleRecordatorio.close();
}

$.detalleRecordatorio.open();
