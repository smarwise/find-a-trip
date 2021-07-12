import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export class Trip{
  constructor(
    public id: string,
    public href: string,
    public geometry: JSON,
    public fareProducts: string[],

    public itineraries: Itinerary[]
  ) {
  } 
}

export class Itinerary{
  constructor(
  public id:	number,
  public href: string,
  public departureTime:	Date,
  public arrivalTime: 	Date,
  public distance:	number,
  public duration:	number,
 ){}}

export class Journey{
  constructor(
  public type: string,
  public distance: number,
  public duration: number,
  public vehicle: string,
  public fare: number
  ){}
}

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})

export class TripComponent implements OnInit {

  testData = [
   {"type": "bus", "duration": "10", "fare": "$10"}, 
   {"type": "rail", "duration": "4", "fare": "$50"}, 
   {"type": "bus", "duration": "25", "fare": "$20"}, 
  ]

  title = 'Trips';
  trips: Trip[] = [];
  iteneraries: Itinerary[] = [];
  journeys: Journey[] = [];
  accessToken: string = "";
  columnsToDisplay = ["type", "duration", "fare"];
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

getTrips(){
    this.token_headers = this.token_headers.append('Authorization', ["Bearer " + this.accessToken]);
    this.token_headers = this.token_headers.append('Content-Type', 'application/json')
  
    this.httpClient.post<any>('https://platform.whereismytransport.com/api/journeys'
  ,this.body, {headers: this.token_headers}).subscribe(
      response => {
      // this.trips = response.data;
      Object.assign(this.trips, response);
      Object.assign(this.iteneraries, response.itineraries)
      console.log(this.iteneraries);
      console.log(response);
      this.getJourneys();
      }
    );
  }

getJourneys(){
  this.iteneraries.forEach((itinerary) =>
  {
    this.httpClient.get<any>(itinerary.href, {headers: this.token_headers}).subscribe(
      response => {
        this.journeys.push(response.legs[0]);
        console.log(this.journeys);
      } , (err) => {
        console.log(err);
      });
  });
  console.log(this.journeys);
}

}