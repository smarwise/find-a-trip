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
  styleUrls: ['./trip.component.css'],
})

export class TripComponent implements OnInit {

  testData = [
   {"type": "Bus", "duration": "10", "fare": "$10"}, 
   {"type": "Rail", "duration": "4", "fare": "$50"}, 
   {"type": "Bus", "duration": "25", "fare": "$20"}, 
   {"type": "Bus", "duration": "10", "fare": "$10"}, 
   {"type": "Rail", "duration": "4", "fare": "$50"}
  ]

  // menu = ["no", "star"];

  title = 'Trips';
  trips: Trip[] = [];
  iteneraries: Itinerary[] = [];
  journeys: Journey[] = [];
  accessToken: string = "";
  columnsToDisplay = ["type", "duration", "fare"];
  selected2 = "Johannesburg";
  selected1 = "Randburg";
  logo = "../../assets/images/logo.png";
  // sourceLongitude =  27.99587;
  // sourceLatitude = -26.14369;
  // destLongitude = 28.04228;
  // destLatitude = -26.20652;
  sourceLongitude =  18.425635578195614; 
  sourceLatitude = -33.92615856801032;
  destLongitude = 18.428173926320085;
  destLatitude = -33.93950185556978; 


  stops = [{"key": "Johannesburg", "longitude":28.0473, "latitude": -26.206664},
  {"key": "Centurion", "longitude":28.0889, "latitude": 25.8640},
  {"key": "Kempton Park", "longitude":28.2337, "latitude": 26.1084},
  {"key": "Fourways", "longitude":28.056702, "latitude": -26.107567},
  {"key": "Rosebank", "longitude":18.4742, "latitude": -33.9556},
  {"key": "Randburg", "longitude":27.99587, "latitude": -26.14369},
  {"key": "Sandton", "longitude":28.0567, "latitude": 26.1076},
  {"key": "Germiston", "longitude":28.1708, "latitude": 26.2259},
  {"key": "Eastgate", "longitude":28.659, "latitude": 26.1047}]

  headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
  token_headers = new HttpHeaders()
;
  params = new HttpParams();
  body = {
    "geometry": {
        "type": "MultiPoint",
        "coordinates": [
            [
                this.sourceLongitude,
                this.sourceLatitude
                
            ],
            [
                this.destLongitude,
                this.destLatitude
            ]
        ]
    }
};

  constructor(
    private httpClient: HttpClient
    ){}

  ngOnInit(){
    // this.getAccessToken();
    // this.httpClient.get<any>("https://platform.whereismytransport.com/api/agencies")
  }

  getAccessToken(){
    console.log(this.selected1+this.selected2);
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
  console.log(this.body);
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

modeIcon(mode: string): string {
  if(mode == "Walking") {return 'directions_walk'} 
  if(mode == "Bus") {return 'directions_bus'} 
  if(mode == "Rail") {return 'subway'}
  return ("rowing");
}

onSelection(){
  console.log(this.selected1 + this.selected2);
  // this.getAccessToken();
}

}