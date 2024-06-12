"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const tslib_1 = require("tslib");
const url_pattern_1 = tslib_1.__importDefault(require("url-pattern"));
const RouterRequest_1 = tslib_1.__importDefault(require("./RouterRequest"));
const RouterResponse_1 = tslib_1.__importDefault(require("./RouterResponse"));
const NO_APPEND_SLASH_IF_CHARACTERS = [
    "*",
    ")",
    "?"
];
class Route {
    /**
     * Creates a new Route
     * @param {Router} router
     * @param {RouteOptions} options
     */
    constructor(router, options) {
        this.router = router;
        this.method = options.method || "GET";
        const fixedPath = this.router.fixPath(options.path);
        const pathPattern = this.router.createUrlPattern(fixedPath);
        this.path = {
            inputPath: options.path,
            formattedPath: this.router.fixPath(options.path),
            pattern: pathPattern
        };
        this.handler = options.handler;
        // Design choice: If handler is Router, set to false, otherwise check the options. Default is false
        this.isMiddleware = options.handler instanceof Router ? false : !!options.isMiddleware;
        // Design choice: If handler is Router, set to true (otherwise false)
        this.isRouterHandler = options.handler instanceof Router;
    }
    matchPath(request) {
        return this.path.pattern.match(request.path);
    }
    match(request) {
        const pathMatches = this.matchPath(request);
        const methodMatches = this.method === "ANY" ? true : (this.method.toUpperCase() === request.method.toUpperCase());
        return {
            pathMatch: pathMatches,
            doesMatch: !!pathMatches && methodMatches
        };
    }
}
exports.Route = Route;
class Router {
    /**
     * Creates a new Router
     * @param {RouterOptions} options
     */
    constructor(options = {}) {
        this.isWaterfall = options.waterfallMiddleware || true;
        this.routes = [];
        this.customResponseTransformer = options.customResponseTransformer;
        this.parent = options.parent || null;
        this.main = this.getMainRouter();
        // We need to put this at the end, otherwise we will risk this.routes to not be defined
        this.basePath = this.setBasePath(options.basePath);
    }
    /**
     * Recursively goes up and finds the main router
     * @returns {Router<AdditionalDataType>}
     */
    getMainRouter() {
        if (this.parent) {
            return this.parent.getMainRouter();
        }
        else {
            return this;
        }
    }
    findMatchingRoutes(request) {
        let foundMatching = [];
        for (const route of this.routes) {
            if (route.handler instanceof Router) {
                foundMatching = [...foundMatching, ...route.handler.findMatchingRoutes(request)];
            }
            else {
                // This is a regular route
                const matchRoute = route.match(request);
                if (matchRoute.doesMatch) {
                    foundMatching.push({
                        match: matchRoute.pathMatch,
                        route
                    });
                }
            }
        }
        return foundMatching;
    }
    serve(request, additionalData, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alreadyProcessed = request instanceof RouterRequest_1.default;
            request = (!(request instanceof RouterRequest_1.default) ? new RouterRequest_1.default(request, additionalData) : request);
            response = response || new RouterResponse_1.default(request);
            if (!alreadyProcessed) {
                const foundMatchingRoutes = this.findMatchingRoutes(request);
                const middlewares = foundMatchingRoutes.filter(matchingRoute => matchingRoute.route.isMiddleware);
                const responseHandler = foundMatchingRoutes.filter(matchingRoute => !matchingRoute.route.isMiddleware)
                    .find(matchingRoute => matchingRoute);
                if (!responseHandler) {
                    throw new Error(`Could not find a response handler for the request!`);
                }
                // We're doing this to make sure that the params property is available
                request.setParams(responseHandler.match);
                // We're setting the route so that it's accessible from within the RouterResponse instance
                response.setRoute(responseHandler.route);
                if (middlewares.length > 0) {
                    const executeMiddleware = (middleware) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const handler = middleware.handler;
                        return handler(request, response, additionalData);
                    });
                    if (this.isWaterfall) {
                        for (const middleware of middlewares) {
                            const waitingPromise = executeMiddleware(middleware.route);
                            // eslint-disable-next-line no-await-in-loop
                            yield waitingPromise;
                        }
                    }
                    else {
                        yield Promise.all(middlewares.map(middleware => executeMiddleware(middleware.route)));
                    }
                }
                // Wait for the response handler to finish
                yield responseHandler.route.handler(request, response, additionalData);
                return response.buildResponse();
            }
        });
    }
    /**
     * Used internally for creating a route with a certain method
     * @param {RouteOptions} options
     * @returns {Route}
     */
    createRoute(options) {
        if (options.method !== "ANY" && options.handler instanceof Router) {
            throw new Error(`Cannot have handler as instance of Router if method is not ANY!`);
        }
        const createdRoute = new Route(this, Object.assign({}, options));
        this.routes.push(createdRoute);
        return createdRoute;
    }
    use(path, handler) {
        if (handler instanceof Router) {
            // Since it's a router, we need to adjust its base path and parent router
            handler.setBasePath(this.fixPath(path));
            handler.setParentRouter(this);
            this.createRoute({
                path,
                handler,
                method: "ANY",
                isMiddleware: false
            });
        }
        else {
            this.createRoute({
                path,
                handler,
                method: "ANY",
                isMiddleware: true
            });
        }
    }
    get(path, handler) {
        this.createRoute({
            path,
            handler,
            method: "GET",
            isMiddleware: false
        });
    }
    post(path, handler) {
        this.createRoute({
            path,
            handler,
            method: "POST",
            isMiddleware: false
        });
    }
    options(path, handler) {
        this.createRoute({
            path,
            handler,
            method: "OPTIONS",
            isMiddleware: false
        });
    }
    head(path, handler) {
        this.createRoute({
            path,
            handler,
            method: "HEAD",
            isMiddleware: false
        });
    }
    delete(path, handler) {
        this.createRoute({
            path,
            handler,
            method: "DELETE",
            isMiddleware: false
        });
    }
    /**
     * Fixing the input path to make sure it's consistent in regards of the slashes (/)
     * @param {string} path
     * @returns {string}
     */
    fixPath(path) {
        path = `${this.basePath || "/"}${path.startsWith("/") ? path.slice(1) : path}`;
        if (!path.endsWith("/") && !NO_APPEND_SLASH_IF_CHARACTERS.some(char => path.endsWith(char))) {
            path += "/";
        }
        return path;
    }
    /**
     * Creating a URLPattern instance based on the input path (NOTE: MUST HAVE WENT THROUGH Router.fixPath first!)
     * @param {string} path
     * @returns {UrlPattern}
     */
    createUrlPattern(path) {
        return new url_pattern_1.default(path);
    }
    /**
     * Sets the base path for the Router, and updates all the belonging routes with the new base path
     * Returns a string with the new base path
     * @param {string} path
     * @returns {string}
     * @private
     */
    setBasePath(path) {
        // Since Router.fixPath appends the existing basePath, we don't want it to add the already existing one
        this.basePath = "/";
        this.basePath = this.fixPath(path || "/");
        // New array for the routes that have been updated with the new base path
        const newRoutes = [];
        for (const oldRoute of this.routes) {
            const newRoute = this.createRoute({
                path: oldRoute.path.inputPath,
                handler: oldRoute.handler,
                method: oldRoute.method,
                isMiddleware: oldRoute.isMiddleware
            });
            newRoutes.push(newRoute);
        }
        this.routes = newRoutes;
        return this.basePath;
    }
    setParentRouter(parent) {
        this.parent = parent;
        this.main = this.getMainRouter();
    }
}
exports.default = Router;
