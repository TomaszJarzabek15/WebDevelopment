var Itinerario = require("../models/itinerario");
var Comment = require("../models/comment");
//all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Itinerario.findById(req.params.id, function(err,  foundItinerario){
			if(err){
				req.flash("error", "Qualcosa è andato storto.");
				res.redirect("/itinerari");
			} else {
				//does user own the campground?
				if(foundItinerario.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "Non hai il permesso per farlo.");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "Devi fare il login per compiere questa azione.");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err,  foundComment){
			if(err){
				req.flash("error", "Qualcosa è andato storto.");
				res.redirect("back");
			} else {
				//does user own the campground?
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "Non hai il permesso per farlo.");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "Devi fare il login per compiere questa azione.");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Devi fare il login per compiere questa azione.");
	res.redirect("/login");
}


module.exports = middlewareObj;