// ########################################
/*
 *	Table of Contents
 *	1)	geocode( )
 */
// ########################################

/*
    This script extracts the location data from the 'autocomplete' object being
    stored in the 'places' variable. The latitude & longitude values are used
    to later render the Google Map, search the Places Library based off of this
    position, and create markers for the results from that search.

    NOTE: geocode( ) is in no way related to the geocoder( ) by Google.
*/

/* ---------- 1) geocode ---------- */

function geocode(coords) {

    var latitude = coords.lat();

    var longitude = coords.lng();
    // Creates a new object for using Lat & Long values with Google Map.
    var latLng = new google.maps.LatLng(latitude, longitude);

    // Calls function.
    showMap(latLng);
    // Calls function.
    addNearbyPlaces(latLng);
}
