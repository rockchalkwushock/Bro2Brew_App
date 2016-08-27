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

var input = $('#location'); // represents text input field.
var userInput; // stores user's input from html (string).
var checkInt; // stores user's input from html (integer).
var city; // stores user's city input (string).
var zipcode; // stores user's zipcode input (integer).
var validZip; // stores length of zipcode input by user.

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
  $('.input_form').submit(function(event)
  {
      event.preventDefault();
      // Take in the city or zipcode, store as userInput.
      userInput = input.val();
      // At this point userInput is a string (no matter if integer input).
      validateInput(); // call function.
  });
}

/* ---------- b)  ---------- */



// ##########################################
/* ---------- Validation Checks ---------- */
// ##########################################

/* ---------- a) validateInput ---------- */

function validateInput()
{
  // the following ternary operator is an IF, ELSE IF, ELSE...
  // if userInput is '' alert the user that input is invalid.
  userInput === '' ? alert('You must enter a valid zip code or city') :
  // else if isNaN(userInput) = TRUE user is searching a city.
  // else isNaN(userInput) = FALSE user is searching a zip code.
  isNaN(userInput) ? city = userInput : validZip = userInput.length;
  // if validZip is 5 store zipcode as integer.
  // else alert user zipcode is not a valid zipcode.
  validZip === 5 ? zipcode = parseInt(userInput) : alert('Sorry we only accept 5 digit zip codes.');

  // // If user tries to input nothing...
  // if (userInput === '')
  // {
  //   // Alert he/she is an idiot.
  //   alert('You must enter a valid zip code or city.');
  // }
  // // if isNaN(userInput) returns TRUE: a city is being searched.
  // else if (isNaN(userInput))
  // {
  //   city = userInput;
  // }
  // // if isNaN(userInput) returns FALSE: a zip code is being searched.
  // else
  // {
  //   validZip = userInput.length;
  //   console.log(validZip);
  //   validZip === 5 ? zipcode = parseInt(userInput) : alert('Sorry we only accept 5 digit zip codes.');
  //   console.log(zipcode);
  // }
}

/* ---------- b)  ---------- */



// #########################################
/* ---------- App.js Execution ---------- */
// #########################################

$(document).ready(initLoad);
