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
exports.NodeCacheService = void 0;
const NodeCache = require("node-cache");
class NodeCacheService {
    constructor() {
        this._cache = new NodeCache();
    }
    static getInstance() {
        if (this._instance == undefined) {
            this._instance = new NodeCacheService();
        }
        return this._instance;
    }
    tryGetAsync(key, callback, ttl) {
        return __awaiter(this, void 0, void 0, function* () {
            let value = this._cache.get(key);
            if (value) {
                return value;
            }
            else {
                if (callback) {
                    value = yield callback();
                    this.set(key, value, ttl);
                }
                return value;
            }
        });
    }
    get(key) {
        return this._cache.get(key);
    }
    set(key, value, ttl) {
        if (ttl) {
            this._cache.set(key, value, ttl);
        }
        else {
            this._cache.set(key, value);
        }
    }
    delete(key) {
        this._cache.del(key);
    }
}
exports.NodeCacheService = NodeCacheService;
//# sourceMappingURL=nodeCacheService.js.map