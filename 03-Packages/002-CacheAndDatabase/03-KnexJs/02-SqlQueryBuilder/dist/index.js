"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Knex = require("knex");
// Sample Data
const sampleData = {
    UserConversationDataId: 3,
    DialogHistoryId: 7,
    MessageDialogHistoryId: 7
};
const insertData = {
    Watermark: 1,
    ConversationId: 'conversationId',
    Activity: '{}',
    ActivityContent: 1,
    MessageText: 'text',
    CreateDate: new Date().toISOString()
};
const dbConfig = {
    betterSqlite3: {
        client: 'better-sqlite3',
        connection: {
            filename: 'BotConnector.db',
            useNullAsDefault: true
        }
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: 'BotConnector.db',
            useNullAsDefault: true
        }
    },
    mssql: {
        client: 'mssql',
        connection: {
            server: '127.0.0.1', 
            database: 'Test',
            user: 'admin',
            password: '',
            options: {
                trustServerCertificate: true
            }
        },
        pool: {
            min: 30,
            max: 200
        },
        acquireConnectionTimeout: 10000,
        useNullAsDefault: true,
        encrypted: false
    },
    pg: {
        client: 'pg',
        connection: {
            host: "127.0.0.1", 
            database: "Test",
            user: "postgres",
            password: "",
            port: 5432
        },
        pool: {
            min: 30,
            max: 200
        },
        acquireConnectionTimeout: 10000,
        useNullAsDefault: true,
        encrypted: false
    },
    mysql: {
        client: 'mysql',
        version: '5.7',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'your_database_user',
            password: 'your_database_password',
            database: 'myapp_test'
        }
    }
};
const tableName = 'DialogHistory';
demoKnexSqlit3();
demoKnexBetterSqlite3();
demoKnexMssql();
demoKnexPg();
demoKnexMysql();
function demoKnexSqlit3() {
    return __awaiter(this, void 0, void 0, function* () {
        let client = Knex.knex(dbConfig.sqlite3);
        // let sqlResult = await client.raw(`
        // INSERT INTO "DialogHistory" 
        //     ("Activity", "ActivityContent", "ConversationId", "CreateDate", "MessageText", "Watermark") 
        // VALUES 
        //     (:Activity, :ActivityContent, :ConversationId, :CreateDate, :MessageText, :Watermark) 
        // RETURNING "Id"`, insertData);
        // try {
        //     let sqlResult = await client.insert(insertData)
        //                                 .returning(['Id', 'Watermark'])
        //                                 .into(tableName);
        //     console.log(sqlResult);
        // }
        // catch (e) {
        //     console.error(e);
        // }
        let sqlResult = client.insert(insertData)
            .returning(['Id', 'Watermark'])
            .into(tableName)
            .toSQL();
        // let sqlResult = client(tableName)
        //                     .insert(sampleData)
        //                     .onConflict('UserConversationDataId')
        //                     .merge({
        //                         DialogHistoryId: client.raw('EXCLUDED.??' ,'DialogHistoryId'), //.ref('EXCLUDED.DialogHistoryId'),
        //                         MessageDialogHistoryId: client.raw('COALESCE(EXCLUDED.??, ??)', [ 'MessageDialogHistoryId', 'MessageDialogHistoryId' ])
        //                     })
        //                     .where('DialogHistoryId', '<', client.raw('EXCLUDED.??', 'DialogHistoryId'))
        //                     .toSQL();
        console.log(`========== SQLite ==========`);
        console.log(sqlResult.sql);
        console.log(sqlResult.bindings);
        console.log('');
    });
}
function demoKnexBetterSqlite3() {
    return __awaiter(this, void 0, void 0, function* () {
        let client = Knex.knex(dbConfig.betterSqlite3);
        // let sqlResult = await client.raw(`
        // INSERT INTO "DialogHistory" 
        //     ("Activity", "ActivityContent", "ConversationId", "CreateDate", "MessageText", "Watermark") 
        // VALUES 
        //     (:Activity, :ActivityContent, :ConversationId, :CreateDate, :MessageText, :Watermark) 
        // RETURNING "Id", "Watermark"`, insertData);
        // console.log(sqlResult);
        // try {
        //     let sqlResult = await client.insert(insertData)
        //                                 .returning('Id')
        //                                 .into(tableName);
        //     console.log(sqlResult);
        // }
        // catch (e) {
        //     console.error(e);
        // }
        let sqlResult = client.insert(insertData)
            .returning(['Id', 'Watermark'])
            .into(tableName)
            .toSQL();
        console.log(`========== SQLite (better-sqlite3) ==========`);
        console.log(sqlResult.sql);
        console.log(sqlResult.bindings);
        console.log('');
    });
}
function demoKnexMssql() {
    return __awaiter(this, void 0, void 0, function* () {
        let client = Knex.knex(dbConfig.mssql);
        // let sqlResult = await client.raw(`
        //     INSERT INTO [BC_DialogHistory] 
        //         ([Activity], [ActivityContent], [ConversationId], [CreateDate], [MessageText], [Watermark]) 
        //     OUTPUT 
        //         inserted.[Id], inserted.[Watermark]
        //     VALUES
        //         (:Activity, :ActivityContent, :ConversationId, :CreateDate, :MessageText, :Watermark)`, insertData);
        // console.log(sqlResult);
        let sqlResult = client.insert(insertData)
            .returning(['Id', 'Watermark'])
            .into(tableName)
            .toSQL();
        // let sqlResult = client(tableName)
        //                     .insert(sampleData)
        //                     .onConflict('UserConversationDataId')
        //                     .merge({
        //                         DialogHistoryId: client.ref('EXCLUDED.DialogHistoryId'),
        //                         MessageDialogHistoryId: client.raw('COALESCE(EXCLUDED."MessageDialogHistoryId", "MessageDialogHistoryId")')
        //                     })
        //                     .where('DialogHistoryId', '<', client.ref('EXCLUDED.DialogHistoryId'))
        //                     .toSQL();
        console.log(`========== SQL Server ==========`);
        console.log(sqlResult.sql);
        console.log(sqlResult.bindings);
        console.log('');
    });
}
function demoKnexPg() {
    return __awaiter(this, void 0, void 0, function* () {
        let client = Knex.knex(dbConfig.pg);
        // let sqlResult = await client.raw(`
        //     INSERT INTO "DialogHistory" 
        //         ("Activity", "ActivityContent", "ConversationId", "CreateDate", "MessageText", "Watermark") 
        //     VALUES 
        //         (:Activity, :ActivityContent, :ConversationId, :CreateDate, :MessageText, :Watermark) 
        //     RETURNING "Id", "Watermark"`, insertData);
        // console.log(sqlResult);
        // let sqlResult = await client.insert(insertData)
        //                             .returning('Id')
        //                             .into(tableName);
        let sqlResult = client.insert(insertData)
            .returning(['Id', 'Watermark'])
            .into(tableName)
            .toSQL();
        // let sqlResult = client(tableName)
        //                     .insert(sampleData)
        //                     .onConflict('UserConversationDataId')
        //                     .merge({
        //                         DialogHistoryId: client.raw('EXCLUDED.??' ,'DialogHistoryId'),
        //                         MessageDialogHistoryId: client.raw('COALESCE(EXCLUDED.??, ??.??)', 
        //                                                             [
        //                                                                 'MessageDialogHistoryId',
        //                                                                 tableName,
        //                                                                 'MessageDialogHistoryId' 
        //                                                             ])
        //                     })
        //                     .where(client.raw('??.??', [ tableName, 'DialogHistoryId' ]), '<', 
        //                            client.raw('EXCLUDED.??', 'DialogHistoryId'))
        //                     .toSQL();
        console.log(`========== PostgreSQL ==========`);
        console.log(sqlResult.sql);
        console.log(sqlResult.bindings);
        console.log('');
    });
}
function demoKnexMysql() {
    return __awaiter(this, void 0, void 0, function* () {
        let client = Knex.knex(dbConfig.mysql);
        let sqlResult = client.insert(insertData)
            .returning(['Id'])
            .into(tableName)
            .toSQL();
        // let sqlResult = client(tableName)
        //                     .insert(sampleData)
        //                     .onConflict('UserConversationDataId')
        //                     .merge({
        //                         DialogHistoryId: client.raw('EXCLUDED.??' ,'DialogHistoryId'),
        //                         MessageDialogHistoryId: client.raw('COALESCE(EXCLUDED.??, ??.??)', 
        //                                                             [
        //                                                                 'MessageDialogHistoryId',
        //                                                                 tableName,
        //                                                                 'MessageDialogHistoryId' 
        //                                                             ])
        //                     })
        //                     .where(client.raw('??.??', [ tableName, 'DialogHistoryId' ]), '<', 
        //                            client.raw('EXCLUDED.??', 'DialogHistoryId'))
        //                     .toSQL();
        console.log(`========== MySQL ==========`);
        console.log(sqlResult.sql);
        console.log(sqlResult.bindings);
        console.log('');
    });
}
//# sourceMappingURL=index.js.map