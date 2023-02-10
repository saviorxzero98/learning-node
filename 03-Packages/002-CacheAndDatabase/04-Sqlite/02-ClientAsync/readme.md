
# 安裝

## 方法一

```shell
npm install
```

## 方法二

```shell
npm install @types/node
npm install sqlite3
npm install @types/sqlite3
```

# 使用

## Import Package

```javascript
import { SQLiteClient } from './SqliteClient';
```

## Query Data (Non-Callback)

```javascript
// Create SqliteClient
const client = new SqliteClient();

// Open SQLite database
await client.openAsync('sample.db');

// Query data
const selectSql = 'SELECT * FROM MyProfire;';
let results = await client.queryAsync(selectSql);

// Query data with where condition (預設參數的Prefix為'@')
const selectWhereSql = 'SELECT * FROM MyProfire WHERE UserName = @UserName;';
let params = { 
    UserName: 'King' 
};
let results2 = await client.queryAsync(selectWhereSql, params, '@');

// Query First Data
let result = await client.queryFirstAsync(selectWhereSql, params, '@');

// Close SQLite database
client.close();
```

## Execute SQL (Non-Callback)
```javascript
// Create SqliteClient
const client = new SqliteClient();

// Open SQLite database
await client.openAsync('sample.db');

// Execute SQL (預設參數的Prefix為'@')
const updateSql = 'UPDATE MyProfire SET UserName = @NewUserName WHERE UserName = @UserName;';
let params = { 
    UserName: 'King',
    NewUserName: 'Marty' 
};
await client.executeAsync(updateSql, params, '@');

// Close SQLite database
await client.closeAsync();
```

## Query Data (Callback)

```javascript
// Create SqliteClient
const client = new SqliteClient();

// Open SQLite database
client.open('sample.db', afterOpen);
function afterOpen(error) {
    if (error) {
        console.error(error.message);
        return;
    }
    
    // Query data
    const selectSql = 'SELECT * FROM MyProfire;';
    client.query(selectSql, selectData);
}

function selectData(error, rows) {
    if (error) {
        console.error(error.message);
    }
    else {
        console.log(rows);
    }

    // Query data with where condition (預設參數的Prefix為'@')
    const selectWhereSql = 'SELECT * FROM MyProfire WHERE UserName = @UserName;';
    let params = { 
        UserName: 'King' 
    };
    client.query(selectWhereSql, params, selectWhereData, '@');
}

function selectWhereData(error, rows) {
    if (error) {
        console.error(error.message);
    }
    else {
        console.log(rows);
    }

    // Query data with where condition (預設參數的Prefix為'@')
    const selectWhereSql = 'SELECT * FROM MyProfire WHERE UserName = @UserName;';
    let params = { 
        UserName: 'King' 
    };

    // Query First Data
    client.queryFirst(selectWhereSql, params, selectFirstData, '@');
}

function selectFirstData(error, row) {
    if (error) {
        console.error(error.message);
    }
    else {
        console.log(row);
    }

    // Close SQLite database
    client.close();
}
```

## Execute SQL (Callback)
```javascript
// Create SqliteClient
const client = new SqliteClient();

// Open SQLite database
client.open('sample.db', afterOpen);

function afterOpen(error) {
    // Execute SQL (預設參數的Prefix為'@')
    const updateSql = 'UPDATE MyProfire SET UserName = @NewUserName WHERE UserName = @UserName;';
    let params = { 
        UserName: 'King',
        NewUserName: 'Marty' 
    };
    client.execute(updateSql, params, afterExecuteSql, '@');
}

function afterExecuteSql(error) {
    if (error) {
        console.error(error.message);
    }

    // Close SQLite database
    client.close();
}
```

## Add SQL Profile and Error Log
```javascript
// Create SqliteClient
const client = new SqliteClient();

// Add SQL Profile
client.sqlProfileDelegate = (message) => console.log(message);

// Add Error Logger (只適用於'Async'字尾的Method)
client.errorDelegate = (error) => console.error(error.message);  
```




