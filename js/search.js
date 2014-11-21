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
            //console.log(coords.lat + '/' + coords.lon);
            generateRequest.init(coords);
        });
    },

    geocoding: function(callback) {

        var strings = [];

        // Rua Cafelândia, Carapicuíba, Brasil => Rua%20Cafel%C3%A2ndia,+Carapicu%C3%ADba,+Brasil
        // split by ", " => urlencode each => concat by ",+"
        var inputs = this.input.split(', ');
        $.each(inputs, function( i, val ) {
            strings.push(encodeURI(val));
        });
        var query = strings.join(",+");

        $.ajax({
            url : "https://api.opencagedata.com/geocode/v1/json?q=" + query + "&key=18ed6a73c77d6933d4b028594ad05d4c&pretty=1",
            dataType : "jsonp",
            success : function(parsed_json) {

                var coords = parsed_json['results'][0]['geometry'];

                if (coords && callback)
                    callback({lat: coords.lat, lon: coords.lng});
            }
        });
    }
}