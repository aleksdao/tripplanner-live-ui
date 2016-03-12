$(function() {
  $("#selection-panel").on("click", "button", function() {
    var category = $(this).val();
    var elem = $("#" + category + "Chooser");
    var li = $("<li>" + name + "</li>");
    var index = elem.prop('selectedIndex');
    var item = places[category][Number(index)];
    var location = {
      lat:item.place.location[0],
      lng: item.place.location[1]
    };

    $("#chosen-" + category).append(li);
    setMarker(item.name, location);
  });
});

function setMarker(name, location){
    var marker = new google.maps.Marker({
      title: name,
      position: location
    });
    marker.setMap(map);
}
