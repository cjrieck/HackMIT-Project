var http = require("http");
var fs = require("fs");
var url = require("url");

var app = http.createServer(function(request, response) {
	var fileHTML;
	var pathname = url.parse(request.url).pathname;

	fs.readFile('./simplePage.html', 'utf-8', function(err, html) {
		fileHTML = html;
		response.write(fileHTML);
	});

	// response.write("Hello World at " + pathname + "\n");
	response.end();
});

var port = process.env.PORT || 7500;
app.listen(port);