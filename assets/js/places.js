// ########################################
/*
*	Table of Contents
*	1)	Google Places Library Calls
*     a)  addNearbyPlaces( )
*     b)  callbackResults( )
*	2)	Markers
*     a) apiMarkerCreate( )
*	3)	Place Details
*     a) addPlaceDetails( )
*     b) callbackDetails( )
*	4)	Event Handlers & Info Box
*     a) windowInfoCreate( )
*/
// ########################################

/*
    This script is where the code will access the Google Places Library. Using
    the location data a 'keyword' search on 'breweries' is performed. A new
    instance of the PlacesService Constructor is created with the map as a
    parameter because our results will be appending to the map. The nearbySearch
    method is then applied to the new object requesting it search for 'breweries'
    on the map in the defined radius. The status of every result is checked to be
    'OK'. The results are further filtered by searching for the strings 'Brewery'
    or 'Brewing'. Any result that makes the cut then has a marker created and
    details gathered. The details are appended via .clone() to the
    results-container. Animation & event listers are used to make the the Markers
    clickable & cause the page to scroll to the details region and back to the map.

    NOTE: The .includes() method from the toString() Constructor is not supported
    in IE+9 & Opera at this time (06September2016) via MDN:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


*/


// ####################################################
/* ---------- Google Places Library Calls ---------- */
// ####################################################

/* ---------- a) addNearbyPlaces ---------- */

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

/* ---------- b) callbackResults ---------- */

// This function scans the Google Places Library for 'breweries' checking first
// that the status of the location is 'OK'
function callbackResults(results, status)
{
  // Creating a new instance of Google's LatLngBounds Constructor.
  bounds = new google.maps.LatLngBounds();
  if (status == google.maps.places.PlacesServiceStatus.OK)
  {
    for (var i = 0; i < results.length; i++)
    {
      var place = results[i]; // store brewery result object.
      var placeid = place.place_id; // store Google place_id.
      var name = place.name;  // store name of brewery.
      var markerLat = place.geometry.location.lat();  // store latitude of brewery.
      var markerLng = place.geometry.location.lng();  // store longitude of brewery.

      // TEMPORARY FIX: .includes( ) is not supported in IE (MDN).
      // Also is not supported on mobile browsers: IE & Android.
      if (name.includes("Brewery") || name.includes("Brewing"))
      {
        // Creates new instance of Google's LatLng Constructor for each brewery.
        var myLatLng = new google.maps.LatLng(markerLat, markerLng);
        // Calls function.
        apiMarkerCreate(myLatLng, place);
        // Calls function.
        addPlaceDetails(placeid);
        // Extends the bounds of the map via lat/lng coords of each brewery.
        bounds.extend(myLatLng);
        console.log('Created: ' + name);
      }
      // Auto-zoom for Map based on bounds set by coords of breweries.
      map.fitBounds(bounds);
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

/* ---------- a) apiMarkerCreate ---------- */

function apiMarkerCreate(myLatLng, placeResult)
{
  if(!placeResult) return;
  var markerOptions =
  {
    // Google Places REQUIRES Lat & Long coords to place marker at XYZ.
    position: myLatLng,
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
    // Displays name of brewery when marker is moused over.
    content = placeResult.name;
    windowInfoCreate(marker, myLatLng, content);
  }
}

// #######################################
/* ---------- Places Details ---------- */
// #######################################

/* ---------- a) addPlaceDetails ---------- */

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

/* ---------- b) callbackDetails ---------- */

// This function will get specific data from JSON and append via .clone( ) to
// the HTML specified location.
function callbackDetails(brewery_data)
{
  resultsScreen.show();
  var span = $('.template .panel').clone();
  span.find('#result-name').html(brewery_data.name);
  span.find('#result-address').html(brewery_data.vicinity);
  span.find('#result-phone').html(brewery_data.formatted_phone_number);
  span.find('#result-url').html(brewery_data.website);
  span.find('.url').attr('href', brewery_data.website);
  span.find('.panel_heading').attr('href', '#collapse' + brewery_data.id);
  span.find('.panel_heading').attr('id', 'linkcollapse' + brewery_data.id);
  span.find('.panel-collapse').attr('id', 'collapse' + brewery_data.id);
  // if the brewery is open say 'Open Now' with day & hours.
  if (!brewery_data.opening_hours) {
    span.find('#result-hours').html('Hours not available.');
  }
  else {
    if (brewery_data.opening_hours.open_now)
    {
      switch (new Date().getDay())
      {
        case 0: // Sunday
            day = span.find('#result-hours').html('Open Now: ' + brewery_data.opening_hours.weekday_text[6]);
            break;
        case 1: // Monday
            day = span.find('#result-hours').html('Open Now: ' + brewery_data.opening_hours.weekday_text[0]);
            break;
        case 2: // Tuesday
            day = span.find('#result-hours').html('Open Now: ' + brewery_data.opening_hours.weekday_text[1]);
            break;
        case 3: // Wednesday
            day = span.find('#result-hours').html('Open Now: ' + brewery_data.opening_hours.weekday_text[2]);
            break;
        case 4: // Thursday
            day = span.find('#result-hours').html('Open Now: ' + brewery_data.opening_hours.weekday_text[3]);
            break;
        case 5: // Friday
            day = span.find('#result-hours').html('Open Now: ' + brewery_data.opening_hours.weekday_text[4]);
            break;
        case 6: // Saturday
            day = span.find('#result-hours').html('Open Now: ' + brewery_data.opening_hours.weekday_text[5]);
      }
    }
    // else say closed now
    else
    {
      span.find('#result-hours').html('Closed Now');
    }
  }

  $('#results-row #collapsible_panel').append(span);
}

// ##################################################
/* ---------- Event Handlers & Info Box ---------- */
// ##################################################

/* ---------- a) windowInfoCreate ---------- */

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

  marker.addListener('mouseout', function()
  {
      infoWindow.close();
  });

  marker.addListener('click', function()
  {
      var height_data = $('.header').height() + $('.search-row').height() + $('.map-row').height();
      $('#linkcollapse' + marker.placeResult.id).click();
      $('#results-row').animate({scrollTop: $('#linkcollapse' + marker.placeResult.id).offset().top-height_data}, 500);
      console.log($('#linkcollapse' + marker.placeResult.id).offset().top);
  });

  resultsScreen.on('click', '.back2top', function(event)
  {
    event.stopPropagation(); // check to see if this is needed. (look up what it does)
    event.preventDefault();
    $('#results-row').animate({scrollTop: 0}, 500);
    $(this).parent().parent().parent().find('.panel-title a').click();
  });
}
