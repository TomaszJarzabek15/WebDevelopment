var express = require("express");
var app = express();

app.get("/", function(req, res){
	res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res){
	
	var animal = req.params.animal.toLowerCase();
	var sounds = {
		pig: "Oink",
		cow: "Moo",
		dog: "Woof Woof!",
		cat: "I hate you human",
		goldfish: "..."
	}
	
	var sound = sounds[animal];
	
	res.send("The " + animal + " says '" + sound + "'");
	
/*	if(animal === "pig"){
		res.send("The " + animal + " says 'Oink'");
	}
	else if(animal === "cow"){
		res.send("The " + animal + " says 'Moo'");
	}
	else if(animal === "dog"){
		res.send("The " + animal + " says 'Woof Woof!'");
	}	*/
});

app.get("/repeat/:word/:num", function(req, res){
	
	var word = req.params.word;
	var num = Number(req.params.num);
	var result = "";
	
	for(var i = 0; i < num; i++){
		result = result + word + " ";
	}
	res.send(result);
});

app.get("*", function(req, res){
	res.send("Sorry, page not found... What are you doing with your life?");
})

app.listen(3000, function(){
	console.log("Server listening on port 3000");
})