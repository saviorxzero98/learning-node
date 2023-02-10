"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interact = require("cli-interact");
try {
    let answer = interact.question('What is your favorite food? :');
    console.log(answer);
}
catch (e) {
    console.error(e);
}
//# sourceMappingURL=index.js.map