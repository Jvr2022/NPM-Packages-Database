"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../User");
const Group_1 = require("../Group");
const constants_1 = require("../../util/constants");
class Bundle {
    constructor(data, client) {
        this.client = client;
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.bundleType = data.bundleType;
        this.items = data.items.map(itemData => ({
            owned: itemData.owned,
            id: itemData.id,
            name: itemData.name,
            type: itemData.type
        }));
        this.creatorType = data.creator.type.toLowerCase() === "group" ? constants_1.CreatorType.GROUP : constants_1.CreatorType.USER;
        this.creator = this.creatorType === constants_1.CreatorType.USER ? new User_1.PartialUser({
            id: data.creator.id,
            name: data.creator.name
        }, client) : new Group_1.PartialGroup({
            id: data.creator.id,
            name: data.creator.name
        }, client);
        this.product = {
            id: data.product.id,
            type: data.product.type,
            publicDomain: data.product.isPublicDomain,
            forSale: data.product.isForSale,
            price: data.product.priceInRobux,
            premiumPricing: {
                discount: data.product.premiumPricing.premiumDiscountPercentage,
                price: data.product.premiumPricing.premiumPriceInRobux
            }
        };
    }
}
exports.default = Bundle;
