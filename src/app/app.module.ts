
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';


import { MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { AppComponent } from './app.component';
import { TripComponent } from './trip/trip.component';


@NgModule({
  declarations: [
    AppComponent,
    TripComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
