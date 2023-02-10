export declare class NodeCacheService {
    private static _instance;
    private _cache;
    constructor();
    static getInstance(): NodeCacheService;
    tryGetAsync<T>(key: string, callback: () => Promise<T | undefined>, ttl?: number | string | undefined): Promise<T | undefined>;
    get<T>(key: string): T | undefined;
    set<T>(key: string, value: T, ttl?: number | string | undefined): void;
    delete(key: string): void;
}
