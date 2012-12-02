(function($) {
	var api = function(method, cb) {
		$.getJSON(location.protocol+'//api.'+location.hostname.replace(/[^.]*\.?(.+)$/,'$1')+':'+location.port+'/'+method, cb);
	}
	api.ere = function(cb) {
		api('ere', cb);
	}
	window.kebabfredag = api;
})(window.jQuery);