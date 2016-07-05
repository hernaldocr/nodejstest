var express = require('express');
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport")
var app = express();

var smtpTransport = nodemailer.createTransport(smtpTransport({
    host : "mail.netcrc.net",
    secureConnection : false,
    port: 25,
    auth : {
        user : "monitorweb@netcrc.net",
        pass : "S@nJose99"
    }
}));
app.get('/send',function(req,res){
    var mailOptions={
        from : "monitorweb@netcrc.net",
        to : "hernaldo@crcomm.cr",
        subject : "test email",
        text : "Your Text",
        html : "HTML GENERATED",
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log(response.response.toString());
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});

app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});