var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var  TodoSchema = new Schema ({
	task: String,
	description:  String
});
						
var Todo = mongoose.model("Todo", TodoSchema);
						//this should match variable name

module.exports = Todo;
