"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cookie_1 = tslib_1.__importDefault(require("cookie"));
const querystring_1 = tslib_1.__importDefault(require("querystring"));
class RouterRequest {
    constructor(request, additionalData) {
        this.request = request;
        this.additionalData = additionalData || null;
        this.url = RouterRequest.fixRequestUrl(request.url);
        this.urlData = new URL(this.url);
        this.path = this.urlData.pathname;
        this.query = querystring_1.default.parse(this.urlData.search.slice(1));
        this.method = (request.method || "GET").toUpperCase();
        this.bodyUsed = request.bodyUsed;
        this.body = request.body;
        this.headers = {};
        this.cookies = {};
        this.parseHeaders();
    }
    static fixRequestUrl(url) {
        const endIndex = url.indexOf("?") > -1 ? url.indexOf("?") : url.length;
        const endChar = url.charAt(endIndex - 1);
        return endChar !== "/" ? [url.slice(0, endIndex), "/", url.slice(endIndex)].join("") : url;
    }
    setRoute(route) {
        this.route = route;
    }
    setParams(params) {
        this.params = params;
    }
    parseHeaders() {
        const allHeaders = [...this.request.headers];
        allHeaders.forEach(header => {
            const [name, value] = header;
            this.headers[name.toLowerCase()] = value;
        });
        this.cookies = cookie_1.default.parse(this.headers.cookie || "");
    }
}
exports.default = RouterRequest;
