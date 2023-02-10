import { Pool, Client } from 'pg';

const pool = new Pool({
    user:'postgres',
    password:'',
    host:'127.0.0.1', 
    database:'ChatBot',
    port: 5432
})

pool.query('SELECT * From MyProfire', (err, res) => {
    console.log(err, res)
    pool.end()
})

const client = new Client({
    user:'postgres',
    password:'',
    host:'127.0.0.1', 
    database:'ChatBot',
    port: 5432
})
client.connect()

client.query('SELECT * From MyProfire', (err, res) => {
    console.log(err, res)
    client.end()
})