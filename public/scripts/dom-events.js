$(function() {
  $("#selection-panel").on("click", "button", function() {
    var category = $(this).val();
    console.log($("#" + category + "Chooser").val())
  })
})

