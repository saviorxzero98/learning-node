"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("events");
process.CONSOLE_EVENTS = new events.EventEmitter();
class Calculator {
    add(a, b) {
        return a + b;
    }
    sub(a, b) {
        return a - b;
    }
}
exports.Calculator = Calculator;
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
//# sourceMappingURL=index.js.map