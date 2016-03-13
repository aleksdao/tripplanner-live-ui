$(function() {
  $("#selection-panel").on("click", "button", function() {
    var category = $(this).val();
    //console.log(category);
    var elem = $("#" + category + "Chooser");
    var index = elem.prop('selectedIndex');
    var item = places[category][Number(index)];
    var li = $('<li class="list-group-item" data-name="'+ item.name +'">' + item.name + '<button class="btn btn-danger btn-xs pull-right">X</button></li>');


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

  $("#add-day-btn").on("click", function() {

    tripByDay.push({});
    var li = $('<li><a href="#">' + tripByDay.length + '</a></li>');
    $(this).before(li);
  });

  $('#day-selector').on('click', 'a', function(){
    var index = Number($(this).html()) -1;
    var li = $(this).parent();
    if(li.attr('id') !== "add-day-btn"){
      var prevElem = $('#day-selector .active');
      prevElem.removeClass('active');
      li.addClass('active');
      refreshDOM();
      //Resetting happens here
      clearMap(markers);
      markers = tripByDay[index];
      populateItinerary(markers);
      populateMap(markers);


    }

  });



});

function populateItinerary(day){
  var cats = {
    Hotels: $('#chosen-Hotels'),
    Restaurants: $('#chosen-Restaurants'),
    Activities: $('#chosen-Activities')
  };

  for (var name in day){
    var li = $('<li class="list-group-item" data-name="'+ name +'">' + name + '<button class="btn btn-danger btn-xs pull-right">X</button></li>');
    cats[day[name].category].append(li);
  }
}
function clearMap(day){
  for (var name in day)
    day[name].marker.setMap(null);
  bounds = new google.maps.LatLngBounds();
  map.fitBounds(bounds);
}
function populateMap(day){
  for (var name in day){
    setMarker(name, day[name].marker, day[name].category);
  }
}


function refreshDOM(){
  $('#chosen-Hotels').empty();
  $('#chosen-Restaurants').empty();
  $('#chosen-Activities').empty();
}


function setMarker(item, location, category){
  var marker;
  if (!(location instanceof google.maps.Marker)){

    marker = new google.maps.Marker({
      title: item.name,
      position: location,
      animation: google.maps.Animation.DROP
    });
  }
  else {
    console.log('not marker');
    marker = location;
  }
    bounds.extend(marker.getPosition());
    // markers.push(marker);
    marker.setMap(map);
    markers[item.name] = {marker: marker, category: category};
    map.fitBounds(bounds);
}


function removeMarker(name) {
  var marker = markers[name].marker;
  if (marker)
    marker.setMap(null);
  delete markers[name];
  bounds = new google.maps.LatLngBounds();
  for(var name in markers) {
    bounds.extend(markers[name].marker.getPosition());
  }
  map.fitBounds(bounds);
}
