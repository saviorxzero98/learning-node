
require('./EasyJS.js');

exports.SQLiteClient = (function () {

    /**
     * @constructor
     * @property {String}  ConnectionString
     * @param {String} dbPath
     */
    function SQLiteClient(dbPath) {
        this.ConnectionString = (dbPath)? dbPath: ":memory:";
        this._db = this.open(this.ConnectionString);
    }
    /**
     * @param {String} sqlStatement
     */
    SQLiteClient.prototype.executeSQL = function(sqlStatement) {
        this._db.serialize(callback.bind(this));
        this._db.close();

        function callback() {
            this._db.run(sqlStatement);
        }
    }

    /**
     * @param {function} callback
     */
    SQLiteClient.prototype.serializeSQL = function(callback) {
        this._db.serialize(callback.bind(this));
        this.close();
    }

    /**
     * @param {String} connectionString
     */
    SQLiteClient.prototype.open = function(connectionString) {
        var sqlite3 = require('sqlite3').verbose();
        this._db = new sqlite3.Database(connectionString);
        return this._db;
    }

    SQLiteClient.prototype.close = function () {
        this._db.close();
    }

    return SQLiteClient;
})();