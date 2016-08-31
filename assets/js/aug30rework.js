// window.onload = getMyLocation;
var resultsScreen = $('.results-row');
var map;

// This function checks that geolocation is available in the user's browser.
function getMyLocation()
{
  console.log('in getMyLocation');
  if(navigator.geolocation)
  {
    console.log('if');
    navigator.geolocation.getCurrentPosition(displayLocation, function(ever){
      console.log(ever);
    });
    console.log('display');
  }
  else
  {
    alert('Sorry, geolocation is not supported in your browser.');
  }
}

// This function actually invokes the geolocation feature.
function displayLocation(position)
{
  console.log('in displayLocation');
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
  console.log('in showMap');
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
  console.log('in addNearbyPlaces');
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
  console.log('in callback');
  if (status == google.maps.places.PlacesServiceStatus.OK)
  {
    for (var i = 0; i < results.length; i++)
    {
      console.log(results[i]);
      var place = results[i];
      placeid = place.place_id;
      var marker = apiMarkerCreate(place.geometry.location, place);
      apiGetDetails(placeid, marker);
    }
  }
}


function apiMarkerCreate(latLng, placeResult)
{
  if(!placeResult) return;
  var markerOptions =
  {
    // Google Places REQUIRES Lat & Long coords to place marker at XYZ.
    position: latLng,
    map: map,
    animation: google.maps.Animation.DROP, // no drop just show.
    name: name,
    clickable: true
  };

  // Setting up the marker object to mark the location on the map canvas.
  var marker = new google.maps.Marker(markerOptions);
  var content;
  if (placeResult)
  {
    content = placeResult.name + /*'<br/>' + placeResult.vicinity + */'<br/>';
    windowInfoCreate(marker, latLng, content, brewery_info);
  }
  else
  {

    content = 'You are here: '+ latLng.lat() + ', ' + latLng.lng();
    windowInfoCreate(marker, latLng, content, brewery_info);
  }
  return marker;
}

function apiGetDetails(brewery_id, marker)
{
  // parameters to pass to url for finding place_id JSON
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
      console.log(receivedApiData);
      // if nothing alert not found.
      if (receivedApiData.pageInfo.totalResults === 0)
      {
        alert("Not Found.");
      }
      // else... call the creation of the JSON data to be rendered to user.
      else
      {
        marker.addListener('click', function() {
            resultsScreen.show();
            // apiDetailsCreate(receivedApiData.items);
            console.log(receivedApiData);
        });
      }
    });
}


function windowInfoCreate(marker, latLng, content, brewery_info)
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
}
