// window.onload = getMyLocation;
var resultsScreen = $('.results-row');
var map;

// This function checks that geolocation is available in the user's browser.
function getMyLocation()
{
  if(navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(displayLocation);
  }
  else
  {
    alert('Sorry, geolocation is not supported in your browser.');
  }
}

// This function actually invokes the geolocation feature.
function displayLocation(position)
{
  // The Lat & Long values are obtained via the HTML 5 API.
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  // Creates a new object for using Lat & Long values with Google Map.
  var latLng = new google.maps.LatLng(latitude, longitude);

  // Calls function.
  showMap(latLng);
  // Calls function.
  addNearbyPlaces(latLng);
  // Calls function.
  apiMarkerCreate(latLng);
}

// Renders the map to DOM.
function showMap(latLng)
{
  // Setting up availble option for map.
  var mapOptions =
  {
    center: latLng,
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    draggable: false,
    scrollwheel: false,
    disableDefaultUI: true,
  };

  // Creating the Map instance & assigning the HTML div element to render it in.
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function addNearbyPlaces(latLng)
{
  var request =
  {
    // Google Places REQUIRES Lat & Long coords to find XYZ.
    location: latLng,
    radius: 10936,
    keyword: ['breweries'],
  };

  var nearByService = new google.maps.places.PlacesService(map);

  nearByService.nearbySearch(request, callback);
}

function callback(results, status)
{
  if (status == google.maps.places.PlacesServiceStatus.OK)
  {
    for (var i = 0; i < results.length; i++)
    {
      console.log(results[i]);
      var place = results[i];
      apiMarkerCreate(place.geometry.location, place);
    }
  }
}

function apiMarkerCreate(latLng, placeResult)
{
  if(!placeResult) return;
  var markerOptions =
  {
    // Google Places REQUIRES Lat & Long coords to place marker at XYZ.
    place_id: placeResult.place_id,
    position: latLng,
    map: map,
    animation: google.maps.Animation.DROP,
    name: placeResult.name,
    // formatted_address: placeResult.formatted_address,
    opening_hours: placeResult.opening_hours,
    formatted_phone_number: placeResult.formatted_phone_number,
    url: placeResult.url,
    clickable: true
  };

  // Setting up the marker object to mark the location on the map canvas.
  var marker = new google.maps.Marker(markerOptions);
  var content;
  if (placeResult)
  {
    content = placeResult.name + '<br/>' + placeResult.vicinity + '<br/>';
    windowInfoCreate(marker, latLng, content);
  }
  else
  {
    content = 'You are here: '+ latLng.lat() + ', ' + latLng.lng();
    windowInfoCreate(marker, latLng, content);
  }
}

function windowInfoCreate(marker, latLng, content)
{
  var infoWindowOptions =
  {
    content: content,
    position: latLng
  };

  var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

  marker.addListener('mouseover', function() {
      infoWindow.open(map, this);
  });

  // assuming you also want to hide the infowindow when user mouses-out
  marker.addListener('mouseout', function() {
      infoWindow.close();
  });

  marker.addListener('click', function() {
      resultsScreen.show();
  });
}
