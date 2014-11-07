function settingFunction(){
         alert('clicked setting buttion')        
 };

 function socialFunction(){
         alert('clicked social buttion')        
 };
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
 };
 function onDeviceReady(){
     document.addEventListener('pause', onPause, false);
     document.addEventListener('resume', onResume, false);

     window.plugin.backgroundMode.disable();
 }
 function onResume(){
     window.plugin.backgroundMode.disable();
 }
 function onPause(){
     window.plugin.backgroundMode.enable();
 }
 document.addEventListener('deviceready', onDeviceReady, false);


 

 function index_message() {
     app.retrieveData( 8, function(data){
         $.each(data, function( index, value ){
             var snow = value['snow_depth'];
             if (index==0) {
                 $('#show_temperature').append("<strong>Snow right now: "  + snow + " in."+ '</strong><br/>');
                 if (snow<2) {
                     $('#user_notification').prepend("<p id='note'>No need to panic. Keep your car right where it is.  <a id='data_drop' onclick='showData(); return false;'>&#187</a></p>");
                 }
                 else if (snow >= 2) {
                     $('#user_notification').prepend("<p id='note'>Move your car off the street before 8am. Don't forget your snow boots!   <a id='data_drop' onclick='showData(); return false;'>&#187</a></p>");
                 }
             }
             else {
                 $('#show_temperature').hide();
                 if (index==1) {
                     hour = "hour";
                 } else {
                     hour = "hours";
                 }
                 $('#show_temperature').append(index + " " + hour + " ago:  " + snow +  " in."+ '<br/>');
             }
         });
         $('#show_temperature').append("<a id='go_back' onclick='hideData(); return false;'>&#171;</a>");
     });
 }

 function check_weather() {
     var dt = new Date();
     var myDate = (dt.getMonth()+1) + "-" + dt.getDate();
     var myTime = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
     var myMin = dt.getHours() + ":" + dt.getMinutes();
     var mySec = dt.getSeconds();

     $('#back_run_test').text('Now: ' + myDate + " "  + myTime);
     
     refreshStorage();

     if (storage.getLocation() == 'Evanston, IL' || storage.getLocation() == 'Skokie, IL') {
         // evanston & skokie @ 7:00; 2inch. overnigh

         if (myMin == "7:0") {
             var data = JSON.parse(storage.getSnow()), move_car = 0;

             if( data[3] > 40 ) // now, but now testing on temperature
                 move_car = 1;

             if(move_car) {
                 if(storage.getAlarm()) {
                     window.plugin.notification.local.add({ 
                         message: "Snow over 2 inches! Move your car now!",
                         sound: 'TYPE_ALARM' });
                  } else {
                     window.plugin.notification.local.add({ 
                         message: "Snow over 2 inches! Move your car now!" });
                 }
             }
         }
     } else if (storage.getLocation() == 'Rogers Park, IL' || storage.getLocation() == 'Lincoln Park, IL') {
         // only notification(11/30) @ 5pm - parking ban starts 12/1->4/1 3am~7am
         // lincon park & rogers park (recent 4inches), push right away(45 mins); check behind 2 hours;

         var data = JSON.parse(storage.getSnow()), move_car = 0;

         if ( myDate == "11-30" && myMin == "17:0") {
             alert("No parking 3AM-7AM, DEC 1 - APR 1");
         }

         if( data[4] > 2 ||  data[5] > 2 ) // now, but now testing on temperature
             move_car = 1;

         move_car = 0;
         if ( move_car ) {
             if(storage.getAlarm()) {
                 window.plugin.notification.local.add({ 
                     message: "Snow over 2 inches! Move your car now!",
                     sound: 'TYPE_ALARM' });
              } else {
                 window.plugin.notification.local.add({ 
                     message: "Snow over 2 inches! Move your car now!" });
             }
         }

     } else {
         $('#back_run_test3').text('smth wrong');
     }

     setTimeout('check_weather()',45*60*1000);
 }

 function refreshStorage() {
     var data, out_strings = [];
     var out_strings = JSON.parse( storage.getSnow() );
     
     app.retrieveData( 4, function(data){
         $.each(data, function( index, value ){
             out_strings.push( value['snow_depth'] );
             out_strings.shift();
         });
         
         storage.storeSnow( JSON.stringify(out_strings) );
     });
 }

 function getLocation() {
        //alert('step1');
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(showLocation, ErrorHandler, options);
       }else{
         alert('thats the problem');
       }
     }
function showLocation(pos) {
       var crd = pos.coords;
       geo_latitude = crd.latitude;
       geo_longtitude = crd.longitude;
       //call function to save data to cloud
       //SavetoCloud();
       console.log(geo_latitude);
       console.log(geo_longtitude);
       ConvertLocation(geo_latitude,geo_longtitude);
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

