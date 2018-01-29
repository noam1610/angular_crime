import {
    Component,
    OnInit
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {
    Map
} from 'mapbox-gl';
import {
    environment
} from '../environments/environment';
import {
    Http,
    Response,
    Headers,
    RequestOptions
} from '@angular/http';
import * as request from 'request';
import {
    MzButtonModule,
    MzInputModule
} from 'ng2-materialize';
import {
    MzRadioButtonModule
} from 'ng2-materialize';
import * as _ from 'lodash';
import {
    MzToastService 
} from 'ng2-materialize';


let list_district_coordonates = {};
let list_district = []
let list_district_bis = []
let map;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],

})

export class AppComponent implements OnInit {
    title = 'app';
    myValue = 'pedestrain'
    data_polyg;
    public map;
    address: string;

    date;
    time;



    private search() {
        console.log(this.date);
        console.log(this.time[0] + this.time[1]);
        var date = new Date(this.date);
        var day = date.getDay();
        console.log(day);

        var hour = parseInt(this.time[0] + this.time[1]);
        console.log(hour);


        var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        request("https://raw.githubusercontent.com/noam1610/angular_crime/master/result_" + this.myValue + ".json", function(error, response, body) {
            console.log("error", error)
            console.log("body", JSON.parse(body))
            console.log("response", response)

            let polygon = JSON.parse(body)[days[day]][hour]
            console.log(polygon)
            map.remove()
            mapboxgl.accessToken = 'pk.eyJ1Ijoibm9hbTE2MTAiLCJhIjoiY2phamgzdzFxMjlhbTMzbGV1aWg4MWY3dyJ9.ozjyeDjaIBuTLIlMsYeMbg';
            this.map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/noam1610/cjcyy7a72041t2squlngaxgdw',
                center: [-87.8, 41.87],
                zoom: 10
            });

            map = this.map
            map.on('load', function() {
                _.forEach(polygon, function(value, key) {
                    // console.log("key", key)
                    // console.log(map.getLayer("$" + parseInt(key)))
                    // console.log("key", key)
                    // console.log(map.removeLayer("$" + parseInt(key)))
                    map.addLayer({
                        'id': "$" + parseInt(key),
                        'type': 'fill',
                        'source': {
                            'type': 'geojson',
                            'data': {
                                'type': 'Feature',
                                'geometry': list_district_coordonates["$" + parseInt(key)]
                            }
                        },
                        'layout': {},
                        'paint': {
                            'fill-color': 'rgb(255,' + (255 - parseFloat(value) * 255) + ', 0)',
                            'fill-opacity': 1
                        }
                    });
                });
            })

        })
    }

    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    constructor(private toastService: MzToastService) {

    }

    public options: Pickadate.DateOptions = {
        format: 'dddd, dd mmm, yyyy',
        formatSubmit: 'yyyy-mm-dd',
    };

    public dateOfBirth = '2017-08-12';

    ngOnInit() {
        let list_district = []
        let getRandomColor = function() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        mapboxgl.accessToken = 'pk.eyJ1Ijoibm9hbTE2MTAiLCJhIjoiY2phamgzdzFxMjlhbTMzbGV1aWg4MWY3dyJ9.ozjyeDjaIBuTLIlMsYeMbg';
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/noam1610/cjcyy7a72041t2squlngaxgdw',
            center: [-87.8, 41.87],
            zoom: 10
        });

        map = this.map
        map.on('load', function() {
            request("https://raw.githubusercontent.com/Bended/bsafe/master/noam.json", function(error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage.
                this.data_polyg = JSON.parse(body).features;

                for (var i = 0; i < this.data_polyg.length; i++) {
                    var elem = this.data_polyg[i];
                    if (!list_district.includes("$" + parseInt(elem.properties.beat_num))) {
                        list_district.push("$" + parseInt(elem.properties.beat_num))
                        list_district_coordonates["$" + parseInt(elem.properties.beat_num)] = elem.geometry;
                        console.log("$" + parseInt(elem.properties.beat_num));
                        map.addLayer({
                            'id': "$" + parseInt(elem.properties.beat_num),
                            'type': 'fill',
                            'source': {
                                'type': 'geojson',
                                'data': {
                                    'type': 'Feature',
                                    'geometry': elem.geometry
                                }
                            },
                            'layout': {},
                            'paint': {
                                'fill-color': getRandomColor(),
                                'fill-opacity': 0.1
                            }
                        });

                    }
                }
            });
            console.log(this.data_polyg);

        })

    }
    private getAddress() {
        console.log("getAddress")

        request("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.address.replace(" ", "+") + "&key=AIzaSyAIsECqZT3LgPuP6XQw7P2jSnjU__JkxFw", function(error, response, body) {
            console.log("getAddress")
            console.log("error", error)
            console.log("body", JSON.parse(body).results[0])
            let point = JSON.parse(body).results[0].geometry.location;
            console.log("body", JSON.parse(body).results[0].geometry.location)
            console.log("response", response)
            //this.toastService.show('I am a toast!', 4000, 'green', () => alert('Toast has been dismissed'));
            map.addLayer({
                "id": "totot" + point.lng,
                "type": "symbol",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": [{
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                //"coordinates": [point.long, point.lat]
                                "coordinates": [-80.6935883, 41.9902391]
                            },
                            "properties": {
                                "title": "LOCATED (:)",
                                "icon": "monument"
                            }
                        }, {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [point.lng, point.lat ]
                    },
                    "properties": {
                        "title": "LOCATED :)",
                        "icon": "harbor"
                    }
                }]
                    }
                },
                "layout": {
                    "icon-image": "{icon}-15",
                    "text-field": "{title}",
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    "text-offset": [0, 0.6],
                    "text-anchor": "top"
                }
            });

        })
    }
}