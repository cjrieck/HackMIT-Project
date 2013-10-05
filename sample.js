var http = require("http");
var fs = require("fs");
var url = require("url");

var app = http.createServer(function(request, response) {
	var pathname = url.parse(request.url).pathname;

	fs.readFile('./simplePage.html', 'utf-8', function(err, html) {
		if (err) {
			throw err;
		}
		// response.write("Hello World at " + pathname);
		response.write(html);
		response.end();
	});
});

var port = process.env.PORT || 5000;
app.listen(port);