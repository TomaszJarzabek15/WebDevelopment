var express    = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	passport   = require("passport"),
	LocalStrategy = require("passport-local"),
	Itinerario = require("./models/itinerario"),
	methodOverride = require("method-override"),
	Comment    = require("./models/comment"),
	User       = require("./models/user"),
	seedDB	   = require("./seeds"),
	flash	   = require("connect-flash");

//requiring routes
var commentRoutes   = require("./routes/comments"),
	itinerariRoutes = require("./routes/itinerari"),
	indexRoutes      = require("./routes/index");


mongoose.connect("mongodb://localhost/hiking_montone");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seeding database
seedDB();

//passport configuration
app.use(require("express-session")({
	secret: "Max is a very cute little cat",
	resave: false,
	savenUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/itinerari",itinerariRoutes);
app.use("/itinerari/:id/comments", commentRoutes);

app.listen(3000, function(){
	console.log("The Hiking Montone Server Has Started!");
});