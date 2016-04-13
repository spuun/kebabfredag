var kebabfredag = {
	ere: function() {
		var today = new Date();
		if (today.getDay() == 5) {
			return true;
		}
		return false;
	}
};


module.exports = kebabfredag;
