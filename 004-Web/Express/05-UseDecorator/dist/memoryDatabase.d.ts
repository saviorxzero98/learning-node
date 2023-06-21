import * as loki from 'lokijs';
export declare class InMemoryDatabase {
    private static instance;
    storage: loki;
    private constructor();
    static initialize(storage: loki): void;
    static getInstance(): InMemoryDatabase;
    getCollection(collectionName: string): Collection<any>;
}
