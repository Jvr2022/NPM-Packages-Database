"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const BaseAPI_1 = tslib_1.__importDefault(require("./BaseAPI"));
class DataAPI extends BaseAPI_1.default {
    constructor(client) {
        super({
            client,
            baseUrl: "https://data.roblox.com/"
        });
    }
    uploadData(options) {
        return this.request({
            requiresAuth: true,
            json: true,
            request: {
                path: `Data/Upload.ashx?assetid=${options.assetId}`,
                method: "POST",
                headers: {
                    "User-Agent": "Roblox/WinInet",
                    Requester: "Client",
                    "Content-Type": "application/xml",
                    Accept: "application/json"
                }
            }
        })
            .then(response => response.body);
    }
}
exports.default = DataAPI;
