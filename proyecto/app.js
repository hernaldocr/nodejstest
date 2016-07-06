var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var session = require("express-session");
var router_app = require("./routes_app");
var session_middleware = require("./middlewares/session");


var app = express();

app.use("/estatico",express.static('public'));
app.use(bodyParser.json()); //peticiones application/json
app.use(bodyParser.urlencoded({extended: true})); //peticiones application/json
app.use(express.static('assets'));
app.use(session({
	secret: "sdfasdfasdf1223",
	resave: false,
	saveUninitialized: false
}));

app.set("view engine", "jade");

app.get("/", function(req,res){
	console.log(req.session.user_id);
	res.render("index");
});

app.get("/signup", function(req,res){
	User.find(function(err,doc){
		console.log(doc);
		res.render("signup");
	});
	
});

app.get("/login", function(req,res){
	res.render("login");
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
	 			res.send("No pudimos guardar la informacion");
	 		}
		});
});

app.post("/sessions", function(req,res){
	User.findOne({email:req.body.email,password:req.body.password},function(err,user){
		console.log(user);
		req.session.user_id= user._id;
		res.send("Hola Mundo");
	});
});


app.use("/app", session_middleware);
app.use("/app",router_app);

app.listen(8080);