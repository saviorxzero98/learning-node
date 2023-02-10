export declare class SqliteQueryBuilder {
    private _sqlStatement;
    private _paramsPrefix;
    private _params;
    /**
     * @param sqlStatement  - SQL Statement
     * @param paramsPrefix  - Parameter Prefix (Default is '@')
     */
    constructor(sqlStatement: string, paramsPrefix?: string);
    addParam(key: string, value: any): boolean;
    addParams(params: any): void;
    toString(): string;
    private replaceAll(text, from, to);
}
