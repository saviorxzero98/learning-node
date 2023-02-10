"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sqlite3 = require("sqlite3");
const sqlQueryBuilder_1 = require("./sqlQueryBuilder");
// Config
const sqliteConfig = {
    path: "sample.db",
};
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
];
const db = new Sqlite3.Database((sqliteConfig.path), (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Open SQLite database.');
});
db.serialize(function () {
    db.run("DROP TABLE MyProfire");
    db.run("CREATE TABLE MyProfire (Id INTEGER PRIMARY KEY AUTOINCREMENT, UserName TEXT, UserId INGETER, IsAdmin BOOLEAN, CreateDate DATETIME);");
    // 方法一
    for (var i = 0; i < sampleData.length; i++) {
        let insertSqlBuilder = new sqlQueryBuilder_1.SqliteQueryBuilder('INSERT INTO MyProfire (UserId, UserName, IsAdmin, CreateDate) VALUES (@UserId, @UserName, @IsAdmin, @CreateDate);');
        insertSqlBuilder.addParams(sampleData[i]);
        console.log(insertSqlBuilder.toString());
        db.run(insertSqlBuilder.toString(), (error) => {
            if (error && error.message) {
                console.log(error.message);
            }
        });
    }
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
    // 方法三、取一筆資料
    db.get(selectSql, (err, row) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(row);
    });
    // Where
    let whereSqlBuilder = new sqlQueryBuilder_1.SqliteQueryBuilder('SELECT * FROM MyProfire WHERE UserName=@UserName AND CreateDate=@CreateDate');
    whereSqlBuilder.addParams({
        UserName: `King`,
        CreateDate: '2018-01-13 13:13'
    });
    const selectSql2 = whereSqlBuilder.toString();
    console.log(selectSql2);
    db.all(selectSql2, (err, rows) => {
        console.log("\n[Where]");
        if (err) {
            console.error(err);
            return;
        }
        console.log(rows);
    });
    // Update
    let updateSqlBuilder = new sqlQueryBuilder_1.SqliteQueryBuilder('UPDATE MyProfire SET UserName = @NewUserName WHERE UserName = @UserName;');
    updateSqlBuilder.addParams({
        UserName: 'King',
        NewUserName: 'Marty'
    });
    console.log(updateSqlBuilder.toString());
    db.run(updateSqlBuilder.toString());
    db.all(selectSql, [], (err, rows) => {
        console.log("\n[Select All (After)]");
        if (err) {
            console.error(err);
            return;
        }
        console.log(rows);
    });
});
db.close();
//# sourceMappingURL=index.js.map