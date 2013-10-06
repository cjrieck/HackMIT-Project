var http = require("http");
var fs = require("fs");
var url = require("url");

var app = http.createServer(function(request, response) {
	var pathname = url.parse(request.url).pathname;
	
	html = fs.readFileSync('./simplePage.html', 'utf-8');
	response.write(html);
	response.end();
});

var port = process.env.PORT || 7500;
app.listen(port);
console.log("Listening on port: " + port);

