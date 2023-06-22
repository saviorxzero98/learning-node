// Decorator Function
const classDecorator1 = (target: any) => {
    console.log(`Call class decorator1, class name: '${target.name}'`);
}
const classDecorator2 = (target: any) => {
    console.log(`Call class decorator2, class name: '${target.name}'`);
}
const classDecorator3 = (target: any) => {
    console.log(`Call class decorator3, class name: '${target.name}'`);
}

// Class Decorator
@classDecorator1
@classDecorator3
@classDecorator2
export class ClassSample {

}

