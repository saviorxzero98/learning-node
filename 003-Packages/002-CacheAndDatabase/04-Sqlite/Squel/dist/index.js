"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sqlite3 = require("sqlite3");
const Squel = require("squel");
// Config
const sqliteConfig = {
    path: 'sample.db',
};
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
    for (var i = 0; i < sampleData.length; i++) {
        const insertSql = Squel.insert().into('MyProfire')
            .set('UserName', sampleData[i].UserName)
            .set('CreateDate', sampleData[i].CreateDate)
            .toString();
        console.log(insertSql);
        db.run(insertSql);
    }
    // SELECT Data
    const selectSql = Squel.select().from('MyProfire').toString();
    console.log(selectSql);
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
    // 方法三、取一筆資料
    db.get(selectSql, (err, row) => {
        console.log("\n[Select First]");
        if (err) {
            console.error(err);
            return;
        }
        console.log(row);
    });
    let king = `king' OR '1' = '1`;
    // Where
    const selectSql2 = Squel.select().from('MyProfire')
        .where(`UserName = '${king}'`)
        .where(`CreateDate='2018-01-13 13:13'`)
        .toString();
    console.log(selectSql2);
    db.all(selectSql2, (err, rows) => {
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