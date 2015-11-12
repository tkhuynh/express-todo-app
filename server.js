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

//get a todo by its Id
app.get("/api/todos/:id", function (req, res) {
	var todoId = parseInt(req.params.id);
	var foundTodo = todos.filter(function (todo) {
		return todo._id === todoId;
	});
	res.json(foundTodo);
});

//create new one
app.post("/api/todos", function (req, res) {
	var newTodo = req.body;
	if (todos.length > 0) {
		newTodo._id = todos[todos.length - 1]._id + 1;
	} else {
		newTodo._id = 1;
	}
	todos.push(newTodo);
	res.json(newTodo);
});

//edit todo
app.put("/api/todos/:id", function (req, res) {
  var todoId = parseInt(req.params.id);

  var todoToUpdate = todos.filter(function (todo) {
    return todo._id == todoId;
  })[0];

  todoToUpdate.task = req.body.task;
  todoToUpdate.description = req.body.description;

  res.json(todoToUpdate);
});

 //delete todo
app.delete('/api/todos/:id', function (req, res) {
  var todoId = parseInt(req.params.id);

  var todoToDelete = todos.filter(function (todo) {
    return todo._id == todoId;
  })[0];

  todos.splice(todos.indexOf(todoToDelete), 1);

  res.json(todoToDelete);
});

//listen to port 3000
var server = app.listen(process.env.PORT || 3000, function () {
	console.log("I'm listening");
});