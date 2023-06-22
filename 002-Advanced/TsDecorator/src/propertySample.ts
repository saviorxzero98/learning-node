const classDecorator = (target: any) => {
    console.log(`Call class decorator, class name: '${target.name}'`);
}

const propertyDecorator = (target: any, propertyKey: string) => {
    console.log(`Call property decorator, property name: '${propertyKey}'`);
}

// Class Decorator
@classDecorator
export class PropertySample {
    // Property Decorator
    @propertyDecorator
    id: number;

    // Property Decorator
    @propertyDecorator
    name: string;
}