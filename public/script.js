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
		$("#create-todos").find("input[name='task'], textarea").val("");
		$.post(baseUrl, newTodo, function(data) {
			allTodos.push(data);
			render();
		});
	});

	$("#todos-list").on("click", ".edit-button", function() {
		var ID = $(this).attr("id");
		console.log(ID);
		var todoToBeEdited = allTodos.filter(function(todo) {
			return todo._id == ID;
		})[0];
		var todoToBeEditedIndex = allTodos.indexOf(todoToBeEdited);
		var $editForm = $("#form" + ID);
		$editForm.toggle();
		$("#todos-list").on("submit", $editForm, function(event) {
			event.preventDefault();
			var editedTodo = $editForm.serialize();
			console.log(editedTodo);
			//http://www.w3schools.com/jquery/traversing_find.asp find child element(s)
			$("#form" + ID).find("input[name='task'], textarea").val("");
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

	$("#todos-list").on("click", ".delete-button", function () {
		//if was del{{_id}} >> need to remove first 3 letters
		var ID = $(this).attr("id").slice(3); 
		var todoToBeDeleted = allTodos.filter(function(todo) {
			return todo._id == ID;
		})[0];
		var todoToBeDeletedIndex = allTodos.indexOf(todoToBeDeleted);
		$.ajax({
			type: "DELETE",
			url: baseUrl + "/" + ID,
			data: todoToBeDeleted,
			success: function (data) {
				allTodos.splice(todoToBeDeletedIndex, 1);
				render();
			}
		});
	});
});