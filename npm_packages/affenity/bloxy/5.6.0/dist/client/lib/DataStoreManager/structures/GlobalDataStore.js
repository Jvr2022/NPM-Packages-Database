"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const GenericDataStore_1 = tslib_1.__importDefault(require("./GenericDataStore"));
class GlobalDataStore extends GenericDataStore_1.default {
    constructor(manager, placeId, name, scope, legacy) {
        super(manager, "GlobalDataStore", placeId, name, scope || null, legacy || false);
    }
}
exports.default = GlobalDataStore;
