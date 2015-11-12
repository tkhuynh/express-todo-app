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

	$("#todos-list").on("click", $(".edit"), function(event) {
		var id = $(".edit").attr("id");
		$("#row" + id).toggle();
	});
});