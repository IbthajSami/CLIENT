$(function() {
  loadtasks();
  $("#recipes").on("click", ".btn-danger", handleDelete);
  $("#recipes").on("click", ".btn-warning", handleUpdate);
  $("#addBtn").click(addTasks);
  $("#updateSave").click(function() {
    var id = $("#updateId").val();
    var title = $("#updateTitle").val();
    var body = $("#updateBody").val();
    $.ajax({
      url: "http://localhost:3000/api/task/" + id,
      data: { title, body },
      method: "PUT",
      success: function(response) {
        console.log(response);
        loadtasks();
        $("#updateModal").modal("hide");
      }
    });
  });
});
function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  $.get("http://localhost:3000/api/task/" + id, function(
    response
  ) {
    $("#updateId").val(response._id);
    $("#updateTitle").val(response.title);
    $("#updateBody").val(response.body);
    $("#updateModal").modal("show");
  });
}
function addTasks() {
  var title = $("#title").val();
  var body = $("#body").val();
  $.ajax({
    url: "http://localhost:3000/api/task",
    method: "POST",
    data: { title, body },
    success: function(response) {
      console.log(response);
      $("#title").val("");
      $("#body").val("");
      loadtasks();
      $("#addModal").modal("hide");
    }
  });
}
function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "http://localhost:3000/api/task/" + id,
    method: "DELETE",
    success: function() {
      loadtasks();
    }
  });
}
function loadtasks() {
  $.ajax({
    url: "http://localhost:3000/api/task",
    method: "GET",
    error: function(response) {
      var tasks = $("#recipes");
      tasks.html("An Error has occured");
    },
    success: function(response) {
      console.log(response);
      var tasks = $("#recipes");
      tasks.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        tasks.append(
          `<div class="recipe" data-id="${rec._id}"><h3>${rec.title}</h3><p><button class="btn btn-danger btn-sm float-right">delete</button><button class="btn btn-warning btn-sm float-right">Edit</button> ${rec.body}</p></div>`
        );
        // recipes.append("<div><h3>" + rec.title + "</h3></div>");
      }
    }
  });
}