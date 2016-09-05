// ########################################
/*
*	Table of Contents
*	1)	Initialization of Variables
*     a)  Global
*     b)  Local (with location)
*	2)	Geolocation Code
*     a) getMyLocation( )
*     b) displayLocation( )
*	3)	The Map
*     a) showMap( )
*	4)	Google Places Library Calls
*     a) addNearbyPlaces( )
*     b) callback( )
* 5)  Markers
*     a) apiMarkerCreate
* 6)  Event Handlers & Info Box
*     a) windowInfoCreate( )
*/

// ####################################################
/* ---------- Initialization of Variables ---------- */
// ####################################################

var resultsScreen = $('.results-row');
var map;

// #########################################
/* ---------- Geolocation Code ---------- */
// #########################################

/* ---------- getMyLocation ---------- */

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

/* ---------- displayLocation ---------- */

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

// ################################
/* ---------- The Map ---------- */
// ################################

/* ---------- showMap ---------- */

// Renders the map to DOM.
function showMap(latLng)
{
  // Setting up availble option for map.
  var mapOptions =
  {
    center: latLng,
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    draggable: true,
    scrollwheel: false,
    disableDefaultUI: true,
  };

  // Creating the Map instance & assigning the HTML div element to render it in.
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}


// ####################################################
/* ---------- Google Places Library Calls ---------- */
// ####################################################

/* ---------- addNearbyPlaces ---------- */

function addNearbyPlaces(latLng)
{
  var request =
  {
    // Google Places REQUIRES Lat & Long coords to find XYZ.
    location: latLng,
    radius: 10936,
    // keyword to search for in Google Places Library.
    keyword: ['breweries'],
  };

  // Accessing PlacesService Library through the Constructor PlacesService
  // by creating new instance of object called nearByService.
  var nearByService = new google.maps.places.PlacesService(map);
  // Using prototype nearbySearch from Constructor PlacesService.
  nearByService.nearbySearch(request, callbackResults);
}

/* ---------- callback ---------- */

// This function scans the Google Places Library for 'breweries' checking first
// that the status of the location is 'OK'
function callbackResults(results, status)
{
  if (status == google.maps.places.PlacesServiceStatus.OK)
  {
    for (var i = 0; i < results.length; i++)
    {
      // var breweryMarker = new BreweryMarkerResult(results[i]);
      var place = results[i];
      var placeid = place.place_id;
      var name = place.name;

      if (name.includes("Brewery") || name.includes("Brewing"))
      {
        apiMarkerCreate(place.geometry.location, place);
        addPlaceDetails(placeid);
      }
    }
    return true;
  }
  else
  {
      return false;
  }
}

// ################################
/* ---------- Markers ---------- */
// ################################

/* ---------- apiMarkerCreate ---------- */

function apiMarkerCreate(latLng, placeResult)
{
  if(!placeResult) return;
  var markerOptions =
  {
    // Google Places REQUIRES Lat & Long coords to place marker at XYZ.
    position: latLng,
    map: map,
    animation: google.maps.Animation.DROP, // CHANGE: no drop just show.
    name: name,
    clickable: true
  };

  // Setting up the marker object to mark the location on the map canvas.
  var marker = new google.maps.Marker(markerOptions);
  marker.placeResult = placeResult;
  var content;
  if (placeResult)
  {
    content = placeResult.name + /*'<br/>' + placeResult.vicinity + */'<br/>';
    windowInfoCreate(marker, latLng, content);
  }
  else
  {
    content = 'You are here: '+ latLng.lat() + ', ' + latLng.lng();
    windowInfoCreate(marker, latLng, content);
  }
}

// ################################
/* ---------- Details ---------- */
// ################################

/* ---------- addPlaceDetails ---------- */

// This function will get the JSON for the results of the search.
function addPlaceDetails(brewery_id)
{
  var parameters =
  {
    placeId: brewery_id,
  };

  // Accessing PlacesService Library through the Constructor PlacesService
  // by creating new instance of object called serviceDetails.
  var serviceDetails = new google.maps.places.PlacesService(map);
  // Using prototype nearbySearch from Constructor PlacesService.
  serviceDetails.getDetails(parameters, callbackDetails);
}

function callbackDetails(brewery_data)
{
  console.log(brewery_data.name);
  console.log(brewery_data.vicinity);
  // console.log(brewery_data.opening_hours.open_now); // need to check.
  // console.log(brewery_data.opening_hours.weekday_text); // need to check.
  console.log(brewery_data.formatted_phone_number);
  console.log(brewery_data.website);

  resultsScreen.show();
  var span = $('.template .panel').clone();
  span.find('#result-name').html(brewery_data.name);
  span.find('#result-address').html(brewery_data.vicinity);
  span.find('#result-hours').html();
  span.find('#result-phone').html(brewery_data.formatted_phone_number);
  span.find('#result-url').html(brewery_data.website);
  span.find('a').attr('href', '#collapse' + brewery_data.id);
  span.find('a').attr('id', 'linkcollapse' + brewery_data.id);
  span.find('.panel-collapse').attr('id', 'collapse' + brewery_data.id);
  $('.results-row #collapsible_panel').append(span);
}



// ##################################################
/* ---------- Event Handlers & Info Box ---------- */
// ##################################################

/* ---------- windowInfoCreate ---------- */

function windowInfoCreate(marker, latLng, content)
{
  var infoWindowOptions =
  {
    content: content,
    position: latLng
  };

  var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

  marker.addListener('mouseover', function()
  {
      infoWindow.open(map, this);
  });

  // assuming you also want to hide the infowindow when user mouses-out
  marker.addListener('mouseout', function()
  {
      infoWindow.close();
  });

  marker.addListener('click', function()
  {
      $('#linkcollapse' + marker.placeResult.id).click();
      $('html, body').animate({scrollTop: $('#linkcollapse' + marker.placeResult.id).offset().top}, 1000);
  });
}
