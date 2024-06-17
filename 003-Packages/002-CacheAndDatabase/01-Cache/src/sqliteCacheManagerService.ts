import { caching, Cache } from 'cache-manager';
import sqliteStore  from 'cache-manager-sqlite';
import { ICacheService } from './ICacheService';

export class SqliteCacheManagerService implements ICacheService {
    private static _instance: SqliteCacheManagerService;
    private _cache: Cache<any>;

    constructor (cache: Cache<any>) {
        this._cache = cache;
    }

    public static async getInstanceAsync(path: string = '', tableName: string = '') {
        if (this._instance == undefined) {
            let store;
            if (path) {
                store = {
                    store: sqliteStore,
                    name: tableName ?? 'cache',
                    path: path,
                    options: {
                        serializer: 'json'
                    }
                };
            }
            else {
                store = {
                    store: sqliteStore,
                    options: {
                        serializer: 'json'
                    }
                };
            }

            let cache = await caching(store);
            this._instance = new SqliteCacheManagerService(cache);
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
