// ########################################
/*
*	Table of Contents
*	1)	Initialization of Variables
*     a)  Global
*     b)  Local (with location)
*	2)	Constructors
*     a)
*     b)
*	3)	Prototypes
*     a)
*     b)
*	4)	Objects
*     a)
*     b)
* 5)  Child Functions
*     a) initLoad( )
*     b)
* 6)  Validation Checks
*     a) validateInput( )
*     b)
* 7)  App.js Execution
*/

// ####################################################
/* ---------- Initialization of Variables ---------- */
// ####################################################

/* ---------- a) Global ---------- */

var mainScreen = $('.search-row');
var mapScreen = $('.map-row');

/* ---------- b) Local ---------- */



// #####################################
/* ---------- Constructors ---------- */
// #####################################

/* ---------- a)  ---------- */



/* ---------- b)  ---------- */



// ###################################
/* ---------- Prototypes ---------- */
// ###################################

/* ---------- a)  ---------- */



/* ---------- b)  ---------- */



// ################################
/* ---------- Objects ---------- */
// ################################

/* ---------- a)  ---------- */



/* ---------- b)  ---------- */



// ########################################
/* ---------- Child Functions ---------- */
// ########################################

/* ---------- a) initLoad ---------- */
function initLoad()
{
  mainScreen.show();  // Only input-container is visible.
  mapScreen.hide();   // map-container hidden.
  $('.submit-btn').click(function()
  {
    mainScreen.hide();  // Hide input-container.
    mapScreen.show();   // Show map-container.
    initMap();  // Process user's physical location using geolocation.
    console.log(pos);
  });
}

/* ---------- b)  ---------- */
// This function is using geolocation to grab user's current location.

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
function initMap()
{
    var map = new google.maps.Map(document.getElementById('map'),
    {
        // map options
        // this can be set up in another js file.
        // can then set a protoype to call the same map settings,
        // for all new map requests.
        zoom: 12
    });
    var infoWindow = new google.maps.InfoWindow({
        map: map
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}


// ##########################################
/* ---------- Validation Checks ---------- */
// ##########################################

/* ---------- a)  ---------- */



/* ---------- b)  ---------- */



// #########################################
/* ---------- App.js Execution ---------- */
// #########################################

$(document).ready(initLoad);
