import { Vehicle } from '../model/vehicle';
import { VehicleService } from '../vehicle.service';
import { Component, OnInit } from '@angular/core';
import { SwaggerJSON, Definitions, Definition, Property, DefintionUIObject, PropertyUIObject, Tag, PathUIObject, ControllerUIObject } from '../model/swaggerjson';

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
  mimetypes: any;
  objectTypes: any;
  dataTypes: any;
  dataTypeJSON: any;
  requestMethodTypes: any;
  definitionList = new Array<any>();
  controllertNameArray = new Array<string>();
  controllerObjArray: Array<ControllerUIObject> = new Array<ControllerUIObject>(new ControllerUIObject());
  finalJSON: string;
  swaggerConsumes: string = "";
  swaggerProduces: string = "";

  constructor(private vehicleService: VehicleService) {
    this.vehicles = this.vehicleService.getVehicles();
    this.mimetypes = this.vehicleService.getMimeTypes();
    this.objectTypes = this.vehicleService.getObjectTypes();
    this.dataTypes = this.vehicleService.getDataTypes();
    this.dataTypeJSON = this.vehicleService.getDataTypeJSON();
    this.requestMethodTypes = this.vehicleService.getRequestMethodTypes();
  }

  ngOnInit() {
  }

  onSelect(vehicle: Vehicle) { this.selectedVehicle = vehicle; }

  generateJSON(event) {
    this.finalJSON = '';
    var swaggerJsonClone = JSON.parse(JSON.stringify(this.swaggerJSON));
    var isValid = this.checkJSON(swaggerJsonClone);
    if (isValid) {
      swaggerJsonClone.host = swaggerJsonClone.host && swaggerJsonClone.host.trim() ? swaggerJsonClone.host.trim() : undefined;
      swaggerJsonClone.basePath = swaggerJsonClone.basePath && swaggerJsonClone.basePath.trim() ? swaggerJsonClone.basePath.trim() : '/';
      this.swaggerConsumes ? swaggerJsonClone.consumes.push(this.swaggerConsumes) : swaggerJsonClone.consumes = undefined;
      this.swaggerProduces ? swaggerJsonClone.produces.push(this.swaggerProduces) : swaggerJsonClone.produces = undefined;

      if (swaggerJsonClone.tags) {
        for (let tag of swaggerJsonClone.tags) {
          var tagName = tag.name && tag.name.trim() ? tag.name.trim() : "";
          if (tagName) {
            tag.name = tagName;
            tag.description = tag.description.trim();
          } else {
            swaggerJsonClone.tags.splice(swaggerJsonClone.tags.indexOf(tag), 1);
          }
        }
      }

      if (this.definitionList) {
        var definitionsObj: Definitions = new Definitions();
        for (let defn of this.definitionList) {
          var definitionsObjKey: string = defn.defnName ? defn.defnName.trim() : "";
          if (definitionsObjKey) {
            var definitionsObjValue: Definition = new Definition();
            definitionsObjValue.type = defn.definition.type;
            for (let prop of defn.properties) {
              var propertiesObjKey: string = prop.propName ? prop.propName.trim() : "";
              if (propertiesObjKey) {
                var propertiesObjValue: Property = new Property();
                propertiesObjValue.type = this.dataTypeJSON[prop.property.type].type;
                propertiesObjValue.format = this.dataTypeJSON[prop.property.type].format;
                definitionsObjValue.properties[propertiesObjKey] = propertiesObjValue;
              }
            }
            definitionsObj[definitionsObjKey] = definitionsObjValue;
          }
        }
        swaggerJsonClone.definitions = definitionsObj;
      }
      this.finalJSON = JSON.stringify(swaggerJsonClone);
    }
  }

  checkJSON = (swaggerJsonClone: any): boolean => {
    var check: boolean = (swaggerJsonClone && swaggerJsonClone.info && swaggerJsonClone.info.title
      && swaggerJsonClone.info.version) ? true : false;
    return check;
  }

  definitionCheckEvent(event) {
    if (event && event.target && event.target.checked) {
      //  var definitionObject = new DefintionUIObject();
      this.definitionList = new Array<DefintionUIObject>(new DefintionUIObject());
    } else {
      this.definitionList = new Array<any>();
    }
  }

  addDefinition(event) {
    // var definitionObject = new DefintionUIObject();
    this.definitionList.push(new DefintionUIObject());
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
    var defIndx = elmId.split('-')[1];
    var propIndx = elmId.split('-')[2];
    this.definitionList[defIndx].properties.push(new PropertyUIObject());
  }

  removeAttribute(event) {
    var elmId = event.target.id;
    var defIndx = elmId.split('-')[1];
    var propIndx = elmId.split('-')[2];
    this.definitionList[defIndx].properties.splice(propIndx, 1);
    if (this.definitionList[defIndx].properties.length == 0) {
      this.definitionList[defIndx].properties.push(new PropertyUIObject());
    }
  }

  addController(event) {
    this.controllerObjArray.push(new ControllerUIObject());
  }

  removeController(event) {
    var elmId = event.target.id;
    var indx = elmId.split('-')[1];
    this.controllerObjArray.splice(indx, 1);
    if (this.controllerObjArray.length == 0) {
      this.controllerObjArray.push(new ControllerUIObject());
    }
  }

  addPath(event) {
    var elmId = event.target.id;
    var contrlrIndx = elmId.split('-')[1];
    var pathIndx = elmId.split('-')[2];
    this.controllerObjArray[contrlrIndx].paths.push(new PathUIObject());
  }

  removePath(event) {
    var elmId = event.target.id;
    var contrlrIndx = elmId.split('-')[1];
    var pathIndx = elmId.split('-')[2];

    this.controllerObjArray[contrlrIndx].paths.splice(pathIndx, 1);
    if (this.controllerObjArray[contrlrIndx].paths.length == 0) {
      this.controllerObjArray[contrlrIndx].paths.push(new PathUIObject());
    }
  }
}