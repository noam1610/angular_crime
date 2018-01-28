import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import { environment } from '../environments/environment';
import * as jsonfile from 'jsonfile'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent   implements OnInit{
    title = 'app';

    ngOnInit() {
    
        mapboxgl.accessToken = 'pk.eyJ1Ijoibm9hbTE2MTAiLCJhIjoiY2phamgzdzFxMjlhbTMzbGV1aWg4MWY3dyJ9.ozjyeDjaIBuTLIlMsYeMbg';
            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/noam1610/cjcyy7a72041t2squlngaxgdw',
                center: [-87.8, 41.87],
                zoom: 10
        });

        jsonfile.readFile("chicago.geojson", function(err, obj) {
            console.dir(obj)
        })
    }


 
}
