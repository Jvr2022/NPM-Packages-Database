"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const querystring_1 = require("querystring");
class RouterRequest {
    constructor(router, rawRequest, options) {
        this.router = router;
        this.rawRequest = rawRequest;
        this.url = RouterRequest.fixRequestUrl(this.rawRequest.url);
        this.urlData = new URL(this.url);
        this.path = this.urlData.pathname;
        this.query = querystring_1.parse(this.urlData.search.slice(1));
        this.method = (this.rawRequest.method || "GET").toUpperCase();
        this.bodyUsed = this.rawRequest.bodyUsed;
        this.body = this.rawRequest.body;
        this.headers = {};
        this.matchedParams = null;
        this.extraData = options.extraData;
        this.parseHeaders();
    }
    /**
     * Fixes the request URL to make sure it can be processed by the other parts of this library
     * @param {string} url
     * @returns {string}
     */
    static fixRequestUrl(url) {
        const endIndex = url.indexOf("?") > -1 ? url.indexOf("?") : url.length;
        const endChar = url.charAt(endIndex - 1);
        return endChar !== "/" ? [url.slice(0, endIndex), "/", url.slice(endIndex)].join("") : url;
    }
    /**
     * Parses the headers from the incoming request and adds them to an object
     * All header names will be converted to lower case before adding to the object.
     */
    parseHeaders() {
        const allHeaders = [...this.rawRequest.headers];
        this.headers = {};
        allHeaders.forEach(header => {
            const [name, value] = header;
            this.headers[name.toLowerCase()] = value;
        });
        return this.headers;
    }
}
exports.default = RouterRequest;
;
