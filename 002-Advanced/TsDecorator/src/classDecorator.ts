export function classDecirator(target: any) {
    console.log(`Call authorize, class name: '${target.name}'`);
}

@classDecirator
export class MyClass {
    public id: number;
    public name: string;

    constructor (id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
