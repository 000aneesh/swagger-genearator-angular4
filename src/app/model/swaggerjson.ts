export class SwaggerJSON {

    swagger: string = "2.0";

    info: Info = new Info();

    host: string = "localhost:8080";

    schemes: string;

    consumes: Array<string> = new Array<string>();

    produces: Array<string> = new Array<string>();

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