# Bro2Brew
Thinkful (<https://www.thinkful.com/>) Capstone #1 Project: API Hack for finding local breweries.

## Bro2Brew - Find local breweries in your area!

Bro2Brew is your go to app for finding local breweries in your area.
The app will scan for breweries based off either your Geolocation or you can search any city in the USA.
Provides address, contact, hours of operation, & website information on each brewery.
Simplistic design and integration along with a sleek UX leaves it in a category of it's own!

## Demo Page <https://rockchalkwushock.github.io/Bro2Brew_App/>

### Use Case
Why is this app useful? Well if you love good craft beers like I do then you know the best place to find them are micro-breweries. This app will lead you to all those local "diamonds in the rough" and their amazing brews!

### Future Features
  * Loading Overlay.
  * Ratings of Breweries.
  * Ratings for beers at breweries.
  * User Beer & Brewery Rating Service.

### Technical
  * This app is built on the front-end using HTML5, CSS3, Javascript, jQuery, & Bootstrap.
  * The app is fully responsive, adapting to mobile, tablet, & desktop viewports.
  * Should geolocation not be supported in the browser the user's IP Address will be used by default for calculating location.

### API's
  * Google JavaScript Maps API <https://developers.google.com/maps/documentation/javascript/>
    - Geolocation Feature
    - Map Feature
  * Google Places API Web Service <https://developers.google.com/places/web-service/>
    - Autocomplete Feature
    - Places Details Feature
  * IP API <https://ipapi.co>

### Mockup of Initial Design Concept

![Main Screen](https://github.com/rockchalkwushock/Bro2Brew_App/blob/gh-pages/assets/mockups/Main%20Screen.png " Main Screen of App")


![Location Screen](https://github.com/rockchalkwushock/Bro2Brew_App/blob/gh-pages/assets/mockups/Location%20Screen.png " Location Screen of App")


### Production Website Design (as of 11 September 2016)

User is prompted to either use Geolocation in the browser or not.
![Starting Screen] (https://github.com/rockchalkwushock/Bro2Brew_App/blob/gh-pages/screenshots/Screen%20Shot%202016-09-12%20at%2012.08.01%20AM.jpg "Starting Screen")

If the user chooses to use Geolocation in the browser the webpage will render a map and results of breweries in the area of the user's current position.
![Finish Screen] (https://github.com/rockchalkwushock/Bro2Brew_App/blob/gh-pages/screenshots/Screen%20Shot%202016-09-12%20at%2012.09.23%20AM.jpg "Finishing Screen")

If the user decides to not use Geolocation in the browser then the user can search the current city they are in or look for breweries in other locations using the search bar.
![Alternative Starting Screen] (https://github.com/rockchalkwushock/Bro2Brew_App/blob/gh-pages/screenshots/Screen%20Shot%202016-09-12%20at%2012.08.48%20AM.jpg "Alt Start Screen")

The search bar uses Google's Autocomplete feature.
![Autocomplete] (https://github.com/rockchalkwushock/Bro2Brew_App/blob/gh-pages/screenshots/Screen%20Shot%202016-09-12%20at%2012.09.04%20AM.jpg "Autocomplete")

The user can see more details on the breweries found by selecting the marker on the map or the panel labled as the brewery.
![Details] (https://github.com/rockchalkwushock/Bro2Brew_App/blob/gh-pages/screenshots/Screen%20Shot%202016-09-12%20at%2012.09.40%20AM.jpg "Details")
