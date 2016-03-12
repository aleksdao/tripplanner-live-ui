$(function() {
  $("#selection-panel").on("click", "button", function() {
    var category = $(this).val();
    console.log(category);
    var elem = $("#" + category + "Chooser");
    var index = elem.prop('selectedIndex');
    var item = places[category][Number(index)];
    var li = $("<li>" + item.name + "</li>");

    var location = {
      lat:item.place.location[0],
      lng: item.place.location[1]
    };
    var chosenElem = $("#chosen-" + category);

    if(category != "Hotels") {
      chosenElem.append(li);
    }
    else {
      if(chosenElem.children().length != 0) {
        console.log("hotel present");
        var removeName = $(chosenElem.children()[0]).html();
        console.log(removeName);
        removeMarker(removeName);
      }
      chosenElem.html(li);
    }

    setMarker(item, location, category);
  });
});

function setMarker(item, location, category){
    var marker = new google.maps.Marker({
      title: item.name,
      position: location,
      animation: google.maps.Animation.DROP
    });
    bounds.extend(marker.getPosition());
    // markers.push(marker);
    marker.setMap(map);
    markers[item.name] = marker;
    map.fitBounds(bounds);
}

function removeMarker(name) {
  var marker = markers[name];
  marker.setMap(null);
  delete markers[name];
  bounds = new google.maps.LatLngBounds();
  for(var name in markers) {
    bounds.extend(markers[name].getPosition());
  }
  map.fitBounds(bounds);
}