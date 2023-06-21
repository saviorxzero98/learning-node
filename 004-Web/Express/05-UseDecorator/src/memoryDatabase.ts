import * as loki from 'lokijs';

export class InMemoryDatabase {
    private static instance: InMemoryDatabase;
    public storage: loki;

    private constructor(storage: loki) {
        this.storage = storage;
    }

    public static initialize(storage: loki) {
        this.instance = new InMemoryDatabase(storage);
    }

    public static getInstance(): InMemoryDatabase {
        return this.instance;
    }

    public getCollection(collectionName: string) {
        let collection = this.storage.getCollection(collectionName);

        if (collection === null) {
            collection = this.storage.addCollection(collectionName);
        }
        return collection;
    }
}