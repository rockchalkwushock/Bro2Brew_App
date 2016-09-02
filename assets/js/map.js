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
    draggable: true,
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
    // Returing results that are not breweries.
    // aka. McDonald's, bars, liquor stores, Applebee's, distilleries.
    keyword: ['breweries'], // keyword to search for in Google Places Library.
  };

  var nearByService = new google.maps.places.PlacesService(map);

  nearByService.nearbySearch(request, callback);
}

// This function scans the Google Places Library for 'breweries' checking first
// that the status of the location is 'OK'
function callback(results, status)
{
  if (status == google.maps.places.PlacesServiceStatus.OK)
  {
    for (var i = 0; i < results.length; i++)
    {
      // console.log(results[i]);
      var place = results[i];
      var placeid = place.place_id;
      apiMarkerCreate(place.geometry.location, place);
      apiGetDetails(placeid);
    }
    return true;
  }
  else
  {
      return false;
  }
}

// This function will create the marker pertaining to the results of the search.
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

// This function will get the JSON for the results of the search.
function apiGetDetails(brewery_id)
{
  var parameters =
  {
    placeid: brewery_id,
    key: 'AIzaSyBah8zsinOa_LzdPtXJdj2PPvAt8ImrKGM',
  };
  url = 'https://maps.googleapis.com/maps/api/place/details/json?parameters';

  // retrieving JSON for specific place_id.
  $.getJSON(url, parameters,
    function(receivedApiData)
    {
      // console.log(receivedApiData);
      // if nothing alert not found.
      if (receivedApiData.status !== "OK")
      {
        alert("Not Found.");
      }
      // else... call the creation of the JSON data to be rendered to user.
      else
      {
        apiDetailsCreate(receivedApiData.result);
        // console.log(receivedApiData.result);
      }
    });
}

// This function will append the specific marker/result's details to the results-container.
function apiDetailsCreate(brewery_data)
{
  // console.log('creating the details');
  console.log(brewery_data.name);
  console.log(brewery_data.vicinity);
  console.log(brewery_data.types);
  // console.log(brewery_data.formatted_phone_number);
  // console.log(brewery_data.opening_hours.weekday_text);
  // console.log(brewery_data.opening_hours.open_now);
  // console.log(brewery_data.website);
  // console.log(brewery_data.rating);
  // var span = $('.template span').clone();
  // span.find('.result-address').html();
  // span.find('.weekday_text').html(); // this is an array
  // span.find('.formatted_phone_number').html();
  // span.find('.formatted_address').html();
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
