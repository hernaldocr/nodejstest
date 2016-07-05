var http = require("http");
	fs = require("fs");
	parser = require("./params_parser.js");
	render = require("./render_view.js");

var p = parser.parse;
var ren = render.render;

http.createServer(function(req,res){
	if(req.url.indexOf("favicon.ico") > 0) { return; } 	
	//console.log(req);
	fs.readFile("./index.html", function(err,html){ 
		var html_string = html.toString();
		var nombre = "";
		var parametros = p(req);
		res.writeHead(200,{"Content-Type":"text/html"});
		res.write(ren(html_string,parametros));
		res.end();
	});
}).listen(8080);