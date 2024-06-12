"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const BaseAPI_1 = tslib_1.__importDefault(require("./BaseAPI"));
class PrivateMessagesAPI extends BaseAPI_1.default {
    constructor(client) {
        super({
            client,
            baseUrl: "https://privatemessages.roblox.com/"
        });
    }
    getAnnouncements() {
        return this.request({
            requiresAuth: false,
            request: {
                path: `v1/announcements`
            },
            json: true
        })
            .then(response => response.body);
    }
    getAnnouncementsMetaData() {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/announcements/metadata`
            },
            json: true
        })
            .then(response => response.body);
    }
    getMessages(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/messages`,
                qs: options
            },
            json: true
        })
            .then(response => response.body);
    }
    getMessage(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/messages/${options.messageId}`
            },
            json: true
        })
            .then(response => response.body);
    }
    getUnreadMessagesCount() {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/messages/unread/count`
            },
            json: true
        })
            .then(response => response.body);
    }
    archiveMessages(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/messages/archive`,
                method: "POST",
                json: options
            },
            json: true
        })
            .then(response => response.body);
    }
    markMessagesRead(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/messages/mark-read`,
                method: "POST",
                json: options
            },
            json: true
        })
            .then(response => response.body);
    }
    markMessagesUnread(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/messages/mark-unread`,
                method: "POST",
                json: options
            },
            json: true
        })
            .then(response => response.body);
    }
    sendMessage(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/messages/send`,
                method: "POST",
                json: options
            },
            json: true
        })
            .then(response => response.body);
    }
    unArchiveMessages(options) {
        return this.request({
            requiresAuth: true,
            request: {
                path: `v1/messages/unarchive`,
                method: "POST",
                json: options
            },
            json: true
        })
            .then(response => response.body);
    }
}
exports.default = PrivateMessagesAPI;
