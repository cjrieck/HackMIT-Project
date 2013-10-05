var http = require("http");
var url = require("url");

var app = http.createServer(function(request, response) {
	var pathname = url.parse(request.url).pathname;
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello World at " + pathname);
	response.end();
});

var port = process.env.PORT || 5000;
app.listen(port);