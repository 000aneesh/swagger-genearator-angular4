swaggerjson

 

export class SwaggerJSON {

    swagger: string = "2.0";

    info: Info = new Info();

    host: string = "localhost:8080";

    schemes: string;

    consumes: string = "";

    produces: string = "";

    basePath: string = "/";

    tags: Tag[] = new Array<Tag>();

    paths: Paths = new Paths();

    definitions: Definitions;

 

}

 

export class Info {

    description: string;

    version: string;

    title: string;

}

 

export class Paths {

}

 

export class Definitions {

}

 

export class Properties {

}

 

export class Definition {

    type: string = "";

    properties: Properties;

}

 

export class Tag {

    name: string;

    description: string;

}

 

export class Property {

    type: string = "";

    format: string;

}

 

 

 

List html

 

<div>

  <h2>Swagger JSON</h2>

  <button type="button" (click)="generateJSON(swaggerJSON)">Generate</button>

  <table>

    <tr>

      <td><label>Swagger: </label></td>

      <td><input [(ngModel)]="swaggerJSON.swagger" placeholder="Swagger" readonly/></td>

    </tr>

    <tr>

      <th colspan="2"><label>Info </label></th>

 

    </tr>

    <tr>

      <td><label>Description: </label></td>

      <td><input [(ngModel)]="swaggerJSON.info.description" placeholder="Description" /></td>

    </tr>

    <tr>

      <td><label>Version: </label></td>

      <td><input [(ngModel)]="swaggerJSON.info.version" placeholder="Version" /></td>

    </tr>

    <tr>

      <td><label>Title: </label></td>

      <td><input [(ngModel)]="swaggerJSON.info.title" placeholder="Title" /></td>

    </tr>

    <tr>

 

      <td><label>Host: </label></td>

      <td><input [(ngModel)]="swaggerJSON.host" placeholder="Host" /></td>

    </tr>

    <tr>

 

      <td><label>Base Path: </label></td>

      <td><input [(ngModel)]="swaggerJSON.basePath" placeholder="Base Path" /></td>

    </tr>

    <tr>

      <td><label>Consumes: </label></td>

      <td>

        <select id="mimeType" #mimeType="ngModel" class="form-control" [(ngModel)]="swaggerJSON.consumes" name="mimeType"> 

                           <option selected="" value="">Select One</option> 

                        <option [ngValue]="mType.mimeType" *ngFor="let mType of mimeTypes"> 

                            {{mType.mimeType}} 

                     </option> 

                </select>

      </td>

    </tr>

    <tr>

      <td><label>Produces: </label></td>

      <td>

        <select id="mimeType" #mimeType="ngModel" class="form-control" [(ngModel)]="swaggerJSON.produces" name="mimeType"> 

                           <option selected="" value="">Select One</option> 

                        <option [ngValue]="mType.mimeType" *ngFor="let mType of mimeTypes"> 

                            {{mType.mimeType}} 

                     </option> 

                </select>

      </td>

    </tr>

    <tr>

      <td><label>Definitions: </label></td>

      <td><input type="checkbox" [(ngModel)]="showDefinitions" (change)=definitionCheckEvent($event) id="definitionCheck" /></td>

    </tr>

    <tr *ngFor="let defn of definitionList; let i = index">

      <td><label>{{i+1}} Class Defenition: </label></td>

      <td><input placeholder="Class Name" />

        <table>

          <tr *ngFor="let prop of defn.properties; let j = index">

            <td><label>{{j+1}} Attribute Name: </label></td>

            <td><input placeholder="Attribute Name" /></td>

            <td><label>Attribute Type: </label></td>

            <td> <select id="objectType" class="form-control" name="objectType"> 

                        <option [ngValue]="objType.value" *ngFor="let objType of objectTypes" [title]="objType.description" > 

                            {{objType.value}} 

                     </option> 

                </select></td>

                <td><button type="button" (click)="addAttribute($event)" id="addAttribute-{{i}}">Add Attribute</button></td>

          </tr>

        </table>

      </td>

      <td><button type="button" (click)="addDefinition($event)" id="addDefinition-{{i}}">Add Class</button></td>

      <td><button type="button" (click)="removeDefinition($event)" id="removeDefinition-{{i}}">Remove Class</button></td>

    </tr>

    <tr>

      <td><label>Produces: </label></td>

      <td><input [(ngModel)]="swaggerJSON.produces" placeholder="mass" /></td>

    </tr>

  </table>

</div>

 

 

List component

 

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

// definitionObject = {definition : new Definition(), properties : new Array<Property>(new Property())};

 

  constructor(private vehicleService: VehicleService) {

    this.vehicles = this.vehicleService.getVehicles();

    this.mimeTypes = this.vehicleService.getMimeTypes();

    this.objectTypes = this.vehicleService.getObjectTypes();

  }

 

  ngOnInit() {

  }

 

  onSelect(vehicle: Vehicle) { this.selectedVehicle = vehicle; }

 

  generateJSON(swaggerJSON) {

    console.log(JSON.stringify(this.swaggerJSON));

  }

 

  definitionCheckEvent(event) {

    if (event && event.target && event.target.checked) {

      var definitionObject = {definition : new Definition(), properties : new Array<Property>(new Property())};

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

   var definitionObject = {definition : new Definition(), properties : new Array<Property>(new Property())};

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

 

 

 

Service

 

import { Injectable } from '@angular/core';

 

const vehicles = [

  {

    id: 1,

    name: 'Trailer - 1',

    type: 'Truck',

    mass: 40

  },

  {

    id: 2,

    name: 'An-2',

    type: 'Plane',

    mass: 5

  },

  {

    id: 3,

    name: 'LandCruiser 80',

    type: 'Jeep',

    mass: 2

  },

];

 

const mimeTypes = [

  {

    mimeType: '*/*'

  },

  {

    mimeType: 'application/json'

  },

  {

    mimeType: 'application/xml'

  },

  {

    mimeType: 'application/x-www-form-urlencoded'

  },

  {

    mimeType: 'multipart/form-data'

  },

  {

    mimeType: 'text/plain; charset=utf-8'

  },

  {

    mimeType: 'text/html'

  },

  {

    mimeType: 'application/pdf'

  },

  {

    mimeType: 'image/png'

  }

];

const objectTypes = [

    {

    value: 'string',

    default: '',

    description: 'A JSON string'

  },

  {

    value: 'array',

    default: '',

    description: 'A JSON array'

  },

  {

    value: 'boolean',

    default: '',

    description: 'A JSON boolean'

  },

  {

    value: 'integer',

    default: '',

    description: 'A JSON number without a fraction or exponent part'

  },

  {

    value: 'number',

    default: '',

    description: 'Any JSON number. Number includes integer'

  },

  {

    value: 'null',

    default: '',

    description: 'The JSON null value'

  },

  {

    value: 'object',

    default: 'true',

    description: 'A JSON object'

  }

];

 

 

@Injectable()

export class VehicleService {

 

  private vehicles;

 

  private mimeTypes;

 

  private objectTypes;

 

  constructor() {

    this.vehicles = vehicles;

    this.mimeTypes = mimeTypes;

    this.objectTypes = objectTypes;

  }

 

  getVehicles() {

    return this.vehicles;

  }

 

  getMimeTypes() {

    return this.mimeTypes;

  }

 

  getObjectTypes() {

    return this.objectTypes;

  }

 

}

 

 

Sample calsss

 

declare module namespace {

 

    export interface Info {

        description: string;

        version: string;

        title: string;

    }

 

    export interface Tag {

        name: string;

        description: string;

    }

 

    export interface Items {

        $ref: string;

    }

 

    export interface Schema {

        type: string;

        items: Items;

    }

 

    export interface 2002 {

        description: string;

        schema: Schema;

    }

 

    export interface 4012 {

        description: string;

    }

 

    export interface 5002 {

        description: string;

    }

 

    export interface 4032 {

        description: string;

    }

 

    export interface 4042 {

        description: string;

    }

 

    export interface Responses {

        200: 2002;

        401: 4012;

        500: 5002;

        403: 4032;

        404: 4042;

    }

 

    export interface Get {

        tags: string[];

        summary: string;

        operationId: string;

        consumes: string[];

        produces: string[];

        responses: Responses;

    }

 

    export interface Schema2 {

        $ref: string;

    }

 

    export interface Parameter {

        in: string;

        name: string;

        description: string;

        required: boolean;

        schema: Schema2;

    }

 

    export interface Schema3 {

        $ref: string;

    }

 

    export interface 2003 {

        description: string;

        schema: Schema3;

    }

 

    export interface Schema4 {

        $ref: string;

    }

 

    export interface 2012 {

        description: string;

        schema: Schema4;

    }

 

    export interface 4002 {

        description: string;

    }

 

    export interface 4013 {

        description: string;

    }

 

    export interface 5003 {

        description: string;

    }

 

    export interface 4033 {

        description: string;

    }

 

    export interface 4043 {

        description: string;

    }

 

    export interface Responses2 {

        200: 2003;

        201: 2012;

        400: 4002;

        401: 4013;

        500: 5003;

        403: 4033;

        404: 4043;

    }

 

    export interface Post {

        tags: string[];

        summary: string;

        operationId: string;

        consumes: string[];

        produces: string[];

        parameters: Parameter[];

        responses: Responses2;

    }

 

    export interface Students {

        get: Get;

        post: Post;

    }

 

    export interface Items2 {

        $ref: string;

    }

 

    export interface Schema5 {

        type: string;

        items: Items2;

    }

 

    export interface 2004 {

        description: string;

        schema: Schema5;

    }

 

    export interface 4014 {

        description: string;

    }

 

    export interface 5004 {

        description: string;

    }

 

    export interface 4034 {

        description: string;

    }

 

    export interface 4044 {

        description: string;

    }

 

    export interface Responses3 {

        200: 2004;

        401: 4014;

        500: 5004;

       403: 4034;

        404: 4044;

    }

 

    export interface Get2 {

        tags: string[];

        summary: string;

        operationId: string;

        consumes: string[];

        produces: string[];

        responses: Responses3;

    }

 

    export interface Schema6 {

        $ref: string;

    }

 

    export interface Parameter2 {

        in: string;

        name: string;

        description: string;

        required: boolean;

        schema: Schema6;

    }

 

    export interface Schema7 {

       $ref: string;

    }

 

    export interface 2005 {

        description: string;

        schema: Schema7;

    }

 

    export interface Schema8 {

        $ref: string;

    }

 

    export interface 2013 {

        description: string;

        schema: Schema8;

    }

 

    export interface 4003 {

        description: string;

    }

 

    export interface 4015 {

        description: string;

    }

 

    export interface 5005 {

        description: string;

    }

 

    export interface 4035 {

        description: string;

    }

 

    export interface 4045 {

        description: string;

    }

 

    export interface Responses4 {

        200: 2005;

        201: 2013;

        400: 4003;

        401: 4015;

        500: 5005;

        403: 4035;

        404: 4045;

    }

 

    export interface Post2 {

        tags: string[];

        summary: string;

        operationId: string;

        consumes: string[];

        produces: string[];

        parameters: Parameter2[];

        responses: Responses4;

    }

 

    export interface Teachers {

        get: Get2;

        post: Post2;

    }

 

    export interface Paths {

        /students: Students;

        /teachers: Teachers;

    }

 

    export interface Address {

        type: string;

    }

 

    export interface Id {

        type: string;

        format: string;

    }

 

    export interface Name {

        type: string;

    }

 

    export interface Properties {

        address: Address;

        id: Id;

        name: Name;

    }

 

    export interface TeacherDTO {

        type: string;

        properties: Properties;

    }

 

    export interface Address2 {

        type: string;

    }

 

    export interface Batch {

        type: string;

    }

 

    export interface Id2 {

        type: string;

        format: string;

    }

 

    export interface Name2 {

        type: string;

    }

 

    export interface Properties2 {

        address: Address2;

        batch: Batch;

        id: Id2;

        name: Name2;

    }

 

    export interface StudentDTO {

        type: string;

        properties: Properties2;

    }

 

    export interface Definitions {

        TeacherDTO: TeacherDTO;

        StudentDTO: StudentDTO;

    }

 

    export interface RootObject {

        swagger: string;

        info: Info;

        host: string;

        basePath: string;

        tags: Tag[];

        paths: Paths;

        definitions: Definitions;

    }

 

}

 

 

{

  "swagger": "2.0",

  "info": {

    "description": "Service manages students and teachers information",

    "version": "1.0",

    "title": "Service API"

  },

  "host": "localhost:8080",

  "basePath": "/",

  "tags": [

    {

      "name": "teacher-controller",

      "description": "Teacher Controller"

    },

    {

      "name": "student-controller",

      "description": "Student Controller"

    }

  ],

  "paths": {

    "/students": {

      "get": {

        "tags": [

          "student-controller"

        ],

        "summary": "Retrieving all the students",

        "operationId": "findAllStudentsUsingGET",

        "consumes": [

          "application/json"

        ],

        "produces": [

          "*/*"

        ],

        "responses": {

          "200": {

            "description": "Success",

            "schema": {

              "type": "array",

              "items": {

                "$ref": "#/definitions/StudentDTO"

              }

            }

          },

          "401": {

            "description": "Unauthorized"

          },

          "500": {

            "description": "Server error"

          },

          "403": {

            "description": "Forbidden"

          },

          "404": {

            "description": "Not Found"

          }

        }

      },

      "post": {

        "tags": [

          "student-controller"

        ],

        "summary": "Create Student",

        "operationId": "createStudentUsingPOST",

        "consumes": [

          "application/json"

        ],

        "produces": [

          "application/json"

        ],

        "parameters": [

          {

            "in": "body",

            "name": "studentDTO",

            "description": "studentDTO",

            "required": true,

            "schema": {

              "$ref": "#/definitions/StudentDTO"

            }

          }

        ],

        "responses": {

          "200": {

            "description": "OK",

            "schema": {

              "$ref": "#/definitions/StudentDTO"

            }

          },

          "201": {

            "description": "Created",

            "schema": {

              "$ref": "#/definitions/StudentDTO"

            }

          },

          "400": {

            "description": "Input message validation failed"

          },

          "401": {

            "description": "Unauthorized"

          },

          "500": {

            "description": "Server error"

          },

          "403": {

            "description": "Forbidden"

          },

          "404": {

            "description": "Not Found"

          }

        }

      }

    },

    "/teachers": {

      "get": {

        "tags": [

          "teacher-controller"

        ],

        "summary": "Retrieving all the teachers",

        "operationId": "findAllTeachersUsingGET",

        "consumes": [

          "application/json"

        ],

        "produces": [

          "*/*"

        ],

        "responses": {

          "200": {

            "description": "Success",

            "schema": {

              "type": "array",

              "items": {

                "$ref": "#/definitions/TeacherDTO"

              }

            }

          },

          "401": {

            "description": "Unauthorized"

          },

          "500": {

            "description": "Server error"

          },

          "403": {

            "description": "Forbidden"

          },

          "404": {

            "description": "Not Found"

          }

        }

      },

      "post": {

        "tags": [

          "teacher-controller"

        ],

        "summary": "Create Teacher",

        "operationId": "createTeacherUsingPOST",

        "consumes": [

          "application/json"

        ],

        "produces": [

          "application/json"

        ],

        "parameters": [

          {

            "in": "body",

            "name": "teacherDTO",

            "description": "teacherDTO",

            "required": true,

            "schema": {

              "$ref": "#/definitions/TeacherDTO"

            }

          }

        ],

        "responses": {

          "200": {

            "description": "OK",

            "schema": {

              "$ref": "#/definitions/TeacherDTO"

            }

          },

          "201": {

            "description": "Created",

            "schema": {

              "$ref": "#/definitions/TeacherDTO"

            }

          },

          "400": {

            "description": "Input message validation failed"

          },

          "401": {

            "description": "Unauthorized"

          },

          "500": {

            "description": "Server error"

          },

          "403": {

            "description": "Forbidden"

          },

          "404": {

            "description": "Not Found"

          }

        }

      }

    }

  },

  "definitions": {

    "TeacherDTO": {

      "type": "object",

      "properties": {

        "address": {

          "type": "string"

        },

        "id": {

          "type": "integer",

          "format": "int32"

        },

        "name": {

          "type": "string"

        }

      }

    },

    "StudentDTO": {

      "type": "object",

      "properties": {

        "address": {

          "type": "string"

        },

        "batch": {

          "type": "string"

        },

        "id": {

          "type": "integer",

          "format": "int32"

        },

        "name": {

          "type": "string"

        }

      }

    }

  }

}