"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../util/errors/errors");
class RESTResponse {
    // Public options: RESTResponseOptions;
    constructor(controller, request, responseData) {
        this.controller = controller;
        this.request = request;
        this.responseData = responseData;
    }
    process() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const allProcessed = this.controller.responseHandlers.map(handler => handler(this));
            if (allProcessed.every(processed => processed === true)) {
                return this.responseData;
            }
            else {
                const error = allProcessed.find(error => error instanceof errors_1.BloxyHttpError && error.name ===
                    "BloxyInvalidStatusMessageError" && error.statusMessage.includes("Token Validation Failed"));
                if (error) {
                    // 1 attempt = 0 retries
                    if (this.request.attempts - 1 === this.controller.getXCSRFTokenRefreshMaxRetries()) {
                        throw error;
                    }
                    else {
                        this.controller.options.xcsrf = undefined;
                        return this.request.send();
                    }
                }
                throw allProcessed.find(error => error instanceof Error);
            }
        });
    }
}
exports.default = RESTResponse;
