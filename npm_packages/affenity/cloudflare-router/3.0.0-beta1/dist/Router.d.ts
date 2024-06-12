import UrlPattern from "url-pattern";
import { Debugger } from "debug";
import RouterResponse from "./RouterResponse";
import RouterRequest from "./RouterRequest";
export declare type Methods = "ANY" | "GET" | "POST" | "PUT" | "PATCH" | "OPTIONS" | "HEAD" | "DELETE";
export declare type RouteHandler = (request: RouterRequest, response: RouterResponse, next?: (proceed: boolean) => void) => any;
declare class RouterPath {
    rawInput: string;
    fixed: string;
    pattern: UrlPattern;
    constructor(rawInput: string, fixed: string);
}
declare class Route<DataType = any> {
    router: Router;
    method: Methods;
    path: RouterPath;
    handler: RouteHandler | Router;
    isMiddleware: boolean;
    constructor(router: Router, options: {
        inputPath: string;
        method: Methods;
        handler: RouteHandler | Router;
        isMiddleware: boolean;
    });
    matchesPath(path: string): any;
}
declare type RouterOptions = {
    customResponseBuilder?: (routerResponse: RouterResponse) => Response;
};
export default class Router<Env = {
    [key: string]: string;
}> {
    routes: Route[];
    basePath: string | null;
    debugger: Debugger;
    routerOptions: RouterOptions;
    constructor();
    setCustomResponseBuilder(responseBuilder: RouterOptions["customResponseBuilder"]): this;
    use(arg0: string | Router<Env> | RouteHandler, arg1?: Router<Env> | RouteHandler): void;
    addPathHandler(options: {
        method: Methods;
        path: string;
        handler: RouteHandler;
        isMiddleware?: boolean;
    }): void;
    get(path: string, handler: RouteHandler): void;
    post(path: string, handler: RouteHandler): void;
    options(path: string, handler: RouteHandler): void;
    head(path: string, handler: RouteHandler): void;
    delete(path: string, handler: RouteHandler): void;
    any(path: string, handler: RouteHandler): void;
    getMatchingRoutesByPath(totalPath: string, fillArray?: {
        route: Route;
        match: any;
    }[]): {
        route: Route;
        match: any;
    }[];
    getMatchingRoutesByPathAndMethod(path: string, method: Methods): {
        route: Route<any>;
        match: any;
    }[];
    fixHandlerPath(inputPath: string): string;
    fixUsePath(arg0: string): string;
    refreshRoutes(): void;
    processRequest(routerRequest: RouterRequest, routerResponse: RouterResponse): Promise<import("./RouterResponse").BuiltResponse>;
    finishResponse(routerRequest: RouterRequest, routerResponse: RouterResponse): import("./RouterResponse").BuiltResponse;
    executeMiddleware(middleware: Route, routerRequest: RouterRequest, routerResponse: RouterResponse): Promise<boolean>;
    serveRequest(request: Request): Promise<import("./RouterResponse").BuiltResponse>;
}
export {};
