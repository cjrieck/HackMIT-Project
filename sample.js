var http = require("http");

var app = http.createServer();

app.get("/", function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
});

var port = process.env.PORT || 5000;
app.listen(port);