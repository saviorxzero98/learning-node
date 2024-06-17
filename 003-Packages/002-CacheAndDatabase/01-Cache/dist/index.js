"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const memoryCacheManagerService_1 = require("./memoryCacheManagerService");
const nodeCacheService_1 = require("./nodeCacheService");
const sqliteCacheManagerService_1 = require("./sqliteCacheManagerService");
let demoNodeCache = () => __awaiter(void 0, void 0, void 0, function* () {
    const cacheService = nodeCacheService_1.NodeCacheService.getInstance();
    let key = 'keyA';
    let value = '123abc';
    console.log(`[node-cache] Set - Key: ${key}, Value: ${value}`);
    yield cacheService.setAsync(key, value);
    setTimeout(() => {
        let storedValue = cacheService.getAsync(key);
        console.log(`[node-cache] Get - Key: ${key}, Value: ${storedValue}`);
    }, 3000);
});
let demoMemoryCacheManager = () => __awaiter(void 0, void 0, void 0, function* () {
    const cacheService = yield memoryCacheManagerService_1.MemoryCacheManagerService.getInstanceAsync();
    let key = 'keyB';
    let value = '123abc';
    console.log(`[cache-manager (Memory)] Set - Key: ${key}, Value: ${value}`);
    yield cacheService.setAsync(key, value);
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        let storedValue = yield cacheService.getAsync(key);
        console.log(`[cache-manager (Memory)] Get - Key: ${key}, Value: ${storedValue}`);
    }), 3000);
});
let demoSqliteCacheManager = () => __awaiter(void 0, void 0, void 0, function* () {
    const cacheService = yield sqliteCacheManagerService_1.SqliteCacheManagerService.getInstanceAsync();
    let key = 'keyB';
    let value = '123abc';
    console.log(`[cache-manager (SQLite)] Set - Key: ${key}, Value: ${value}`);
    yield cacheService.setAsync(key, value);
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        let storedValue = yield cacheService.getAsync(key);
        console.log(`[cache-manager (SQLite)] Get - Key: ${key}, Value: ${storedValue}`);
    }), 3000);
});
demoNodeCache().then(() => { });
demoMemoryCacheManager().then(() => { });
//demoSqliteCacheManager().then(() => {});
//# sourceMappingURL=index.js.map