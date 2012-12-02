(function($, api) {
	var answer = function() {
		api.ere(function(data) {
			with($('#the-answer'))
			{
				removeClass('loading');
				empty();
				text(data.ere ? 'Jepp :)' : 'Nepp :(');
				hide();
				fadeIn();
			}
		});
	}
	$(function() {
		answer();
	});
})(window.jQuery, window.kebabfredag);