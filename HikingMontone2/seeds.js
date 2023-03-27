var mongoose = require("mongoose");
var Itinerario = require("./models/itinerario");
var Comment = require("./models/comment");

var seeds = [
	{
		name: "Cloud's rest",
		image: "https://media-cdn.tripadvisor.com/media/photo-s/10/ab/68/b9/several-sites-do-have.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum mi at lectus rutrum, non tincidunt orci accumsan. In euismod metus vel velit euismod luctus nec eu odio. Aliquam nisl velit, consectetur ut nunc quis, feugiat porta neque. Proin felis leo, venenatis quis varius eget, commodo id nulla. Nulla maximus placerat condimentum. Curabitur mi nibh, tempus quis mollis eu, pretium nec metus. Integer aliquet lobortis justo quis pellentesque. Nulla libero metus, facilisis quis elit at, feugiat congue lorem. Praesent at lacus in nisl tincidunt viverra sed vitae sapien. Etiam auctor nisl vel tempor laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra in ex eget fringilla. "
	},
	{
		name: "Cloud's rest",
		image: "https://media-cdn.tripadvisor.com/media/photo-s/10/ab/68/b9/several-sites-do-have.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum mi at lectus rutrum, non tincidunt orci accumsan. In euismod metus vel velit euismod luctus nec eu odio. Aliquam nisl velit, consectetur ut nunc quis, feugiat porta neque. Proin felis leo, venenatis quis varius eget, commodo id nulla. Nulla maximus placerat condimentum. Curabitur mi nibh, tempus quis mollis eu, pretium nec metus. Integer aliquet lobortis justo quis pellentesque. Nulla libero metus, facilisis quis elit at, feugiat congue lorem. Praesent at lacus in nisl tincidunt viverra sed vitae sapien. Etiam auctor nisl vel tempor laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra in ex eget fringilla. "
	},
	{
		name: "Cloud's rest",
		image: "https://media-cdn.tripadvisor.com/media/photo-s/10/ab/68/b9/several-sites-do-have.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum mi at lectus rutrum, non tincidunt orci accumsan. In euismod metus vel velit euismod luctus nec eu odio. Aliquam nisl velit, consectetur ut nunc quis, feugiat porta neque. Proin felis leo, venenatis quis varius eget, commodo id nulla. Nulla maximus placerat condimentum. Curabitur mi nibh, tempus quis mollis eu, pretium nec metus. Integer aliquet lobortis justo quis pellentesque. Nulla libero metus, facilisis quis elit at, feugiat congue lorem. Praesent at lacus in nisl tincidunt viverra sed vitae sapien. Etiam auctor nisl vel tempor laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra in ex eget fringilla. "
	}
];

async function seedDB(){
	try {
	await Comment.remove({});
	console.log("Comments removed");
	await Itinerario.remove({});
	console.log("Campgrounds removed");
	
	for(const seed of seeds){
		let itinerario = await Itinerario.create(seed);
		console.log("Campgrounds created");
		let comment = await Comment.create(
			{
				text:"This place is great",
				author: "Homer"
			}
		)
		console.log("Comment created");
		itinerario.comments.push(comment);
		itinerario.save();
		console.log("Comment added to campground");
		} 
	} catch(err){
		console.log(err);
	} 
	
}


module.exports = seedDB;