import UrlPattern from "url-pattern";
import { Debugger } from "debug";
import RouterResponse from "./RouterResponse";
import RouterRequest from "./RouterRequest";
export declare type Methods = "ANY" | "GET" | "POST" | "PUT" | "PATCH" | "OPTIONS" | "HEAD" | "DELETE";
export declare type RouteHandler<ExtraData = any> = (request: RouterRequest<ExtraData>, response: RouterResponse, next?: (proceed: boolean) => void) => any;
declare class RouterPath {
    rawInput: string;
    fixed: string;
    pattern: UrlPattern;
    constructor(rawInput: string, fixed: string);
}
declare class Route<ExtraData = any> {
    router: Router;
    method: Methods;
    path: RouterPath;
    handler: RouteHandler<ExtraData> | Router;
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
    onErrorCallback?: (request: RouterRequest, response: RouterResponse, error: Error) => Promise<any>;
    onNotFoundCallback?: (request: RouterRequest, response: RouterResponse) => Promise<any>;
};
export default class Router<ExtraDataType = any> {
    routes: Route<ExtraDataType>[];
    basePath: RouterPath | null;
    debugger: Debugger;
    routerOptions: RouterOptions;
    constructor();
    logInternal(message: string): void;
    setCustomResponseBuilder(responseBuilder: RouterOptions["customResponseBuilder"]): this;
    handleOnError(callback: (request: RouterRequest<ExtraDataType>, response: RouterResponse, error: Error) => any): void;
    handleNotFound(callback: (request: RouterRequest<ExtraDataType>, response: RouterResponse) => any): void;
    use(arg0: string | Router<ExtraDataType> | RouteHandler<ExtraDataType>, arg1?: Router<ExtraDataType> | RouteHandler<ExtraDataType>): void;
    addPathHandler(options: {
        method: Methods;
        path: string;
        handler: RouteHandler<ExtraDataType>;
        isMiddleware?: boolean;
    }): void;
    get(path: string, handler: RouteHandler<ExtraDataType>): void;
    post(path: string, handler: RouteHandler<ExtraDataType>): void;
    options(path: string, handler: RouteHandler<ExtraDataType>): void;
    head(path: string, handler: RouteHandler<ExtraDataType>): void;
    delete(path: string, handler: RouteHandler<ExtraDataType>): void;
    any(path: string, handler: RouteHandler<ExtraDataType>): void;
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
    processRequest(routerRequest: RouterRequest<ExtraDataType>, routerResponse: RouterResponse): Promise<import("./RouterResponse").BuiltResponse>;
    finishResponse(routerRequest: RouterRequest, routerResponse: RouterResponse): import("./RouterResponse").BuiltResponse;
    executeMiddleware(middleware: Route, routerRequest: RouterRequest, routerResponse: RouterResponse): Promise<boolean>;
    serveRequest(request: Request, extraData?: ExtraDataType): Promise<import("./RouterResponse").BuiltResponse>;
}
export {};
