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
  }
];

const mimetypes = [
  {
    type: '*/*'
  },
  {
    type: 'application/json'
  },
  {
    type: 'application/xml'
  },
  {
    type: 'application/x-www-form-urlencoded'
  },
  {
    type: 'multipart/form-data'
  },
  {
    type: 'text/plain; charset=utf-8'
  },
  {
    type: 'text/html'
  },
  {
    type: 'application/pdf'
  },
  {
    type: 'image/png'
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

const dataTypes = [
  'integer',
  'long',
  'float',
  'double',
  'string',
  'byte',
  'binary',
  'boolean',
  'date',
  'dateTime',
  'password',
];

const returnTypes = [
  'void',
  'integer',
  'long',
  'float',
  'double',
  'string',
  'byte',
  'binary',
  'boolean',
  'date',
  'dateTime'
];


const dataTypeJSON = {
  integer: {
    type: 'integer',
    format: 'int32'
  },
  long: {
    type: 'integer',
    format: 'int64'
  },
  float: {
    type: 'number',
    format: 'float'
  },
  double: {
    type: 'number',
    format: 'double'
  },
  string: {
    type: 'string',
    format: undefined
  },
  byte: {
    type: 'string',
    format: 'byte'
  },
  binary: {
    type: 'string',
    format: 'binary'
  },
  boolean: {
    type: 'boolean',
    format: undefined
  },
  date: {
    type: 'string',
    format: 'date'
  },
  dateTime: {
    type: 'string',
    format: 'date-time'
  },
  password: {
    type: 'string',
    format: 'password'
  }
};

const returnTypeJSON = {
  integer: {
    type: 'integer',
    format: 'int32'
  },
  long: {
    type: 'integer',
    format: 'int64'
  },
  float: {
    type: 'number',
    format: 'float'
  },
  double: {
    type: 'number',
    format: 'double'
  },
  string: {
    type: 'string',
    format: undefined
  },
  byte: {
    type: 'string',
    format: 'byte'
  },
  binary: {
    type: 'string',
    format: 'binary'
  },
  boolean: {
    type: 'boolean',
    format: undefined
  },
  date: {
    type: 'string',
    format: 'date'
  },
  dateTime: {
    type: 'string',
    format: 'date-time'
  },
  void: {
    type: undefined,
    format: undefined
  }
};

const requestMethodTypes = [
  { key: "GET", value: "get" },
  { key: "POST", value: "post" },
  { key: "PUT", value: "put" },
  { key: "DELETE", value: "delete" }
];

@Injectable()
export class VehicleService {

  private vehicles;
  private mimetypes;
  private objectTypes;
  private dataTypes;
  private dataTypeJSON;
  private requestMethodTypes;
  private returnTypes;
  private returnTypeJSON;

  constructor() {
    this.vehicles = vehicles;
    this.mimetypes = mimetypes;
    this.objectTypes = objectTypes;
    this.dataTypes = dataTypes;
    this.dataTypeJSON = dataTypeJSON;
    this.requestMethodTypes = requestMethodTypes;
    this.returnTypes = returnTypes;
    this.returnTypeJSON = returnTypeJSON;
  }

  getVehicles() {
    return this.vehicles;
  }

  getMimeTypes() {
    return this.mimetypes;
  }

  getObjectTypes() {
    return this.objectTypes;
  }

  getDataTypes() {
    return this.dataTypes;
  }

  getDataTypeJSON() {
    return this.dataTypeJSON;
  }

  getRequestMethodTypes() {
    return this.requestMethodTypes;
  }

  getReturnTypes() {
    return this.returnTypes;
  }

  getReturnTypeJSON() {
    return this.returnTypeJSON;
  }

}