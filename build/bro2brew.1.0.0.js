/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
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

	var initAutocomplete = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./assets/js/autocomplete.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	// ####################################################
	/* ---------- Initialization of variables ---------- */
	// ####################################################

	/* ---------- a) Global ---------- */

	var mainScreen = $('#search-row');
	var mapScreen = $('#map-row');
	var resultsScreen = $('#results-row');
	var inputField = $('#searchTextField');
	var coords = void 0; // will hold location object from Location user is at.
	var bounds = void 0; // will represent the instance of Google's LatLngBounds Constructor.

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

/***/ }
/******/ ]);
//# sourceMappingURL=bro2brew.1.0.0.js.map
