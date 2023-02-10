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
const redis = require("redis");
class RedisAsyncClient {
    constructor() {
        this.isReady = false;
    }
    //#region Connection
    open(options) {
        return __awaiter(this, void 0, void 0, function* () {
            var self = this;
            return new Promise((resolve, reject) => {
                self._client = redis.createClient(options);
                self._client.on('error', (error) => {
                    self.isReady = false;
                    reject(error);
                });
                self._client.on('ready', () => {
                    self.isReady = true;
                    resolve(`ready`);
                });
            });
        });
    }
    /**
     * Close Redis
     */
    end() {
        this._client.end(true);
    }
    /**
     * Select Database
     * @param {string} index
     * @return {string}
     */
    select(index) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.select(index, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Quit
     * @return {string}
     */
    quit() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.quit((error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    //#endregion
    //#region Key
    /**
     * Is Key Exist
     * @param {string} key
     */
    isKeyExist(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.exists(key, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve((reply > 0));
                    }
                });
            });
        });
    }
    /**
     * Exists
     * @param {any[]} keys
     * @return {number}
     */
    exists(...keys) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.exists(...keys, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Delete Key
     * @param {any[]} keys
     * @return {number}
     */
    del(...keys) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.del(...keys, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Get Keys
     * @param {string} where
     */
    keys(where = '*') {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.keys(where, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    //#endregion
    //#region String
    /**
     * Get Value
     * @param {string} key
     * @return {string}
     */
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.get(key, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Set Value
     * @param {string} key
     * @param {string} value
     * @param {string} mode
     * @param {number} duration
     * @return {string}
     */
    set(key, value, mode, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (mode && duration) {
                    this._client.set(key, value, mode, duration, (error, reply) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(reply);
                        }
                    });
                }
                else {
                    this._client.set(key, value, (error, reply) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(reply);
                        }
                    });
                }
            });
        });
    }
    /**
     * Get Old Value and Set New Value
     * @param {string} key
     * @param {string} value
     * @return {string}
     */
    getset(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.getset(key, value, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Append Key and Value
     * @param {string} key
     * @param {string} value
     * @return {number}
     */
    append(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.append(key, value, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    //#endregion
    //#region List
    /**
     * Get list length
     * @param {string} key
     * @return {number}
     */
    llen(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.llen(key, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Get list item by index
     * @param {string} key
     * @param {number} index
     * @return {string}
     */
    lindex(key, index) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.lindex(key, index, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Get list items by range
     * @param {string} key
     * @param {number} start
     * @param {number} stop
     * @return {string[]}
     */
    lrange(key, start, stop) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.lrange(key, start, stop, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Get All items
     * @param {string} key
     * @return {string[]}
     */
    ldump(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.lrange(key, 0, -1, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Insert [value] Before [pivot]
     * @param key
     * @param pivot
     * @param value
     * @returns string
     */
    linsertBefore(key, pivot, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.linsert(key, 'BEFORE', pivot, value, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Insert [value] After [pivot]
     * @param key
     * @param pivot
     * @param value
     * @returns string
     */
    linsertAfter(key, pivot, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.linsert(key, 'AFTER', pivot, value, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Left push
     * @param {string} key
     * @param {string} value
     * @return {number}
     */
    lpush(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.lpush(key, value, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Left pop
     * @param {string} key
     * @return {string}
     */
    lpop(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.lpop(key, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Right push
     * @param {string} key
     * @param {string} value
     * @return {number}
     */
    rpush(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.rpush(key, value, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Right pop
     * @param {string} key
     * @return {string}
     */
    rpop(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.rpop(key, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    //#endregion
    //#region HASH
    /**
     * Get Hash
     * @param {string} key
     * @param {string} field
     * @return {string}
     */
    hget(key, field) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.hget(key, field, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Get All Hash
     * @param {string} key
     * @return {any}
     */
    hgetall(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.hgetall(key, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Get Hash (More)
     * @param {string} key
     * @param {string} fields
     * @return {string[]}
     */
    hmget(key, ...fields) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.hmget(key, ...fields, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Set Hash
     * @param {string} key
     * @param {string} field
     * @param {string} value
     * @return {number}
     */
    hset(key, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.hset(key, field, value, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Set Hash (More)
     * @param {string} key
     * @param {any[]} args
     * @return {any}
     */
    hmset(key, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.hmset(key, ...args, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Delete Hash Field
     * @param {string} key
     * @param {any[]} fields
     * @return {number}
     */
    hdel(key, ...fields) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.hdel(key, ...fields, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Hash Exists
     * @param {string} key
     * @param {string} field
     * @return {number}
     */
    hexist(key, field) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.hexists(key, field, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Get All Field Name
     * @param {string} key
     * @return {string[]}
     */
    hkeys(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.hkeys(key, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
    /**
     * Get All Field Value
     * @param {string} key
     * @return {string[]}
     */
    hvals(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._client.hvals(key, (error, reply) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                });
            });
        });
    }
}
exports.RedisAsyncClient = RedisAsyncClient;
//# sourceMappingURL=RedisAsyncClient.js.map