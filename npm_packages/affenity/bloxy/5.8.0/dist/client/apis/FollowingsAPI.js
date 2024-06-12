"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const BaseAPI_1 = tslib_1.__importDefault(require("./BaseAPI"));
class FollowingsAPI extends BaseAPI_1.default {
    constructor(client) {
        super({
            client,
            baseUrl: "https://followings.roblox.com/"
        });
    }
    getUserFollowedUniverses(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/users/${options.userId}/universes`
            },
            json: true
        })
            .then(response => response.body);
    }
    getUserFollowingUniverseStatus(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/users/${options.userId}/universes/${options.universeId}/status`
            },
            json: true
        })
            .then(response => response.body);
    }
    unFollowUniverse(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/users/${options.userId}/universes/${options.universeId}`,
                method: "DELETE"
            },
            json: true
        })
            .then(response => response.body);
    }
    followUniverse(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/users/${options.userId}/universes/${options.universeId}`,
                method: "POST"
            },
            json: true
        })
            .then(response => response.body);
    }
}
exports.default = FollowingsAPI;
