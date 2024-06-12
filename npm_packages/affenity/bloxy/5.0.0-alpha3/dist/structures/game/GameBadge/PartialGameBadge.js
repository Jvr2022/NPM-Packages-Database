"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const GameBadgeBase_1 = tslib_1.__importDefault(require("./GameBadgeBase"));
class PartialGameBadge extends GameBadgeBase_1.default {
    constructor(data, client) {
        super(data, client);
    }
}
exports.default = PartialGameBadge;
