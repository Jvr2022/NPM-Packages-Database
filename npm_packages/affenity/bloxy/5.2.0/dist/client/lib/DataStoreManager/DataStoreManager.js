"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const OrderedDataStore_1 = tslib_1.__importDefault(require("./structures/OrderedDataStore"));
const GlobalDataStore_1 = tslib_1.__importDefault(require("./structures/GlobalDataStore"));
class DataStoreManager {
    constructor(client) {
        this.client = client;
    }
    getOrderedDataStore(placeId, name, scope) {
        if (!this.client.isLoggedIn()) {
            throw new Error(`You must be logged in to be able to use data stores!`);
        }
        return new OrderedDataStore_1.default(this, placeId, name, scope, false);
    }
    getDataStore(placeId, name, scope) {
        if (!this.client.isLoggedIn()) {
            throw new Error(`You must be logged in to be able to use data stores!`);
        }
        return new GlobalDataStore_1.default(this, placeId, name, scope, false);
    }
}
exports.default = DataStoreManager;
