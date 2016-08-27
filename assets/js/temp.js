function refreshList() // receives response from API
{
  $('#json-datalist').empty();
  for (var i = 0; i < items.length; i++)
  {
    $('#json-datalist').append("<option value='" + items[i] + ">");
  }
}

/* ---------- a) initLoad ---------- */
function initLoad()
{
  $('.input_form').on('change', function()
  {
    refreshList();

    url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=&types='items' ' + '(cities)&language=pt_BR&key=AIzaSyATonHiYZ8w_5Ktnp_YColG3AlX6XPv4vs';
    $.getJSON()
  });



    $('.input_form').submit(function(event)
    {
        event.preventDefault();
        // Take in the city or zipcode, store as userInput.
        userInput = input.val();
        // At this point userInput is a string (no matter if integer input).
        validateInput(); // call function.

        map = new google.maps.Map(document.getElementById('map'))
    });
}

/* ---------- b) googleApiCall ---------- */

var x = document.getElementById("map");

function getLocation()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else
    {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position)
{
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;

        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            },
            zoom: 8
        });
}


function initMap()
{
  getLocation();
}
