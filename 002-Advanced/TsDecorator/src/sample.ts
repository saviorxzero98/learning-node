
const classDecorator = (target: any) => {
    console.log(`Call class decorator, class name: '${target.name}'`);
}
const methodDecorator = (target: any, propertyKey: string, decorator: PropertyDescriptor) => {
    console.log(`Call method decorator, method name: '${propertyKey}'`);
}

const accessorDecorator = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log(`Call accessor decorator, accessor name: '${propertyKey}'`);
}

const propertyDecorator = (target: any, propertyKey: string) => {
    console.log(`Call property decorator, property name: '${propertyKey}'`);
}

const parameterDecorator = (target: any, propertyKey: string, index: number) => {
    console.log(`Call parameter decorator, parameter[${index}]: '${propertyKey}'`);
}

@classDecorator
export class DecoratorSample {
    @propertyDecorator
    private _id: number;

    @propertyDecorator
    private _name: string;

    constructor (id: number, name: string) {
        this._id = id;
        this._name = name;
    }

    @methodDecorator
    public getValue(@parameterDecorator id: number) {
        return this._name;
    }

    @accessorDecorator
    public get id(): number {
        return this._id;
    }
}