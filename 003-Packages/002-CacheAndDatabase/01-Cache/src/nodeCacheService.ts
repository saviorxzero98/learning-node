import * as NodeCache from "node-cache";
import { ICacheService } from "./ICacheService";

export class NodeCacheService implements ICacheService {
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
                           ttl ?: number | undefined): Promise<T | undefined> {
        let value = this._cache.get<T>(key);
        if (value) {
            return value;
        }
        else {
            if (callback) {
                value = await callback();

                await this.setAsync(key, value, ttl);
            }
            return value;
        }
    }

    public getAsync<T>(key: string): Promise<T | undefined> {
        let self = this;

        return new Promise<T | undefined>((resolve) => {
            resolve(self._cache.get<T>(key));
        })
    }

    public setAsync<T>(key: string, value: T, ttl ?: number | undefined) {
        if (ttl) {
            this._cache.set(key, value, ttl);
        }
        else {
            this._cache.set(key, value);
        }
    }

    public deleteAsync(key: string) {
        this._cache.del(key);
    }
}

