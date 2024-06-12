"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouterResponse {
    constructor(router, routerRequest) {
        this.router = router;
        this.routerRequest = routerRequest;
        this.responseOptions = {
            type: "normal",
            status: "OK",
            statusCode: 200,
            headers: {},
            tasks: [],
            body: undefined,
            redirect: {}
        };
        this.locals = {};
        this.routerRequest = routerRequest;
    }
    setHeader(name, value) {
        this.responseOptions.headers[name] = value;
        return this;
    }
    json(data) {
        this.responseOptions.body = JSON.stringify(data);
        this.setContentType("application/json");
        return this;
    }
    raw(body, contentType) {
        this.responseOptions.body = body;
        this.setContentType(contentType);
        return this;
    }
    text(text) {
        this.responseOptions.body = text;
        this.setContentType("text/plain");
        return this;
    }
    status(statusText) {
        this.responseOptions.status = statusText;
        return this;
    }
    statusCode(statusCode) {
        this.responseOptions.statusCode = statusCode;
        return this;
    }
    addTask(task) {
        const tasks = Array.isArray(task) ? task : [task];
        this.responseOptions.tasks = [...this.responseOptions.tasks, ...tasks];
        return this;
    }
    redirect(redirectUrl, statusCode = 302) {
        this.responseOptions.type = "redirect";
        this.responseOptions.redirect = {
            redirectToUrl: redirectUrl,
            redirectStatusCode: statusCode
        };
        return this;
    }
    setCustomResponse(response) {
        this.responseOptions.type = "custom";
        this.responseOptions.customResponse = response;
        return this;
    }
    setContentType(contentType) {
        this.responseOptions.headers["content-type"] = contentType;
        return this;
    }
    transformResponseOptions() {
        return {
            status: this.responseOptions.statusCode,
            statusText: this.responseOptions.status,
            headers: new Headers(this.responseOptions.headers)
        };
    }
    build() {
        let finalResponse = null;
        if (this.router.routerOptions.customResponseBuilder) {
            finalResponse = this.router.routerOptions.customResponseBuilder(this);
        }
        else if (this.responseOptions.type === "redirect") {
            if (!this.responseOptions.redirect || !this.responseOptions.redirect.redirectToUrl) {
                throw new Error(`No redirect URL provided for redirect!`);
            }
            finalResponse = Response.redirect(this.responseOptions.redirect.redirectToUrl, this.responseOptions.redirect.redirectStatusCode);
        }
        else if (this.responseOptions.type === "normal") {
            finalResponse = new Response(this.responseOptions.body, this.transformResponseOptions());
        }
        else {
            if (!this.responseOptions.customResponse) {
                throw new Error(`Attempted to use custom response but no custom response was set!`);
            }
            finalResponse = this.responseOptions.customResponse;
        }
        if (!finalResponse) {
            throw new Error(`Error when attempting to return final response, no valid final response value!`);
        }
        return {
            tasks: this.responseOptions.tasks,
            response: finalResponse,
            routerResponse: this,
            routerRequest: this.routerRequest
        };
    }
}
exports.default = RouterResponse;
;
