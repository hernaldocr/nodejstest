var express = require("express");

var router = express.Router();

router.get("/",function(req,res){
	/*Busacar el usuario*/
	res.render("app/home");
});

module.exports = router;