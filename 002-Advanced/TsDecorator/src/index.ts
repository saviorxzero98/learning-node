
function classDecorator(target: any) {
    console.log(`Call class decorator, class name: '${target.name}'`);
}
function methodDecorator(target: any, name: string, decorator: PropertyDescriptor) {
    console.log(`Call method decorator, method name: '${name}'`);
}
function propertyDecorator(target: any, name: string) {
    console.log(`Call property decorator, property name: '${name}'`);
}

function parameterDecorator(target: any, name: string, index: number) {
    console.log(`Call parameter decorator, parameter[${index}]: '${name}'`);
}


@classDecorator
class MyClass {
    @propertyDecorator
    public id: number;

    @propertyDecorator
    public name: string;

    constructor (id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    @methodDecorator
    public getValue(@parameterDecorator id: number) {
        return this.name;
    }
}





var myClass = new MyClass(1, 'hello');
myClass.getValue(1);



