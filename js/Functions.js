function settingFunction(){
    //alert('clicked setting buttion');
    $('#wind_speed').text('80');
}

function socialFunction(){
    alert('clicked social buttion')        
}
function addressFunction(){
    alert('clicked address buttion')   
    if ($('.textboxes').is(':visible')) {
             //$('.textboxes').hide();
             // do save info
             $(this).val('Edit');
         }
         else {
             $('.textboxes').show();
             $(this).val('Save');
         }     
}

function detailFunction(){
    $('.b_form').slideToggle();     
}




function getLocation (callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( function(position) {
            callback({latitude: position.coords.latitude, longitude: position.coords.longitude});
            /*alert('Latitude: '          + position.coords.latitude          + '\n' +
                  'Longitude: '         + position.coords.longitude         + '\n' +
                  'Altitude: '          + position.coords.altitude          + '\n' +
                  'Accuracy: '          + position.coords.accuracy          + '\n' +
                  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                  'Heading: '           + position.coords.heading           + '\n' +
                  'Speed: '             + position.coords.speed             + '\n' +
                  'Timestamp: '         + position.timestamp                + '\n');*/
      });
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
}
