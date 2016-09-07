# Problems to address (Current as of 06 September 2016)

## CSS
  * Need to do advanced styling.
  * Look at materialize.css that Mario showed me.

### Issues
  * Cannot get Input Field to clear after autocomplete object created.
    - I've tried `.val(' ')`, `.clear()`, & `.empty()`.
  * Need to set results-row to empty if user's run's another search.
    - Currently results stay and dropdown menu just grows.
  * Still seeing Aero Plains Brewing Co not append to details occasionally.
    - Think if could be tied to one of the errors coming up.
  * Need to find a way to get rid of empty areas if data not present.

#### Geolocation
  Worked! Have it called to start:
  `$(document).ready(geolocate);` (inside gelocation.js)
  However if user chooses not to enable geolocation feature `initLoad()`
  does not get called and subsequent scripts are not ran. Basically application
  becomes worthless.

#### Updates
  * Need to update:
    - mockups
    - README.md
    - Go through comments and fix, remove, or add.
