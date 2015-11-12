var express = require("express");
var bodyParser = require("body-parser");
var hbs =  require("hbs");

var app = express();

app.set("view engine", "hbs");

app.use(express.static("public"));

//set up body-parser
app.use(bodyParser.urlencoded({extended: true}));





//listen to port 3000
var server = app.listen(process.env.PORT || 3000, function () {
	console.log("I'm listening");
});