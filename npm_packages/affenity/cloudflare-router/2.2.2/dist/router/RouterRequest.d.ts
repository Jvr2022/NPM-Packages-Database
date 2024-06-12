/// <reference types="node" />
import qs from "querystring";
import Router, { Methods } from "./Router";
import Route from "./Route";
export default class RouterRequest<AdditionalDataType extends unknown> {
    /**
     * The (main) router creating this request class instance
     * @type {Router<AdditionalDataType>}
     */
    mainRouter: Router<AdditionalDataType>;
    /**
     * The actual, "raw" request that was provided in .serveRequest()
     * @type {Request}
     */
    incomingRequest: Request;
    /**
     * Any additional data that originated from the .serveRequest() method
     * @type {AdditionalDataType | null}
     */
    additionalData: AdditionalDataType | null;
    /**
     * The URL that the request hit
     * @type {string}
     */
    url: string;
    /**
     * Data about the URL
     * @type {URL}
     */
    urlData: URL;
    /**
     * The absolute path that this request was aiming for
     * @type {string}
     */
    path: string;
    /**
     * Any query parameters that was included in the request URL
     * @type {qs.ParsedUrlQuery}
     */
    query: qs.ParsedUrlQuery;
    /**
     * The HTTP method of the request.
     * @type {Methods}
     */
    method: Methods;
    /**
     * Whether the body was used or not
     * @type {boolean}
     */
    bodyUsed: boolean;
    /**
     * The body (unprocessed) from the incoming request
     * @type {unknown}
     */
    body?: unknown | null;
    /**
     * The headers originating from the request. All names were lowercased (not values, just the header names)
     * @type {Record<string, string>}
     */
    headers: Record<string, string>;
    /**
     * If you set up a /hello/:name route, the value of :name will show up in the matchedParams object
     * @type {Record<string, string>}
     */
    matchedParams?: Record<string, string>;
    /**
     * The route that matched to this request (if any)
     * @type {Route<AdditionalDataType> | null}
     */
    matchedRoute: Route<AdditionalDataType> | null;
    constructor(mainRouter: Router<AdditionalDataType>, incomingRequest: Request, additionalData?: AdditionalDataType);
    /**
     * Fixes the request URL to make sure it can be processed by the other parts of this library
     * @param {string} url
     * @returns {string}
     */
    static fixRequestUrl(url: string): string;
    /**
     * Sets the route that this request matched with
     * @param {Route<AdditionalDataType>} route
     */
    setMatchedRoute(route: Route<AdditionalDataType>): void;
    /**
     * Sets the params that this request matched with
     * @param {Record<string, string>} params
     */
    setMatchedParams(params: Record<string, string>): void;
    /**
     * Parses the headers from the incoming request and adds them to an object
     * All header names will be converted to lower case before adding to the object.
     */
    parseHeaders(): Record<string, string>;
}
