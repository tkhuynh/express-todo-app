$(function() {
	var baseUrl = "/api/todos";
	var allTodos = [];
	var $toDoList = $("#todos-list");

	var source = $("#todos-template").html();
	var template = Handlebars.compile(source);

	var render = function () {
		$toDoList.empty();
		var todosHtml = template({todos: allTodos});
		$toDoList.append(todosHtml);
	};

	$.get(baseUrl, function (data) {
		allTodos = data;
		render();
	});
	$("#create-todos").on("submit", function(event) {
		event.preventDefault();
		var newTodo = $(this).serialize();
		if(allTodos.length > 0) {
			newTodo._id = allTodos[allTodos.length - 1]._id + 1;
		}
		document.getElementById("create-todos").reset();
		$.post(baseUrl, newTodo, function(data) {
			allTodos.push(data);
			render();
		});
	});

	// //still working on
	// $("#todos-list").on("click", $(".edit"), function(event) {
	// 	event.preventDefault();
	// 	var id = $(".edit").attr("id");
	// 	var $editForm = $("#form" + id);
	// 	$editForm.show();
	// 	var toBeEdit = allTodos.filter(function (todo) {
	// 		return todo._id == id;
	// 	});
	// 	var toBeEditIndex = allTodos.indexOf(toBeEdit);
	// 	$("#todos-list").on("click", $("#save"), function(event) {
	// 		var edited = $editForm.serialize();
	// 		document.getElementById("form" + id).reset();
	// 		console.log("DSD");
	// 	});
	// });

	$("#todos-list").on("click", $("#delete"), function(event) {
		event.preventDefault();
		var id = $(".edit").attr("id");
		var toBeDeleted = allTodos.filter(function (todo) {
			return todo._id == id;
		});
		var toBeDeletedIndex = allTodos.indexOf(toBeDeleted);
		console.log(toBeDeleted);
		$.ajax({
			type: "DELETE",
			url: baseUrl + "/" + id,
			success: function (data) {
				allTodos.splice(toBeDeletedIndex, 1);
				render();
			}
		});
	});
});