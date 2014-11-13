function BuoyData  (attribute, values){

           // Add object properties like this
           this.attribute = attribute;
           this.values = values;
        }
    

    simpleAJAXLib = {
        

        init: function () {
            this.fetchJSON('http://www.ndbc.noaa.gov/data/latest_obs/45007.rss');
        },
 
        fetchJSON: function (url) {
            var root = 'https://query.yahooapis.com/v1/public/yql?q=';
            var yql = 'select * from xml where url="' + url + '"';
            var proxy_url = root + encodeURIComponent(yql) + '&format=json&diagnostics=false&callback=simpleAJAXLib.display';
            document.getElementsByTagName('body')[0].appendChild(this.jsTag(proxy_url));
        },
 
        jsTag: function (url) {
            var script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', url);
            return script;
        },
 
        display: function (results) {
            var dataarray = new Array(15);
            //Get the data out of the results 
            var text = "";
            var text2 = results.query.results.rss.channel.item.description;
            var items2 = text2.split('<strong>');


            //parse the data and load the object data to dataarray and text data to text
            for(i = 1 ; i < items2.length;i++){
                var temptext = (items2[i]);
                var values=temptext.split('</strong>');
                var attribute= values[0];
                var value_tail_out =  values[1].split('<br />');
                var value = value_tail_out[0].trim();
                var new_vlue = new BuoyData(attribute, value);
                dataarray[i-1]=new_vlue;
                text = text + attribute + "    "+ value+ "\n";
            }        

            //writte the data to each form\

            //get water temperature
            var water_temperature;
            var water_height;
            var wind_speeds ;
            var air_temperature;
            var a ="Water Temperature:";
            for(i=0;i<dataarray.length-1;i++){
                if(dataarray[i].attribute==a){
                    water_temperature = dataarray[i].values;
                }

                if(dataarray[i].attribute==="Significant Wave Height:"){
                    water_height = dataarray[i].values;
                }

                if(dataarray[i].attribute==="Wind Speed:"){
                    wind_speeds = dataarray[i].values;
                }

                if(dataarray[i].attribute==="Air Temperature:"){
                    air_temperature = dataarray[i].values;
                }
            }
            

            $('#water_temp').text(water_temperature.substring(0, 2));
            $('#water_height').text(water_height.substring(0, 1));
            $('#wind_speed').text(wind_speeds.substring(0, 2));
            $('#air_temp').text(air_temperature.substring(0, 2));
            // document.getElementById('water_temp').text=dataarray[13].values.substring(0, 3);
            // document.getElementById('water_height').value=dataarray[5].values;
            // document.getElementById('wind_speed').value=dataarray[3].values;
            // document.getElementById('air_temp').value=dataarray[11].values.substring(0, 3);

           

            

            // for(int i=0;i<items2.length;i++){

            // }


            //write the result to the panel

            document.getElementById('buoy_detail_data').value=text;




        }
    }