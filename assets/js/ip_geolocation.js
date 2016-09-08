// ########################################
/*
 *	Table of Contents
 *	1)	geolocate( )
 *	2)	showPositionByGeo( )
 *	3)	showError( )
 */
// ########################################

/*
   This script is used as a fallback measure should the user's browser not
   support geolocation features. The user's IP address will be aquired using the
   IPAPI.co API. From the JSON the latitude & longitude will be retrieved and
   used to build the same latLng object and then proceed through the normal
   script & code iterations.
*/





/* ---------- 1) userIP ---------- */

function userIP()
{
  $.getJSON('https://ipapi.co/json/', function(json_data){
    var data = json_data;
    showPositionByIP(data);
  });
}

/* ---------- 2) showPositionByIP ---------- */

function showPositionByIP(position) {
    console.log(position);
    // The Lat & Long values are obtained via the HTML 5 API.
    var latitude = position.latitude;
    var longitude = position.longitude;

    // Creates a new object for using Lat & Long values with Google Map.
    var latLng = new google.maps.LatLng(latitude, longitude);

    // Calls function.
    showMap(latLng);
    // Calls function.
    addNearbyPlaces(latLng);
}
