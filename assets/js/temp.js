// I need to make a Constructor
// This Constructor must be a protoype for an instance of the object that will
// return both a marker & the details so they are connected.

function BreweryMarkerResult(results[i])
{
  this.place = results[i];
  this.placeid = this.place.place_id;
  this.name = this.place.name;
}

BreweryMarkerResult.prototype.apiMarkerCreate = function(latLng)
{
  if(!this.place) return;
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
  if (this.place)
  {
    content = this.name + /*'<br/>' + placeResult.vicinity + */'<br/>';
    windowInfoCreate(marker, latLng, content);
  }
  else
  {
    content = 'You are here: '+ latLng.lat() + ', ' + latLng.lng();
    windowInfoCreate(marker, latLng, content);
  }
};

BreweryMarkerResult.prototype.addPlaceDetails = function()
{
  var parameters =
  {
    placeId: this.placeid,
  };

  // Accessing PlacesService Library through the Constructor PlacesService
  // by creating new instance of object called serviceDetails.
  var serviceDetails = new google.maps.places.PlacesService(map);
  // Using prototype nearbySearch from Constructor PlacesService.
  serviceDetails.getDetails(parameters, callbackDetails);
};


myMarkerObject = new BreweryMarkerResult(param1, param2);
// Each MarkerObject created needs to consist of:
    // a Marker that is appended to the map.
    // a Data Set that will be called up & appended to the results-container
    // upon click event to corresponding Marker.
    // Marker should have an 'id' that ties it to it's data set.
    //
