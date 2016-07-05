var mailer = require("nodemailer");

// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "hernaldojunior@gmail.com",
        pass: "Rom8923sa"
    }
});

var mail = {
    from: "Hernaldo <hernaldojunior@gmail.com>",
    to: "hernaldo@crcomm.cr",
    subject: "Send Email Using Node.js",
    text: "Node.js New world for me",
    html: "<b>Node.js New world for me</b>"
}

smtpTransport.sendMail(mail, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
    
    smtpTransport.close();
});