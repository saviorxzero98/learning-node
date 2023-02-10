"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SqliteQueryBuilder {
    /**
     * @param sqlStatement  - SQL Statement
     * @param paramsPrefix  - Parameter Prefix (Default is '@')
     */
    constructor(sqlStatement, paramsPrefix = '@') {
        this._sqlStatement = sqlStatement;
        this._paramsPrefix = paramsPrefix;
        this._params = {};
    }
    // Add Parameter
    addParam(key, value) {
        if (key !== undefined && key !== '') {
            this._params[key] = value;
        }
        return false;
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
            sqlStatement = this.replaceAll(sqlStatement, keyword, data);
        }
        return sqlStatement;
    }
    // Replace All
    replaceAll(text, from, to) {
        return text.replace(new RegExp(from, 'g'), to);
    }
}
exports.SqliteQueryBuilder = SqliteQueryBuilder;
//# sourceMappingURL=sqlQueryBuilder.js.map