export interface ICacheService {
    tryGetAsync<T>(key: string, callback: () => Promise<T | undefined>, ttl?: number | undefined): Promise<T | undefined>;
    getAsync<T>(key: string): Promise<T | undefined>;
    setAsync<T>(key: string, value: T, ttl?: number | undefined): any;
    deleteAsync(key: string): any;
}
