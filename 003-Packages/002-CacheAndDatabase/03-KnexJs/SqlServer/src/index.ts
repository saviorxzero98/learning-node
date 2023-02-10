import * as Knex from 'knex';

// Sample Data
const sampleData = [
    {
        UserName: "Jack",
        CreateDate: "2018-11-11 11:11"
    },
    {
        UserName: "Queen",
        CreateDate: "2018-12-12 12:12"
    },
    {
        UserName: "King",
        CreateDate: "2018-01-13 13:13"
    },
    {
        UserName: "Ace",
        CreateDate: "2018-01-01 01:01"
    },
    {
        UserName: "Joker",
        CreateDate: "2018-12-31 00:00"
    }
]

// Config (Remote DB) [不支援 Windows 驗證]
const mssqlConfig = {
    user:'admin',
    password:'',
    host:'yourhost', 
    database:'Test'
 };
const knexConfig = {
    client: 'mssql',
    connection: mssqlConfig
}


const knex = Knex(knexConfig);
const tableName = 'MyProfire';

DemoKnex();

async function DemoKnex() {
    try {
        // Truncate Table
        await knex(tableName).truncate();

        // Insert Data
        await knex.batchInsert(tableName, sampleData);
        /*
        for(let data of sampleData) {
            await knex.insert(data).into(tableName);
        }
        */

        // Select Data
        let values = await knex.select('*').from(tableName);
        console.log(values);
    }
    catch (e) {
        console.log(e);
    }
}