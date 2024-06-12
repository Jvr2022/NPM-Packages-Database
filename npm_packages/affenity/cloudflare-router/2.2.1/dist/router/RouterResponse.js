"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouterResponse {
    /**
     * Creates a RouterResponse class instance.
     * @param {RouterRequest<AdditionalDataType>} routerRequest
     */
    constructor(mainRouter, routerRequest) {
        this.mainRouter = mainRouter;
        this.responseOptions = {
            type: "normal",
            status: "OK",
            statusCode: 200,
            headers: {},
            tasks: [],
            body: undefined,
            redirect: {}
        };
        this.routerRequest = routerRequest;
        this.matchedRoute = null;
        this.locals = {};
    }
    /**
     * Sets the route that the RouterRequest matched to
     * @param {Route<AdditionalDataType>} route
     */
    setMatchedRoute(route) {
        this.matchedRoute = route;
    }
    /**
     * Adds a header entry to the response
     * @param {string} name
     * @param {string} value
     * @returns {this}
     */
    setHeader(name, value) {
        this.responseOptions.headers[name] = value;
        return this;
    }
    /**
     * Stringifies the input data into JSON and sends to the client (also automatically sets content-type to json)
     * @param data
     * @returns {this}
     */
    json(data) {
        this.responseOptions.body = JSON.stringify(data);
        this.setContentType("application/json");
        return this;
    }
    /**
     * Sends "raw" input data to the client (without processing from cloudflare-router), specify content type in 2nd
     * parameter
     * @param {ResponseBodyType} body
     * @param {string} contentType
     * @returns {this}
     */
    raw(body, contentType) {
        this.responseOptions.body = body;
        this.setContentType(contentType);
        return this;
    }
    /**
     * Sends the input text to the user (overrides the body property) and automatically sets content type to text.
     * @param {string} text
     * @returns {this}
     */
    text(text) {
        this.responseOptions.body = text;
        this.setContentType("text/plain");
        return this;
    }
    /**
     * Sets the status (text) for this response that's sent to the client.
     * @param {string} statusText
     * @returns {this}
     */
    status(statusText) {
        this.responseOptions.status = statusText;
        return this;
    }
    /**
     * Sets the status code) for this response that's sent to the client.
     * @param {number} statusCode
     * @returns {this}
     */
    statusCode(statusCode) {
        this.responseOptions.statusCode = statusCode;
        return this;
    }
    /**
     * Adds any tasks that should still be complete even after the request has finished.
     * @param {Promise<unknown> | Promise<unknown>[]} tasks
     * @returns {this}
     */
    addTasks(tasks) {
        tasks = Array.isArray(tasks) ? tasks : [tasks];
        this.responseOptions.tasks = [...this.responseOptions.tasks, ...tasks];
        return this;
    }
    /**
     * Makes the response a redirect response, redirecting the user to the specified link, the default status code
     * is 302 (temporary)
     * @param {string} redirectUrl
     * @param {number} redirectStatusCode
     * @returns {this}
     */
    redirectTo(redirectUrl, redirectStatusCode = 302) {
        this.responseOptions.type = "redirect";
        this.responseOptions.redirect = {
            redirectStatusCode,
            redirectToUrl: redirectUrl
        };
        return this;
    }
    /**
     * Sets a custom response if the user wants to return their own processed response object
     * @param {Response} response
     * @returns {this}
     */
    setCustomResponse(response) {
        this.responseOptions.customResponse = response;
        return this;
    }
    /**
     * Sets the content type of the response (does not process the body etc. regardless of content-type provided)
     * @param {string} contentType
     * @returns {this}
     */
    setContentType(contentType) {
        this.responseOptions.headers["content-type"] = contentType;
        return this;
    }
    /**
     * Turns the status code, staus text and headers into an object for further processing of the cloudflare-router
     * library
     * @returns {{headers: Headers, statusText: string, status: number}}
     */
    transformResponseOptions() {
        return {
            status: this.responseOptions.statusCode,
            statusText: this.responseOptions.status,
            headers: new Headers(this.responseOptions.headers)
        };
    }
    /**
     * Builds a final response data to be returned to the .serveRequest() method.
     * @returns {BuiltResponseObject<AdditionalDataType>}
     */
    build() {
        let finalResponse = null;
        if (this.mainRouter.customResponseBuilder) {
            finalResponse = this.mainRouter.customResponseBuilder(this);
        }
        else if (this.responseOptions.type === "redirect") {
            finalResponse = Response.redirect(this.responseOptions.redirect.redirectToUrl, this.responseOptions.redirect.redirectStatusCode);
        }
        else if (this.responseOptions.type === "normal") {
            finalResponse = new Response(this.responseOptions.body, this.transformResponseOptions());
        }
        else {
            finalResponse = this.responseOptions.customResponse;
        }
        return {
            response: finalResponse,
            routerRequest: this.routerRequest,
            routerResponse: this,
            tasks: this.responseOptions.tasks
        };
    }
}
exports.default = RouterResponse;
;
