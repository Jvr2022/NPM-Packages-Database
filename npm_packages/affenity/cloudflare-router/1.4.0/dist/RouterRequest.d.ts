/// <reference types="node" />
import { Methods, Route } from "./Router";
import qs from "querystring";
import { IncomingRequest } from "./interfaces";
export declare class RouterRequest<AdditionalDataType extends unknown> {
    request: IncomingRequest;
    additionalData: AdditionalDataType | null;
    url: string;
    urlData: URL;
    path: string;
    query: qs.ParsedUrlQuery;
    method: Methods;
    bodyUsed: boolean;
    headers: Record<string, string>;
    cookies: Record<string, string>;
    /**
     * Allows for middlewares to add data to the request type-safe
     * @type {Map<any, any>}
     */
    data: Map<any, any>;
    /**
     * The route that was found with the request
     * @type {Route<AdditionalDataType>}
     */
    route?: Route<AdditionalDataType>;
    /**
     * The body if existent
     * @type {unknown}
     */
    body?: unknown;
    /**
     * The params for the route, if any
     * NOTE: This will be set by the Router once the fitting route has been found
     * @type {Record<string, string>}
     */
    params?: Record<string, string>;
    constructor(request: IncomingRequest, additionalData?: AdditionalDataType);
    static fixRequestUrl(url: string): string;
    setRoute(route: Route<AdditionalDataType>): void;
    setParams(params: Record<string, string>): void;
    private parseHeaders;
}
