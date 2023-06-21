"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDatabase = void 0;
class InMemoryDatabase {
    constructor(storage) {
        this.storage = storage;
    }
    static initialize(storage) {
        this.instance = new InMemoryDatabase(storage);
    }
    static getInstance() {
        return this.instance;
    }
    getCollection(collectionName) {
        let collection = this.storage.getCollection(collectionName);
        if (collection === null) {
            collection = this.storage.addCollection(collectionName);
        }
        return collection;
    }
}
exports.InMemoryDatabase = InMemoryDatabase;
//# sourceMappingURL=memoryDatabase.js.map