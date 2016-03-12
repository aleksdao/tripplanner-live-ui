$(function() {
  console.log("hey we're in here");
  $("#selection-panel").on("click", "button", function() {
    var category = $(this).val();
    console.log(category);
    console.log($("#" + category + "Chooser").val())
  })
})