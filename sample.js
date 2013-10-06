var http = require("http");
var fs = require("fs");
var url = require("url");

var app = http.createServer(function(request, response) {
	var pathname = url.parse(request.url).pathname;
	if (pathname[pathname.length-1] == '/') pathname = pathname.slice(0, pathname.length-1);
	console.log("\nGot a request at: " + pathname);

	if (pathname == '/favicon.ico') {
		console.log("Got a request for a favicon.");
		response.end();
		return;
	}

	var splitPath = pathname.split('/');
	if (splitPath.length > 2) {
		response.write('Hahahaha, you done entered a bad URL.');
		console.log(splitPath.length);
		response.end(); // Tells the broswer that the response is complete
		return;
	}

	if (pathname == '') {
		var filename = './simplePage.html';
	}
	else {
		var filename = './test.html';
	}

	html = fs.readFileSync(filename, 'utf-8');
	response.write(html);
	console.log("Served html (" + filename + ") file to broswer.");
	response.end(); // Tells the broswer that the response is complete
});

var port = process.env.PORT || 7500;
app.listen(port);
console.log("Listening on port: " + port);