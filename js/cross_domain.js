
var generateRequest = {
    
    init: function (coords) {
        if (!coords) {
            this.getCurrentLocation();
        } else {
            this.action(coords);
        }
    },

    action: function (coords) {
        var radius = 100;
        var url = 'http://www.ndbc.noaa.gov/rss/ndbc_obs_search.php?lat=' + coords.lat + '&lon=' + coords.lon + '&radius=' + radius;
        simpleAJAXLib.init(url,0);
    },

    getCurrentLocation: function () {
        getLocation(function(coords){
            /*
            update the current location here~json, find 1st item and update
            for(var i=0;i<jsonList.Table.length;i++) {
                if(jsonList.Table[i].prefer_id==1){
                    jsonList.Table[i].geolatitude=coords.latitude;
                    jsonList.Table[i].geolongtitude=coords.longitude;
                }
            }*/
            generateRequest.action(coords);
        });
    }
}


var simpleAJAXLib = {
    
    init: function (url, station) {
        this.fetchJSON(url, station);
    },

    fetchJSON: function (url, station) {
        var root = 'https://query.yahooapis.com/v1/public/yql?q=';
        var yql = 'select * from xml where url="' + url + '"';
        var method = (station) ? 'showStation' : 'showNear';
        var proxy_url = root + encodeURIComponent(yql) + '&format=json&diagnostics=false&callback=simpleAJAXLib.' + method;
        document.getElementsByTagName('body')[0].appendChild(this.jsTag(proxy_url));
    },

    jsTag: function (url) {
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', url);
        return script;
    },

    showNear: function (results) {
        var items = results.query.results.rss.channel.item;

        var nearest = null;

        /* assume numeric 5-digit ID buoy station has all kinds of data 
        $.each(items, function( i, val ) {
            var station_name = val.title.split(' ')[1];
            if(station_name && !isNaN(station_name)) {
                nearest = station_name;
                return false;
            }
        });*/

        if(items!=null) {
            $.each(items, function(i,val) {
                if (val.title!='SHIP') {
                    nearest = val.title.split(' ')[1].toLowerCase();
                    return false;
                }
            });
        }

        if(nearest == null) {
            alert("No available buoy station nearby!!!\nGive you sunshine from Miami!!!");
            nearest = "vakf1";
        }

        var url_station = 'http://www.ndbc.noaa.gov/data/latest_obs/' + nearest + '.rss';
        simpleAJAXLib.fetchJSON(url_station, 1);
    },

    showStation: function (results) {
        var dataarray = [];
        //Get the data out of the results 
        var station_node = results.query.results.rss.channel.item
        var text = "";
        var text2 = station_node.description;
        var items2 = text2.split('<strong>');

        
        //alert('Data from: \n' + station_node.title);

        // set a localStorage
        localStorage.setItem("currentStation", station_node.title);
        $('#search_bar').attr("placeholder",station_node.title);

        // parse the data and load the object data to dataarray and text data to text
        for(i = 1 ; i < items2.length;i++){
            var temptext = (items2[i]);
            var values = temptext.split('</strong>');
            var attribute = values[0];
            var value_tail_out =  values[1].split('<br />');
            var value = value_tail_out[0].trim();
            var new_vlue = new BuoyData(attribute, value);
            dataarray[i-1] = new_vlue;
            text = text + attribute + "    "+ value+ "\n";
        }


        //writte the data to each form
        var water_temperature = '?';
        var water_height = '?';
        var wind_speeds = '?';
        var air_temperature = '?';

        for(i=0;i<dataarray.length;i++){

            if(dataarray[i].attribute === "Water Temperature:"){
                water_temperature = dataarray[i].values;
            } else if(dataarray[i].attribute === "Significant Wave Height:"){
                water_height = dataarray[i].values;
            } else if(dataarray[i].attribute === "Wind Speed:"){
                wind_speeds = dataarray[i].values;
            } else if(dataarray[i].attribute === "Air Temperature:"){
                air_temperature = dataarray[i].values;
            }
        }

        // update info box
        $('#water_temp').text(water_temperature.substring(0, 2));
        $('#water_height').text(water_height.substring(0, 1));
        $('#wind_speed').text(wind_speeds.substring(0, 2));
        $('#air_temp').text(air_temperature.substring(0, 2));

        $('#buoy_detail_data').val(text);

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
        // update background
        if( parseInt(air_temperature.substring(0, 2))<40 ) {
            $('body').css('background-image','url(images/background_cold.jpg)');
        }
        else {
            $('body').css('background-image','url(images/Background2.jpg)');
        }

<<<<<<< Updated upstream
=======
        // back to index view
        $('#main_view').show();
        $('#address_button').show();
        $('#view_selection').hide();

        //populate favorite data into list
        Populate_Preference();
>>>>>>> Stashed changes
    }
}

function BuoyData  (attribute, values){

    // Add object properties like this
    this.attribute = attribute;
    this.values = values;
}
