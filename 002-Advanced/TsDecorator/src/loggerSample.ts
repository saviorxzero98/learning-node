const classLogger = (message ?: string) => {
    // Return Class Decorator Function
    return (target: any) => {
        console.log(`${target.name}: ${message}`);
    };
}

const methodLogger = (message ?: string) => {
    // Return Method Decorator Function
    return (target: any, propertyKey: string, decorator: PropertyDescriptor) => {
        console.log(`${propertyKey}: ${message}`);
    };
}

@classLogger('User is created')
export class User {
    public id: number;

    public name: string;

    @methodLogger('Set user')
    public setValue(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
