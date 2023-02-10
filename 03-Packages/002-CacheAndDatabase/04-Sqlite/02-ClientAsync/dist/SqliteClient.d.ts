import * as sqlite3 from 'sqlite3';
export declare class SqliteClient {
    client: sqlite3.Database;
    isReady: boolean;
    sqlProfileDelegate: (this: SqliteClient, message: string) => void;
    errorDelegate: (this: SqliteClient, error: Error | null) => void;
    constructor();
    open(connectorString: string, callback?: (err: Error | null) => void): void;
    openAsync(connectorString: string): Promise<any>;
    close(callback?: (err: Error | null) => void): void;
    closeAsync(): Promise<any>;
    queryFirst(sqlStatement: string, callback: (this: sqlite3.Statement, err: Error, row: any) => void): any;
    queryFirst(sqlStatement: string, params: any, callback: (this: sqlite3.Statement, err: Error, row: any) => void): any;
    queryFirst(sqlStatement: string, params: any, callback: (this: sqlite3.Statement, err: Error, row: any) => void, paramPrefix: string): any;
    queryFirstAsync(sqlStatement: string): Promise<any>;
    queryFirstAsync(sqlStatement: string, params: any): Promise<any>;
    queryFirstAsync(sqlStatement: string, params: any, paramPrefix: string): Promise<any>;
    query(sqlStatement: string, callback: (this: sqlite3.Statement, err: Error, rows: any[]) => void): any;
    query(sqlStatement: string, params: any, callback: (this: sqlite3.Statement, err: Error, rows: any[]) => void): any;
    query(sqlStatement: string, params: any, callback: (this: sqlite3.Statement, err: Error, rows: any[]) => void, paramPrefix: string): any;
    queryAsync(sqlStatement: string): Promise<any[]>;
    queryAsync(sqlStatement: string, params: any): Promise<any[]>;
    queryAsync(sqlStatement: string, params: any, paramPrefix: string): Promise<any[]>;
    execute(sqlStatement: string, callback: (this: sqlite3.RunResult, err: Error) => void): any;
    execute(sqlStatement: string, params: any, callback: (this: sqlite3.RunResult, err: Error) => void): any;
    execute(sqlStatement: string, params: any, callback: (this: sqlite3.RunResult, err: Error) => void, paramPrefix: string): any;
    executeAsync(sqlStatement: string): Promise<any>;
    executeAsync(sqlStatement: string, params: any): Promise<any>;
    executeAsync(sqlStatement: string, params: any, paramPrefix: string): Promise<any>;
    protected getAsync(sqlStatement: string, ...params: any[]): Promise<any>;
    protected allAsync(sqlStatement: string, ...params: any[]): Promise<any[]>;
    protected runAsync(sqlStatement: string): Promise<any>;
    protected runAsync(sqlStatement: string, params: any): Promise<any>;
}
export declare class SqliteQueryBuilder {
    static DefaultPrefix: string;
    private _sqlStatement;
    private _paramsPrefix;
    private _params;
    constructor(sqlStatement: string);
    constructor(sqlStatement: string, paramsPrefix: string);
    addParam(key: string, value: any): SqliteQueryBuilder;
    addParams(params: any): SqliteQueryBuilder;
    clearParams(): SqliteQueryBuilder;
    setParamPrefix(prefix: string): SqliteQueryBuilder;
    setSqlStatement(sqlStatement: string): SqliteQueryBuilder;
    toString(): string;
    private replaceAll(text, from, to);
}
