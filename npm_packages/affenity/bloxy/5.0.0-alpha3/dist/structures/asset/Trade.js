"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const CollectibleAsset_1 = tslib_1.__importDefault(require("./CollectibleAsset"));
const User_1 = require("../User");
class Trade {
    constructor(data, client) {
        this.client = client;
        this.id = data.id;
        this.sender = new User_1.PartialUser({
            id: data.user.id,
            name: data.user.name
        }, client);
        this.created = new Date(data.created);
        this.active = data.isActive;
        this.status = data.status;
        this.offers = data.offers.map(offerData => ({
            robux: offerData.robux,
            user: new User_1.PartialUser({
                id: offerData.user.id,
                name: offerData.user.name
            }, client),
            assets: offerData.userAssets.map(assetData => new CollectibleAsset_1.default(assetData, client))
        }));
    }
}
exports.default = Trade;
