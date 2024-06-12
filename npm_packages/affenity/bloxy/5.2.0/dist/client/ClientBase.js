"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const events_1 = require("events");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const debug_1 = tslib_1.__importDefault(require("debug"));
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
        this.options = lodash_1.default.merge({
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
