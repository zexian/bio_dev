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

function Populate_Preference(jsonList){

        jsonList.Table.sort(function(a,b){
                return a.prefer_id - b.prefer_id;
            });
      

        var listItems= "";
        for (var i = 0; i < jsonList.Table.length; i++){
          listItems+= "<option value='" + jsonList.Table[i].prefer_id + "'>" + jsonList.Table[i].prefer_name + "</option>";
        }
        $("#Preference").html(listItems);
        
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
