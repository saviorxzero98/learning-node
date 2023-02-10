import * as events from 'events';

process.CONSOLE_EVENTS = new events.EventEmitter();


export class Calculator {
    public add(a:number, b:number) : number {
        return a + b;
    }

    public sub(a:number, b:number) : number {
        return a - b;
    }
}

let calc = new Calculator();
console.log(`1 + 1 = ${calc.add(1, 1)}`);


process.CONSOLE_EVENTS.on('CONSOLE', () => {

});

process.on('unhandledRejection', (reason, p) => {
    console.error(reason, 'unhandledRejection', 'Unhandled Rejection at:');
});

process.on('uncaughtException', (error) => {
    console.error(error, 'unhandledRejection', 'Caught exception: ');
});