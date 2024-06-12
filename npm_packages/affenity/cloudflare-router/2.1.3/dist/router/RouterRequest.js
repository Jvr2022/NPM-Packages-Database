"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const querystring_1 = tslib_1.__importDefault(require("querystring"));
class RouterRequest {
    constructor(incomingRequest, additionalData) {
        this.incomingRequest = incomingRequest;
        this.additionalData = additionalData || null;
        this.url = RouterRequest.fixRequestUrl(this.incomingRequest.url);
        this.urlData = new URL(this.url);
        this.path = this.urlData.pathname;
        this.query = querystring_1.default.parse(this.urlData.search.slice(3));
        this.method = (this.incomingRequest.method || "GET").toUpperCase();
        this.bodyUsed = this.incomingRequest.bodyUsed;
        this.body = this.incomingRequest.body || null;
        this.headers = {};
        this.matchedRoute = null;
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
     * Sets the route that this request matched with
     * @param {Route<AdditionalDataType>} route
     */
    setMatchedRoute(route) {
        this.matchedRoute = route;
    }
    /**
     * Sets the params that this request matched with
     * @param {Record<string, string>} params
     */
    setMatchedParams(params) {
        this.matchedParams = params;
    }
    /**
     * Parses the headers from the incoming request and adds them to an object
     * All header names will be converted to lower case before adding to the object.
     */
    parseHeaders() {
        const allHeaders = [...this.incomingRequest.headers];
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
