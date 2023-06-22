// Decorator Function
const classDecorator = (target: any) => {
    console.log(`Call class decorator, class name: '${target.name}'`);
}

// Decorator Function
const methodDecorator = (target: any, propertyKey: string, decorator: PropertyDescriptor) => {
    console.log(`Call method decorator, method name: '${propertyKey}'`);
}

// Class Decorator
@classDecorator
export class MethodSample {
    // Method Decorator
    @methodDecorator
    public getHello() {
        return 'hello';
    }
}
