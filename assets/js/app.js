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
    getMyLocation();  // Process user's physical location using geolocation.
  });
}

/* ---------- b)  ---------- */



// ##########################################
/* ---------- Validation Checks ---------- */
// ##########################################

/* ---------- a)  ---------- */



/* ---------- b)  ---------- */



// #########################################
/* ---------- App.js Execution ---------- */
// #########################################

$(document).ready(initLoad);
