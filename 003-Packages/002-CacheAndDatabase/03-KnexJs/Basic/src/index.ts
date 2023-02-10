import * as Knex from 'knex';

// Sample Data
const sampleData = [
    {
        UserName: 'Jack',
        CreateDate: '2018-11-11 11:11'
    },
    {
        UserName: 'Queen',
        CreateDate: '2018-12-12 12:12'
    },
    {
        UserName: 'King',
        CreateDate: '2018-01-13 13:13'
    },
    {
        UserName: 'Ace',
        CreateDate: '2018-01-01 01:01'
    },
    {
        UserName: 'Joker',
        CreateDate: '2018-12-31 00:00'
    }
]

const tableName = 'MyProfire';
const knexConfig = {
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: 'sample.db'
        },
        useNullAsDefault: true
    },
    mssql: {
        client: 'mssql',
        connection: {
            user:'tdd',
            password:'gsstdd',
            host:'GSS-SQL2014-01', 
            database:'TDD_M_D'
        },
        useNullAsDefault: true
    }
}

DemoKnexSql('SQLite', knexConfig.sqlite3);
DemoKnexSql('MSSQL', knexConfig.mssql);

async function DemoKnexSql(title: string, config: any) {
    console.log(`\n==================== ${title} ====================`);
    
    const knex = Knex(config);

    let selectSql: string = knex.select('*').from(tableName).limit(3).toString();
    console.log(selectSql);
}





 

