var http = require("http");
var fs = require("fs");
var url = require("url");

var app = http.createServer(function(request, response) {
	var fileHTML;
	var pathname = url.parse(request.url).pathname;

	fs.readFile('./simplePage.html', function(err, html) {
		fileHTML = html;
	});
	
	response.writeHead(200, {"Content-Type": "text/html"});
	// response.write("Hello World at " + pathname);
	response.write(typeof(fileHTML));
	response.end();
});

var port = process.env.PORT || 5000;
app.listen(port);