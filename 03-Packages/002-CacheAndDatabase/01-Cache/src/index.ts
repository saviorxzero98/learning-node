import { CacheManagerService } from "./cacheManagerService";
import { NodeCacheService } from "./nodeCacheService";

let demoNodeCache = async () => {
    const cacheService = NodeCacheService.getInstance();

    let key = 'keyA';
    let value = '123abc';
    console.log(`[node-cache] Set - Key: ${key}, Value: ${value}`);
    cacheService.set(key, value);

    setTimeout(() => {
        let storedValue = cacheService.get(key);
        console.log(`[node-cache] Get - Key: ${key}, Value: ${storedValue}`);
    }, 3000);
};
let demoCacheManager = async () => {
    const cacheService = await CacheManagerService.getInstanceAsync();

    let key = 'keyB';
    let value = '123abc';
    console.log(`[cache-manager] Set - Key: ${key}, Value: ${value}`);
    await cacheService.setAsync(key, value);

    setTimeout(async () => {
        let storedValue = await cacheService.getAsync(key);
        console.log(`[cache-manager] Get - Key: ${key}, Value: ${storedValue}`);
    }, 3000);
};


demoNodeCache().then(() => {});
demoCacheManager().then(() => {});