var args = arguments[0] || {};

$.image.image = args.image.image;

function close() {
	args.window.remove($.imageDetalle);
}

args.window.add($.imageDetalle);
args.image.touchEnabled = true; 