export declare class RedisAsyncClient {
    private _client;
    isReady: boolean;
    constructor();
    open(options: any): Promise<any>;
    /**
     * Close Redis
     */
    end(): void;
    /**
     * Select Database
     * @param {string} index
     * @return {string}
     */
    select(index: number): Promise<string>;
    /**
     * Quit
     * @return {string}
     */
    quit(): Promise<string>;
    /**
     * Is Key Exist
     * @param {string} key
     */
    isKeyExist(key: string): Promise<boolean>;
    /**
     * Exists
     * @param {any[]} keys
     * @return {number}
     */
    exists(...keys: string[]): Promise<number>;
    /**
     * Delete Key
     * @param {any[]} keys
     * @return {number}
     */
    del(...keys: string[]): Promise<number>;
    /**
     * Get Keys
     * @param {string} where
     */
    keys(where?: string): Promise<string[]>;
    /**
     * Get Value
     * @param {string} key
     * @return {string}
     */
    get(key: string): Promise<string>;
    /**
     * Set Value
     * @param {string} key
     * @param {string} value
     * @return {string}
     */
    set(key: string, value: string): Promise<string>;
    /**
     * Set Value
     * @param {string} key
     * @param {string} value
     * @param {string} mode
     * @param {number} duration
     * @return {string}
     */
    set(key: string, value: string, mode?: string, duration?: number): Promise<string>;
    /**
     * Get Old Value and Set New Value
     * @param {string} key
     * @param {string} value
     * @return {string}
     */
    getset(key: string, value: string): Promise<string>;
    /**
     * Append Key and Value
     * @param {string} key
     * @param {string} value
     * @return {number}
     */
    append(key: string, value: string): Promise<number>;
    /**
     * Get list length
     * @param {string} key
     * @return {number}
     */
    llen(key: string): Promise<number>;
    /**
     * Get list item by index
     * @param {string} key
     * @param {number} index
     * @return {string}
     */
    lindex(key: string, index: number): Promise<string>;
    /**
     * Get list items by range
     * @param {string} key
     * @param {number} start
     * @param {number} stop
     * @return {string[]}
     */
    lrange(key: string, start: number, stop: number): Promise<string[]>;
    /**
     * Get All items
     * @param {string} key
     * @return {string[]}
     */
    ldump(key: string): Promise<string[]>;
    /**
     * Insert [value] Before [pivot]
     * @param key
     * @param pivot
     * @param value
     * @returns string
     */
    linsertBefore(key: string, pivot: string, value: string): Promise<string>;
    /**
     * Insert [value] After [pivot]
     * @param key
     * @param pivot
     * @param value
     * @returns string
     */
    linsertAfter(key: string, pivot: string, value: string): Promise<string>;
    /**
     * Left push
     * @param {string} key
     * @param {string} value
     * @return {number}
     */
    lpush(key: string, value: string): Promise<number>;
    /**
     * Left pop
     * @param {string} key
     * @return {string}
     */
    lpop(key: string): Promise<string>;
    /**
     * Right push
     * @param {string} key
     * @param {string} value
     * @return {number}
     */
    rpush(key: string, value: string): Promise<number>;
    /**
     * Right pop
     * @param {string} key
     * @return {string}
     */
    rpop(key: string): Promise<string>;
    /**
     * Get Hash
     * @param {string} key
     * @param {string} field
     * @return {string}
     */
    hget(key: string, field: string): Promise<string>;
    /**
     * Get All Hash
     * @param {string} key
     * @return {any}
     */
    hgetall(key: string): Promise<any>;
    /**
     * Get Hash (More)
     * @param {string} key
     * @param {string} fields
     * @return {string[]}
     */
    hmget(key: string, ...fields: string[]): Promise<string[]>;
    /**
     * Set Hash
     * @param {string} key
     * @param {string} field
     * @param {string} value
     * @return {number}
     */
    hset(key: string, field: string, value: string): Promise<number>;
    /**
     * Set Hash (More)
     * @param {string} key
     * @param {any[]} args
     * @return {any}
     */
    hmset(key: string, ...args: any[]): Promise<any>;
    /**
     * Delete Hash Field
     * @param {string} key
     * @param {any[]} fields
     * @return {number}
     */
    hdel(key: string, ...fields: string[]): Promise<number>;
    /**
     * Hash Exists
     * @param {string} key
     * @param {string} field
     * @return {number}
     */
    hexist(key: string, field: string): Promise<number>;
    /**
     * Get All Field Name
     * @param {string} key
     * @return {string[]}
     */
    hkeys(key: string): Promise<string[]>;
    /**
     * Get All Field Value
     * @param {string} key
     * @return {string[]}
     */
    hvals(key: string): Promise<string[]>;
}
