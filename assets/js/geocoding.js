/*jshint esversion: 6 */
// ########################################
/*
 *	Table of Contents
 *	1)	Webpack Assignments
 *      a) showMap
 *      b) addNearbyPlaces
 *	2)	geocode( )
 *	3)	Module.exports
 *	    a) geocode
 */
// ########################################

/*
    This script extracts the location data from the 'autocomplete' object being
    stored in the 'places' variable. The latitude & longitude values are used
    to later render the Google Map, search the Places Library based off of this
    position, and create markers for the results from that search.

    NOTE: geocode( ) is in no way related to the geocoder( ) by Google.
*/
/* ---------- 1) Webpack Assignments ---------- */

let showMap = require('./assets/js/map.js');
let addNearbyPlaces = require('./assets/js/places.js');

/* ---------- 2) geocode ---------- */

function geocode(coords) {

    let latitude = coords.lat();

    let longitude = coords.lng();
    // Creates a new object for using Lat & Long values with Google Map.
    let latLng = new google.maps.LatLng(latitude, longitude);

    // Calls function.
    showMap(latLng);
    // Calls function.
    addNearbyPlaces(latLng);
}

/* ---------- 3) Module.exports ---------- */

module.exports = geocode;
