/*jshint esversion: 6 */
// ########################################
/*
 *	Table of Contents
 *  1)   Webpack Assignments
 *       a) initAutocomplete
 *	2)	 Initialization of letiables
 *       a) Global
 *  3)   Child Functions
 *       a) initLoad( )
 *  4)   Module.exports
         a) reset
 *  5)   App.js Execution
 */
// ########################################

/*
  This is the main script that will call the intial load of the page. It will
  show & hide elements on the page and call for the initAutocomplete function to
  run. All Global variable across the application are initialized and defined in
  this script.
*/
// ############################################
/* ---------- Webpack Assignments ---------- */
// ############################################

let initAutocomplete = require('./assets/js/autocomplete.js');

// ####################################################
/* ---------- Initialization of variables ---------- */
// ####################################################

/* ---------- a) Global ---------- */

let mainScreen = $('#search-row');
let mapScreen = $('#map-row');
let resultsScreen = $('#results-row');
let inputField = $('#searchTextField');
let coords; // will hold location object from Location user is at.
let bounds; // will represent the instance of Google's LatLngBounds Constructor.

// ########################################
/* ---------- Child Functions ---------- */
// ########################################

/* ---------- a) initLoad ---------- */
function initLoad() {
    mainScreen.show(); // Only input-container is visible.
    mapScreen.hide(); // map-container hidden.
    resultsScreen.hide(); // results-container hidden.

    // When User clicks on text field initAutocomplete( ) will run.
    mainScreen.focusin(initAutocomplete);
}
/* ---------- b) reset ---------- */
function reset() {
    $('#results-row #collapsible_panel').empty(); // clear all resutls from div.
    resultsScreen.hide(); // results-container hidden.
}

// #######################################
/* ---------- Module.exports ---------- */
// #######################################

module.exports = reset;

// #########################################
/* ---------- App.js Execution ---------- */
// #########################################

$(document).ready(initLoad);
