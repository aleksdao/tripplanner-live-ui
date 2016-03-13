$(function() {
  $("#selection-panel").on("click", "button", function() {
    var category = $(this).val();
    //console.log(category);
    var elem = $("#" + category + "Chooser");
    var index = elem.prop('selectedIndex');
    var item = places[category][Number(index)];
    var li = $('<li data-name="'+ item.name +'">' + item.name + '<button class="btn btn-danger btn-xs pull-right">X</button></li>');


    var location = {
      lat:item.place.location[0],
      lng: item.place.location[1]
    };
    var chosenElem = $("#chosen-" + category);

    if(category != "Hotels") {
      if (!markers[item.name]){
        chosenElem.append(li);
        setMarker(item, location, category);
      }
    }
    else {
      if(chosenElem.children().length != 0) {
        //console.log("hotel present");
        var removeName = $(chosenElem.children()[0]).data('name');
        console.log(removeName);
        removeMarker(removeName);
      }
      chosenElem.html(li);
      setMarker(item, location, category);
    }


  });
  $("#it_body").on("click", "button", function() {
    var li = $(this).parent();
    console.log(li);
    var liName = li.data("name");
    removeMarker(liName);
    li.remove();
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
  if (marker)
    marker.setMap(null);
  delete markers[name];
  bounds = new google.maps.LatLngBounds();
  for(var name in markers) {
    bounds.extend(markers[name].getPosition());
  }
  map.fitBounds(bounds);
}
