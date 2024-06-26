"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const BaseAPI_1 = tslib_1.__importDefault(require("./BaseAPI"));
class CaptchaAPI extends BaseAPI_1.default {
    constructor(client) {
        super({
            client,
            baseUrl: "https://captcha.roblox.com/"
        });
    }
    getCaptchaMetaData() {
        return this.request({
            requiresAuth: false,
            request: {
                path: `v1/captcha/metadata`,
                responseOptions: {
                    allowedStatusCodes: [200]
                }
            },
            json: true
        })
            .then(response => response.body);
    }
    getLanguageResources() {
        return this.request({
            requiresAuth: false,
            request: {
                path: `v1/language-resources`,
                responseOptions: {
                    allowedStatusCodes: [200]
                }
            },
            json: true
        })
            .then(response => response.body);
    }
}
exports.default = CaptchaAPI;
