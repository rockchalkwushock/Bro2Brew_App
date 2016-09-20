/*jshint esversion: 6 */
// ########################################
/*
 *	Table of Contents
 *  1) Webpack Assignments
 *      a) userIP
 *      b) showMap
 *      c) addNearbyPlaces
 *	2)	geolocate( )
 *	3)	showPositionByGeo( )
 *	4)	showError( )
 */
// ########################################

/*
   This script is used as a callback to the Google Map API script in index.html.
   The user is prompted upon the DOM loading to either use or not use Geolocation.
   If user chooses to use geolocation in the browser Google's Geolocation
   Feature takes over and calculates the user's position. It will then run the
   same code as geocoding.js in which the creation of the map, searching for
   brewery results in the Places Library, and creation of markers will occur.

   Should the user choose to not utilize geolocation in the browser initLoad( )
   will already be ready to run the basic progession for using Google's
   Autocomplete Feature to find the user's location search and look for
   brewery results based off of that positon in the Google Places Library.

   In the even that geoloction is not supported by the browser the user's IP
   address will be acquired and processed inside ip_geolocation.js.
*/
/* ---------- 1) Webpack Assignments ---------- */

let userIP = require('./assets/js/ip_geolocation.js');
let showMap = require('./assets/js/map.js');
let addNearbyPlaces = require('./assets/js/places.js');

/* ---------- 2) geolocate ---------- */

function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPositionByGeo);
    } else {
      userIP();
    }
}

/* ---------- 3) showPositionByGeo ---------- */

function showPositionByGeo(position) {
    // The Lat & Long values are obtained via the HTML 5 API.
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    // Creates a new object for using Lat & Long values with Google Map.
    let latLng = new google.maps.LatLng(latitude, longitude);

    // Calls function.
    showMap(latLng);
    // Calls function.
    addNearbyPlaces(latLng);
}

/* ---------- 4) showError ---------- */

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred.";
            break;
    }
}
