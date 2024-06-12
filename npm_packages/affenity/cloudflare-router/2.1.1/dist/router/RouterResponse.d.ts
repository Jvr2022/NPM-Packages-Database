import RouterRequest from "./RouterRequest";
import Route from "./Route";
export declare type ResponseBodyType = string | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream<Uint8Array> | null | undefined;
/**
 * The result of the response.build() call, which generates the final response from the cloudflare-router library
 */
export declare type BuiltResponseObject<AdditionalDataType extends unknown> = {
    tasks: Promise<unknown>[];
    response: Response;
    routerResponse: RouterResponse<AdditionalDataType>;
    routerRequest: RouterRequest<AdditionalDataType>;
};
export default class RouterResponse<AdditionalDataType extends unknown> {
    /**
     * Used internally as a temporary thing to hold on values before the .build() method is called
     * @type {{type: "normal" | "redirect" | "custom", status: string, statusCode: number, headers: Record<string, string>, cookies: Record<string, string>, tasks: Promise<unknown>[], body: ResponseBodyType, redirect: {redirectToUrl?: string, redirectStatusCode?: number}, customResponse?: Response}}
     */
    responseOptions: {
        /**
         * Whether the response is "normal", a redirect or if the user wants to return a custom response
         */
        type: "normal" | "redirect" | "custom";
        /**
         * The status (text) of the response
         */
        status: string;
        /**
         * The status (code) of the response
         */
        statusCode: number;
        /**
         * The headers to be sent to the client
         */
        headers: Record<string, string>;
        /**
         * Any remaining tasks that should be handled even after the request was finished.
         */
        tasks: Promise<unknown>[];
        /**
         * The body of the response tha will be sent to the client
         */
        body: ResponseBodyType;
        /**
         * Information regarding the redirect if the type is set to "redirect"
         */
        redirect: {
            /**
             * The URL to redirect to
             */
            redirectToUrl?: string;
            /**
             * The status code of the redirect, default is 302 (temporary)
             */
            redirectStatusCode?: number;
        };
        /**
         * If the user wants to provide a custom response that should be returned instead of processing by
         * cloudflare-router
         */
        customResponse?: Response;
    };
    /**
     * The RouterRequest class instance of the request
     * @type {RouterRequest<AdditionalDataType>}
     */
    routerRequest: RouterRequest<AdditionalDataType>;
    /**
     * The route that the request matched to
     * @type {Route<AdditionalDataType> | null}
     */
    matchedRoute: Route<AdditionalDataType> | null;
    /**
     * Used as a temporary "cache" to share data between middlewares and the response handler (i.e. auth status)
     * @type {Record<any, any>}
     */
    locals: Record<any, any>;
    /**
     * Creates a RouterResponse class instance.
     * @param {RouterRequest<AdditionalDataType>} routerRequest
     */
    constructor(routerRequest: RouterRequest<AdditionalDataType>);
    /**
     * Sets the route that the RouterRequest matched to
     * @param {Route<AdditionalDataType>} route
     */
    setMatchedRoute(route: Route<AdditionalDataType>): void;
    /**
     * Stringifies the input data into JSON and sends to the client (also automatically sets content-type to json)
     * @param data
     * @returns {this}
     */
    json(data: unknown): this;
    /**
     * Sends "raw" input data to the client (without processing from cloudflare-router), specify content type in 2nd
     * parameter
     * @param {ResponseBodyType} body
     * @param {string} contentType
     * @returns {this}
     */
    raw(body: ResponseBodyType, contentType: string): this;
    /**
     * Sends the input text to the user (overrides the body property) and automatically sets content type to text.
     * @param {string} text
     * @returns {this}
     */
    text(text: string): this;
    /**
     * Sets the status (text) for this response that's sent to the client.
     * @param {string} statusText
     * @returns {this}
     */
    status(statusText: string): this;
    /**
     * Sets the status code) for this response that's sent to the client.
     * @param {number} statusCode
     * @returns {this}
     */
    statusCode(statusCode: number): this;
    /**
     * Adds any tasks that should still be complete even after the request has finished.
     * @param {Promise<unknown> | Promise<unknown>[]} tasks
     * @returns {this}
     */
    addTasks(tasks: Promise<unknown> | Promise<unknown>[]): this;
    /**
     * Makes the response a redirect response, redirecting the user to the specified link, the default status code
     * is 302 (temporary)
     * @param {string} redirectUrl
     * @param {number} redirectStatusCode
     * @returns {this}
     */
    redirectTo(redirectUrl: string, redirectStatusCode?: number): this;
    /**
     * Sets a custom response if the user wants to return their own processed response object
     * @param {Response} response
     * @returns {this}
     */
    setCustomResponse(response: Response): this;
    /**
     * Sets the content type of the response (does not process the body etc. regardless of content-type provided)
     * @param {string} contentType
     * @returns {this}
     */
    setContentType(contentType: string): this;
    /**
     * Turns the status code, staus text and headers into an object for further processing of the cloudflare-router
     * library
     * @returns {{headers: Headers, statusText: string, status: number}}
     */
    transformResponseOptions(): {
        status: number;
        statusText: string;
        headers: Headers;
    };
    /**
     * Builds a final response data to be returned to the .serveRequest() method.
     * @returns {BuiltResponseObject<AdditionalDataType>}
     */
    build(): BuiltResponseObject<AdditionalDataType>;
}
