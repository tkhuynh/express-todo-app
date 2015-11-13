$(function() {
	var baseUrl = "/api/todos";
	var allTodos = [];
	var $toDoList = $("#todos-list");
	var source = $("#todos-template").html();
	var template = Handlebars.compile(source);
	var render = function() {
		$toDoList.empty();
		var todosHtml = template({
			todos: allTodos
		});
		$toDoList.append(todosHtml);
	};
	$.get(baseUrl, function(data) {
		allTodos = data.todos;
		render();
	});
	$("#create-todos").on("submit", function(event) {
		event.preventDefault();
		var newTodo = $(this).serialize();
		if (allTodos.length > 0) {
			newTodo._id = allTodos[allTodos.length - 1]._id + 1;
		}
		document.getElementById("create-todos").reset();
		$.post(baseUrl, newTodo, function(data) {
			allTodos.push(data);
			render();
		});
	});

	$("#todos-list").on("click", ".edit-button", function() {
		var ID = $(this).attr("id");
		var todoToBeEdited = allTodos.filter(function(todo) {
			return todo._id == ID;
		})[0];
		var todoToBeEditedIndex = allTodos.indexOf(todoToBeEdited);
		var $editForm = $("#form" + ID);
		$editForm.toggle();
		$("#todos-list").on("submit", $editForm, function(event) {
			event.preventDefault();
			var editedTodo = $editForm.serialize();
			document.getElementById("form" + ID).reset();
			$.ajax({
				type: "PUT",
				url: baseUrl + "/" + ID,
				data: editedTodo,
				success: function(data) {
					allTodos.splice(todoToBeEditedIndex, 1, data);
					render();
				}
			});
		});
	});

	$("#todos-list").on("click", $("#delete"), function () {
		console.log("clicked");
	});
});