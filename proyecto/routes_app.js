var express = require("express");
var Imagen = require("./models/imagenes");
var router = express.Router();

router.get("/",function(req,res){
	/*Busacar el usuario*/
	res.render("app/home");
});

/* REST */

router.get("/imagenes/new",function(req,res){
	res.render("app/imagenes/new");
});
router.get("/imagenes/:id/edit",function(req,res){
	Imagen.findById(req.params.id,function(err,imagen){
		res.render("app/imagenes/edit",{imagen:imagen});
	});
	
});

router.route("/imagenes/:id")
	.get(function(req,res){
		Imagen.findById(req.params.id,function(err,imagen){
			res.render("app/imagenes/show",{imagen:imagen});
		});
		
	})
	.put(function(req,res){
		Imagen.findById(req.params.id,function(err,imagen){
			imagen.title= req.body.title;
		

		});

	})
	.delete(function(req,res){
		
	});

router.route("/imagenes")
	.get(function(req,res){ //obtener la collection de imagines
		Imagen.find({},function(err,imagenes){
			res.render("app/imagenes/index",{imagenes: imagenes});
		});
	})
	.post(function(req,res){ //guardar la colecion de imagenes
		var data = {
			title: req.body.title
		}
		var imagen = new Imagen(data);
		
		imagen.save(function(err){
			if(!err){
				res.redirect("/app/imagenes/"+imagen._id);
			}
			else{
				res.render(err);
			}
		});
	});

module.exports = router;