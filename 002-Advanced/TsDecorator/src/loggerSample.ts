const classLogger = (message ?: string) => {
    return (target: any) => {
        console.log(`${target.name}: ${message}`);
    };
}

const methodLogger = (message ?: string) => {
    return (target: any, propertyKey: string, decorator: PropertyDescriptor) => {
        var orgMethod = decorator.value;
        console.log(`${propertyKey}: ${message}`);
    };
}

@classLogger('User is created')
export class User {
    private _id: number;

    private _name: string;

    constructor (id: number, name: string) {
        this._id = id;
        this._name = name;
    }

    @methodLogger('Get user name')
    public getValue(id: number) {
        return this._name;
    }
}
