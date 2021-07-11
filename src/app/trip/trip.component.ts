import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { DatePipe } from '@angular/common';

export class Trip{
  constructor(
    public id: string,
    public href: string,
    public name: string,
    public code: string,
    public color: string,

    private defaultOnlyAgencies: string  = "",
    private defaultOmitAgencies: string  = "",
    private defaultFareProducts: string = "",
    private time: Date = new Date(),
    private defaultProfile: string = "ClosestToTime",
    private defaultStartLatitude: number  = -25.747562,
    private defaultStartLongitude: number  = 28.236323,
    private defaultEndLatitude: number  = -26.195135,
    private defaultEndLongitude: number  = 28.036299,
    private defaultAt: Date
  ) {
  } 
}

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})

export class TripComponent implements OnInit {

  title = 'Trips';
  trips: Trip[] = [];
  accessToken: string = "";
  headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
  token_headers = new HttpHeaders();
  params = new HttpParams();
  body = {
    "geometry": {
        "type": "MultiPoint",
        "coordinates": [
            [
                18.37755,
                -33.94393
            ],
            [
                18.41489,
                -33.91252
            ]
        ]
    },
    "maxItineraries": 5
};

  constructor(
    private httpClient: HttpClient
    ){}

  ngOnInit(){
    this.getAccessToken();
  }

  getAccessToken(){
    this.httpClient.post<any>('https://identity.whereismytransport.com/connect/token', "client_id=7fe6814d-26f5-4f5b-aa5c-e180f46757d4&client_secret=c0S4%2Ff135fOOLhiRwMQEZhprh9shVxEniBUvVphtlAc%3D&grant_type=client_credentials&scope=transportapi%3Aall", 
    {headers: this.headers}).subscribe(
      response => {
        this.accessToken = response.access_token;
        this.getTrips();
      }
    , (err) => {
      console.log(err);
    });
  }

 async   getTrips(){
    this.token_headers = this.token_headers.append('Authorization', ["Bearer " + this.accessToken]);
    this.token_headers = this.token_headers.append('Content-Type', 'application/json')
  
    this.httpClient.post<any>('https://platform.whereismytransport.com/api/journeys'
  ,this.body, {headers: this.token_headers}).subscribe(
      response => {
      // this.trips= response;
      console.log(response);
      }
    );
  }
}