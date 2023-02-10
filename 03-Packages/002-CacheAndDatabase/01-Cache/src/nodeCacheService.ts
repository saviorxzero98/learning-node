import * as NodeCache from "node-cache";

export class NodeCacheService {
    private static _instance: NodeCacheService;
    private _cache: NodeCache;

    constructor() {
        this._cache = new NodeCache();
    }

    public static getInstance() {
        if (this._instance == undefined) {
            this._instance = new NodeCacheService();
        }
        return this._instance;
    }

    public async tryGetAsync<T>(key: string, callback: () => Promise<T | undefined>, 
                           ttl ?: number | string | undefined): Promise<T | undefined> {
        let value = this._cache.get<T>(key);
        if (value) {
            return value;
        }
        else {
            if (callback) {
                value = await callback();

                this.set(key, value, ttl);
            }
            return value;
        }
    }

    public get<T>(key: string): T | undefined {
        return this._cache.get<T>(key);
    }

    public set<T>(key: string, value: T, ttl ?: number | string | undefined) {
        if (ttl) {
            this._cache.set(key, value, ttl);
        }
        else {
            this._cache.set(key, value);
        }
    }

    public delete(key: string) {
        this._cache.del(key);
    }
}

