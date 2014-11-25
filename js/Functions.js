
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

    var listItems= "";
    var favorite_list = JSON.parse(localStorage.getItem("buoyFav"));
    for (var i = 0; i < favorite_list.length; i++){
      listItems+= "<option value='" + favorite_list[i].split(' ')[1].toLowerCase() + "'>" + favorite_list[i] + "</option>";
    }
    $("#Preference").html(listItems);
        
}

function select_prefer(station_id) {
    var url_station = 'http://www.ndbc.noaa.gov/data/latest_obs/' + station_id + '.rss';
    simpleAJAXLib.fetchJSON(url_station, 1);
} 
