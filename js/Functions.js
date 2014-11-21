var jsonList = {"Table" :
                 [{"prefer_id" : "2","prefer_name" : "Duke Kahanamoku Beach, Oahu, Hawaii","geolatitude":"41.968","geolongtitude":"-87.637","URL_Link":"www.ndbc"},
                  {"prefer_id" : "3","prefer_name" : "Barefoot Beach, Bonita Springs, Florida","geolatitude":"43.540","geolongtitude":"-82.07","URL_Link":"www.ndbc"},
                  {"prefer_id" : "4","prefer_name" : "St. George Island State Park","geolatitude":"50.870","geolongtitude":"-129.92","URL_Link":"www.ndbc"},
                  {"prefer_id" : "5","prefer_name" : "Waimanalo Bay State Park,Oahu, Hawaii","geolatitude":"41.8964343","geolongtitude":"-87.6172751","URL_Link":"www.ndbc"},
                   {"prefer_id" : "6","prefer_name" : "Cape Hatteras, Outer Banks, North Carolina","geolatitude":"14.329","geolongtitude":"-46.082","URL_Link":"www.ndbc"}]}


                //add a json data, ways to push in items
                   jsonList.Table.push({"prefer_id" : "1","prefer_name" : "current location ","geolatitude":"42","geolongtitude":"45","URL_Link":"www.ndbc"});

/* not in use
function settingFunction(){
    $('#wind_speed').text('80');
}
function socialFunction(){
    alert('clicked social buttion')        
}
*/

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
        callback({lat: position.coords.latitude, lon: position.coords.longitude});
      });
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
}




function select_prefer(selected_id) {

  //alert(selected_id);
  var objec = getObjects(jsonList,'prefer_id',selected_id);
  //alert("you just selected: "+objec[0].prefer_name);
  //alert(objec[0].geolatitude);
  //alert(objec[0].geolongtitude);
  var radius = 1000;
  var url = 'http://www.ndbc.noaa.gov/rss/ndbc_obs_search.php?lat=' + objec[0].geolatitude + '&lon=' + objec[0].geolongtitude + '&radius=' + radius;
  simpleAJAXLib.init(url,0);

  //get the json value
} 


function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}


