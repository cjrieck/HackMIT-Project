var http = require("http");
var fs = require("fs");
var url = require("url");

var app = http.createServer(function(request, response) {
	// var fileHTML;
	var pathname = url.parse(request.url).pathname;

	// fs.readFile('./simplePage.html', function(err, html) {
	// 	fileHTML = html;
	// });
	
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello World at " + pathname);
	response.end();
	// response.writeHead(200, {"Content-Type": "text/html"});
	// response.write(fileHTML);
	// response.end();
});

var port = process.env.PORT || 5000;
app.listen(port);