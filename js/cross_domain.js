function BuoyData  (attribute, values){

    // Add object properties like this
    this.attribute = attribute;
    this.values = values;
}
    
var generateRequest = {
    
    init: function (location) {
        if (!location)
            this.getCurrentLocation();
    },

    getCurrentLocation: function () {
        getLocation(function(coords){
            alert('Searching the nearest station from ' + (coords.latitude).toFixed(2) + ', ' + (coords.longitude).toFixed(2));
            generateRequest.action(coords);
        });
        /*var coords = {latitude: 42.0576327, longitude: -87.6759644}
        alert('Searching the nearest station from ' + (coords.latitude).toFixed(2) + ', ' + (coords.longitude).toFixed(2));
        generateRequest.action(coords);*/
    },

    action: function (location) {
        var radius = 100;
        var url = 'http://www.ndbc.noaa.gov/rss/ndbc_obs_search.php?lat=' + location.latitude + '&lon=' + location.longitude + '&radius=' + radius;
        simpleAJAXLib.init(url,0);
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

        var link = items[0].link; //nearest station

        var url_station = 'http://www.ndbc.noaa.gov/data/latest_obs/' + link.split('station=')[1] + '.rss';
        simpleAJAXLib.fetchJSON(url_station, 1);
    },

    showStation: function (results) {
        //var dataarray = new Array(15);
        var dataarray = [];
        //Get the data out of the results 
        var text = "";
        var text2 = results.query.results.rss.channel.item.description;
        var items2 = text2.split('<strong>');


        //parse the data and load the object data to dataarray and text data to text
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
        

        $('#water_temp').text(water_temperature.substring(0, 2));
        $('#water_height').text(water_height.substring(0, 1));
        $('#wind_speed').text(wind_speeds.substring(0, 2));
        $('#air_temp').text(air_temperature.substring(0, 2));

        $('#buoy_detail_data').val(text);

    }
}
