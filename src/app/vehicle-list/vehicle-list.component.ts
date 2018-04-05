import { Vehicle } from '../model/vehicle';
import { VehicleService } from '../vehicle.service';
import { Component, OnInit } from '@angular/core';
import {
  SwaggerJSON, Definitions, Definition, Property, DefintionUIObject, Path, Paths, PathChild,
  RequestMethods, PropertyUIObject, Tag, PathUIObject, ControllerUIObject, Response, Responses
} from '../model/swaggerjson';

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
  returnTypes; any;
  dataTypeJSON: any;
  requestMethodTypes: any;
  returnTypeJSON: any;
  // definitionList = new Array<any>();
  definitionList = new Array<DefintionUIObject>(new DefintionUIObject());
  controllertNameArray = new Array<string>();
  controllerObjArray: Array<ControllerUIObject> = new Array<ControllerUIObject>(new ControllerUIObject());
  finalJSON: string;
  swaggerConsumes: string = "";
  swaggerProduces: string = "";

  operationConsumes: string = "";
  operationProduces: string = "";

  constructor(private vehicleService: VehicleService) {
    this.vehicles = this.vehicleService.getVehicles();
    this.mimetypes = this.vehicleService.getMimeTypes();
    this.objectTypes = this.vehicleService.getObjectTypes();
    this.dataTypes = this.vehicleService.getDataTypes();
    this.dataTypeJSON = this.vehicleService.getDataTypeJSON();
    this.requestMethodTypes = this.vehicleService.getRequestMethodTypes();
    this.returnTypes = this.vehicleService.getReturnTypes();
    this.returnTypeJSON = this.vehicleService.getReturnTypeJSON();
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

      if (this.controllerObjArray) {
        let tagArray: Array<Tag> = new Array<Tag>();
        let controllerNameArray: Array<string> = new Array<string>();
        let pathsObj: Paths = new Paths();
        for (let controllerObj of this.controllerObjArray) {
          let controllerName = controllerObj.name && controllerObj.name.trim() ? controllerObj.name.trim() : "";
          if (controllerName && controllerNameArray.indexOf(controllerName) == -1) {
            let tag: Tag = new Tag();
            tag.name = controllerName;
            tag.description = controllerObj.description.trim();
            tagArray.push(tag);
            controllerNameArray.push(controllerName);
            let pathValArray: Array<string> = new Array<string>();
            let pathUIStringArray: Array<string> = new Array<string>();

            for (let pathObj of controllerObj.paths) {
              let reqMethods: RequestMethods = new RequestMethods();
              let response: Response = new Response();
              let responses: Responses = new Responses();
              let pathVal: string = pathObj.path && pathObj.path.trim() ? pathObj.path.trim() : "";
              let pathUIString: string = pathVal + '_' + pathObj.pathType;
              if (pathVal && pathUIStringArray.indexOf(pathUIString) == -1) {
                reqMethods[pathObj.pathType].tags = new Array<String>(controllerName);

                let operationId: string = this.convertToCamelCaseMethod(pathObj.path, pathObj.pathType);
                reqMethods[pathObj.pathType].operationId = operationId;

                reqMethods[pathObj.pathType].summary = pathObj.summary;
                 
                pathObj.consumes ? reqMethods[pathObj.pathType].consumes.push(pathObj.consumes) : reqMethods[pathObj.pathType].consumes = undefined;
                pathObj.produces ? reqMethods[pathObj.pathType].produces.push(pathObj.produces) : reqMethods[pathObj.pathType].produces = undefined;

                if (pathsObj[pathVal]) {
                  pathsObj[pathVal][pathObj.pathType] = reqMethods[pathObj.pathType];
                } else {
                  pathsObj[pathVal] = new Path();
                  pathsObj[pathVal][pathObj.pathType] = reqMethods[pathObj.pathType];
                }

                response.description = "OK";
                response.schema.type = this.returnTypeJSON[pathObj.returnType].type;
                response.schema.format = this.returnTypeJSON[pathObj.returnType].format;
                responses['200'] = response;
                reqMethods[pathObj.pathType].responses = responses;
              }
            }
          }
        }
        swaggerJsonClone.tags = tagArray;
        swaggerJsonClone.paths = pathsObj;
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
    this.definitionList = new Array<DefintionUIObject>(new DefintionUIObject());
    /*   if (event && event.target && event.target.checked) {
         //  var definitionObject = new DefintionUIObject();
         this.definitionList = new Array<DefintionUIObject>(new DefintionUIObject());
       } else {
         // this.definitionList = new Array<any>();
         this.definitionList = new Array<DefintionUIObject>(new DefintionUIObject());
       }*/
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

  convertToCamelCaseMethod(requestMethod: string, methodType: string): string {
    let requestMethodArray: Array<string> = requestMethod.split('/');
    let methodName: string = "";
    for (let str of requestMethodArray) {
      methodName = methodName + str.charAt(0).toUpperCase() + str.slice(1);
    }
    methodName = methodName.charAt(0).toLowerCase() + methodName.slice(1) + 'Using' + methodType.charAt(0).toUpperCase() + methodType.slice(1);
    return methodName;
  }

}