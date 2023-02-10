"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sqlite3 = require("sqlite3");
// Config
const sqliteConfig = {
    path: "sample.db",
};
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
];
const db = new Sqlite3.Database((sqliteConfig.path), (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Open SQLite database.');
});
db.serialize(function () {
    db.run("DROP TABLE MyProfire");
    db.run("CREATE TABLE MyProfire (Id INTEGER PRIMARY KEY AUTOINCREMENT, UserName TEXT, CreateDate DATETIME);");
    // 批次Insert
    const insertSql = 'INSERT INTO MyProfire (UserName, CreateDate) VALUES ($UserName, $CreateDate);';
    // 方法一
    for (var i = 0; i < sampleData.length; i++) {
        db.run(insertSql, sampleData[i].UserName, sampleData[i].CreateDate);
    }
    // 方法二
    /*var statement = db.prepare(insertSql);
    for (var i = 0; i < sampleData.length; i++) {
        statement.run(sampleData[i].UserName, sampleData[i].CreateDate);
    }
    statement.finalize();*/
    // 方法三
    /*const insertSql3 = 'INSERT INTO MyProfire (UserName, CreateDate) VALUES ($UserName, $CreateDate);';
    for (var i = 0; i < sampleData.length; i++) {
        db.run(insertSql3, { $CreateDate: sampleData[i].CreateDate, $UserName: sampleData[i].UserName });
    }*/
    // SELECT Data
    const selectSql = 'SELECT * FROM MyProfire;';
    // 方法一、一筆一筆取
    db.each(selectSql, (err, row) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(row);
    });
    // 方法二、一次取全部資料
    db.all(selectSql, [], (err, rows) => {
        console.log("\n[Select All]");
        if (err) {
            console.error(err);
            return;
        }
        console.log(rows);
    });
    // 方法三、一次取全部資料
    db.run(selectSql, (result, err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(result);
    });
    // 方法四、取一筆資料
    db.get(selectSql, (err, row) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(row);
    });
    db.get('SELECT sqlite_version()', (err, row) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(row);
    });
    // Where
    let where = ['King', '2018-01-13 13:13'];
    const selectSql2 = 'SELECT * FROM MyProfire WHERE UserName=$UserName AND CreateDate=$CreateDate';
    db.all(selectSql2, where, (err, rows) => {
        console.log("\n[Where]");
        if (err) {
            console.error(err);
            return;
        }
        console.log(rows);
    });
});
db.close();
//# sourceMappingURL=index.js.map