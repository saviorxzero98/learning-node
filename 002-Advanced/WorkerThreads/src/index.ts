import * as express from 'express';
import { Worker } from 'worker_threads';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';

// 建立 Express
const app = express();

let workerPath = path.join(__dirname, "./childThread");


// 設定 API Router
app.get('/fib/:num', (req, res) => {
    let num = Number(req.params.num) ?? 2;
    let uid = uuidv4();

    const childThread = new Worker(workerPath);
    childThread.on('message', (data) => {
        console.log(`[${data.uid}] ${data.result}`);
    });
    childThread.postMessage({
        uid: uid,
        num: num
    });

    console.log(`[${uid}] Add background job`);
    res.status(200)
       .send(`Add background job ${uid}.`)
       .end();
});

// 設定 Port
app.listen(8000, ()=> { 
    console.log('Example app listening on port 8000!'); 
});
