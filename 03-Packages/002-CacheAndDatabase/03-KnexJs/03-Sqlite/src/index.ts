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

// Config
const sqliteConfig = {
	path : "sample.db",
}
const knexConfig = {
    client: "sqlite3",
    connection:    {
        filename: sqliteConfig.path,
        useNullAsDefault: true
    }
}

const knex = Knex(knexConfig);
const tableName = 'MyProfire';

DemoKnex();

async function DemoKnex() {
    // Drop Table
    await knex.schema.dropTableIfExists(tableName);

    // Create Table
    await knex.schema.createTable(tableName, (table) => {
        table.increments('Id').primary();   // Id INTEGER PRIMARY KEY AUTOINCREMENT
        table.string('UserName');           // UserName TEXT
        table.dateTime('CreateDate');       // CreateDate DATETIME
    });

    // Insert Data
    await knex.batchInsert(tableName, sampleData);
    /*
    for(let data of sampleData) {
        await knex.insert(data).into(tableName);
    }
    */

    // Select Data
    let values = await knex.select('*').from(tableName).where({ UserName: "King"});
    console.log(values);
}







 

