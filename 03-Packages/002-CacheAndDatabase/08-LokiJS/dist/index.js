"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loki = require("lokijs");
function getCollection(db, name) {
    let collection = db.getCollection(name);
    if (collection === null) {
        collection = db.addCollection(name);
    }
    return collection;
}
// File
let fileDb = new loki('sample.db', {
    autoload: true,
    autosave: true,
    autosaveInterval: 4000,
    persistenceMethod: 'fs'
});
// In-Memory
let memoryDb = new loki('memory.db', {
    persistenceMethod: 'memory'
});
// Query
let users = getCollection(fileDb, 'user');
users.insert({ name: 'odin', age: 50 });
users.insert({ name: 'thor', age: 35 });
let result = users.find({ age: { $lte: 35 } });
console.log(result);
//# sourceMappingURL=index.js.map