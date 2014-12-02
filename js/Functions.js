
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

function deleteFunction(station_title) {

<<<<<<< Updated upstream
function Populate_Preference () {

    var listItems= "";
    var favorite_list = JSON.parse(localStorage.getItem("buoyFav"));
    for (var i = 0; i < favorite_list.length; i++){
      listItems+= "<option value='" + favorite_list[i].split(' ')[1].toLowerCase() + "'>" + favorite_list[i] + "</option>";
    }
    $("#Preference").html(listItems);
        
}

function select_prefer(station_id) {
=======
}

function Populate_Preference () {

    var currentStation = localStorage.getItem("currentStation");
    current_view = '<div class="view_selection_box"><ul> \
                    <input type="radio" name="view_staiton" id="radio_current_station" checked \
                           value="' + currentStation + '"> \
                    <label for="radio_current_station">Current viewing: ' + currentStation + '</label></ul></div>';

    var listItems= current_view;
    if(localStorage.getItem("buoyFav")) {
        var favorite_list = JSON.parse(localStorage.getItem("buoyFav"));
        for (var i = 0; i < favorite_list.length; i++) {
            if (favorite_list[i]!=currentStation) {
                listItems+= '<div class="view_selection_box"><ul> \
                             <input type="radio" name="view_staiton" id="radio_station_' + i + '" \
                                    value="' + favorite_list[i] + '"> \
                            <label for="radio_station_' + i + '">' + favorite_list[i] + '</label>\
                            <img class="del_fav"></ul></div>';
                }
            }
    }
    
    $('#view_selection').html(listItems);

    $('div.view_selection_box > ul').click( function(){
        console.log( $(this).find("input").attr("value"));
        select_prefer($(this).find("input").attr("value"));
    });
    /*$('.del_fav').click( function() {
        deleteFunction();
    });*/
}

function select_prefer(station_title) {
    var station_id = station_title.split(' ')[1].toLowerCase();
>>>>>>> Stashed changes
    var url_station = 'http://www.ndbc.noaa.gov/data/latest_obs/' + station_id + '.rss';
    simpleAJAXLib.fetchJSON(url_station, 1);
} 
