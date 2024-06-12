import UrlPattern from "url-pattern";
import { IncomingRequest } from "./interfaces";
import RouterRequest from "./RouterRequest";
import RouterResponse from "./RouterResponse";
/**
 * Methods that can be used for the Route, use "ANY" for any methods
 * Default is "GET"
 */
export declare type Methods = "ANY" | "GET" | "POST" | "PUT" | "PATCH" | "OPTIONS" | "HEAD" | "DELETE";
/**
 * Options for creating a new Route
 */
export interface RouteOptions<AdditionalDataType extends unknown> {
    /**
     * The path that this Route will be "listening" for, raw
     */
    path: string;
    /**
     * The function that will be called if the incoming request matches the Route's criteria
     */
    handler: RouteHandler<AdditionalDataType>;
    /**
     * The specified method that this Route will be "accepting"
     * Use "ANY" if it's any method, default is "GET"
     */
    method?: Methods;
    /**
     * Whether this route is a middleware or not
     * NOTE: If the provided handler is instance of Router, this value will be ignored
     */
    isMiddleware?: boolean;
}
/**
 * The function that will be called if the incoming request matches a route's criteria
 */
export declare type RouteFunctionHandler<AdditionalDataType> = (request: RouterRequest<AdditionalDataType>, response: RouterResponse<AdditionalDataType>, additionalData?: AdditionalDataType) => void;
/**
 * The handler that will be used if the request matches the route's criteria
 */
export declare type RouteHandler<AdditionalDataType extends unknown> = Router<AdditionalDataType> | RouteFunctionHandler<AdditionalDataType>;
export declare class Route<AdditionalDataType extends unknown> {
    /**
     * The router that created this route
     * @type {Router}
     */
    router: Router<AdditionalDataType>;
    /**
     * The method this route accepts
     * @type {RouteOptions["method"]}
     */
    method: Methods;
    path: {
        /**
         * The URL pattern used for matching incoming requests
         */
        pattern: UrlPattern;
        /**
         * The path the library has parsed and formatted / fixed accordingly
         */
        formattedPath: string;
        /**
         * The path provided to the library
         */
        inputPath: string;
    };
    /**
     * The function that will be called if the incoming request matches the criteria for this route
     * @type {RouteHandler}
     */
    handler: RouteHandler<AdditionalDataType>;
    /**
     * If the route provided is a middleware or not, this will affect how the incoming request will be processed
     * by this route.
     * @type {boolean}
     */
    isMiddleware: boolean;
    /**
     * If the handler is a Router
     */
    isRouterHandler: boolean;
    /**
     * Creates a new Route
     * @param {Router} router
     * @param {RouteOptions} options
     */
    constructor(router: Router<AdditionalDataType>, options: RouteOptions<AdditionalDataType>);
    matchPath(request: RouterRequest<AdditionalDataType>): null | unknown;
    match(request: RouterRequest<AdditionalDataType>): {
        pathMatch: unknown;
        doesMatch: boolean;
    };
}
interface RouterOptions<AdditionalDataType extends any> {
    /**
     * Used internally when using multiple routers for organizational purposes. For example router.use("/api", apiRouter)
     * Then the basePath will be used to let the apiRouter start with /api.
     */
    basePath?: string;
    /**
     * If true, cloudflare-router will wait for each middleware to finish before moving on to the next one, using await
     * Otherwise, it will process the middlewares in no specified order using Promise.all
     * Default: true
     */
    waterfallMiddleware?: boolean;
    /**
     * If you want custom logic to return a response object
     * This is useful if you want to implement testing
     */
    customResponseTransformer?: (data: RouterResponse<AdditionalDataType>["response"]) => unknown;
    /**
     * (Internal use): The parent router
     */
    parent?: Router<AdditionalDataType>;
}
declare type MatchingRoute<AdditionalDataType> = {
    route: Route<AdditionalDataType>;
    match: Exclude<any, "undefined">;
};
declare class Router<AdditionalDataType extends unknown> {
    basePath: string;
    isWaterfall: boolean;
    routes: Route<AdditionalDataType>[];
    customResponseTransformer?: RouterOptions<AdditionalDataType>["customResponseTransformer"];
    /**
     * The "parent" of all the routers, which will be processing the incoming requests
     * @type {Router<AdditionalDataType> | null}
     */
    parent: Router<AdditionalDataType> | null;
    /**
     * The main Router
     * @type {Router<AdditionalDataType>}
     */
    main: Router<AdditionalDataType>;
    /**
     * Creates a new Router
     * @param {RouterOptions} options
     */
    constructor(options?: RouterOptions<AdditionalDataType>);
    /**
     * Recursively goes up and finds the main router
     * @returns {Router<AdditionalDataType>}
     */
    getMainRouter(): Router<AdditionalDataType>;
    findMatchingRoutes(request: RouterRequest<AdditionalDataType>): MatchingRoute<AdditionalDataType>[];
    serve(request: RouterRequest<AdditionalDataType> | IncomingRequest, additionalData?: AdditionalDataType, response?: RouterResponse<AdditionalDataType>): Promise<any>;
    /**
     * Used internally for creating a route with a certain method
     * @param {RouteOptions} options
     * @returns {Route}
     */
    createRoute(options: RouteOptions<AdditionalDataType>): Route<AdditionalDataType>;
    use(path: string, handler: RouteHandler<AdditionalDataType>): void;
    get(path: string, handler: RouteHandler<AdditionalDataType>): void;
    post(path: string, handler: RouteHandler<AdditionalDataType>): void;
    options(path: string, handler: RouteFunctionHandler<AdditionalDataType>): void;
    head(path: string, handler: RouteFunctionHandler<AdditionalDataType>): void;
    delete(path: string, handler: RouteFunctionHandler<AdditionalDataType>): void;
    /**
     * Fixing the input path to make sure it's consistent in regards of the slashes (/)
     * @param {string} path
     * @returns {string}
     */
    fixPath(path: string): string;
    /**
     * Creating a URLPattern instance based on the input path (NOTE: MUST HAVE WENT THROUGH Router.fixPath first!)
     * @param {string} path
     * @returns {UrlPattern}
     */
    createUrlPattern(path: string): UrlPattern;
    /**
     * Sets the base path for the Router, and updates all the belonging routes with the new base path
     * Returns a string with the new base path
     * @param {string} path
     * @returns {string}
     * @private
     */
    private setBasePath;
    private setParentRouter;
}
export default Router;
