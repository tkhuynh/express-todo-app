var express = require("express");
var bodyParser = require("body-parser");
var hbs = require("hbs");
var mongoose = require("mongoose");

var app = express();

app.set("view engine", "hbs");

app.use(express.static("public"));

//set up body-parser
app.use(bodyParser.urlencoded({
	extended: true
}));
//connect to mongodb
mongoose.connect('mongodb://localhost/todo-app');

var Todo = require("./models/todo"); //it's ok without .js

//seed data

var todos = [{
	_id: 1,
	task: "Go to the bank",
	description: "Withdraw some cash for personal use"
}, {
	_id: 2,
	task: "Go the supermarket",
	description: "Buy some fish and milk"
}, {
	_id: 3,
	task: "Lunch at noon",
	description: "See Jane at Totomi's restaurant"
}];

//setup routes

app.get("/", function(req, res) {
	res.render("index");
});

//set up todos api
app.get("/api/todos", function(req, res) {
	//Mongo
	//find all todos in db
	Todo.find(function(err, allTodos) {
		res.json({
			todos: allTodos
		});
	});
});

//get a todo by its Id
app.get("/api/todos/:id", function(req, res) {
	//Mongo
	//get id from url
	var todoId = req.params.id;

	// find todo in db by id
	Todo.findOne({
		_id: todoId
	}, function(err, foundTodo) {
		res.json(foundTodo);
	});
});

//create new one
app.post("/api/todos", function(req, res) {
	//Mongo
	// create new todo with form data (`req.body`)
	var newTodo = new Todo(req.body);

	// save new todo in db
	newTodo.save(function(err, savedTodo) {
		res.json(savedTodo);
	});
});

/// update todo
app.put('/api/todos/:id', function(req, res) {
	// get todo id from url params (`req.params`)
	var todoId = req.params.id;

	// find todo in db by id
	Todo.findOne({
		_id: todoId
	}, function(err, foundTodo) {
		// update the todos's attributes
		foundTodo.task = req.body.task;
		foundTodo.description = req.body.description;

		// save updated todo in db
		foundTodo.save(function(err, savedTodo) {
			res.json(savedTodo);
		});
	});
});

// delete todo
app.delete('/api/todos/:id', function(req, res) {
	// get todo id from url params (`req.params`)
	var todoId = req.params.id;

	// find todo in db by id and remove
	Todo.findOneAndRemove({
		_id: todoId
	}, function(err, deletedTodo) {
		res.json(deletedTodo);
	});
});

//listen to port 3000
var server = app.listen(process.env.PORT || 3000, function() {
	console.log("I'm listening");
});