import { ICacheService } from "./ICacheService";
export declare class NodeCacheService implements ICacheService {
    private static _instance;
    private _cache;
    constructor();
    static getInstance(): NodeCacheService;
    tryGetAsync<T>(key: string, callback: () => Promise<T | undefined>, ttl?: number | undefined): Promise<T | undefined>;
    getAsync<T>(key: string): Promise<T | undefined>;
    setAsync<T>(key: string, value: T, ttl?: number | undefined): void;
    deleteAsync(key: string): void;
}
