"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const url_pattern_1 = tslib_1.__importDefault(require("url-pattern"));
const debug_1 = tslib_1.__importDefault(require("debug"));
const RouterResponse_1 = tslib_1.__importDefault(require("./RouterResponse"));
const RouterRequest_1 = tslib_1.__importDefault(require("./RouterRequest"));
const NO_APPEND_SLASH_IF_CHARACTERS = [
    "*",
    ")",
    "?"
];
class RouterPath {
    constructor(rawInput, fixed) {
        this.rawInput = rawInput;
        this.fixed = fixed;
        this.pattern = new url_pattern_1.default(this.fixed);
    }
}
class Route {
    constructor(router, options) {
        this.router = router;
        this.handler = options.handler;
        this.method = options.method;
        this.isMiddleware = options.isMiddleware;
        this.path = new RouterPath(options.inputPath, this.isMiddleware ? this.router.fixUsePath(options.inputPath) : this.router.fixHandlerPath(options.inputPath));
    }
    matchesPath(path) {
        return this.path.pattern.match(path);
    }
}
class Router {
    constructor() {
        this.routes = [];
        this.basePath = null;
        this.debugger = debug_1.default("cloudflare-router");
        this.routerOptions = {};
    }
    logInternal(message) {
        var _a, _b;
        this.debugger(`[${(_b = (_a = this.basePath) === null || _a === void 0 ? void 0 : _a.fixed) !== null && _b !== void 0 ? _b : "n/a"}]: ${message}`);
    }
    setCustomResponseBuilder(responseBuilder) {
        this.routerOptions.customResponseBuilder = responseBuilder;
        return this;
    }
    use(arg0, arg1) {
        if (typeof arg0 === "string") {
            // It's a base-path
            if (!arg1) {
                this.logInternal(`Failed to use router.use, 1st arg is string means 2nd argument needs to be provided!`);
                throw new Error(`Expected 2nd argument for router.use when 1st arg is string`);
            }
            this.logInternal(`Setting up router.use with sub: ${arg0} with handler as Router?: ${arg1 instanceof Router}`);
            const handler = arg1;
            const fixedUsePath = this.fixUsePath(arg0);
            if (handler instanceof Router) {
                handler.basePath = new RouterPath(arg0, fixedUsePath);
            }
            this.routes.push(new Route(this, {
                handler,
                inputPath: arg0,
                method: "ANY",
                isMiddleware: true
            }));
        }
        else {
            this.routes.push(new Route(this, {
                handler: arg0,
                inputPath: "*",
                method: "ANY",
                isMiddleware: true
            }));
        }
        this.refreshRoutes();
    }
    addPathHandler(options) {
        this.routes.push(new Route(this, {
            handler: options.handler,
            method: options.method,
            inputPath: options.path,
            isMiddleware: options.isMiddleware || false
        }));
    }
    get(path, handler) {
        this.addPathHandler({
            path,
            handler,
            method: "GET",
            isMiddleware: false
        });
    }
    post(path, handler) {
        this.addPathHandler({
            path,
            handler,
            method: "POST"
        });
    }
    options(path, handler) {
        this.addPathHandler({
            path,
            handler,
            method: "OPTIONS"
        });
    }
    head(path, handler) {
        this.addPathHandler({
            path,
            handler,
            method: "HEAD"
        });
    }
    delete(path, handler) {
        this.addPathHandler({
            path,
            handler,
            method: "DELETE"
        });
    }
    any(path, handler) {
        this.addPathHandler({
            path,
            handler,
            method: "ANY"
        });
    }
    getMatchingRoutesByPath(totalPath, fillArray = []) {
        for (let route of this.routes) {
            const handler = route.handler;
            if (handler instanceof Router) {
                handler.getMatchingRoutesByPath(totalPath, fillArray);
            }
            else {
                const checkMatch = route.matchesPath(totalPath);
                this.logInternal(`Match route ${route.path.fixed} with ${totalPath}: ${checkMatch}`);
                if (checkMatch) {
                    fillArray.push({
                        route,
                        match: checkMatch
                    });
                }
                else {
                    if (route.path.fixed === "*") {
                        fillArray.push({
                            route,
                            match: {}
                        });
                    }
                }
            }
        }
        return fillArray;
    }
    getMatchingRoutesByPathAndMethod(path, method) {
        this.logInternal(`Matching routes with path: ${path} and method: ${method}`);
        const matchedByPath = this.getMatchingRoutesByPath(path);
        this.logInternal(`Found ${matchedByPath.length} for path: ${path}`);
        const filteredByMethod = matchedByPath
            .filter(matched => [method, "ANY"].some(compareMethod => matched.route.method === compareMethod));
        this.logInternal(`Filtered matching routes by path to ${filteredByMethod.length} by method!`);
        return filteredByMethod;
    }
    fixHandlerPath(inputPath) {
        var _a, _b;
        const fixed = `${(_b = (_a = this.basePath) === null || _a === void 0 ? void 0 : _a.fixed) !== null && _b !== void 0 ? _b : ""}${inputPath.endsWith("/") ? inputPath : !NO_APPEND_SLASH_IF_CHARACTERS.some(char => inputPath.endsWith(char)) ? inputPath + "/" : inputPath}`;
        this.logInternal(`Fixed handler path from: ${inputPath} to: ${fixed}`);
        return fixed;
    }
    fixUsePath(arg0) {
        var _a, _b;
        const fixed = `${(_b = (_a = this.basePath) === null || _a === void 0 ? void 0 : _a.fixed) !== null && _b !== void 0 ? _b : ""}/${arg0.slice(arg0.startsWith("/") ? 1 : 0, arg0.endsWith("/") ? arg0.length - 1 : arg0.length)}`;
        this.logInternal(`Fixed use path from: ${arg0} to: ${fixed}`);
        return fixed;
    }
    refreshRoutes() {
        var _a, _b, _c, _d, _e, _f;
        this.logInternal(`Refreshing routes for Router with base-path: ${(_b = (_a = this.basePath) === null || _a === void 0 ? void 0 : _a.fixed) !== null && _b !== void 0 ? _b : "N/A"}`);
        const newRoutes = [];
        for (let oldRoute of this.routes) {
            if (oldRoute.isMiddleware) {
                if (oldRoute.handler instanceof Router) {
                    oldRoute.handler.refreshRoutes();
                    oldRoute.handler.basePath = new RouterPath((_d = (_c = oldRoute.handler.basePath) === null || _c === void 0 ? void 0 : _c.rawInput) !== null && _d !== void 0 ? _d : "/", this.fixUsePath((_f = (_e = oldRoute.handler.basePath) === null || _e === void 0 ? void 0 : _e.rawInput) !== null && _f !== void 0 ? _f : "/"));
                }
                newRoutes.push(new Route(this, {
                    handler: oldRoute.handler,
                    method: oldRoute.method,
                    inputPath: oldRoute.path.rawInput,
                    isMiddleware: oldRoute.isMiddleware
                }));
            }
            else {
                newRoutes.push(new Route(this, {
                    handler: oldRoute.handler,
                    method: oldRoute.method,
                    inputPath: oldRoute.path.rawInput,
                    isMiddleware: oldRoute.isMiddleware
                }));
            }
        }
        this.logInternal(`Successfully updated to ${newRoutes.length} new routes.`);
        this.routes = newRoutes;
    }
    processRequest(routerRequest, routerResponse) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const foundMatchingRoutes = this.getMatchingRoutesByPath(routerRequest.path);
            const middlewareMatches = foundMatchingRoutes
                .filter(matched => matched.route.isMiddleware)
                .filter(matchedMiddleware => !(matchedMiddleware.route.handler instanceof Router));
            const responseMatch = foundMatchingRoutes
                .filter(matched => !matched.route.isMiddleware)
                .find(s => !!s);
            if (!responseMatch) {
                // throw new Error(`Could not find a response handler for the request with route: ${ routerRequest.method } ${ routerRequest.path }`);
                routerResponse.statusCode(404)
                    .status("Not found")
                    .text(`Error 404 - not found!`);
                // Returning a 404 error instead of throwing an error
                return this.finishResponse(routerRequest, routerResponse);
            }
            if (responseMatch.route.handler instanceof Router) {
                throw new Error(`Response handler for route ${routerRequest.method} ${routerRequest.path}`);
            }
            let allMiddlewaresSuccessful = true;
            for (let middlewareMatch of middlewareMatches) {
                const middlewareSuccess = yield this.executeMiddleware(middlewareMatch.route, routerRequest, routerResponse)
                    .catch((e) => e);
                if (!middlewareSuccess) {
                    allMiddlewaresSuccessful = false;
                    break;
                }
                if (middlewareSuccess instanceof Error) {
                    this.logInternal(`Middleware for route ${middlewareMatch.route.path.fixed} failed with error! ${middlewareSuccess.name}, ${middlewareSuccess.message}`);
                    allMiddlewaresSuccessful = false;
                    break;
                }
            }
            if (!allMiddlewaresSuccessful) {
                return this.finishResponse(routerRequest, routerResponse);
            }
            routerRequest.matchedParams = responseMatch.match;
            yield responseMatch.route.handler(routerRequest, routerResponse);
            return this.finishResponse(routerRequest, routerResponse);
        });
    }
    finishResponse(routerRequest, routerResponse) {
        const builtResponse = routerResponse.build();
        if (this.routerOptions.customResponseBuilder) {
            builtResponse.response = this.routerOptions.customResponseBuilder(routerResponse);
        }
        return builtResponse;
    }
    executeMiddleware(middleware, routerRequest, routerResponse) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const handler = middleware.handler;
                const hasNextCallback = handler.length === 3;
                if (hasNextCallback) {
                    handler(routerRequest, routerResponse, (proceed = true) => resolve(proceed));
                }
                else {
                    yield (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        return handler(routerRequest, routerResponse);
                    }));
                    resolve(true);
                }
            }));
        });
    }
    serveRequest(request, extraData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const routerRequest = new RouterRequest_1.default(this, request, {
                extraData: extraData || null
            });
            const routerResponse = new RouterResponse_1.default(this, routerRequest);
            return this.processRequest(routerRequest, routerResponse);
        });
    }
}
exports.default = Router;
;
