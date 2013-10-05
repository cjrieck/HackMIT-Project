var http = require("http");

var app = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "html"});
  response.write("simplePage.html");
  response.end();
});

var port = process.env.PORT || 5000;
app.listen(port);