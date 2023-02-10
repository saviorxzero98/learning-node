"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
let executeAsync = (command) => {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(command, (error, stdout, stderr) => {
            if (stdout) {
                resolve(stdout);
            }
            if (stderr) {
                reject(error);
            }
            if (error) {
                reject(error);
            }
        });
    });
};
executeAsync('node --version').then((value) => {
    console.log(value);
});
//# sourceMappingURL=index.js.map