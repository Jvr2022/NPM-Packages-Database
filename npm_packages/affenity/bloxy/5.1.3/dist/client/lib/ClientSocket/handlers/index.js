"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chatNotifications_1 = tslib_1.__importDefault(require("./chatNotifications"));
const friendShipnotifications_1 = tslib_1.__importDefault(require("./friendShipnotifications"));
const messageNotifications_1 = tslib_1.__importDefault(require("./messageNotifications"));
const presenceBulkNotifications_1 = tslib_1.__importDefault(require("./presenceBulkNotifications"));
const handlersMap = new Map();
handlersMap.set("chatnotifications", chatNotifications_1.default);
handlersMap.set("friendshipnotifications", friendShipnotifications_1.default);
handlersMap.set("messagenotifications", messageNotifications_1.default);
handlersMap.set("presencebulknotifications", presenceBulkNotifications_1.default);
exports.default = handlersMap;
