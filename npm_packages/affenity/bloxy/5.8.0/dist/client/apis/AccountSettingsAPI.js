"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const BaseAPI_1 = tslib_1.__importDefault(require("./BaseAPI"));
class AccountSettingsAPI extends BaseAPI_1.default {
    constructor(client) {
        super({
            baseUrl: "https://accountsettings.roblox.com/",
            client
        });
    }
    getSettingsGroups() {
        return this.request({
            requiresAuth: false,
            request: {
                path: "v1/account/settings/settings-groups"
            },
            json: true
        })
            .then(response => response.body.map((val) => ({
            title: val.Title,
            url: val.Url,
            suffix: val.Suffix
        })));
    }
    getAppChatPrivacy() {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/app-chat-privacy"
            },
            json: true
        })
            .then(response => response.body);
    }
    updateAppChatPrivacy(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/app-chat-privacy",
                method: "POST",
                json: options
            },
            json: true
        })
            .then(response => response.body);
    }
    getGameChatPrivacy() {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/game-chat-privacy"
            },
            json: true
        })
            .then(response => response.body);
    }
    updateGameChatPrivacy(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/game-chat-privacy",
                method: "POST",
                json: options
            },
            json: true
        })
            .then(response => response.body);
    }
    getInventoryPrivacy() {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/inventory-privacy"
            },
            json: true
        })
            .then(response => response.body);
    }
    updateInventoryPrivacy(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/inventory-privacy",
                method: "POST",
                json: options
            },
            json: true
        })
            .then(response => response.body);
    }
    getUserPrivacy() {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/privacy"
            },
            json: true
        })
            .then(response => response.body);
    }
    updateUserPrivacy(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/privacy",
                method: "PATCH",
                json: options
            },
            json: true
        })
            .then(response => response.body);
    }
    getUserPrivacySettingsInfo() {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/privacy/info"
            },
            json: true
        })
            .then(response => response.body);
    }
    getUserPrivateMessagePrivacy() {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/private-message-privacy"
            },
            json: true
        })
            .then(response => response.body);
    }
    updateUserPrivateMessagePrivacy(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/private-message-privacy",
                method: "POST",
                json: options
            },
            json: true
        })
            .then(() => true);
    }
    getUserEmailStatus() {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/email"
            },
            json: true
        })
            .then(response => response.body);
    }
    updateUserEmail(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/email",
                method: "PATCH",
                json: options
            },
            json: true
        })
            .then(() => true);
    }
    sendEmailVerification() {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/email/verify",
                method: "POST"
            },
            json: true
        })
            .then(() => true);
    }
    getWebsiteTheme() {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/themes/User/${this.client.user.id}`
            },
            json: true
        })
            .then(response => response.body);
    }
    updateWebsiteTheme(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/themes/User/${this.client.user.id}`,
                method: "PATCH",
                json: {
                    themeType: options.themeType
                }
            },
            json: true
        })
            .then(() => true);
    }
    getWebsiteThemes() {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/themes/types"
            },
            json: true
        })
            .then(response => response.body);
    }
    getUserTradePrivacy() {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/trade-privacy"
            },
            json: true
        })
            .then(response => response.body);
    }
    updateUserTradePrivacy(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/trade-privacy",
                method: "POST",
                json: options
            },
            json: true
        })
            .then(response => response.body);
    }
    getUserTradeQualityFilter() {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/trade-value"
            },
            json: true
        })
            .then(response => response.body);
    }
    updateUserTradeQualityFilter(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/trade-value",
                method: "POST",
                json: options
            },
            json: true
        })
            .then(() => true);
    }
    updateTwoStepStatus(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/email",
                method: "PATCH",
                json: options
            },
            json: true
        })
            .then(response => response.body);
    }
    getContactUpsell() {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/user/screens/contact-upsell"
            },
            json: true
        })
            .then(response => response.body);
    }
    updateContactUpsellSuppression(options) {
        return this.request({
            requiresAuth: true,
            request: {
                method: "POST",
                path: "v1/user/screens/contact-upsell/suppress",
                json: options
            },
            json: true
        })
            .then(() => true);
    }
    getIsXboxUsernameValid(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/xbox/is-username-valid",
                qs: {
                    Authorization: options.authorization,
                    signature: options.signature,
                    "request.username": options.username
                }
            },
            json: true
        })
            .then(response => response.body);
    }
    updateUserPromotionChannels(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: "v1/promotion-channels",
                method: "POST",
                json: options
            },
            json: true
        })
            .then(() => true);
    }
}
exports.default = AccountSettingsAPI;
