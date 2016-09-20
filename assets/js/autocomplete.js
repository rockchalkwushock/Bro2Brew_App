/*jshint esversion: 6 */
// ########################################
/*
 *	Table of Contents
 *  1)  Webpack Assignments
 *      a) geocode
 *      b) reset
 *	2)	initAutocomplete( )
 *	3)	captureLocation( )
 *  4)  Module.exports
 *      a) initAutocomplete
 */
// ########################################

/*
    The following javascript is responsible for initiating Google's Autocomplete
    feature. When the user begins to type in the HTML Input Field Google will
    begin to perdicte where the user is looking for from it's Places Library.
    The code is set to only return geocode data for the purpose of searching
    the user selected area for local breweries in later scripts.
    The object 'autocomplete' is an instance of the Autocomplete constructor and
    it's parameters. The object's data is then passed via the 'places' variable
    to extract further information for gecoding in gecoding.js.
 */
/* ---------- 1) Webpack Assignments ---------- */

let geocode = require('./assets/js/geocoding.js');
let reset = require('./assets/js/autocomplete.js');

/* ---------- 2) initAutocomplete ---------- */

function initAutocomplete() {
    reset();
    let input = document.getElementById('searchTextField'); // HTML input type=text where Autocomplete will render.
    let options = {
        types: ['geocode'], // instructs the Places service to return only geocoding results, rather than business results.
    };

    autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.addListener('place_changed', captureLocation);
}

/* ---------- 3) captureLocation ---------- */

function captureLocation() {
    // Store the 'autocomplete' object.
    places = autocomplete.getPlace();
    // Store the 'location' object that containes lat & long functions.
    coords = places.geometry.location;
    // Calls function.
    geocode(coords);
}

/* ---------- 4) Module.exports ---------- */

module.exports = initAutocomplete;
