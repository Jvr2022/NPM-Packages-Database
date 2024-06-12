"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultRESTControllerOptions = exports.DefaultCreateCookieOptions = exports.DefaultRESTRequestOptions = void 0;
exports.DefaultRESTRequestOptions = {
    checks: {
        xcsrf: true,
        status: true,
        statusCode: true,
        body: true,
        captcha: true
    },
    headers: {},
    method: "GET"
};
exports.DefaultCreateCookieOptions = {
    domain: ".roblox.com",
    hostOnly: false,
    httpOnly: false
};
exports.DefaultRESTControllerOptions = {
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
    proxy: undefined,
    xcsrf: undefined,
    xcsrfSet: undefined,
    xcsrfRefreshInterval: 5 * 60 * 1000,
    xcsrfRefreshMaxRetries: 4
};
