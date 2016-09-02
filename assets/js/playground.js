


function callback(results, status)
{
  if (status == google.maps.places.PlacesServiceStatus.OK)
  {
    for (var i = 0; i < results.length; i++)
    {
      console.log(results[i]);
      var place = results[i];
      placeid = place.place_id;
      apiMarkerCreate(place.geometry.location, place);
      apiGetDetails(placeid);
    }
  }
}

function apiGetDetails(brewery_id)
{
  // parameters to pass to url for finding place_id JSON
  var parameters =
  {
    placeid: brewery_id,
    key: 'AIzaSyBah8zsinOa_LzdPtXJdj2PPvAt8ImrKGM',
  };
  url = 'https://maps.googleapis.com/maps/api/place/details/json?parameters';

  // retrieving JSON for specific place_id.
  $.getJSON(url, parameters,
    function(receivedApiData)
    {
      console.log(receivedApiData);
      // if nothing alert not found.
      if (receivedApiData.pageInfo.totalResults === 0)
      {
        alert("Not Found.");
      }
      // else... call the creation of the JSON data to be rendered to user.
      else
      {
        apiDetailsCreate(receivedApiData.items);
      }
    });
}

function apiDetailsCreate(brewery_data)
{
  var span = $('.template span').clone();
  span.find('.formatted_address').html();
  span.find('.weekday_text').html(); // this is an array
  span.find('.formatted_phone_number').html();
  span.find('.formatted_address').html();

}
