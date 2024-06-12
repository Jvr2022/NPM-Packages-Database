import RouterRequest from "./RouterRequest";
import { CookieSerializeOptions } from "cookie";
import { Route } from "./Router";
export declare type BodyType = string | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream<Uint8Array> | null | undefined;
export declare type BuiltResponse<AdditionalDataType> = {
    response: unknown;
    routerResponse: RouterResponse<AdditionalDataType>;
    routerRequest: RouterRequest<AdditionalDataType>;
    tasks: Promise<unknown>[];
};
export default class RouterResponse<AdditionalDataType extends any> {
    /**
     * The route that initiated by the request
     * @type {Route<AdditionalDataType>}
     */
    route?: Route<AdditionalDataType>;
    /**
     * The processed request
     * @type {RouterRequest<AdditionalDataType>}
     */
    request: RouterRequest<AdditionalDataType>;
    /**
     * Internal data for the RouterResponse, to retrieve as normal data call .buildResponse()
     * @type {{type: "normal" | "redirect", status: string, statusCode: number, headers: Record<string, string>, cookies: Record<string, string>, tasks: Promise<unknown>[], contentType: string, body: BodyType, redirect?: {url: string}, response?: Response}}
     */
    response: {
        type: "normal" | "redirect";
        status: string;
        statusCode: number;
        headers: Record<string, string>;
        cookies: Record<string, string>;
        tasks: Promise<unknown>[];
        contentType: string;
        body: BodyType;
        /**
         * If we want to redirect
         */
        redirect?: {
            url: string;
        };
        /**
         * If the user wants to provide custom response
         */
        response?: Response;
    };
    constructor(request: RouterRequest<AdditionalDataType>);
    setRoute(route: Route<AdditionalDataType>): void;
    json(data: unknown): this;
    raw(body: BodyType, contentType: string): this;
    text(text: string): this;
    status(status: string): this;
    statusCode(statusCode: number): this;
    addTasks(tasks: Promise<unknown> | Promise<unknown>[]): this;
    setHeader(name: string, value: string): this;
    setCookie(name: string, value: string, options?: CookieSerializeOptions): this;
    redirect(url: string, statusCode: number): this;
    setCustomResponse(response: Response): this;
    transformOptions(): Record<string, unknown>;
    buildResponse(): BuiltResponse<AdditionalDataType>;
}
