export class SwaggerJSON {
    swagger: string = "2.0";
    info: Info = new Info();
    host: string = "localhost:8080";
    schemes: string;
    consumes: Array<string> = new Array<string>();
    produces: Array<string> = new Array<string>();
    basePath: string = "/";
    tags: Array<Tag> = new Array<Tag>(new Tag());
    paths: Paths = new Paths();
    definitions: Definitions = new Definitions();
}

export class Info {
    description: string;
    version: string = '1.0';
    title: string = 'Sample App';
}

export class Paths {
}

export class Path {
}

export class PathChild {
}

export class Get {
    tags: string[];
    summary: string;
    operationId: string;
    consumes: Array<string>  = new Array<string>();
    produces: Array<string>  = new Array<string>();
    responses: Responses;
}

export class Post {
    tags: string[];
    summary: string;
    operationId: string;
    consumes: Array<string>  = new Array<string>();
    produces: Array<string>  = new Array<string>();
    parameters: Parameter[];
    responses: Responses;
}

export class Put {
    tags: string[];
    summary: string;
    operationId: string;
    consumes: Array<string>  = new Array<string>();
    produces: Array<string>  = new Array<string>();
    parameters: Parameter[];
    responses: Responses;
}
export class Delete {
    tags: string[];
    summary: string;
    operationId: string;
    consumes: Array<string>  = new Array<string>();
    produces: Array<string>  = new Array<string>();
    parameters: Parameter[];
    responses: Responses;
}

export class Parameter {
    in: string;
    name: string;
    description: string;
    required: boolean;
    schema: Schema;
}

export class Schema {
    $ref: string;
}

export class Responses {
}

export class Definitions {
}

export class Properties {
}

export class Definition {
    type: string = "object";
    properties: Properties = new Properties();
}

export class Tag {
    name: string = "";
    description: string = "";
}

export class Property {
    type: string = "";
    format: string;
    constructor();
    constructor(obj: Property);
    constructor(obj?: any) {
        this.type = obj && obj.type;
        this.format = obj && obj.format;
    }

}

export class DefintionUIObject {
    defnName: string = "";
    definition: Definition = new Definition();
    properties: any = new Array<PropertyUIObject>(new PropertyUIObject());
}

export class PropertyUIObject {
    propName: string = "";
    property: Property = new Property({ type: 'integer', format: '' });

}

export class ControllerUIObject {
    name: string = "";
    description: string = "";
    paths: Array<PathUIObject> = new Array<PathUIObject>(new PathUIObject);
}

export class PathUIObject {
    path: string = "";
    pathType: string = "get";
    summary:string;
    operationId:string;
    consumes:string = "";
    produces:string = "";
}

export class RequestMethods {
    get: Get = new Get();
    post: Post = new Post();
    put: Put = new Put();
    delete: Delete = new Delete();
}