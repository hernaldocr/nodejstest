var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var app = express();

app.use("/estatico",express.static('public'));

app.use(bodyParser.json()); //peticiones application/json
app.use(bodyParser.urlencoded({extended: true})); //peticiones application/json

app.use(express.static('assets'));

app.set("view engine", "jade");

app.get("/", function(req,res){
	res.render("index");
});

app.get("/login", function(req,res){
	User.find(function(err,doc){
		console.log(doc);
		res.render("login");
	});
	
});

app.post("/users", function(req,res){
	
	var user = new User({email: req.body.email, 
		                 password: req.body.password,
		                 password_confirmation: req.body.password_confirmation,
		                 username: req.body.username
		               });

//vamos a usar el nuevo metodo de guardar con promesas usando then

	user.save().then(function(us){
		res.send("Guardamos el usuario exitosamente");
	 	},function(err){
	 		if(err){
	 			console.log(String(err));
	 			res.send("No pudimos guardar la informacion")
	 		}
	 	});
	

	/*Callback save
	user.save(function(err){
		if(err){
			console.log(String(err));
		}
		res.send("Guardamos tus datos");
	});
	*/
});

app.listen(8080);