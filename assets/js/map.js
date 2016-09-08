// ########################################
/*
 *	Table of Contents
 *	1)	showMap( )
 */
// ########################################

/*
    This script is where the Google Map is created via the Google Map Constructor
    and rendered to the HTML location. This is done through the latLng parameter
    that holds the users location(searched). The object mapOptions holds the
    properties any map rendered will possess.
*/

/* ---------- 1) showMap ---------- */

// Renders the map to DOM.
function showMap(latLng) {
    // Setting up availble options for map.
    var mapOptions = {
        center: latLng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggable: true,
        scrollwheel: false,
        disableDefaultUI: true,
        styles: [{
            featureType: 'all',
            "stylers": [{
                "visibility": "on"
            }, {
                "invert_lightness": true
            }, {
                "gamma": 2.00
            }]
        }]
    };
    mapScreen.show();
    // Creating the Map instance & assigning the HTML div element to render it in.
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    inputField.val('');
}
