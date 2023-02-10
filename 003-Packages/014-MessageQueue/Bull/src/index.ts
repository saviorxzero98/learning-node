import * as express from 'express';
import { Queue, Worker, QueueEvents } from 'bullmq';
import { ExpressAdapter, createBullBoard, BullAdapter, BullMQAdapter } from '@bull-board/express';

const queueName = 'DefaultQueue';
const queue = new Queue(queueName);
const queueEvents = new QueueEvents(queueName);

// 建立 Express
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/bullmq');
const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: [ new BullMQAdapter(queue)],
    serverAdapter: serverAdapter,
});
const app = express();

// 建立 BullMQ


const calcFib = (num: number) => {
    if (num < 2) {
        return num;
    }
    return calcFib(num - 1) + calcFib(num - 2);
}
const sleep = (timeout) => {
    return new Promise<void>((resolve, rejects) => {
        setTimeout(() => {
           resolve(); 
        }, timeout);
    });
}


const worker = new Worker(queueName, async (job) => {
    let num = job.data.number;
    
    if (num <= 0) {
        num = 10;
    }

    for (let i = 0; i < num; i++) {
        await sleep(num * 1000);
    }

    console.log(job.data);
}, { concurrency: 3 });
worker.on('completed', job => {
    console.log(`${job.id} has completed!`);
});
worker.on('failed', (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
});
queueEvents.on('waiting', ({ jobId }) => {
    console.log(`A job with ID ${jobId} is waiting`);
});
queueEvents.on('active', ({ jobId, prev }) => {
    console.log(`Job ${jobId} is now active; previous status was ${prev}`);
});
queueEvents.on('completed', ({ jobId, returnvalue }) => {
    console.log(`${jobId} has completed and returned ${returnvalue}`);
});
queueEvents.on('failed', ({ jobId, failedReason }) => {
    console.log(`${jobId} has failed with reason ${failedReason}`);
});


// 設定 API Router
app.get('/timeout/:num', (req, res) => {
    let num = req.params.num;
    queue.add(queueName, { number: Number(num) ?? 0 });
    res.send('OK').end();
});

app.use('/bullmq', serverAdapter.getRouter());

// 設定 Port
app.listen(8000, ()=> { 
    console.log('Example app listening on port 8000!'); 
});
