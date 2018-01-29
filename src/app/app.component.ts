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
import { MzButtonModule, MzInputModule } from 'ng2-materialize';
import { MzRadioButtonModule } from 'ng2-materialize'


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    
})

export class AppComponent implements OnInit {
    title = 'app';
    myValue = 'pedestrian'
    data_polyg;

    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    constructor() {

    }

    public options: Pickadate.DateOptions = {
      format: 'dddd, dd mmm, yyyy',
      formatSubmit: 'yyyy-mm-dd',
    };

    public dateOfBirth = '2017-08-12';

    ngOnInit() {
        var list_district = [];
        let getRandomColor = function() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        mapboxgl.accessToken = 'pk.eyJ1Ijoibm9hbTE2MTAiLCJhIjoiY2phamgzdzFxMjlhbTMzbGV1aWg4MWY3dyJ9.ozjyeDjaIBuTLIlMsYeMbg';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/noam1610/cjcyy7a72041t2squlngaxgdw',
            center: [-87.8, 41.87],
            zoom: 10
        });


        map.on('load', function() {

            request("https://raw.githubusercontent.com/Bended/bsafe/master/noam.json", function(error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage.
                this.data_polyg = JSON.parse(body).features;

                for (var i = 0; i < this.data_polyg.length; i++) {
                    var elem = this.data_polyg[i];
                    if (!list_district.includes(elem.properties.beat_num)) {
                        list_district.push(elem.properties.beat_num)
                        console.log(elem.properties.beat_num)
                        map.addLayer({
                            'id': elem.properties.beat_num,
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
                                'fill-opacity': 0.6
                            }
                        });

                    }
                }
            });
            console.log(this.data_polyg);

        })

    }
}