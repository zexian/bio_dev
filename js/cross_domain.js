
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
            // do the necessary stuff
            //document.getElementById('demo').innerHTML = "Result = " + (results.error ? "Internal Server Error!" : JSON.stringify(results.query.results));
            console.log("aaaaaa"+ JSON.stringify(results.query.results));
        }
    }
