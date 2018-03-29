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
    definitions: Definitions = new Definitions();
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
    type: string = "object";
    properties: Properties = new Properties();
}

export class Tag {
    name: string;
    description: string;
}

export class Property {
    type: string = "";
    format: string;
    constructor();
    constructor(obj: Property);
    constructor(obj?: any) {
        this.type = obj && obj.type;
        this.format = obj && obj.format;
        // this.format = obj && obj.format || undefined;
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