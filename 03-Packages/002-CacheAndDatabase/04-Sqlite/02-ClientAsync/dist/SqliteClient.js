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
const sqlite3 = require("sqlite3");
class SqliteClient {
    constructor() {
        this.errorDelegate = (msg) => { };
        this.sqlProfileDelegate = (msg) => { };
    }
    //#endregion Property & Construction
    //#region Public Method - Open & Close
    open(connectorString, callback) {
        this.client = new sqlite3.Database(connectorString, callback);
    }
    openAsync(connectorString) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            return new Promise((resolve, reject) => {
                self.client = new sqlite3.Database(connectorString, (error) => {
                    if (error) {
                        self.isReady = false;
                        self.errorDelegate(error);
                        reject(error);
                    }
                    else {
                        self.isReady = true;
                        resolve(`ready`);
                    }
                });
            });
        });
    }
    close(callback) {
        this.client.close(callback);
    }
    closeAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            return new Promise((resolve, reject) => {
                self.client.close((error) => {
                    if (error) {
                        self.errorDelegate(error);
                        reject(error);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
    queryFirst(sqlStatement, params, callback, paramPrefix) {
        let prefix = String(paramPrefix || SqliteQueryBuilder.DefaultPrefix);
        let sql = sqlStatement;
        if (typeof params === 'function') {
            this.client.get(sql, params);
            return;
        }
        if (params) {
            let builder = new SqliteQueryBuilder(sqlStatement, prefix).addParams(params);
            sql = builder.toString();
        }
        this.sqlProfileDelegate(sql);
        this.client.get(sql, callback);
    }
    queryFirstAsync(sqlStatement, params, paramPrefix) {
        return __awaiter(this, void 0, void 0, function* () {
            let prefix = paramPrefix || SqliteQueryBuilder.DefaultPrefix;
            let sql = sqlStatement;
            if (params) {
                let builder = new SqliteQueryBuilder(sqlStatement, prefix).addParams(params);
                sql = builder.toString();
            }
            this.sqlProfileDelegate(sql);
            return yield this.getAsync(sql);
        });
    }
    query(sqlStatement, params, callback, paramPrefix) {
        let prefix = String(paramPrefix || SqliteQueryBuilder.DefaultPrefix);
        let sql = sqlStatement;
        if (typeof params === 'function') {
            this.client.all(sql, params);
            return;
        }
        if (params) {
            let builder = new SqliteQueryBuilder(sqlStatement, prefix).addParams(params);
            sql = builder.toString();
        }
        this.sqlProfileDelegate(sql);
        this.client.all(sql, callback);
    }
    queryAsync(sqlStatement, params, paramPrefix) {
        return __awaiter(this, void 0, void 0, function* () {
            let prefix = paramPrefix || SqliteQueryBuilder.DefaultPrefix;
            let sql = sqlStatement;
            if (params) {
                let builder = new SqliteQueryBuilder(sqlStatement, prefix).addParams(params);
                sql = builder.toString();
            }
            this.sqlProfileDelegate(sql);
            return yield this.allAsync(sql);
        });
    }
    execute(sqlStatement, params, callback, paramPrefix) {
        let prefix = paramPrefix || SqliteQueryBuilder.DefaultPrefix;
        let sql = sqlStatement;
        if (typeof params === 'function') {
            this.client.run(sql, params);
            return;
        }
        if (params) {
            let builder = new SqliteQueryBuilder(sqlStatement, prefix).addParams(params);
            sql = builder.toString();
        }
        this.sqlProfileDelegate(sql);
        this.client.run(sql, callback);
    }
    executeAsync(sqlStatement, params, paramPrefix) {
        return __awaiter(this, void 0, void 0, function* () {
            let prefix = paramPrefix || SqliteQueryBuilder.DefaultPrefix;
            let sql = sqlStatement;
            if (params) {
                let builder = new SqliteQueryBuilder(sqlStatement, prefix).addParams(params);
                sql = builder.toString();
            }
            this.sqlProfileDelegate(sql);
            return yield this.runAsync(sql);
        });
    }
    //#endregion
    //#region Basic Method
    // Get First
    getAsync(sqlStatement, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            return new Promise((resolve, reject) => {
                if (params && params.length !== 0) {
                    self.client.serialize(() => {
                        self.client.get(sqlStatement, params, (error, row) => {
                            if (error) {
                                self.errorDelegate(error);
                                reject(error);
                            }
                            resolve(row);
                        });
                    });
                }
                else {
                    self.client.serialize(() => {
                        self.client.get(sqlStatement, (error, row) => {
                            if (error) {
                                self.errorDelegate(error);
                                reject(error);
                            }
                            else {
                                resolve(row);
                            }
                        });
                    });
                }
            });
        });
    }
    // Get All
    allAsync(sqlStatement, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            return new Promise((resolve, reject) => {
                if (params && params.length !== 0) {
                    self.client.serialize(() => {
                        self.client.all(sqlStatement, params, (error, rows) => {
                            if (error) {
                                self.errorDelegate(error);
                                reject(error);
                            }
                            resolve(rows);
                        });
                    });
                }
                else {
                    self.client.serialize(() => {
                        self.client.all(sqlStatement, (error, rows) => {
                            if (error) {
                                self.errorDelegate(error);
                                reject(error);
                            }
                            else {
                                resolve(rows);
                            }
                        });
                    });
                }
            });
        });
    }
    runAsync(sqlStatement, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            return new Promise((resolve, reject) => {
                self.client.serialize(() => {
                    if (params && params.length !== 0) {
                        self.client.run(sqlStatement, params, (error) => {
                            if (error) {
                                self.errorDelegate(error);
                                reject(error);
                            }
                            else {
                                resolve();
                            }
                        });
                        resolve();
                    }
                    else {
                        self.client.run(sqlStatement, (error) => {
                            if (error) {
                                self.errorDelegate(error);
                                reject(error);
                            }
                            else {
                                resolve();
                            }
                        });
                    }
                });
            });
        });
    }
}
exports.SqliteClient = SqliteClient;
// SQLite SQL Query Builder
class SqliteQueryBuilder {
    constructor(sqlStatement, paramsPrefix) {
        this._sqlStatement = sqlStatement;
        this._paramsPrefix = paramsPrefix || SqliteQueryBuilder.DefaultPrefix;
        this._params = {};
    }
    // Add Parameter
    addParam(key, value) {
        if (key !== undefined && key !== '') {
            this._params[key] = value;
        }
        return this;
    }
    // Add Parameter Object
    addParams(params) {
        if (params && typeof params === "object") {
            let keys = Object.keys(params);
            for (var i = 0; i < keys.length; i++) {
                let key = keys[i];
                this.addParam(key, params[key]);
            }
        }
        return this;
    }
    // Clear Parameter
    clearParams() {
        this._params = {};
        return this;
    }
    // Set Parameter Prefix
    setParamPrefix(prefix) {
        this._paramsPrefix = prefix;
        return this;
    }
    // Set SQL Statement
    setSqlStatement(sqlStatement) {
        this._sqlStatement = sqlStatement;
        return this;
    }
    // Get SQL Statement
    toString() {
        let sqlStatement = this._sqlStatement;
        let keys = Object.keys(this._params);
        for (var i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = this._params[key];
            let keyword = `${this._paramsPrefix}${key}`;
            let data = 'NULL';
            if (value !== undefined) {
                switch (typeof value) {
                    case 'string':
                        // SQL Injection Protection
                        data = `'${this.replaceAll(value, `'`, `''`)}'`;
                        break;
                    case 'boolean':
                    case 'number':
                        data = `'${String(value)}'`;
                        break;
                    case 'object':
                        if (value instanceof Date) {
                            data = `'${value.toLocaleString()}'`;
                        }
                        else {
                            data = `'${JSON.stringify(value)}'`;
                        }
                        break;
                }
            }
            // Replace Parameter
            sqlStatement = this.replaceAll(sqlStatement, keyword, data);
        }
        return sqlStatement;
    }
    // Replace All
    replaceAll(text, from, to) {
        return text.replace(new RegExp(from, 'g'), to);
    }
}
SqliteQueryBuilder.DefaultPrefix = '@';
exports.SqliteQueryBuilder = SqliteQueryBuilder;
//# sourceMappingURL=SqliteClient.js.map