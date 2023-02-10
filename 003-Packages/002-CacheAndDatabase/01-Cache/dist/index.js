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
const cacheManagerService_1 = require("./cacheManagerService");
const nodeCacheService_1 = require("./nodeCacheService");
let demoNodeCache = () => __awaiter(void 0, void 0, void 0, function* () {
    const cacheService = nodeCacheService_1.NodeCacheService.getInstance();
    let key = 'keyA';
    let value = '123abc';
    console.log(`[node-cache] Set - Key: ${key}, Value: ${value}`);
    cacheService.set(key, value);
    setTimeout(() => {
        let storedValue = cacheService.get(key);
        console.log(`[node-cache] Get - Key: ${key}, Value: ${storedValue}`);
    }, 3000);
});
let demoCacheManager = () => __awaiter(void 0, void 0, void 0, function* () {
    const cacheService = yield cacheManagerService_1.CacheManagerService.getInstanceAsync();
    let key = 'keyB';
    let value = '123abc';
    console.log(`[cache-manager] Set - Key: ${key}, Value: ${value}`);
    yield cacheService.setAsync(key, value);
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        let storedValue = yield cacheService.getAsync(key);
        console.log(`[cache-manager] Get - Key: ${key}, Value: ${storedValue}`);
    }), 3000);
});
demoNodeCache().then(() => { });
demoCacheManager().then(() => { });
//# sourceMappingURL=index.js.map