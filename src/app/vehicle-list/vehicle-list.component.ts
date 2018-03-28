import { Vehicle } from '../model/vehicle';

import { VehicleService } from '../vehicle.service';

import { Component, OnInit } from '@angular/core';

import { SwaggerJSON, Definitions, Definition, Property } from '../model/swaggerjson';



@Component({

  selector: 'app-vehicle-list',

  templateUrl: './vehicle-list.component.html',

  styleUrls: ['./vehicle-list.component.css'],

  providers: [VehicleService]

})

export class VehicleListComponent implements OnInit {



  vehicles: Vehicle[];

  selectedVehicle: Vehicle;

  swaggerJSON: SwaggerJSON = new SwaggerJSON();

  showDefinitions: Boolean = false;

  mimeTypes: any;

  objectTypes: any;

  definitionList = Array<any>();

  finalJSON: string;

  swaggerConsumes:string;

  swaggerProduces:string;

  // definitionObject = {definition : new Definition(), properties : new Array<Property>(new Property())};



  constructor(private vehicleService: VehicleService) {

    this.vehicles = this.vehicleService.getVehicles();

    this.mimeTypes = this.vehicleService.getMimeTypes();

    this.objectTypes = this.vehicleService.getObjectTypes();

  }



  ngOnInit() {

  }



  onSelect(vehicle: Vehicle) { this.selectedVehicle = vehicle; }



  generateJSON(swaggerjson) {
    this.finalJSON = '';
    var swaggerJsonClone = Object.assign({}, swaggerjson);
    var isValid = this.checkJSON(swaggerJsonClone);
    if (isValid) {
      swaggerJsonClone.host = swaggerJsonClone.host && swaggerJsonClone.host.trim() ? swaggerJsonClone.host.trim() : undefined;
      swaggerJsonClone.basePath = swaggerJsonClone.basePath && swaggerJsonClone.basePath.trim() ? swaggerJsonClone.basePath.trim() : '/';
      swaggerJsonClone.consumes = this.swaggerConsumes ? swaggerJsonClone.consumes.push(this.swaggerConsumes) : [];
      swaggerJsonClone.produces = this.swaggerProduces ? swaggerJsonClone.produces.push(this.swaggerProduces) : [];
      this.finalJSON = JSON.stringify(swaggerJsonClone);
      console.log(this.finalJSON);
    }

  }



  checkJSON = (swaggerJsonClone: any): boolean => {
    var check: boolean = (swaggerJsonClone && swaggerJsonClone.info && swaggerJsonClone.info.title
      && swaggerJsonClone.info.version) ? true : false;
    return check;
  }

  definitionCheckEvent(event) {

    if (event && event.target && event.target.checked) {

      var definitionObject = { definition: new Definition(), properties: new Array<Property>(new Property()) };

      this.definitionList = new Array<any>(definitionObject);

    } else {

      this.definitionList = new Array<any>();

    }

  }



  addDefinition(event) {

    /*  var definitionObj = new Definition();
  
      var propertList = new Array<Property>();
  
      definitionObj.properties
  
     // definitionObj.properties*/

    var definitionObject = { definition: new Definition(), properties: new Array<Property>(new Property()) };

    this.definitionList.push(definitionObject);

  }



  removeDefinition(event) {

    var elmId = event.target.id;

    var indx = elmId.split('-')[1];

    this.definitionList.splice(indx, 1);

    if (this.definitionList.length == 0) {

      this.showDefinitions = false;

    }

  }



  addAttribute(event) {

    var elmId = event.target.id;

    var indx = elmId.split('-')[1];

    this.definitionList[indx].properties.push(new Property());;

  }



  removeAttribute(event) {

    var elmId = event.target.id;

    var indx = elmId.split('-')[1];

    this.definitionList.splice(indx, 1);

    if (this.definitionList.length == 0) {

      this.showDefinitions = false;

    }

  }



}