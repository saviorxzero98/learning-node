import { parentPort } from 'worker_threads';

const fib = (n: number) => {
    if (n < 2) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}

parentPort?.on('message', (data) => {
    if (data) {
        let result = fib(data.num);
        parentPort?.postMessage({
            uid: data.uid,
            result: result
        });
    }
    else {
        parentPort?.postMessage({
            uid: data.uid,
            result: -1
        });
    }
});