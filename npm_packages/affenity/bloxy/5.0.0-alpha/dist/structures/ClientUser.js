"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const PartialUser_1 = tslib_1.__importDefault(require("./user/PartialUser"));
class ClientUser extends PartialUser_1.default {
    constructor(data, client) {
        super(data, client);
        this.client = client;
    }
}
exports.default = ClientUser;
