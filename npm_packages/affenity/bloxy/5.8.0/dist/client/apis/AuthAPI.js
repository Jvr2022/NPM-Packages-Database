"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const BaseAPI_1 = tslib_1.__importDefault(require("./BaseAPI"));
class AuthAPI extends BaseAPI_1.default {
    constructor(client) {
        super({
            client,
            baseUrl: "https://auth.roblox.com/"
        });
    }
    getAuthTicket() {
        return this.request({
            json: true,
            requiresAuth: true,
            request: {
                path: "v1/authentication-ticket",
                method: "POST",
                headers: {
                    referer: "https://www.roblox.com/",
                    origin: "roblox.com"
                }
            }
        })
            .then(response => ({
            authTicket: response.headers["rbx-authentication-ticket"]
        }));
    }
    getAuthMetaData() {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/auth/metadata"
            }
        })
            .then(response => response.body);
    }
    login(options) {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/login",
                method: "POST",
                json: options
            }
        })
            .then(response => response.body);
    }
    logout() {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/logout",
                method: "POST"
            }
        })
            .then(response => response.body);
    }
    getCredentialsVerificationStatus(options) {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/credentials/verification",
                qs: {
                    "request.credentialType": options.credentialType,
                    "request.credentialValue": options.credentialValue,
                    "request.password": options.password
                }
            }
        })
            .then(response => response.body);
    }
    sendCredentialsVerificationMessage(options) {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/credentials/verification/send",
                method: "POST",
                json: options
            }
        })
            .then(response => response.body);
    }
    getMetaData() {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/metadata"
            }
        })
            .then(response => response.body);
    }
    getCurrentUserPasswordStatus() {
        return this.request({
            json: true,
            requiresAuth: true,
            request: {
                path: "v2/passwords/current-status"
            }
        })
            .then(response => response.body);
    }
    getPasswordResetMetaData(options) {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/passwords/reset",
                qs: {
                    "request.targetType": options.targetType,
                    "request.ticket": options.ticket
                }
            }
        })
            .then(response => response.body);
    }
    resetPassword(options) {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/auth/metadata",
                method: "POST",
                json: options
            }
        })
            .then(response => response.body);
    }
    validatePassword(options) {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/passwords/validate",
                qs: {
                    "request.username": options.username,
                    "request.password": options.password
                }
            }
        })
            .then(response => response.body);
    }
    sendPasswordReset(options) {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/passwords/reset/send",
                method: "POST",
                json: options
            }
        })
            .then(response => response.body);
    }
    verifyPasswordReset(options) {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/passwords/reset/verify",
                method: "POST",
                json: options
            }
        })
            .then(response => response.body);
    }
    changeUserPassword(options) {
        return this.request({
            json: true,
            requiresAuth: true,
            request: {
                path: "v2/user/passwords/change",
                method: "POST",
                json: options
            }
        })
            .then(response => response.body);
    }
    getRecoveryMetaData() {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/recovery/metadata"
            }
        })
            .then(response => response.body);
    }
    getRevertAccountInfo(options) {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/revert/account",
                qs: {
                    ticket: options.ticket
                }
            }
        })
            .then(response => response.body);
    }
    revertAccount(options) {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/revert/account",
                method: "POST",
                json: options
            }
        })
            .then(response => response.body);
    }
    getSAMLMetaData() {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/saml/metadata"
            }
        })
            .then(response => response.body);
    }
    samlAuthenticate() {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/saml/login",
                method: "POST"
            }
        })
            .then(response => response.body);
    }
    getTwoStepVerificationMetaData() {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/twostepverification/metadata"
            }
        })
            .then(response => response.body);
    }
    resendTwoStepVerificationCode(options) {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/twostepverification/resend",
                method: "POST",
                json: options
            }
        })
            .then(response => response.body);
    }
    verifyTwoStepCode(options) {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/twostepverification/verify",
                method: "POST",
                json: options
            }
        })
            .then(response => response.body);
    }
    getExistingUsernames(options) {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/usernames",
                qs: {
                    username: options.username
                }
            }
        })
            .then(response => response.body);
    }
    validateUsername(options) {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/usernames/validate",
                qs: {
                    "request.username": options.username,
                    "request.birthday": options.birthday,
                    "request.context": options.context
                }
            }
        })
            .then(response => response.body);
    }
    recoverUsernames(options) {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/twostepverification/metadata",
                json: options
            }
        })
            .then(response => response.body);
    }
    signUp(options) {
        return this.request({
            json: true,
            requiresAuth: false,
            request: {
                path: "v2/twostepverification/metadata",
                method: "POST",
                json: options
            }
        })
            .then(response => response.body);
    }
    changeUserUsername(options) {
        return this.request({
            json: true,
            requiresAuth: true,
            request: {
                path: "v2/username",
                method: "POST",
                json: options
            }
        })
            .then(response => response.body);
    }
}
exports.default = AuthAPI;
