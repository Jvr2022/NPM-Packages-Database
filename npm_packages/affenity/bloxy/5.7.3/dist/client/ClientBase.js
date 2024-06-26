"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const events_1 = require("events");
const debug_1 = tslib_1.__importDefault(require("debug"));
const utilFunctions_1 = require("../util/utilFunctions");
class ClientBase extends events_1.EventEmitter {
    constructor(options) {
        super();
        this.options = this.updateOptions(options);
        this.debugger = {
            info: debug_1.default("bloxy:info"),
            warn: debug_1.default("bloxy:warn"),
            error: debug_1.default("bloxy:error")
        };
    }
    updateOptions(options) {
        this.options = utilFunctions_1.utilMergeDeep({
            credentials: {},
            rest: {},
            setup: {},
            callbacks: {}
        }, options || {});
        return this.options;
    }
    log(level, data) {
        const loggerToUse = level === "info" ? this.debugger.info : level === "error" ? this.debugger.error : this.debugger.warn;
        loggerToUse(`[${new Date().toISOString()}] ${data.name}: ${data.description}`);
    }
}
exports.default = ClientBase;
