"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Knex = require("knex");
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
            user: 'tdd',
            password: 'gsstdd',
            host: 'GSS-SQL2014-01',
            database: 'TDD_M_D'
        },
        useNullAsDefault: true
    }
};
DemoKnexSql('SQLite', knexConfig.sqlite3);
DemoKnexSql('MSSQL', knexConfig.mssql);
function DemoKnexSql(title, config) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`\n==================== ${title} ====================`);
        const knex = Knex(config);
        let selectSql = knex.select('*').from(tableName).limit(3).toString();
        console.log(selectSql);
    });
}
//# sourceMappingURL=index.js.map