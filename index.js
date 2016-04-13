const template = require('jontemplate');
const express = require('express');
const kebabfredag = require('./kebabfredag');
const path = require('path');

const app = express();
app.engine('html', template());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('view cache', false);

app.get('/api', require('./api'));
app.use(express.static('static'));

app.get('/', (req, res) => {

	res.render('index', {
		answer: true	
	});
});

module.exports = app;
