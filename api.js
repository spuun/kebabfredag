var express = require('express'),
		kebabfredag = require('./kebabfredag');

var router = express.Router();
router.get('/', function(req,res) {
	res.end('<!doctype html><html><body><h1>kebapi!</h1><p>Use accept-header to control response format. Supported formats are json, text and html.</p><ul><li><a href="/api/ere"/>/ere</a></li></ul></body></html>');
});
// Old api.. Redirect to new
router.get('/erekebabfredag', function(req,res) {
	res.setHeader('X-API-Deprecated','this api is deprecated');
	res.setHeader('Location', 'http://ere.kebabfredag.nu' + req.baseUrl + '/ere');
	res.status(301).json({isIt: kebabfredag.ere() });
});
// new api
router.get('/ere', function(req,res) {
	var answer = kebabfredag.ere();
	res.format({
		json : function() {
			res.send({ answer: answer, /*isIt is depricated*/ isIt: answer });
		},
		text: function() {
			res.send( answer? 'jepp':'nepp');
		},
		html: function() {
			res.send('<!doctype html><html><body>' + ( answer? 'Jepp!':'Nepp.') + '</body></html>');
		},
		'default': function() {
			res.status(406).send('Not acceptable.');
		}
	});
});
console.log('api.js');
module.exports = router;

