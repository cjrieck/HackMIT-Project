var http = require("http");
var fs = require("fs");

var app = http.createServer(function(request, response) {

	fs.readFile('./simplePage.html', function(err, html){
		if (err){
			throw err;
		}
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(html);
		response.end();
	});
	
// var url = require("url");

// var app = http.createServer(function(request, response) {
// 	var pathname = url.parse(request.url).pathname;
// 	response.writeHead(200, {"Content-Type": "text/plain"});
// 	response.write("Hello World at " + pathname);
// 	response.end();

}).listen(8000);

// var port = process.env.PORT || 5000;
// app.listen(port);