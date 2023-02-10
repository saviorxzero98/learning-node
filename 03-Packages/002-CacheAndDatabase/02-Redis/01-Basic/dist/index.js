"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require("redis");
// Config
const redisConfig = {
    host: "127.0.0.1",
    port: 6379
};
// Sample Data
const sampleData = {
    dbName: "15",
    keyword: "test"
};
// Create Redis Client
var client = Redis.createClient(redisConfig.port, redisConfig.host);
// Handle Error
client.on("error", (error) => {
    console.log(error);
});
// Handle Success
client.on("ready", (a) => {
    console.log('ok');
});
try {
    client.select(sampleData.dbName, (error) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log('OK');
        }
    });
}
catch (e) {
    console.log(e);
}
// Select Redis DB
/*client.select(sampleData.dbName, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        // Save Data
        client.set(sampleData.keyword, JSON.stringify({ "name": "wolfy", age: 28 }), (error, res) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(res);
                // Load Data
                client.get(sampleData.keyword, (error, reply) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log(reply);
                    }
                    // Finish, Close Redis
                    client.end(true);
                });

            };
        });
    };
});*/ 
//# sourceMappingURL=index.js.map