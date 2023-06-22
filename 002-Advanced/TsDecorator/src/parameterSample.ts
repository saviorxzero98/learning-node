const classDecorator = (target: any) => {
    console.log(`Call class decorator, class name: '${target.name}'`);
}

const methodDecorator = (target: any, propertyKey: string, decorator: PropertyDescriptor) => {
    console.log(`Call method decorator, method name: '${propertyKey}'`);
}

const parameterDecorator = (target: any, propertyKey: string, index: number) => {
    console.log(`Call parameter decorator, parameter[${index}]: '${propertyKey}'`);
}

@classDecorator
export class ParameterSample {
    id: number;

    name: string;
    
    @methodDecorator
    setValue(@parameterDecorator id: number, 
             @parameterDecorator name: string) {
        this.id = id;
        this.name = name;
    }
}