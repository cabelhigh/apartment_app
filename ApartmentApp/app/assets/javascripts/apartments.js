// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
$(document).ready(function(){

  // var coordinates = new google.maps.LatLng(32.7475811,-117.1311596);
  //   var mapOptions = {
  //     center: coordinates,
  //     zoom:15,
  //     mapTypeId:google.maps.MapTypeId.ROADMAP
  //   };
  // var mapContainer = $("#apartment_map")[0];
  // var map = new google.maps.Map(mapContainer, mapOptions);

  function createGmap(dataFromServer) {
    handler = Gmaps.build('Google');
    handler.buildMap({
        provider: {},
        internal: {id: 'apartment_map'}
      },
      function() {
        markers = handler.addMarkers(dataFromServer);
        handler.bounds.extendWith(markers);
        handler.fitMapToBounds();
        handler.getMap().setZoom(15)
      }
    );
  };

  function loadAndCreateGmap() {
    // Only load map data if we have a map on the page
    if ($('#apartment_map').length > 0) {
      // Access the data-apartment-id attribute on the map element
      var apartmentId = $('#apartment_map').attr('data-apartment-id');

      $.ajax({
        dataType: 'json',
        url: '/apartments/' + apartmentId + '/map_location',
        method: 'GET',
        success: function(dataFromServer) {
          createGmap(dataFromServer);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          alert("Getting map data failed: " + errorThrown);
        }
      });
    }
  };

  // Create the map when the page loads the first time
  $(document).on('ready', loadAndCreateGmap);
  // Create the map when the contents is loaded using turbolinks
  // To be 'turbolinks:load' in Rails 5
  $(document).on('page:load', loadAndCreateGmap);
  // To be 'turbolinks:load' in Rails 4
  $(document).on('turbolinks:load', loadAndCreateGmap);
});
