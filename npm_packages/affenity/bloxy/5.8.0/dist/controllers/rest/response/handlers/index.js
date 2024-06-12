"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const validBody_1 = tslib_1.__importDefault(require("./validBody"));
const validStatusMessage_1 = tslib_1.__importDefault(require("./validStatusMessage"));
const validStatusCode_1 = tslib_1.__importDefault(require("./validStatusCode"));
const updateHeaders_1 = tslib_1.__importDefault(require("./updateHeaders"));
const responseHandlers = [
    updateHeaders_1.default,
    validStatusCode_1.default,
    validStatusMessage_1.default,
    validBody_1.default
];
exports.default = responseHandlers;
