
/* Manual search using api from "http://geocoder.opencagedata.com" */

var search_location = {
    
    input: 0,

    init: function () {
        this.input = $('#search_bar').val();
        $('#search_bar').val('');

        console.log(this.input);
        this.action();
    },

    action: function() {
        this.geocoding( function(coords){
            console.log('lat=' + coords.lat + '&lon=' + coords.lon);
            generateRequest.init(coords);
        });
    },

    geocoding: function(callback) {

        var strings = [];

        // Rua Cafelândia, Carapicuíba, Brasil => Rua%20Cafel%C3%A2ndia,+Carapicu%C3%ADba,+Brasil
        // split by ", " => urlencode each => concat by ",+"
        var inputs = this.input.split(',');
        if(inputs.length < 2) {
            alert('Please type in format: Evanston, IL');
            return false;
        }

        $.each(inputs, function( i, val ) {
            strings.push( encodeURI( val.replace(/\s/g, '')));
        });
        var query = strings.join(",+");

        $.ajax({
            url : "https://api.opencagedata.com/geocode/v1/json?q=" + query + "&key=18ed6a73c77d6933d4b028594ad05d4c&pretty=1",
            dataType : "jsonp",
            success : function(parsed_json) {

                if(parsed_json['results'][0] == null) {
                    alert('No search result. Please check your input again.');
                    return false;
                }
                var coords = parsed_json['results'][0]['geometry'];

                if (coords && callback)
                    callback({lat: coords.lat, lon: coords.lng});
            }
        });
    }
}
