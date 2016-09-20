/*jshint esversion: 6 */
// ########################################
/*
 *	Table of Contents
 *  1)  Webpack Assignments
 *      a) showMap
 *      b) addNearbyPlaces
 *	1)	userIP( )
 *	2)	showPositionByIP( )
 *	3)	Module.exports
 *      a) userIP
 */
// ########################################

/*
   This script is used as a fallback measure should the user's browser not
   support geolocation features. The user's IP address will be acquired using the
   IPAPI.co API. From the JSON the latitude & longitude will be retrieved and
   used to build the same latLng object and then proceed through the normal
   script & code iterations.
*/
/* ---------- 1) Webpack Assignments ---------- */

let showMap = require('./assets/js/map.js');
let addNearbyPlaces = require('./assets/js/places.js');

/* ---------- 2) userIP ---------- */

function userIP()
{
  $.getJSON('https://ipapi.co/json/', function(json_data){
    let data = json_data;
    showPositionByIP(data);
  });
}

/* ---------- 3) showPositionByIP ---------- */

function showPositionByIP(position) {
    console.log(position);
    // The Lat & Long values are obtained via the HTML 5 API.
    let latitude = position.latitude;
    let longitude = position.longitude;

    // Creates a new object for using Lat & Long values with Google Map.
    let latLng = new google.maps.LatLng(latitude, longitude);

    // Calls function.
    showMap(latLng);
    // Calls function.
    addNearbyPlaces(latLng);
}

/* ---------- 4) Module.exports ---------- */

module.exports = userIP;
