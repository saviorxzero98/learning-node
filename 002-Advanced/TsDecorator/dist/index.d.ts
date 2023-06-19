declare function classDecorator(target: any): void;
declare function methodDecorator(target: any, name: string, decorator: PropertyDescriptor): void;
declare function propertyDecorator(target: any, name: string): void;
declare function parameterDecorator(target: any, name: string, index: number): void;
declare class MyClass {
    id: number;
    name: string;
    constructor(id: number, name: string);
    getValue(id: number): string;
}
declare var myClass: MyClass;
