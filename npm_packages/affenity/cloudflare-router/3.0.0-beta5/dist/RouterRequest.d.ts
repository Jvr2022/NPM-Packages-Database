/// <reference types="node" />
import Router, { Methods } from "./Router";
import { ParsedUrlQuery } from "querystring";
export default class RouterRequest<ExtraDataType = any> {
    router: Router;
    rawRequest: Request;
    url: string;
    urlData: URL;
    path: string;
    query: ParsedUrlQuery;
    method: Methods;
    bodyUsed: boolean;
    body: any;
    headers: Record<string, string>;
    matchedParams: Record<string, string> | null;
    extraData?: ExtraDataType | null;
    constructor(router: Router, rawRequest: Request, options: {
        extraData?: ExtraDataType | null;
    });
    /**
     * Fixes the request URL to make sure it can be processed by the other parts of this library
     * @param {string} url
     * @returns {string}
     */
    static fixRequestUrl(url: string): string;
    /**
     * Parses the headers from the incoming request and adds them to an object
     * All header names will be converted to lower case before adding to the object.
     */
    parseHeaders(): Record<string, string>;
}
