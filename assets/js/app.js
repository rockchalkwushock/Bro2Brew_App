// ########################################
/*
*	Table of Contents
*	1)	Initialization of Variables
*     a)  Global
* 2)  Child Functions
*     a) initLoad( )
* 3)  App.js Execution
*/
// ########################################

/*
  This is the main script that will call the intial load of the page. It will
  show & hide elements on the page and call for the initAutocomplete function to
  run. All Global Variable across the application are initialized and defined in
  this script.
*/

// ####################################################
/* ---------- Initialization of Variables ---------- */
// ####################################################

/* ---------- a) Global ---------- */

var mainScreen = $('#search-row');
var mapScreen = $('#map-row');
var resultsScreen = $('#results-row');
var inputField = $('#searchTextField');
var places;


// ########################################
/* ---------- Child Functions ---------- */
// ########################################

/* ---------- a) initLoad ---------- */
function initLoad()
{
  mainScreen.show();  // Only input-container is visible.
  mapScreen.hide();   // map-container hidden.
  resultsScreen.hide(); // results-container hidden.

  // When User clicks on text field initAutocomplete( ) will run.
  mainScreen.focusin(initAutocomplete);
}

// ####################################################
/* ---------- App.js Execution ---------- */
// ####################################################

$(document).ready(initLoad);
