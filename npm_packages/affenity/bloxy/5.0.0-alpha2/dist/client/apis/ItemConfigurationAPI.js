"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const BaseAPI_1 = tslib_1.__importDefault(require("./BaseAPI"));
class InventoryAPI extends BaseAPI_1.default {
    constructor(client) {
        super({
            client,
            baseUrl: "https://itemconfiguration.roblox.com/"
        });
    }
    getCreatedAssets(options) {
        return this.request({
            requiresAuth: false,
            request: {
                path: `v1/creations/get-assets`,
                qs: options
            },
            json: true
        }).then(response => response.body);
    }
    getMultiCreatedAssets(options) {
        return this.request({
            requiresAuth: false,
            request: {
                path: `v1/creations/get-asset-details`,
                method: "POST",
                json: options
            },
            json: true
        }).then(response => response.body);
    }
    getItemTagsByItemIds(options) {
        return this.request({
            requiresAuth: false,
            request: {
                path: `v1/item-tags`,
                qs: {
                    itemIds: options.itemIds.join(",")
                }
            },
            json: true
        }).then(response => response.body);
    }
    createItemTag(options) {
        return this.request({
            requiresAuth: false,
            request: {
                path: `v1/item-tags`,
                method: "POST",
                json: options
            },
            json: true
        }).then(response => response.body);
    }
    getItemTagsMetaData() {
        return this.request({
            requiresAuth: false,
            request: {
                path: `v1/item-tags/metadata`
            },
            json: true
        }).then(response => response.body);
    }
    deleteItemTag(options) {
        return this.request({
            requiresAuth: false,
            request: {
                path: `v1/item-tags/${options.itemTagId}`,
                method: "DELETE"
            },
            json: true
        }).then(response => response.body);
    }
    getTagsByTagIds(options) {
        return this.request({
            requiresAuth: false,
            request: {
                path: `v1/tags`,
                qs: {
                    tagIds: options.tagIds.join(",")
                }
            },
            json: true
        }).then(response => response.body);
    }
    searchTags(options) {
        return this.request({
            requiresAuth: false,
            request: {
                path: `v1/tags/prefix-search`,
                qs: options
            },
            json: true
        }).then(response => response.body);
    }
}
exports.default = InventoryAPI;
