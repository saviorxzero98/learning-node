import * as sqlite3 from 'sqlite3';

export class SqliteClient {

    //#region Property & Construction

    public client : sqlite3.Database;
    public isReady : boolean;
    public sqlProfileDelegate : (this: SqliteClient, message: string) => void;
    public errorDelegate : (this: SqliteClient, error: Error | null) => void;

    constructor () {
        this.errorDelegate = (msg) => { };
        this.sqlProfileDelegate = (msg) => { };
    }

    //#endregion Property & Construction


    //#region Public Method - Open & Close

    public open(connectorString: string, callback?: (err: Error | null) => void) {
        this.client = new sqlite3.Database(connectorString, callback);
    }

    public async openAsync(connectorString: string): Promise<any> {
        let self = this;
        return new Promise<any>((resolve, reject) => {
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
    }

    public close(callback?: (err: Error | null) => void) {
        this.client.close(callback);
    }

    public async closeAsync() : Promise<any> {
        let self = this;
        return new Promise<any>((resolve, reject) => {
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
    }

    //#endregion


    //#region Public Method - Query First Data

    public queryFirst(sqlStatement: string, callback : (this: sqlite3.Statement, err: Error, row: any) => void);
    public queryFirst(sqlStatement: string, params : any, callback : (this: sqlite3.Statement, err: Error, row: any) => void);
    public queryFirst(sqlStatement: string, params : any, callback : (this: sqlite3.Statement, err: Error, row: any) => void, paramPrefix : string);
    public queryFirst(sqlStatement: string, params?: any, callback ?: (this: sqlite3.Statement, err: Error, row: any) => void, paramPrefix ?: string) {
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

    public async queryFirstAsync(sqlStatement: string) : Promise<any>;
    public async queryFirstAsync(sqlStatement: string, params: any) : Promise<any>;
    public async queryFirstAsync(sqlStatement: string, params: any, paramPrefix: string) : Promise<any>;
    public async queryFirstAsync(sqlStatement: string, params?: any, paramPrefix ?: string): Promise<any> {
        let prefix = paramPrefix || SqliteQueryBuilder.DefaultPrefix;
        let sql = sqlStatement;

        if (params) {
            let builder = new SqliteQueryBuilder(sqlStatement, prefix).addParams(params);
            sql = builder.toString();
        }
        this.sqlProfileDelegate(sql);
        return await this.getAsync(sql);
    }

    //#endregion


    //#region Public Method - Query

    public query(sqlStatement: string, callback : (this: sqlite3.Statement, err: Error, rows: any[]) => void);
    public query(sqlStatement: string, params : any, callback : (this: sqlite3.Statement, err: Error, rows: any[]) => void);
    public query(sqlStatement: string, params : any, callback : (this: sqlite3.Statement, err: Error, rows: any[]) => void, paramPrefix : string);
    public query(sqlStatement: string, params?: any, callback ?: (this: sqlite3.Statement, err: Error, rows: any[]) => void, paramPrefix ?: string) {
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

    public async queryAsync(sqlStatement: string) : Promise<any[]>;
    public async queryAsync(sqlStatement: string, params: any) : Promise<any[]>;
    public async queryAsync(sqlStatement: string, params: any, paramPrefix: string) : Promise<any[]>;
    public async queryAsync(sqlStatement: string, params?: any, paramPrefix ?: string): Promise<any[]> {
        let prefix = paramPrefix || SqliteQueryBuilder.DefaultPrefix;
        let sql = sqlStatement;

        if (params) {
            let builder = new SqliteQueryBuilder(sqlStatement, prefix).addParams(params);
            sql = builder.toString();
        }
        this.sqlProfileDelegate(sql);
        return await this.allAsync(sql);
    }

    //#endregion


    //#region Public Method - Execute
    
    public execute(sqlStatement: string, callback : (this: sqlite3.RunResult, err: Error) => void);
    public execute(sqlStatement: string, params: any, callback : (this: sqlite3.RunResult, err: Error) => void);
    public execute(sqlStatement: string, params: any, callback : (this: sqlite3.RunResult, err: Error) => void, paramPrefix: string)
    public execute(sqlStatement: string, params?: any, callback ?: (this: sqlite3.RunResult, err: Error) => void, paramPrefix ?: string) {
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

    public async executeAsync(sqlStatement: string) : Promise<any>;
    public async executeAsync(sqlStatement: string, params: any) : Promise<any>;
    public async executeAsync(sqlStatement: string, params: any, paramPrefix: string) : Promise<any>;
    public async executeAsync(sqlStatement: string, params?: any, paramPrefix ?: string) : Promise<any> {
        let prefix = paramPrefix || SqliteQueryBuilder.DefaultPrefix;
        let sql = sqlStatement;
        
        if (params) {
            let builder = new SqliteQueryBuilder(sqlStatement, prefix).addParams(params);
            sql = builder.toString();
        }
        this.sqlProfileDelegate(sql);
        return await this.runAsync(sql);
    }

    //#endregion
 

    //#region Basic Method

    // Get First
    protected async getAsync(sqlStatement: string, ...params: any[]): Promise<any> {
        let self = this;
        return new Promise<any>((resolve, reject) => {
            if (params && params.length !== 0) {
                self.client.serialize(() => {
                    self.client.get(sqlStatement, params, (error, row)=> {
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
    }

    // Get All
    protected async allAsync(sqlStatement: string, ...params: any[]): Promise<any[]> {
        let self = this;
        return new Promise<any[]>((resolve, reject) => {
            if (params && params.length !== 0) {
                self.client.serialize(() => {
                    self.client.all(sqlStatement, params, (error, rows)=> {
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
    }

    // Run
    protected async runAsync(sqlStatement: string) : Promise<any>;
    protected async runAsync(sqlStatement: string, params: any) : Promise<any>;
    protected async runAsync(sqlStatement: string, params?: any) : Promise<any> {
        let self = this;
        return new Promise<any>((resolve, reject) => {
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
    }

    //#endregion
}

// SQLite SQL Query Builder
export class SqliteQueryBuilder {
    public static DefaultPrefix = '@';
    private _sqlStatement : string;
    private _paramsPrefix : string;

    private _params : { [key: string]: any };

    // sqlStatement - SQL Statement
    // paramsPrefix - Parameter Prefix
    constructor(sqlStatement : string);
    constructor(sqlStatement : string, paramsPrefix : string);
    constructor(sqlStatement : string, paramsPrefix ?: string) {
        this._sqlStatement = sqlStatement;
        this._paramsPrefix = paramsPrefix || SqliteQueryBuilder.DefaultPrefix;
        this._params = {};
    }
    
    // Add Parameter
    public addParam(key: string, value: any) : SqliteQueryBuilder {
        if (key !== undefined && key !== '') {
            this._params[key] = value;
        }
        return this;
    }

    // Add Parameter Object
    public addParams(params: any) : SqliteQueryBuilder {
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
    public clearParams() : SqliteQueryBuilder {
        this._params = {};
        return this;
    }
    
    // Set Parameter Prefix
    public setParamPrefix(prefix: string) : SqliteQueryBuilder {
        this._paramsPrefix = prefix;
        return this;
    }

    // Set SQL Statement
    public setSqlStatement(sqlStatement: string) : SqliteQueryBuilder {
        this._sqlStatement = sqlStatement;
        return this;
    }

    // Get SQL Statement
    public toString() : string {
        let sqlStatement = this._sqlStatement;
        let keys = Object.keys(this._params);

        for (var i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = this._params[key];
            let keyword = `${this._paramsPrefix}${key}`;

            let data = 'NULL'

            if (value !== undefined) {
                
                switch(typeof value) {
                    case 'string':
                        // SQL Injection Protection
                        data = `'${this.replaceAll(value, `'`, `''`)}'`;
                        break;
                    case 'boolean':
                    case 'number':
                        data = `'${String(value)}'`
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
    private replaceAll(text: string, from: string, to: string) : string {
        return text.replace(new RegExp(from, 'g'), to);
    }
}