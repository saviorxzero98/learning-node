import { MemoryCacheManagerService } from "./memoryCacheManagerService";
import { NodeCacheService } from "./nodeCacheService";
import { SqliteCacheManagerService } from "./sqliteCacheManagerService";

let demoNodeCache = async () => {
    const cacheService = NodeCacheService.getInstance();

    let key = 'keyA';
    let value = '123abc';
    console.log(`[node-cache] Set - Key: ${key}, Value: ${value}`);
    await cacheService.setAsync(key, value);

    setTimeout(() => {
        let storedValue = cacheService.getAsync(key);
        console.log(`[node-cache] Get - Key: ${key}, Value: ${storedValue}`);
    }, 3000);
};
let demoMemoryCacheManager = async () => {
    const cacheService = await MemoryCacheManagerService.getInstanceAsync();

    let key = 'keyB';
    let value = '123abc';
    console.log(`[cache-manager (Memory)] Set - Key: ${key}, Value: ${value}`);
    await cacheService.setAsync(key, value);

    setTimeout(async () => {
        let storedValue = await cacheService.getAsync(key);
        console.log(`[cache-manager (Memory)] Get - Key: ${key}, Value: ${storedValue}`);
    }, 3000);
};
let demoSqliteCacheManager = async () => {
    const cacheService = await SqliteCacheManagerService.getInstanceAsync();

    let key = 'keyB';
    let value = '123abc';
    console.log(`[cache-manager (SQLite)] Set - Key: ${key}, Value: ${value}`);
    await cacheService.setAsync(key, value);

    setTimeout(async () => {
        let storedValue = await cacheService.getAsync(key);
        console.log(`[cache-manager (SQLite)] Get - Key: ${key}, Value: ${storedValue}`);
    }, 3000);
};


demoNodeCache().then(() => {});
demoMemoryCacheManager().then(() => {});
//demoSqliteCacheManager().then(() => {});