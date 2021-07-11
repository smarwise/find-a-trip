import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TripComponent } from './trip/trip.component';

const routes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'trip', component: TripComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }