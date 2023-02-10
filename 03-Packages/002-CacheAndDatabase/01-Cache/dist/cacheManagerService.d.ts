import { MemoryCache } from 'cache-manager';
export declare class CacheManagerService {
    private static _instance;
    private _cache;
    constructor(cache: MemoryCache);
    static getInstanceAsync(): Promise<CacheManagerService>;
    tryGetAsync<T>(key: string, callback: () => Promise<T | undefined>, ttl?: number | undefined): Promise<T | undefined>;
    getAsync<T>(key: string): Promise<T | undefined>;
    setAsync<T>(key: string, value: T, ttl?: number | undefined): Promise<void>;
    deleteAsync(key: string): Promise<void>;
}
