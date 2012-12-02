/*
	Serves static content for kebabfredag.nu
*/
var http 	= require('http');
var seaport = require('seaport');
var path 	= require('path');
var fs		= require('fs');
var filed	= require('filed');
var mime	= require('mime');
var swig	= require('swig');

var config = require('./config');
var serviceName = 'static';
var serviceVersion = '0.0.1';

var ports = seaport.connect(config.seaport.port);

swig.init({
    allowErrors: false,
    autoescape: true,
    cache: !config.debug,
    encoding: 'utf8',
    filters: {},
    root: '/',
    tags: {},
    extensions: {},
    tzOffset: 0
});

var server = http.createServer(function (req, res) {
	var filename = path.join(__dirname,'app',(req.url == '/' ? '/index.html' : req.url));
	fs.exists(filename, function(exists) {
		if (exists)
		{   
			// html files through swig
			if (/\.html$/.test(filename))
			{
				var html = swig.compileFile(filename).render({
					domain:req.headers.host.replace(/[^.]*\.?(.+)$/,'$1')
				});
				res.setHeader('Content-type', 'text/html;charset=utf-8');
				res.end(html);
			}	
			// all other files are piped with filed			
			else 
			{
				filed({
					path:filename, 
					mimetype:mime.lookup(path.extname(filename).substring(1)) + ';charset=utf-8'
				}).pipe(res);
			}			
		} 
		else
		{
			res.statusCode = 404;
			res.end('File not found.\nYou are still allowed to eat kebab!');  
		}
	});
});

// Register service to seaport
server.listen(ports.register(serviceName + '@' + serviceVersion));
console.log('Service ' + serviceName + '@' + serviceVersion + ' started.');