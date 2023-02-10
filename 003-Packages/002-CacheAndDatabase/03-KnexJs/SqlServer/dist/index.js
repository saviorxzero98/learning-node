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
};
const knex = Knex(knexConfig);
const tableName = 'MyProfire';
DemoKnex();
function DemoKnex() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Truncate Table
            yield knex(tableName).truncate();
            // Insert Data
            yield knex.batchInsert(tableName, sampleData);
            /*
            for(let data of sampleData) {
                await knex.insert(data).into(tableName);
            }
            */
            // Select Data
            let values = yield knex.select('*').from(tableName);
            console.log(values);
        }
        catch (e) {
            console.log(e);
        }
    });
}
//# sourceMappingURL=index.js.map