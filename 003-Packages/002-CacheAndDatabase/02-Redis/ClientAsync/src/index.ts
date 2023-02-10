import  { RedisAsyncClient } from './RedisAsyncClient';

RunDemo();
RunDemo();

async function RunDemo() {
    // Config
    const redisConfig = {
        host : "127.0.0.1",
        port : 6379
    }
    // Create Redis
    const client = new RedisAsyncClient();
    
    try {
        // Open
        let status = await client.open(redisConfig);
        console.log(`Redis status : ${status}\n`);

        // Working
        if (client.isReady) {
            console.log("Start Demo GET/SET String\n");
            await RunDemo1(client);
        }
        
        if (client.isReady) {
            console.log("\n-------------------\n");
            console.log("Start Demo GET/SET Hash\n");
            await RunDemo2(client);
        }
        
        if (client.isReady) {
            console.log("\n-------------------\n");
            console.log("Start Demo GET/SET List\n");
            await RunDemo3(client);
        }
       
        if (client.isReady) {
            // Close
            client.end();
        }
    }
    catch (e) {
        console.log('Redis is not available', e);
    }
}

async function RunDemo1(client: RedisAsyncClient) {
    // Sample Data
    const sampleData = {
        dbName : 0,
        keyword : "test"
    }

    try {
        // Select Database
        let selectResult = await client.select(sampleData.dbName);
        console.log(`Select Database ${sampleData.dbName} - ${selectResult}\n`);

        // Set Value (String)
        let setResult = await client.set(sampleData.keyword, JSON.stringify({ "name": "wolfy", age: 28 }));
        console.log(`Set String ${setResult} (Keyword: ${sampleData.keyword})\n`);

        // Get Value (String)
        let getResult = await client.get(sampleData.keyword);
        console.log(`Get String '${getResult} (Keyword: ${sampleData.keyword})'`);

        // Delete Key
        let delResult = await client.del(sampleData.keyword);
        console.log(`\nDelete ${delResult} Keywords '${sampleData.keyword}'`);
    }
    catch (e) {
        console.error(e, `Run Demo1 Error`);
    }
}

async function RunDemo2(client: RedisAsyncClient) {
    // Sample Data
    const sampleData = {
        dbName : 1,
        keyword : "test",
        data: { id: 5566, name: "wolfy", age: 28, birthday: "2/30" }
    }

    try {
        // Select Database
        let selectResult = await client.select(sampleData.dbName);
        console.log(`Select Database ${sampleData.dbName} - ${selectResult}\n`);

        // Set Value (Hash)
        let hmsetResult = await client.hmset(sampleData.keyword, sampleData.data);
        console.log(`Set Hash ${hmsetResult} (Keyword: ${sampleData.keyword})\n`);

        // Get All Value (Hash)
        let hgetallResult = await client.hgetall(sampleData.keyword);
        console.log(`Get All Hash Error (Keyword: ${sampleData.keyword})\n`, hgetallResult);

        // Get Value By Field [1]
        let hgetResult = await client.hget(sampleData.keyword, "age");
        console.log(`\nGet Hash (Keyword: ${sampleData.keyword}, Field: ${"age"})\n`, hgetResult);

        // Delete Field
        let hdelResult = await client.hdel(sampleData.keyword, "age");
        console.log(`\nGet Hash (Keyword: ${sampleData.keyword}, Field: ${"age"})\n`, hdelResult);

        // Get Value By Field [2]
        let hget2Result = await client.hget(sampleData.keyword, "age");
        console.log(`\nGet Hash (Keyword: ${sampleData.keyword}, Field: ${"age"}) [2]\n`, hget2Result);

        // Delete Key
        let delResult = await client.del(sampleData.keyword);
        console.log(`\nDelete ${delResult} Keywords '${sampleData.keyword}'`);
    }
    catch (e) {
        console.error(e, `Run Demo2 Error`);
    }
}

async function RunDemo3(client: RedisAsyncClient) {
    // Sample Data
    const sampleData = {
        dbName : 2,
        keyword : "test",
        data: [ 
            { id: "0087", profile: { name: "joker", age: 87 }},
            { id: "2266", profile: { name: "jack", age: 30 }},
            { id: "1334", profile: { name: "queen", age: 28}},
            { id: "3334", profile: { name: "king", age: 40 }},
            { id: "0520", profile: { name: "ace", age: 18}}
        ]
    }

    try {
        // Select Database
        let selectResult = await client.select(sampleData.dbName);
        console.log(`Select Database ${sampleData.dbName} - ${selectResult}\n`);

        // Left push [1]
        await client.lpush(sampleData.keyword, JSON.stringify(sampleData.data[0]));
        console.log(`Left Push ${sampleData.data[0].id} (1)\n`);
        await dumpList(client, sampleData.keyword);

        // Left push [2]
        await client.lpush(sampleData.keyword, JSON.stringify(sampleData.data[1]));
        console.log(`Left Push ${sampleData.data[1].id} (2)\n`);
        await dumpList(client, sampleData.keyword);

        // Right push [1]
        await client.rpush(sampleData.keyword, JSON.stringify(sampleData.data[2]));
        console.log(`Right Push ${sampleData.data[2].id} (1)\n`);
        await dumpList(client, sampleData.keyword);

        // Right push [2]
        await client.rpush(sampleData.keyword, JSON.stringify(sampleData.data[3]));
        console.log(`Right Push ${sampleData.data[3].id} (2)\n`);
        await dumpList(client, sampleData.keyword);

        // Insert
        await client.linsertBefore(sampleData.keyword, JSON.stringify(sampleData.data[2]), JSON.stringify(sampleData.data[4]));
        console.log(`Insert ${sampleData.data[4].id} Before ${sampleData.data[2].id}\n`);
        await dumpList(client, sampleData.keyword);

        // Index
        let selectIndex = 2;
        let indexResult = await client.lindex(sampleData.keyword, selectIndex);
        console.log(`Get List[${selectIndex}] ${indexResult}\n`);

        // Left Pop
        let leftPopResult = await client.lpop(sampleData.keyword);
        console.log(`Left Pop, Value:\n`, leftPopResult);
        await dumpList(client, sampleData.keyword);

        // Right Pop
        let rightPopResult = await client.rpop(sampleData.keyword);
        console.log(`Right Pop, Value:\n`, rightPopResult);
        await dumpList(client, sampleData.keyword);

        // Delete Key
        let delResult = await client.del(sampleData.keyword);
        console.log(`\nDelete ${delResult} Keywords '${sampleData.keyword}'`);
    }
    catch (e) {
        console.error(e, `Run Demo3 Error`);
    }
}

async function dumpList(client: RedisAsyncClient, key: string) {
    try {
        let length = await client.llen(key);
        let list = await client.ldump(key);
        console.log(`List length is ${length}, length content: \n`, list);
        console.log("\n");
    }
    catch (e) {
        console.error(e, `Dump List Error`);
    }
}