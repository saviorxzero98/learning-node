import { caching, MemoryCache } from 'cache-manager';
import { ICacheService } from './ICacheService';

export class MemoryCacheManagerService implements ICacheService {
    private static _instance: MemoryCacheManagerService;
    private _cache: MemoryCache;

    constructor (cache: MemoryCache) {
        this._cache = cache;
    }

    public static async getInstanceAsync() {
        if (this._instance == undefined) {
            const memoryCache = await caching('memory');
            this._instance = new MemoryCacheManagerService(memoryCache);
        }
        return this._instance;
    }

    public async tryGetAsync<T>(key: string, callback: () => Promise<T | undefined>, 
                                ttl ?: number | undefined): Promise<T | undefined> {
        let value = await this._cache.get<T>(key);
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

    public async getAsync<T>(key: string): Promise<T | undefined> {
        return await this._cache.get<T>(key);
    }

    public async setAsync<T>(key: string, value: T, ttl ?: number | undefined) {
        if (ttl) {
            await this._cache.set(key, value, ttl);
        }
        else {
            await this._cache.set(key, value);
        }
    }
    public async deleteAsync(key: string) {
        await this._cache.del(key);
    }
}

