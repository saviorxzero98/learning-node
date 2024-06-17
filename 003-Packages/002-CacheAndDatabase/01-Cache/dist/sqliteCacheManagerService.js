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
exports.SqliteCacheManagerService = void 0;
const cache_manager_1 = require("cache-manager");
const cache_manager_sqlite_1 = require("cache-manager-sqlite");
class SqliteCacheManagerService {
    constructor(cache) {
        this._cache = cache;
    }
    static getInstanceAsync(path = '', tableName = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._instance == undefined) {
                let store;
                if (path) {
                    store = {
                        store: cache_manager_sqlite_1.default,
                        name: tableName !== null && tableName !== void 0 ? tableName : 'cache',
                        path: path,
                        options: {
                            serializer: 'json'
                        }
                    };
                }
                else {
                    store = {
                        store: cache_manager_sqlite_1.default,
                        options: {
                            serializer: 'json'
                        }
                    };
                }
                let cache = yield (0, cache_manager_1.caching)(store);
                this._instance = new SqliteCacheManagerService(cache);
            }
            return this._instance;
        });
    }
    tryGetAsync(key, callback, ttl) {
        return __awaiter(this, void 0, void 0, function* () {
            let value = yield this._cache.get(key);
            if (value) {
                return value;
            }
            else {
                if (callback) {
                    value = yield callback();
                    yield this.setAsync(key, value, ttl);
                }
                return value;
            }
        });
    }
    getAsync(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._cache.get(key);
        });
    }
    setAsync(key, value, ttl) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ttl) {
                yield this._cache.set(key, value, ttl);
            }
            else {
                yield this._cache.set(key, value, 10000);
            }
        });
    }
    deleteAsync(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._cache.del(key);
        });
    }
}
exports.SqliteCacheManagerService = SqliteCacheManagerService;
//# sourceMappingURL=sqliteCacheManagerService.js.map