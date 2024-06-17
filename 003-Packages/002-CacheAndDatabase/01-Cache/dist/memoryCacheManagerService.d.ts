import { MemoryCache } from 'cache-manager';
import { ICacheService } from './ICacheService';
export declare class MemoryCacheManagerService implements ICacheService {
    private static _instance;
    private _cache;
    constructor(cache: MemoryCache);
    static getInstanceAsync(): Promise<MemoryCacheManagerService>;
    tryGetAsync<T>(key: string, callback: () => Promise<T | undefined>, ttl?: number | undefined): Promise<T | undefined>;
    getAsync<T>(key: string): Promise<T | undefined>;
    setAsync<T>(key: string, value: T, ttl?: number | undefined): Promise<void>;
    deleteAsync(key: string): Promise<void>;
}
