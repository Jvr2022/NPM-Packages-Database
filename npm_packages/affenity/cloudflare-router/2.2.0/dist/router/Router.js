"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Route_1 = tslib_1.__importDefault(require("./Route"));
const RouterRequest_1 = tslib_1.__importDefault(require("./RouterRequest"));
const RouterResponse_1 = tslib_1.__importDefault(require("./RouterResponse"));
const NO_APPEND_SLASH_IF_CHARACTERS = [
    "*",
    ")",
    "?"
];
class Router {
    /**
     * Creates a new Router. Only one router can be used for .serveRequest(), attempting to use multiple routers for
     * this will result in an error.
     * @param {RouterOptions<AdditionalDataType>} options
     */
    constructor(options) {
        var _a, _b, _c, _d;
        this.basePath = (_a = options === null || options === void 0 ? void 0 : options.basePath) !== null && _a !== void 0 ? _a : "/";
        this.isWaterfallHandling = (_b = options === null || options === void 0 ? void 0 : options.waterfallHandling) !== null && _b !== void 0 ? _b : false;
        this.customResponseBuilder = (_c = options === null || options === void 0 ? void 0 : options.customResponseBuilder) !== null && _c !== void 0 ? _c : undefined;
        this.routes = [];
        this.parentRouter = (_d = options === null || options === void 0 ? void 0 : options.parent) !== null && _d !== void 0 ? _d : null;
        this.mainRouter = null;
        this.isMainRouter = false;
    }
    /**
     * Used internally when the router.use() method is called to update the descendants of the router (all connected
     * routers and routes)
     * @param {string} newBasePath
     * @param {Router<AdditionalDataType>} parentRouter
     */
    init(newBasePath, parentRouter) {
        this.basePath = "/";
        this.basePath = this.fixPath(newBasePath || "/");
        this.parentRouter = parentRouter || null;
        this.updateSelfRoutes();
    }
    /**
     * Returns a "fixed" path of the input path, setting up basePath and similar
     * @param {string} inputPath
     * @returns {string}
     */
    fixPath(inputPath) {
        let fixedPath = `${this.basePath}${inputPath.startsWith("/") ? inputPath.slice(1) : inputPath}`;
        if (!fixedPath.endsWith("/") && !NO_APPEND_SLASH_IF_CHARACTERS.some(char => fixedPath.endsWith(char))) {
            fixedPath += "/";
        }
        // info: DEBUG
        // console.log(`To fix path! Input: ${ inputPath }. Output: ${ fixedPath }`);
        return fixedPath;
    }
    /**
     * Updates the routes this router has set up. Used internally on router.init() (which is also called internally)
     */
    updateSelfRoutes() {
        const newRoutes = [];
        for (const oldRoute of this.routes) {
            const newRoute = this.createRoute({
                path: oldRoute.path.inputPath,
                method: oldRoute.method,
                handler: oldRoute.handler,
                isMiddleware: oldRoute.isMiddleware,
                routeIndex: oldRoute.routeIndex
            });
            newRoutes.push(newRoute);
        }
        this.routes = newRoutes;
    }
    /**
     * Used internally as a standardized way of registering routes. Normally you want to use .get() or .post(), but
     * this method is also available. This will only create a route, not apply it to the router. Use
     * router.createRouteAndAdd() to add the route to the router automatically.
     * @param {RouteOptions<AdditionalDataType>} options
     * @returns {Route<AdditionalDataType>}
     */
    createRoute(options) {
        return new Route_1.default(this, options);
    }
    /**
     * Creates a route and adds it to the current router instance. Used internally to standardize the way of creating
     * routes. Normally you'll want to use .get() or .post() to set up routes.
     * @param {RouteOptions<AdditionalDataType>} options
     * @returns {Route<AdditionalDataType>}
     */
    createRouteAndAdd(options) {
        const createdRoute = this.createRoute(options);
        this.routes.push(createdRoute);
        return createdRoute;
    }
    /**
     * Sets up a middleware for a certain path. Use router.any() to process requests with any method
     * @param {string | RouteHandler<AdditionalDataType>} arg0
     * @param {RouteHandler<AdditionalDataType>} arg1
     */
    use(arg0, arg1) {
        let usePath = "/";
        let useHandler = arg1 || arg0;
        if (typeof arg0 === "string") {
            usePath = arg0;
        }
        if (useHandler instanceof Router) {
            // Init the corresponding router
            useHandler.init(usePath, this);
        }
        this.createRouteAndAdd({
            handler: useHandler,
            path: usePath,
            method: "ANY",
            isMiddleware: true
        });
    }
    /**
     * Makes it easier to set up a batch of .use "commands". Provide the array with (optional) pathname and the
     * handler for it.
     * @param {{path?: string, handler: RouteHandler<AdditionalDataType>}[]} list
     */
    useBulk(list) {
        for (let i = 0; i < list.length; i++) {
            const listEntry = list[i];
            this.use(listEntry.path || listEntry.handler, listEntry.handler);
        }
    }
    /**
     * Used internally, which will declare this router as the main router. Note there can only be one main router,
     * otherwise unexpected issues can arise, and will most likely throw errors.
     */
    assignSelfAsMainRouter() {
        if (this.mainRouter !== null) {
            throw new Error(`Cannot assign self router as the main router when there is already another router instance considered a main one!`);
        }
        this.isMainRouter = true;
        // Update all descendants
    }
    /**
     * Used internally to recursively look for routes that match the path and method. Will return anything that matches
     * regardless if it's a middleware or not. Anything that's a route will be returned as long as it matches.
     * @param {RouterRequest<AdditionalDataType>} request
     * @returns {MatchingRoute<AdditionalDataType>[]}
     */
    findMatchingRoutes(request) {
        let foundMatching = [];
        for (const route of this.routes) {
            if (route.isHandlerRouter) {
                foundMatching = [
                    ...foundMatching,
                    ...route.handler.findMatchingRoutes(request)
                ];
            }
            else {
                const matchRoute = route.matchesRequest(request);
                if (matchRoute.pathMatches) {
                    foundMatching.push({
                        route,
                        match: matchRoute.pathMatchData
                    });
                }
            }
        }
        return foundMatching;
    }
    /**
     * Adds a handler for a request that hits this path using the GET HTTP method.
     * @param {string} path
     * @param {RouteHandler<AdditionalDataType>} handler
     */
    get(path, handler) {
        this.createRouteAndAdd({
            path,
            handler,
            method: "GET",
            isMiddleware: false
        });
    }
    /**
     * Adds a handler for a request that hits this path using the POST HTTP method.
     * @param {string} path
     * @param {RouteHandler<AdditionalDataType>} handler
     */
    post(path, handler) {
        this.createRouteAndAdd({
            path,
            handler,
            method: "POST",
            isMiddleware: false
        });
    }
    /**
     * Adds a handler for a request that hits this path using the OPTIONS HTTP method.
     * @param {string} path
     * @param {RouteHandler<AdditionalDataType>} handler
     */
    options(path, handler) {
        this.createRouteAndAdd({
            path,
            handler,
            method: "OPTIONS",
            isMiddleware: false
        });
    }
    /**
     * Adds a handler for a request that hits this path using the HEAD HTTP method.
     * @param {string} path
     * @param {RouteHandler<AdditionalDataType>} handler
     */
    head(path, handler) {
        this.createRouteAndAdd({
            path,
            handler,
            method: "HEAD",
            isMiddleware: false
        });
    }
    /**
     * Adds a handler for a request that hits this path using the DELETE HTTP method.
     * @param {string} path
     * @param {RouteHandler<AdditionalDataType>} handler
     */
    delete(path, handler) {
        this.createRouteAndAdd({
            path,
            handler,
            method: "DELETE",
            isMiddleware: false
        });
    }
    /**
     * Adds a handler for a request that hits this path regardless of the method used.
     * @param {string} path
     * @param {RouteHandler<AdditionalDataType>} handler
     */
    any(path, handler) {
        this.createRouteAndAdd({
            path,
            handler,
            method: "ANY",
            isMiddleware: false
        });
    }
    /**
     * Used internally for further processing of the request (and getting a response from the application)
     * @param {RouterRequest<AdditionalDataType>} routerRequest
     * @param {RouterResponse<AdditionalDataType>} routerResponse
     * @returns {Promise<BuiltResponseObject<AdditionalDataType>>}
     */
    processRequest(routerRequest, routerResponse) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // First we find all routes that match the path and method
            const foundMatchingRoutes = this.findMatchingRoutes(routerRequest);
            // Then, we find all middlewares from the matching routes, and ensure that they are declared as middlewares
            // in addition to the handler not being a router.
            const foundMiddlewares = foundMatchingRoutes
                .filter(matchingRoute => matchingRoute.route.isMiddleware)
                .filter(matchingRoute => !matchingRoute.route.isHandlerRouter);
            // Finally, we find the route which isn't a middleware, as it'd be the final response handler, that would
            // be run once all middlewares are run.
            const responseHandler = foundMatchingRoutes
                .filter(matchingRoute => !matchingRoute.route.isMiddleware)
                .find(s => !!s);
            // Next up, we're going to sort the middlewares based on their routeIndex, so they're run in the order
            // they are supposed to.
            const orderedMiddlewareList = foundMiddlewares
                .sort((a, b) => a.route.routeIndex - b.route.routeIndex);
            let allMiddlewaresSuccessful = true;
            for (let i = 0; i < orderedMiddlewareList.length; i++) {
                const middleware = orderedMiddlewareList[i].route;
                const middlewareSuccess = yield this.executeMiddleware(middleware, routerRequest, routerResponse);
                if (!middlewareSuccess) {
                    allMiddlewaresSuccessful = false;
                    break;
                }
            }
            if (!allMiddlewaresSuccessful) {
                return this.finishResponse(routerRequest, routerResponse);
            }
            // We can't return a response if there was no response handler for the request, so we're creating an error
            if (!responseHandler) {
                throw new Error(`Could not find a response handler for the request!`);
            }
            // Updating our response/request objects so they're up-to-speed about the incoming request
            routerRequest.setMatchedParams(responseHandler.match);
            routerRequest.setMatchedRoute(responseHandler.route);
            routerResponse.setMatchedRoute(responseHandler.route);
            // Finally, as all middlewares are run, we're going to call the response handler
            yield responseHandler.route.handler(routerRequest, routerResponse);
            return this.finishResponse(routerRequest, routerResponse);
        });
    }
    /**
     * Used internally when the response instance is finalized and ready to return the response data.
     * @param {RouterRequest<AdditionalDataType>} _request
     * @param {RouterResponse<AdditionalDataType>} response
     * @returns {Promise<BuiltResponseObject<AdditionalDataType>>}
     */
    finishResponse(_request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const mainRouter = this.getMainRouter();
            const builtResponseOptions = response.build();
            if (mainRouter.customResponseBuilder) {
                builtResponseOptions.response = mainRouter.customResponseBuilder(response);
            }
            return builtResponseOptions;
        });
    }
    /**
     * Used internally when wanting to execute a middleware (running it, not.. beheading it.. jeez). It returns a
     * promise which contains a boolean indicating the success status. If one middleware is failing or wants to abort
     * further processing, next(true) is used to indicate this.
     * @param {Route<AdditionalDataType>} middleware
     * @param {RouterRequest<AdditionalDataType>} request
     * @param {RouterResponse<AdditionalDataType>} response
     * @returns {Promise<boolean>}
     */
    executeMiddleware(middleware, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const middlewareHandler = middleware.handler;
                // If length is 3, it means they want to wait until next() is called
                // If it's 2, just await promise and continue!
                const hasNextCallback = middlewareHandler.length === 3;
                if (hasNextCallback) {
                    middlewareHandler(request, response, (proceed = true) => {
                        return resolve(proceed);
                    });
                }
                else {
                    yield (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        return middlewareHandler(request, response);
                    }));
                    resolve(true);
                }
            }));
        });
    }
    /**
     * The method to serve the incoming request and pass it on to cloudflare-router for processing. Use only this
     * method unless you know what you're doing.
     * @param {Request} incomingRequest
     * @param {AdditionalDataType} additionalData
     * @returns {Promise<BuiltResponseObject<AdditionalDataType>>}
     */
    serveRequest(incomingRequest, additionalData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.mainRouter && !this.isMainRouter) {
                this.assignSelfAsMainRouter();
            }
            const routerRequest = new RouterRequest_1.default(incomingRequest, additionalData);
            const routerResponse = new RouterResponse_1.default(routerRequest);
            return this.processRequest(routerRequest, routerResponse);
        });
    }
    /**
     * Used internally for getting the router which is considered the main router. There can (*should*) only be one
     * main router, otherwise unexpected issues may arise, and errors will most likely be thrown.
     * @returns {Router<AdditionalDataType>}
     */
    getMainRouter() {
        if (this.parentRouter) {
            return this.parentRouter.getMainRouter();
        }
        if (this.isMainRouter) {
            return this;
        }
        else {
            throw new Error(`Error! Got to a top-level router that wasn't declared as main router!`);
        }
    }
}
exports.default = Router;
;
