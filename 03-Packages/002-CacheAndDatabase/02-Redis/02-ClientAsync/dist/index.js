"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const RedisAsyncClient_1 = require("./RedisAsyncClient");
RunDemo();
RunDemo();
function RunDemo() {
    return __awaiter(this, void 0, void 0, function* () {
        // Config
        const redisConfig = {
            host: "127.0.0.1",
            port: 6379
        };
        // Create Redis
        const client = new RedisAsyncClient_1.RedisAsyncClient();
        try {
            // Open
            let status = yield client.open(redisConfig);
            console.log(`Redis status : ${status}\n`);
            // Working
            if (client.isReady) {
                console.log("Start Demo GET/SET String\n");
                yield RunDemo1(client);
            }
            if (client.isReady) {
                console.log("\n-------------------\n");
                console.log("Start Demo GET/SET Hash\n");
                yield RunDemo2(client);
            }
            if (client.isReady) {
                console.log("\n-------------------\n");
                console.log("Start Demo GET/SET List\n");
                yield RunDemo3(client);
            }
            if (client.isReady) {
                // Close
                client.end();
            }
        }
        catch (e) {
            console.log('Redis is not available', e);
        }
    });
}
function RunDemo1(client) {
    return __awaiter(this, void 0, void 0, function* () {
        // Sample Data
        const sampleData = {
            dbName: 0,
            keyword: "test"
        };
        try {
            // Select Database
            let selectResult = yield client.select(sampleData.dbName);
            console.log(`Select Database ${sampleData.dbName} - ${selectResult}\n`);
            // Set Value (String)
            let setResult = yield client.set(sampleData.keyword, JSON.stringify({ "name": "wolfy", age: 28 }));
            console.log(`Set String ${setResult} (Keyword: ${sampleData.keyword})\n`);
            // Get Value (String)
            let getResult = yield client.get(sampleData.keyword);
            console.log(`Get String '${getResult} (Keyword: ${sampleData.keyword})'`);
            // Delete Key
            let delResult = yield client.del(sampleData.keyword);
            console.log(`\nDelete ${delResult} Keywords '${sampleData.keyword}'`);
        }
        catch (e) {
            console.error(e, `Run Demo1 Error`);
        }
    });
}
function RunDemo2(client) {
    return __awaiter(this, void 0, void 0, function* () {
        // Sample Data
        const sampleData = {
            dbName: 1,
            keyword: "test",
            data: { id: 5566, name: "wolfy", age: 28, birthday: "2/30" }
        };
        try {
            // Select Database
            let selectResult = yield client.select(sampleData.dbName);
            console.log(`Select Database ${sampleData.dbName} - ${selectResult}\n`);
            // Set Value (Hash)
            let hmsetResult = yield client.hmset(sampleData.keyword, sampleData.data);
            console.log(`Set Hash ${hmsetResult} (Keyword: ${sampleData.keyword})\n`);
            // Get All Value (Hash)
            let hgetallResult = yield client.hgetall(sampleData.keyword);
            console.log(`Get All Hash Error (Keyword: ${sampleData.keyword})\n`, hgetallResult);
            // Get Value By Field [1]
            let hgetResult = yield client.hget(sampleData.keyword, "age");
            console.log(`\nGet Hash (Keyword: ${sampleData.keyword}, Field: ${"age"})\n`, hgetResult);
            // Delete Field
            let hdelResult = yield client.hdel(sampleData.keyword, "age");
            console.log(`\nGet Hash (Keyword: ${sampleData.keyword}, Field: ${"age"})\n`, hdelResult);
            // Get Value By Field [2]
            let hget2Result = yield client.hget(sampleData.keyword, "age");
            console.log(`\nGet Hash (Keyword: ${sampleData.keyword}, Field: ${"age"}) [2]\n`, hget2Result);
            // Delete Key
            let delResult = yield client.del(sampleData.keyword);
            console.log(`\nDelete ${delResult} Keywords '${sampleData.keyword}'`);
        }
        catch (e) {
            console.error(e, `Run Demo2 Error`);
        }
    });
}
function RunDemo3(client) {
    return __awaiter(this, void 0, void 0, function* () {
        // Sample Data
        const sampleData = {
            dbName: 2,
            keyword: "test",
            data: [
                { id: "0087", profile: { name: "joker", age: 87 } },
                { id: "2266", profile: { name: "jack", age: 30 } },
                { id: "1334", profile: { name: "queen", age: 28 } },
                { id: "3334", profile: { name: "king", age: 40 } },
                { id: "0520", profile: { name: "ace", age: 18 } }
            ]
        };
        try {
            // Select Database
            let selectResult = yield client.select(sampleData.dbName);
            console.log(`Select Database ${sampleData.dbName} - ${selectResult}\n`);
            // Left push [1]
            yield client.lpush(sampleData.keyword, JSON.stringify(sampleData.data[0]));
            console.log(`Left Push ${sampleData.data[0].id} (1)\n`);
            yield dumpList(client, sampleData.keyword);
            // Left push [2]
            yield client.lpush(sampleData.keyword, JSON.stringify(sampleData.data[1]));
            console.log(`Left Push ${sampleData.data[1].id} (2)\n`);
            yield dumpList(client, sampleData.keyword);
            // Right push [1]
            yield client.rpush(sampleData.keyword, JSON.stringify(sampleData.data[2]));
            console.log(`Right Push ${sampleData.data[2].id} (1)\n`);
            yield dumpList(client, sampleData.keyword);
            // Right push [2]
            yield client.rpush(sampleData.keyword, JSON.stringify(sampleData.data[3]));
            console.log(`Right Push ${sampleData.data[3].id} (2)\n`);
            yield dumpList(client, sampleData.keyword);
            // Insert
            yield client.linsertBefore(sampleData.keyword, JSON.stringify(sampleData.data[2]), JSON.stringify(sampleData.data[4]));
            console.log(`Insert ${sampleData.data[4].id} Before ${sampleData.data[2].id}\n`);
            yield dumpList(client, sampleData.keyword);
            // Index
            let selectIndex = 2;
            let indexResult = yield client.lindex(sampleData.keyword, selectIndex);
            console.log(`Get List[${selectIndex}] ${indexResult}\n`);
            // Left Pop
            let leftPopResult = yield client.lpop(sampleData.keyword);
            console.log(`Left Pop, Value:\n`, leftPopResult);
            yield dumpList(client, sampleData.keyword);
            // Right Pop
            let rightPopResult = yield client.rpop(sampleData.keyword);
            console.log(`Right Pop, Value:\n`, rightPopResult);
            yield dumpList(client, sampleData.keyword);
            // Delete Key
            let delResult = yield client.del(sampleData.keyword);
            console.log(`\nDelete ${delResult} Keywords '${sampleData.keyword}'`);
        }
        catch (e) {
            console.error(e, `Run Demo3 Error`);
        }
    });
}
function dumpList(client, key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let length = yield client.llen(key);
            let list = yield client.ldump(key);
            console.log(`List length is ${length}, length content: \n`, list);
            console.log("\n");
        }
        catch (e) {
            console.error(e, `Dump List Error`);
        }
    });
}
//# sourceMappingURL=index.js.map