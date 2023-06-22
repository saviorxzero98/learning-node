// Decorator Function
const classDecorator = (target: any) => {
    console.log(`Call class decorator, class name: '${target.name}'`);
}

// Decorator Function
const accessorDecorator = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log(`Call accessor decorator, accessor name: '${propertyKey}'`);
}

export class AccessorSample {
    private _userName: string;

    // Accessor Decorator
    @accessorDecorator
    public get userName(): string {
        return this._userName;
    }
}