"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const fib = (n) => {
    if (n < 2) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
};
worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.on('message', (data) => {
    if (data) {
        let result = fib(data.num);
        //console.log(`[${data.uid}] ${result}`);
        worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({
            uid: data.uid,
            result: result
        });
    }
    else {
        //console.log(`[${data.uid}] ${-1}`);
        worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({
            uid: data.uid,
            result: -1
        });
    }
});
//# sourceMappingURL=childThread.js.map