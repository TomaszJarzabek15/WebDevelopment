var express = require("express");
var router = express.Router({mergeParams: true});
var Itinerario = require("../models/itinerario");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//comment route
//comments new
router.get("/new", middleware.isLoggedIn, function(req, res){
	//trova itinerario con id
	Itinerario.findById(req.params.id, function(err, itinerario){
		if(err){
			console.log(err);
		} else{
			res.render("comments/new", {itinerario: itinerario});
		}
	});
});

//comments create
router.post("/", middleware.isLoggedIn, function(req, res){
	//trova campgrounds
	Itinerario.findById(req.params.id, function(err, itinerario){
		if(err){
			console.log(err);
			res.redirect("/itinerari");
		} else {
			
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					itinerario.comments.push(comment);
					itinerario.save();
					req.flash("success", "Commento aggiunto");
					res.redirect('/itinerari/' + itinerario._id);
				}
				
			});
		}
	});
});

//commnets edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.rediretc("back");
		} else {
			res.render("comments/edit", {itinerario_id: req.params.id, comment: foundComment});
		}
	});
});

//comments update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else{
			req.flash("success", "Commento modificato");
			res.redirect("/itinerari/" + req.params.id);
		}
	});
});

//comment destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	//findByIdAndRemove for destroy
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Commento rimosso");
			res.redirect("/itinerari/" + req.params.id);
		}
	})
});

module.exports = router;