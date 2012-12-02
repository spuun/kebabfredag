var forever 	= require('forever-monitor');
var bouncy		= require('bouncy');
var seaport 	= require('seaport');
var util 		= require('util');
var fs			= require('fs');

var config 		= require('./config');

// create 
var ports = seaport.createServer();
	ports.listen(config.seaport.port);


// routing
bouncy(function(req, bounce) {
	console.log("REQUEST:");
	console.log(req.headers.host);
	console.log(req.url);
	var service = req.headers.host.split('.')[0] || 'static';
	console.log(service);
	if (/^www|ere$/.test(service))
	{
		service = 'static';
	}
	console.log(service);
	var reqService = {name: service, version:'0.0.x' };
	// get services for our request
	var services = ports.query(reqService.name + '@' + reqService.version);
	if (services.length === 0)
	{	
		// No service found. Send error.
		var res = bounce.respond();
		res.statusCode = 503;
		res.end('Service not available\n');
	}
	else
	{
		// Select random service and bounce request
		bounce(services[Math.floor(Math.random() * services.length)]);
	}
}).listen(config.http.port);

var runningServices = {};

// launch services
['static','api', 'vote'].forEach(function(moduleName) {
	console.log('Starting service ' + moduleName + '.');
	runningServices[moduleName] = new (forever.Monitor)(moduleName + '.js', {});
	runningServices[moduleName].start();
});

// some debug features that may be useful during development
if (config.debug)
{	
	ports.on('register', function (service) {
		console.log(util.format('Service %s@%s registered', service.role, service.version));
	});

	for (var key in runningServices)
	{
		runningServices[key].on('exit', function() {
			console.log('Service ' + key + ' has exited.');
		});
		// watch module files when we're developing so we won't have to restart manually
		fs.watch(key + '.js', function() {
			runningServices[key].restart();
		});
	};
}

