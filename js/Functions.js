function settingFunction(){
    alert('clicked setting buttion')        
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


<!--//////////////not modified old code//////////////////////-->

function getLocation() {
    if (navigator.geolocation) {
        //navigator.geolocation.getCurrentPosition(showLocation);
        navigator.geolocation.getCurrentPosition(function(coords){
            alert(coords.latitude);
        });
    }else{
        alert('thats the problem');
    }
}
function showLocation(pos) {
    var crd = pos.coords;
    geo_latitude = crd.latitude;
    geo_longtitude = crd.longitude;
    console.log(geo_latitude);
    console.log(geo_longtitude);
}
function ErrorHandler(err) {
       if(err.code == 1) {
         alert("Error: Access is denied!");
       }else if( err.code == 2) {
         alert("Error: Position is unavailable!");
       }
     }
function options(){
       if(navigator.geolocation){
             // timeout at 60000 milliseconds (60 seconds)
             var options = {timeout:60000};
             navigator.geolocation.getCurrentPosition(showLocation, 
              errorHandler,
              options);
       }else{
           alert("Sorry, browser does not support geolocation!");
           }
     }
function ConvertLocation(lan,log){
      var geocoder = new google.maps.Geocoder();
      var latLng = new google.maps.LatLng(lan,log);

      if (geocoder) {
        geocoder.geocode({ 'latLng': latLng}, function (results, status) {
           if (status == google.maps.GeocoderStatus.OK) {
              console.log(results[0].formatted_address);
              
              document.getElementById('txt').placeholder=results[0].formatted_address;

           }
           else {
              console.log("Geocoding failed: " + status);
           }
        });
    }
}
