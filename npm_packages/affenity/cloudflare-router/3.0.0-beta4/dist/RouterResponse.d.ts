import RouterRequest from "./RouterRequest";
import Router from "./Router";
export declare type ResponseBodyType = string | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream<Uint8Array> | null | undefined;
export declare type BuiltResponse = {
    tasks: Promise<any>[];
    response: Response;
    routerResponse: RouterResponse;
    routerRequest: RouterRequest;
};
export default class RouterResponse {
    router: Router;
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
    routerRequest: RouterRequest;
    locals: Record<any, any>;
    constructor(router: Router, routerRequest: RouterRequest);
    setHeader(name: string, value: string): this;
    json(data: any): this;
    raw(body: ResponseBodyType, contentType: string): this;
    text(text: string): this;
    status(statusText: string): this;
    statusCode(statusCode: number): this;
    addTask(task: Promise<any> | Promise<any>[]): this;
    redirect(redirectUrl: string, statusCode?: number): this;
    setCustomResponse(response: Response): this;
    setContentType(contentType: string): this;
    transformResponseOptions(): {
        status: number;
        statusText: string;
        headers: Headers;
    };
    build(): BuiltResponse;
}
