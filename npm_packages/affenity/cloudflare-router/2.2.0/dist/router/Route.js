"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Router_1 = tslib_1.__importDefault(require("./Router"));
const RoutePath_1 = tslib_1.__importDefault(require("./RoutePath"));
let lastRouteIndex = 0;
class Route {
    /**
     * Creates a Route class instance
     * @param {Router<AdditionalDataType>} router
     * @param {RouteOptions<AdditionalDataType>} options
     */
    constructor(router, options) {
        this.router = router;
        this.method = options.method;
        this.path = new RoutePath_1.default(this, options.path);
        this.handler = options.handler;
        this.isMiddleware = options.isMiddleware || this.isRouteMiddleware();
        this.isHandlerRouter = this.isRouteHandlerRouter();
        this.routeIndex = options.routeIndex || lastRouteIndex++;
    }
    /**
     * Returns whether this route is used as a middleware or not, by programmatically checking if the handler
     * is an instance of the Router object.
     * @returns {boolean}
     */
    isRouteMiddleware() {
        return this.handler instanceof Router_1.default ? false : !!this.isMiddleware;
    }
    /**
     * Returns whether the handler for this route is an instance of the Router object.
     * @returns {boolean}
     */
    isRouteHandlerRouter() {
        return this.handler instanceof Router_1.default;
    }
    /**
     * Returns information about the match from an incoming request, such as if it matches the path & method, and
     * any data from the UrlPattern API.
     * @param {RouterRequest<AdditionalDataType>} request
     * @returns {{pathMatchData: any, pathMatches: boolean, methodMatches: boolean}}
     */
    matchesRequest(request) {
        const pathMatchResult = this.path.matchesInputPath(request.path);
        const methodMatches = this.method === "ANY" ? true : (this.method.toUpperCase() === request.method.toUpperCase());
        return {
            pathMatches: pathMatchResult.doesMatch && methodMatches,
            pathMatchData: pathMatchResult.matchData,
            methodMatches
        };
    }
}
exports.default = Route;
;
