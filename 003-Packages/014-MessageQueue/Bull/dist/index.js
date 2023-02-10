"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bullmq_1 = require("bullmq");
const express_1 = require("@bull-board/express");
const queueName = 'DefaultQueue';
const queue = new bullmq_1.Queue(queueName);
const queueEvents = new bullmq_1.QueueEvents(queueName);
// 建立 Express
const serverAdapter = new express_1.ExpressAdapter();
serverAdapter.setBasePath('/bullmq');
const { addQueue, removeQueue, setQueues, replaceQueues } = (0, express_1.createBullBoard)({
    queues: [new express_1.BullMQAdapter(queue)],
    serverAdapter: serverAdapter,
});
const app = express();
// 建立 BullMQ
const calcFib = (num) => {
    if (num < 2) {
        return num;
    }
    return calcFib(num - 1) + calcFib(num - 2);
};
const sleep = (timeout) => {
    return new Promise((resolve, rejects) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
};
const worker = new bullmq_1.Worker(queueName, (job) => __awaiter(void 0, void 0, void 0, function* () {
    let num = job.data.number;
    if (num <= 0) {
        num = 10;
    }
    for (let i = 0; i < num; i++) {
        yield sleep(num * 1000);
    }
    console.log(job.data);
}), { concurrency: 3 });
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
    var _a;
    let num = req.params.num;
    queue.add(queueName, { number: (_a = Number(num)) !== null && _a !== void 0 ? _a : 0 });
    res.send('OK').end();
});
app.use('/bullmq', serverAdapter.getRouter());
// 設定 Port
app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});
//# sourceMappingURL=index.js.map