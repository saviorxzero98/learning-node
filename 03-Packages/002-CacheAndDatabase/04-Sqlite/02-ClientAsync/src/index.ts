import  { SqliteClient } from './SqliteClient';

RunDemoAsync();

// Sample Data
const sampleData = [
    {
        UserId: 11,
        UserName: "Jack",
        IsAdmin: false,
        CreateDate: new Date()
    },
    {
        UserId: 12,
        UserName: "Queen",
        IsAdmin: false,
        CreateDate: "2018-12-12 12:12"
    },
    {
        UserId: 13,
        UserName: "King",
        IsAdmin: true,
        CreateDate: "2018-01-13 13:13"
    },
    {
        UserId: 1,
        UserName: "Ace",
        IsAdmin: false,
        CreateDate: "2018-01-01 01:01"
    },
    {
        UserId: 0,
        UserName: "Joker",
        IsAdmin: false,
        CreateDate: "2018-12-31 00:00"
    }
]

async function RunDemoAsync() {
    console.log('---------- Run Demo (Async) ----------')
    // Config
    const sqliteConfig = 'sample.db';
    // Create Redis
    const client = new SqliteClient();
    client.sqlProfileDelegate = (message) => console.log(message);
    client.errorDelegate = (error) => console.error(error.message);
    
    try {
        await client.openAsync(sqliteConfig);

        await client.executeAsync('DROP TABLE IF EXISTS MyProfire');
        console.log(`Drop table`);
        await client.executeAsync('CREATE TABLE MyProfire (Id INTEGER PRIMARY KEY AUTOINCREMENT, UserName TEXT, UserId INGETER, IsAdmin BOOLEAN, CreateDate DATETIME);');
        console.log(`Create table`);
        
        const insertSql2 = 'INSERT INTO MyProfire (UserId, UserName, IsAdmin, CreateDate) VALUES (@UserId, @UserName, @IsAdmin, @CreateDate);';
        for (var i = 0; i < sampleData.length; i++) {
            await client.executeAsync(insertSql2, sampleData[i]);
            console.log(`Insert Data ${sampleData[i].UserName}`);
        }

        // SELECT Data
        console.log('\n[SELECT Data]');
        const selectSql = 'SELECT * FROM MyProfire;';
        let result = await client.queryAsync(selectSql);
        console.log(result);

        // Update Data
        console.log('\n[Update Data]');
        const updateSql = 'UPDATE MyProfire SET UserName = @NewUserName WHERE UserName = @UserName;';
        await client.executeAsync(updateSql, { UserName: 'King', NewUserName: 'King Marty' });

        // WHERE Data
        console.log('\n[SWHERE Data]');
        const whereSql = 'SELECT * FROM MyProfire WHERE UserName LIKE $UserName';
        let result2 = await client.queryAsync(whereSql, { UserName: 'King%'}, '$');
        console.log(result2);

        // WHERE Data
        console.log('\n[WHERE Data 2]');
        const whereSql2 = 'SELECT * FROM MyProfire WHERE UserName = @UserName';
        let result3 = await client.queryFirstAsync(whereSql2, { UserName: 'Queen'});
        console.log(result3);

        await client.closeAsync();
    }
    catch (e) {
        console.log('Sqlite is not available', e);
    }

    RunDemoSync();
}

async function RunDemoSync() {
    console.log('---------- Run Demo (Sync) ----------')
    // Config
    const sqliteConfig = 'sample.db';
    // Create Redis
    const client = new SqliteClient();
    client.sqlProfileDelegate = (message) => console.log(message);
    client.errorDelegate = (error) => console.error(error.message);
    
    await client.openAsync(sqliteConfig);

    console.log('\n[UPDATE Data (Sync)]');
    client.execute( 'UPDATE MyProfire SET UserName = @NewUserName WHERE UserName LIKE @UserName;',
                        { UserName: 'King%', NewUserName: 'King' },
                        (error) => {
        if (error) {
            console.log(error.message);
            client.close();
            return;
        }
        console.log('\n[WHERE Data (Sync)]');
        client.queryFirst('SELECT * FROM MyProfire WHERE UserName = @UserName', 
                            { UserName: 'King'}, 
                            (error, row) => {
            if (error) {
                console.log(error.message);
                client.close();
                return;
            }
            console.log(row);
            console.log('\n[SELECT Data (Sync)]');
            client.query('SELECT * FROM MyProfire;', (error, rows) => {
                if (error) {
                    console.log(error.message);
                    client.close();
                    return;
                }
                console.log(rows);
                client.close();
            });
        })
    });
}
