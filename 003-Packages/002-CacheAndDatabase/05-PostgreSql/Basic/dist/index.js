"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'postgres',
    password: '',
    host: '127.0.0.1',
    database: 'ChatBot',
    port: 5432
});
pool.query('SELECT * From MyProfire', (err, res) => {
    console.log(err, res);
    pool.end();
});
const client = new pg_1.Client({
    user: 'postgres',
    password: '',
    host: '127.0.0.1',
    database: 'ChatBot',
    port: 5432
});
client.connect();
client.query('SELECT * From MyProfire', (err, res) => {
    console.log(err, res);
    client.end();
});
//# sourceMappingURL=index.js.map