var express = require("express");
var router = express.Router();
var Itinerario = require("../models/itinerario");
var middleware = require("../middleware"); //automaticamente richiede index.js

//index route
router.get("/", function(req, res){
	//get itinerari form mongodb
	Itinerario.find({}, function(err, tuttiItinerari){
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/index", {itinerari: tuttiItinerari, currentUser: req.user});
		}
	});
	//res.render("itinerari", {itinerari: itinerari});
});

//create route
router.post("/", middleware.isLoggedIn, function(req, res){
	//get data from a form add to itinerari array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newItinerario = {name: name, image: image, description: description, author: author};
	
	//crea e salva nel database
	Itinerario.create(newItinerario, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect to itinerari page
			res.redirect("/itinerari");
		}
	});
});

//new route
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

//fa vedere più info su un itinerario
router.get("/:id", function(req, res){
	//find the itinerario with id
	Itinerario.findById(req.params.id).populate("comments").exec(function(err, foundItinerario){
		if(err){
			console.log(err);
		} else{
			console.log(foundItinerario);
			res.render("campgrounds/show", {itinerario: foundItinerario});
		}
	});
	//render a show template
});

//edit route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Itinerario.findById(req.params.id, function(err,  foundItinerario){
		res.render("campgrounds/edit", {itinerario: foundItinerario});
	});
});

//update route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	//find and update the campground and redirect
	Itinerario.findByIdAndUpdate(req.params.id, req.body.itinerario, function(err, updatedItinerario){
		if(err){
			res.redirect("/itinerari");
		} else{
			res.redirect("/itinerari/" + req.params.id);
		}
	});
});

//destroy route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Itinerario.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/itinerari");
		} else {
			res.redirect("/itinerari");
		}
	});
});

module.exports = router; 