/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    retrieveData: function(geo_latitude,geo_longtitude) {
        //alert('ajax!');
        console.log(geo_latitude+'dsfasfdadsadsf');
        console.log(geo_longtitude+'dsfasfdadsadsf');
        
        $.ajax({
            //crossOrigin:true,
            url : "http://www.ndbc.noaa.gov/data/latest_obs/45007.rss",
            dataType : 'jsonp',
            jsonp: false,
            
             jsonpCallback: "mydata",
            

            success : function(dataWeGotViaJsonp) {
                alert("cao0");
                console.log("sucess la");
                var text = '';
                var len = dataWeGotViaJsonp.length;
                for(var i=0;i<len;i++){
                twitterEntry = dataWeGotViaJsonp[i];
                console.log(twitterEntry);
                alert("cao");
                }




                // var data =[];
                // var text = $(xml).find('item').find('description').html();

                // var items = text.split('<strong>');

                // for(var i = 2; i<items.length; i++){
                //     var word = items[i].split('</strong>');
                //     var key = word[0].substr(0,word[0].length - 1);
                //     var value = word[1].split('<br />')[0];
                //     data[key] = word[1];

                //     if(key=="WIND SPEED") {
                //         $('#wind_speed>p').text(value);
                //     } else if (key=="WATER TEMPERATURE") {
                //         $('#water_temp>p').text(value);
                //     } else if (key=="AIR TEMPERATURE") {
                //         $('#air_temp>p').text(value);
                //     }
                //     if(i == 4) {
                //         $('#wind_speed>p').text( ((value.split(' ')[1])*1.1507794).toFixed(1) );
                //     } else if (i == 14) {
                //         $('#water_temp>p').text( value.split('F')[0] + 'F' );
                //     } else if (i == 12) {
                //         $('#air_temp>p').text( value.split('F')[0] + 'F' );
                //     }
                    /*
                    <div id="water_temp" class="bottomleft">
                        <p>63</p>
                    </div>
                    <div id="water_height" class="bottomright">
                        <p>5</p>
                    </div>
                    <div id="wind_speed" class="topright">
                        <p>11</p>
                    </div>    
                    <div id="air_temp" class="topleft">
                        <p>76</p>
                    </div>
                    */ 
                    /*
                    1: "November 6, 2014 4:50 pm CST</strong><br />"
                    2: "Location:</strong> 42.674N 87.026W<br />"
                    3: "Wind Direction:</strong> NNW (330&#176;)<br />"
                4: "Wind Speed:</strong> 27.2 knots<br />"
                    5: "Wind Gust:</strong> 35.0 knots<br />"
                    6: "Significant Wave Height:</strong> 14.4 ft<br />"
                    7: "Dominant Wave Period:</strong> 10 sec<br />"
                    8: "Average Period:</strong> 7.2 sec<br />"
                    9: "Mean Wave Direction:</strong> N (353&#176;) <br />"
                    10: "Atmospheric Pressure:</strong> 30.07 in (1018.2 mb)<br />"
                    11: "Pressure Tendency:</strong> +0.14 in (+4.7 mb)<br />"
                12: "Air Temperature:</strong> 41.4&#176;F (5.2&#176;C)<br />"
                    13: "Dew Point:</strong> 36.5&#176;F (2.5&#176;C)<br />"
                14: "Water Temperature:</strong> 46.8&#176;F (8.2&#176;C)<br />]]>"
                    */
                //}

                // if (data && callback)
                //     callback(data);
            }


        });
    }
};