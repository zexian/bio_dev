var jsonList = {"Table" :
                 [{"prefer_id" : "2","prefer_name" : "Duke Kahanamoku Beach, Oahu, Hawaii","geolatitude":"41.968","geolongtitude":"-87.637","URL_Link":"www.ndbc"},
                  {"prefer_id" : "3","prefer_name" : "Barefoot Beach, Bonita Springs, Florida","geolatitude":"43.540","geolongtitude":"-82.07","URL_Link":"www.ndbc"},
                  {"prefer_id" : "4","prefer_name" : "St. George Island State Park","geolatitude":"50.870","geolongtitude":"-129.92","URL_Link":"www.ndbc"},
                  {"prefer_id" : "5","prefer_name" : "Waimanalo Bay State Park,Oahu, Hawaii","geolatitude":"41.8964343","geolongtitude":"-87.6172751","URL_Link":"www.ndbc"},
                   {"prefer_id" : "6","prefer_name" : "Cape Hatteras, Outer Banks, North Carolina","geolatitude":"14.329","geolongtitude":"-46.082","URL_Link":"www.ndbc"}]}


                //add a json data, ways to push in items
                   jsonList.Table.push({"prefer_id" : "1","prefer_name" : "current location ","geolatitude":"42","geolongtitude":"45","URL_Link":"www.ndbc"});

/*
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
}*/

function detailFunction(){
    $('.b_form').slideToggle();     
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



function addFavorite() {

    // initialize
    if(!localStorage.getItem("buoyFav")) {
      localStorage.setItem("buoyFav", '[]');
    }

    var favorite_list = JSON.parse(localStorage.getItem("buoyFav"));
    var current_station = localStorage.getItem("currentStation");

    // avoid duplicate save    
    if ( $.inArray( current_station, favorite_list ) == -1)
        favorite_list.push(current_station);

    localStorage.setItem("buoyFav", JSON.stringify(favorite_list));
    Populate_Preference();
}


function Populate_Preference () {
//function Populate_Preference(jsonList){
    /*jsonList.Table.sort(function(a,b){
        return a.prefer_id - b.prefer_id;
    });
    

    var listItems= "";
    for (var i = 0; i < jsonList.Table.length; i++){
      listItems+= "<option value='" + jsonList.Table[i].prefer_id + "'>" + jsonList.Table[i].prefer_name + "</option>";
    }*/
    var listItems= "";
    var favorite_list = JSON.parse(localStorage.getItem("buoyFav"));
    for (var i = 0; i < favorite_list.length; i++){
      listItems+= "<option value='" + favorite_list[i].split(' ')[1].toLowerCase() + "'>" + favorite_list[i] + "</option>";
    }
    $("#Preference").html(listItems);
        
}


//function select_prefer(selected_id) {
function select_prefer(station_id) {

    /*
    //alert(selected_id);
    var objec = getObjects(jsonList,'prefer_id',selected_id);
    //alert("you just selected: "+objec[0].prefer_name);
    //alert(objec[0].geolatitude);
    //alert(objec[0].geolongtitude);
    var radius = 1000;
    var url = 'http://www.ndbc.noaa.gov/rss/ndbc_obs_search.php?lat=' + objec[0].geolatitude + '&lon=' + objec[0].geolongtitude + '&radius=' + radius;
    simpleAJAXLib.init(url,0);*/

    var url_station = 'http://www.ndbc.noaa.gov/data/latest_obs/' + station_id + '.rss';
    simpleAJAXLib.fetchJSON(url_station, 1);
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
