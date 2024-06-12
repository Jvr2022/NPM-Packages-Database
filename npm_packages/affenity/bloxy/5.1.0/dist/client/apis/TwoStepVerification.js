"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const BaseAPI_1 = tslib_1.__importDefault(require("./BaseAPI"));
class TwoStepVerification extends BaseAPI_1.default {
    constructor(client) {
        super({
            client,
            baseUrl: "https://twostepverification.roblox.com/"
        });
    }
    getMetaData(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/metadata`,
                responseOptions: {
                    allowedStatusCodes: [200]
                },
                qs: options
            },
            json: true
        })
            .then(response => response.body);
    }
    getConfiguration(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/users/${this.client.user.id}/configuration`,
                responseOptions: {
                    allowedStatusCodes: [200]
                },
                qs: options
            },
            json: true
        })
            .then(response => response.body);
    }
    verifyWithAuthenticator(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/users/${this.client.user.id}/challenges/authenticator/verify`,
                method: "POST",
                responseOptions: {
                    allowedStatusCodes: [200]
                },
                json: options
            },
            json: true
        })
            .then(response => response.body);
    }
    disableAuthenticator(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/users/${this.client.user.id}/configuration/authenticator/disable`,
                method: "POST",
                responseOptions: {
                    allowedStatusCodes: [200]
                },
                json: options
            },
            json: true
        })
            .then(response => response.body);
    }
    enableAuthenticator(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/users/${this.client.user.id}/configuration/authenticator/enable`,
                method: "POST",
                responseOptions: {
                    allowedStatusCodes: [200]
                },
                json: options
            },
            json: true
        })
            .then(response => response.body);
    }
    verifyAuthenticatorSetup(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/users/${this.client.user.id}/configuration/authenticator/disable`,
                method: "POST",
                responseOptions: {
                    allowedStatusCodes: [200]
                },
                json: options
            },
            json: true
        })
            .then(response => response.body);
    }
    sendEmailCode(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/users/${this.client.user.id}/challenges/email/send-code`,
                responseOptions: {
                    allowedStatusCodes: [200]
                },
                json: options
            },
            json: true
        })
            .then(response => response.body);
    }
    verifyEmail(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/users/${this.client.user.id}/challenges/email/verify`,
                method: "POST",
                responseOptions: {
                    allowedStatusCodes: [200]
                },
                json: options
            },
            json: true
        })
            .then(response => response.body);
    }
    disableEmail(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/users/${this.client.user.id}/configuration/email/disable`,
                method: "POST",
                responseOptions: {
                    allowedStatusCodes: [200]
                },
                json: options
            },
            json: true
        })
            .then(response => response.body);
    }
    enableEmail(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/users/${this.client.user.id}/configuration/email/enable`,
                method: "POST",
                responseOptions: {
                    allowedStatusCodes: [200]
                },
                json: options
            },
            json: true
        })
            .then(response => response.body);
    }
}
exports.default = TwoStepVerification;
