import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';

@NgModule({
  declarations: [
    AppComponent,
    VehicleListComponent,
    VehicleDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
