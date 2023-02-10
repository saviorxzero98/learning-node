import * as redis from 'redis';

export class RedisAsyncClient {
    private _client : redis.RedisClient;
    public isReady : boolean;

    constructor() {
        this.isReady = false;
    }

    //#region Connection

    public async open(options: any) : Promise<any> {
        var self = this;
        return new Promise<any>((resolve, reject) => {
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
    }


    /**
     * Close Redis
     */
    public end()  {
        this._client.end(true);
    }

    /**
     * Select Database
     * @param {string} index 
     * @return {string}
     */
    public async select(index: number) : Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._client.select(index, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    }
    
    /**
     * Quit
     * @return {string}
     */
    public async quit() : Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._client.quit((error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    }

    //#endregion


    //#region Key

    /**
     * Is Key Exist
     * @param {string} key 
     */
    public async isKeyExist(key: string) : Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this._client.exists(key, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve((reply > 0));
                }
            });
        });
    }

    /**
     * Exists
     * @param {any[]} keys 
     * @return {number}
     */
    public async exists(...keys: string[]) : Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this._client.exists(...keys, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    }

    /**
     * Delete Key
     * @param {any[]} keys 
     * @return {number}
     */
    public async del(...keys: string[]) : Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this._client.del(...keys, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    }

    /**
     * Get Keys
     * @param {string} where 
     */
    public async keys(where: string = '*') : Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            this._client.keys(where, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
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
    public async get(key: string) : Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._client.get(key, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    }

    /**
     * Set Value
     * @param {string} key 
     * @param {string} value 
     * @return {string}
     */
    public async set(key: string, value: string) : Promise<string>;
    /**
     * Set Value
     * @param {string} key 
     * @param {string} value 
     * @param {string} mode 
     * @param {number} duration
     * @return {string}
     */
    public async set(key: string, value: string, mode?: string, duration?: number) : Promise<string>;
    /**
     * Set Value
     * @param {string} key 
     * @param {string} value 
     * @param {string} mode 
     * @param {number} duration
     * @return {string}
     */
    public async set(key: string, value: string, mode?: string, duration?: number) : Promise<string> {
        return new Promise<string>((resolve, reject) => {
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
    }

    /**
     * Get Old Value and Set New Value
     * @param {string} key 
     * @param {string} value 
     * @return {string}
     */
    public async getset(key: string, value: string) : Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._client.getset(key, value, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    }

    /**
     * Append Key and Value
     * @param {string} key 
     * @param {string} value 
     * @return {number}
     */
    public async append(key: string, value: string) : Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this._client.append(key, value, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
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
    public async llen(key: string) : Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this._client.llen(key, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    }

    /**
     * Get list item by index
     * @param {string} key 
     * @param {number} index 
     * @return {string}
     */
    public async lindex(key: string, index: number) : Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._client.lindex(key, index, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
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
    public async lrange(key: string, start: number, stop: number) : Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            this._client.lrange(key, start, stop, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    }

    /**
     * Get All items
     * @param {string} key 
     * @return {string[]}
     */
    public async ldump(key: string) : Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            this._client.lrange(key, 0, -1, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
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
    public async linsertBefore(key: string, pivot: string, value: string) : Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._client.linsert(key, 'BEFORE', pivot, value, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
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
    public async linsertAfter(key: string, pivot: string, value: string) : Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._client.linsert(key, 'AFTER', pivot, value, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    }


    /**
     * Left push
     * @param {string} key 
     * @param {string} value 
     * @return {number}
     */
    public async lpush(key: string, value: string) : Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this._client.lpush(key, value, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    }

    /**
     * Left pop
     * @param {string} key 
     * @return {string}
     */
    public async lpop(key: string) : Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._client.lpop(key, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    }

    /**
     * Right push
     * @param {string} key 
     * @param {string} value 
     * @return {number}
     */
    public async rpush(key: string, value: string) : Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this._client.rpush(key, value, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    }

    /**
     * Right pop
     * @param {string} key 
     * @return {string}
     */
    public async rpop(key: string) : Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._client.rpop(key, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
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
    public async hget(key: string, field: string) : Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this._client.hget(key, field, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    }

    /**
     * Get All Hash
     * @param {string} key 
     * @return {any}
     */
    public async hgetall(key: string) : Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this._client.hgetall(key, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    }

    /**
     * Get Hash (More)
     * @param {string} key 
     * @param {string} fields 
     * @return {string[]}
     */
    public async hmget(key: string, ...fields: string[]) : Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            this._client.hmget(key, ...fields, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
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
    public async hset(key: string, field: string, value: string) : Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this._client.hset(key, field, value, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    }

    /**
     * Set Hash (More)
     * @param {string} key 
     * @param {any[]} args 
     * @return {any}
     */
    public async hmset(key: string, ...args: any[]) : Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this._client.hmset(key, ...args, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    }

    /**
     * Delete Hash Field
     * @param {string} key 
     * @param {any[]} fields 
     * @return {number}
     */
    public async hdel(key: string, ...fields: string[]) : Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this._client.hdel(key, ...fields, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    }

    /**
     * Hash Exists
     * @param {string} key 
     * @param {string} field 
     * @return {number}
     */
    public async hexist(key: string, field: string) : Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this._client.hexists(key, field, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    }

    /**
     * Get All Field Name
     * @param {string} key 
     * @return {string[]}
     */
    public async hkeys(key: string) : Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            this._client.hkeys(key, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    }

    /**
     * Get All Field Value
     * @param {string} key 
     * @return {string[]}
     */
    public async hvals(key: string) : Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            this._client.hvals(key, (error, reply) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(reply);
                }
            });
        });
    }

    //#endregion
}