// I need to make a Constructor
// This Constructor must be a protoype for an instance of the object that will
// return both a marker & the details so they are connected.

function Constructor(param1, param2)
{
  this.id = id[i];
  this.place = results[i];
  this.placeid = place.place_id;
  this.name = place.name;
}

Constructor.prototype.apiMarkerCreate = function(latLng, placeResult)
{

};

Constructor.prototype.addPlaceDetails = function()
{
  
};


myMarkerObject = new Constructor(x,y);
// Each MarkerObject created needs to consist of:
    // a Marker that is appended to the map.
    // a Data Set that will be called up & appended to the results-container
    // upon click event to corresponding Marker.
    // Marker should have an 'id' that ties it to it's data set.
    //

myMarkerObject[i] = new Constructor(results);
