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