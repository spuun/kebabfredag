/*
	API for kebabfredag.nu
	http://api.kebabfredag.nu/js for js 
*/
var http = require('http');
var seaport = require('seaport');
var express = require('express');
var filed = require('filed');

// Configure module
var config = require('./config');
var serviceName = 'api';
var serviceVersion = '0.0.1';

var ports = seaport.connect(config.seaport.port);
var api = express();
var server = http.createServer(api);

var jsonHandler = function(cb) {
	return function(req, res) {
		var wrapped = res.end; 
		res.end = function(data) {
			res.setHeader('Content-Type','application/json');
			res.setHeader('Access-Control-Allow-Origin','*');
			wrapped.call(this, JSON.stringify(data));
		}
		cb.call(this, req, res);
	}
}

api.get('/js', function(req,res) {
	filed({path:'apiclient.js', mimetype:'text/javascript;charset=utf-8'}).pipe(res);
});

api.get('/ere', jsonHandler(function(req, res) {
	res.end({ ere:((new Date()).getDay() == 5) });
}));

// Register service to seaport
server.listen(ports.register(serviceName + '@' + serviceVersion));
console.log('Service ' + serviceName + '@' + serviceVersion + ' started.');