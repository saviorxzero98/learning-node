import "reflect-metadata";

// const formatMetadataKey = Symbol("format");
// const Format = (formatString: string) : PropertyDecorator =>  {
//     return Reflect.metadata(formatMetadataKey, formatString);
// };
// const getFormatString = (target: any, propertyKey: string): string => {
//     return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
// }

const FORMAT_META = 'format';
const Format = (formatString: string) : PropertyDecorator =>  {
    return (target: any, propertyKey: string) => {
        Reflect.defineMetadata(FORMAT_META, formatString, target);
    };
};
const getFormatString = (target: any): string => {
    return Reflect.getMetadata(FORMAT_META, target);
}

export class Greeter {
    @Format("Hello, %s")
    public greeting: string;

    constructor(message: string) {
        this.greeting = message;
        
    }
    public greet() {
        let formatString = getFormatString(this);
        return formatString.replace("%s", this.greeting);
    }
}