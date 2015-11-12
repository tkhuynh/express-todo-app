var express = require("express");
var bodyParser = require("body-parser");
var hbs =  require("hbs");

var app = express();

app.set("view engine", "hbs");

app.use(express.static("public"));

//set up body-parser
app.use(bodyParser.urlencoded({extended: true}));

//seed data

var todos = [
		{
			_id: 1,
			task: "Go to the bank",
			description: "Withdraw some cash for personal use"
		},
		{
			_id: 2,
			task: "Go the supermarket",
			description: "Buy some fish and milk"
		},
		{
			_id: 3,
			task: "Lunch at noon",
			description: "See Jane at Totomi's restaurant"
		}
];

//setup routes

app.get("/", function (req, res) {
	res.render("index");
});
//set up todos api
app.get("/api/todos", function (req, res) {
	res.json(todos);
});



//listen to port 3000
var server = app.listen(process.env.PORT || 3000, function () {
	console.log("I'm listening");
});