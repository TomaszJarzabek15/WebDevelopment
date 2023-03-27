var express = require("express");
var app = express();

// / Hi /bye Goodbye /dog Meow
app.get("/", function(req, res){
	res.send("Hi there!");
});

app.get("/bye", function(req, res){
	res.send("Goodbye");
});

app.get("/dog", function(req, res){
	console.log("Someone made a request to /dog");
	res.send("MEOW");
});

app.get("*", function(req, res){
	res.send("Error page not found");
});

//tells express to listen on a port and on an Ip this is for the server of groomide
	//app.listen(process.env.Port, process.env.IP, function(){
		//console.log("Server has started!!!");
	//});

//ma noi facciamo su port 3000
app.listen(3000, function(){
	console.log("Server listening on port 3000");
});