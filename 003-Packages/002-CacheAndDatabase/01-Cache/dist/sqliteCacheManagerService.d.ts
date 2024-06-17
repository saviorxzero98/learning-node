import { Cache } from 'cache-manager';
import { ICacheService } from './ICacheService';
export declare class SqliteCacheManagerService implements ICacheService {
    private static _instance;
    private _cache;
    constructor(cache: Cache<any>);
    static getInstanceAsync(path?: string, tableName?: string): Promise<SqliteCacheManagerService>;
    tryGetAsync<T>(key: string, callback: () => Promise<T | undefined>, ttl?: number | undefined): Promise<T | undefined>;
    getAsync<T>(key: string): Promise<T | undefined>;
    setAsync<T>(key: string, value: T, ttl?: number | undefined): Promise<void>;
    deleteAsync(key: string): Promise<void>;
}
