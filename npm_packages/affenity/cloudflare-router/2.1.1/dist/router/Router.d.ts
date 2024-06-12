import Route, { RouteHandler, RouteOptions } from "./Route";
import RouterRequest from "./RouterRequest";
import RouterResponse, { BuiltResponseObject } from "./RouterResponse";
export declare type Methods = "ANY" | "GET" | "POST" | "PUT" | "PATCH" | "OPTIONS" | "HEAD" | "DELETE";
export interface RouterOptions<AdditionalDataType extends unknown> {
    basePath?: string;
    waterfallHandling?: boolean;
    parent?: Router<AdditionalDataType>;
    customResponseBuilder?: (routerResponse: RouterResponse<AdditionalDataType>) => any;
}
export declare type MatchingRoute<AdditionalDataType> = {
    route: Route<AdditionalDataType>;
    match: Exclude<any, "undefined">;
};
export default class Router<AdditionalDataType extends unknown> {
    basePath: string;
    isWaterfallHandling: boolean;
    routes: Route<AdditionalDataType>[];
    /**
     * If this is a sub-router of another Router, this property will be defined with the Router that's connected to this
     * @type {Router<AdditionalDataType> | null}
     */
    parentRouter: Router<AdditionalDataType> | null;
    /**
     * The main router that connects all other routers
     * @type {Router<AdditionalDataType> | null}
     */
    mainRouter: Router<AdditionalDataType> | null;
    /**
     * All router instances will be assigned to false by default, because only the router that's called
     * using .serve() will be considered the main router.
     * @type {boolean}
     */
    isMainRouter: boolean;
    /**
     * If you want to build your own responses from the data collected from your application, you do it here
     * The only argument in the callback function is the RouterResponse instance.
     * @type {RouterOptions<AdditionalDataType>["customResponseBuilder"]}
     */
    customResponseBuilder: RouterOptions<AdditionalDataType>["customResponseBuilder"];
    /**
     * Creates a new Router. Only one router can be used for .serveRequest(), attempting to use multiple routers for
     * this will result in an error.
     * @param {RouterOptions<AdditionalDataType>} options
     */
    constructor(options?: RouterOptions<AdditionalDataType>);
    /**
     * Used internally when the router.use() method is called to update the descendants of the router (all connected
     * routers and routes)
     * @param {string} newBasePath
     * @param {Router<AdditionalDataType>} parentRouter
     */
    init(newBasePath: string, parentRouter?: Router<AdditionalDataType>): void;
    /**
     * Returns a "fixed" path of the input path, setting up basePath and similar
     * @param {string} inputPath
     * @returns {string}
     */
    fixPath(inputPath: string): string;
    /**
     * Updates the routes this router has set up. Used internally on router.init() (which is also called internally)
     */
    updateSelfRoutes(): void;
    /**
     * Used internally as a standardized way of registering routes. Normally you want to use .get() or .post(), but
     * this method is also available. This will only create a route, not apply it to the router. Use
     * router.createRouteAndAdd() to add the route to the router automatically.
     * @param {RouteOptions<AdditionalDataType>} options
     * @returns {Route<AdditionalDataType>}
     */
    createRoute(options: RouteOptions<AdditionalDataType>): Route<AdditionalDataType>;
    /**
     * Creates a route and adds it to the current router instance. Used internally to standardize the way of creating
     * routes. Normally you'll want to use .get() or .post() to set up routes.
     * @param {RouteOptions<AdditionalDataType>} options
     * @returns {Route<AdditionalDataType>}
     */
    createRouteAndAdd(options: RouteOptions<AdditionalDataType>): Route<AdditionalDataType>;
    /**
     * Sets up a middleware for a certain path. Use router.any() to process requests with any method
     * @param {string | RouteHandler<AdditionalDataType>} arg0
     * @param {RouteHandler<AdditionalDataType>} arg1
     */
    use(arg0: string | RouteHandler<AdditionalDataType>, arg1?: RouteHandler<AdditionalDataType>): void;
    /**
     * Makes it easier to set up a batch of .use "commands". Provide the array with (optional) pathname and the
     * handler for it.
     * @param {{path?: string, handler: RouteHandler<AdditionalDataType>}[]} list
     */
    useBulk(list: {
        path?: string;
        handler: RouteHandler<AdditionalDataType>;
    }[]): void;
    /**
     * Used internally, which will declare this router as the main router. Note there can only be one main router,
     * otherwise unexpected issues can arise, and will most likely throw errors.
     */
    assignSelfAsMainRouter(): void;
    /**
     * Used internally to recursively look for routes that match the path and method. Will return anything that matches
     * regardless if it's a middleware or not. Anything that's a route will be returned as long as it matches.
     * @param {RouterRequest<AdditionalDataType>} request
     * @returns {MatchingRoute<AdditionalDataType>[]}
     */
    findMatchingRoutes(request: RouterRequest<AdditionalDataType>): MatchingRoute<AdditionalDataType>[];
    /**
     * Adds a handler for a request that hits this path using the GET HTTP method.
     * @param {string} path
     * @param {RouteHandler<AdditionalDataType>} handler
     */
    get(path: string, handler: RouteHandler<AdditionalDataType>): void;
    /**
     * Adds a handler for a request that hits this path using the POST HTTP method.
     * @param {string} path
     * @param {RouteHandler<AdditionalDataType>} handler
     */
    post(path: string, handler: RouteHandler<AdditionalDataType>): void;
    /**
     * Adds a handler for a request that hits this path using the OPTIONS HTTP method.
     * @param {string} path
     * @param {RouteHandler<AdditionalDataType>} handler
     */
    options(path: string, handler: RouteHandler<AdditionalDataType>): void;
    /**
     * Adds a handler for a request that hits this path using the HEAD HTTP method.
     * @param {string} path
     * @param {RouteHandler<AdditionalDataType>} handler
     */
    head(path: string, handler: RouteHandler<AdditionalDataType>): void;
    /**
     * Adds a handler for a request that hits this path using the DELETE HTTP method.
     * @param {string} path
     * @param {RouteHandler<AdditionalDataType>} handler
     */
    delete(path: string, handler: RouteHandler<AdditionalDataType>): void;
    /**
     * Adds a handler for a request that hits this path regardless of the method used.
     * @param {string} path
     * @param {RouteHandler<AdditionalDataType>} handler
     */
    any(path: string, handler: RouteHandler<AdditionalDataType>): void;
    /**
     * Used internally for further processing of the request (and getting a response from the application)
     * @param {RouterRequest<AdditionalDataType>} routerRequest
     * @param {RouterResponse<AdditionalDataType>} routerResponse
     * @returns {Promise<BuiltResponseObject<AdditionalDataType>>}
     */
    processRequest(routerRequest: RouterRequest<AdditionalDataType>, routerResponse: RouterResponse<AdditionalDataType>): Promise<BuiltResponseObject<AdditionalDataType>>;
    /**
     * Used internally when the response instance is finalized and ready to return the response data.
     * @param {RouterRequest<AdditionalDataType>} _request
     * @param {RouterResponse<AdditionalDataType>} response
     * @returns {Promise<BuiltResponseObject<AdditionalDataType>>}
     */
    finishResponse(_request: RouterRequest<AdditionalDataType>, response: RouterResponse<AdditionalDataType>): Promise<BuiltResponseObject<AdditionalDataType>>;
    /**
     * Used internally when wanting to execute a middleware (running it, not.. beheading it.. jeez). It returns a
     * promise which contains a boolean indicating the success status. If one middleware is failing or wants to abort
     * further processing, next(true) is used to indicate this.
     * @param {Route<AdditionalDataType>} middleware
     * @param {RouterRequest<AdditionalDataType>} request
     * @param {RouterResponse<AdditionalDataType>} response
     * @returns {Promise<boolean>}
     */
    executeMiddleware(middleware: Route<AdditionalDataType>, request: RouterRequest<AdditionalDataType>, response: RouterResponse<AdditionalDataType>): Promise<boolean>;
    /**
     * The method to serve the incoming request and pass it on to cloudflare-router for processing. Use only this
     * method unless you know what you're doing.
     * @param {Request} incomingRequest
     * @param {AdditionalDataType} additionalData
     * @returns {Promise<BuiltResponseObject<AdditionalDataType>>}
     */
    serveRequest(incomingRequest: Request, additionalData: AdditionalDataType): Promise<BuiltResponseObject<AdditionalDataType>>;
    /**
     * Used internally for getting the router which is considered the main router. There can (*should*) only be one
     * main router, otherwise unexpected issues may arise, and errors will most likely be thrown.
     * @returns {Router<AdditionalDataType>}
     */
    getMainRouter(): Router<AdditionalDataType>;
}
