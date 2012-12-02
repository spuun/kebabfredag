var http 		= require('http');
var seaport		= require('seaport');
var config 		= require('./config');
var express		= require('express');

var serviceName = "vote";
var serviceVersion = "0.0.1";

var ports = seaport.connect(config.seaport.port);
var app = express();
var server = http.createServer(app);



server.listen(config.vote.port);

// Register service to seaport
server.listen(ports.register(serviceName + '@' + serviceVersion));
console.log('Service ' + serviceName + '@' + serviceVersion + ' started.');