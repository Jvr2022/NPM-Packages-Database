"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterResponse = void 0;
const tslib_1 = require("tslib");
const cookie_1 = tslib_1.__importDefault(require("cookie"));
class RouterResponse {
    constructor(request) {
        this.request = request;
        this.response = {
            type: "normal",
            status: "OK",
            statusCode: 200,
            headers: {},
            cookies: {},
            tasks: [],
            contentType: "text/plain",
            body: null
        };
    }
    setRoute(route) {
        this.route = route;
    }
    json(data) {
        this.response.body = JSON.stringify(data);
        this.response.contentType = "application/json";
        return this;
    }
    raw(body, contentType) {
        this.response.body = body;
        this.response.contentType = contentType;
        return this;
    }
    text(text) {
        this.response.body = text;
        this.response.contentType = "text/plain";
        return this;
    }
    status(status) {
        this.response.status = status;
        return this;
    }
    statusCode(statusCode) {
        this.response.statusCode = statusCode;
        return this;
    }
    addTasks(tasks) {
        tasks = Array.isArray(tasks) ? tasks : [tasks];
        this.response.tasks = [...this.response.tasks, ...tasks];
        return this;
    }
    setHeader(name, value) {
        // Suppressing since this is not supposed to be user-input related
        // eslint-disable-next-line security/detect-object-injection
        this.response.headers[name] = value;
        return this;
    }
    setCookie(name, value, options) {
        // Suppressing since this is not supposed to be user-input related
        // eslint-disable-next-line security/detect-object-injection
        this.response.cookies[name] = cookie_1.default.serialize(name, value, options);
        return this;
    }
    redirect(url, statusCode) {
        this.response.type = "redirect";
        this.response.statusCode = statusCode;
        this.response.redirect = {
            url
        };
        return this;
    }
    setCustomResponse(response) {
        this.response.customResponse = response;
        return this;
    }
    transformOptions() {
        return {
            status: this.response.statusCode,
            statusText: this.response.status,
            headers: new Headers(this.response.headers)
        };
    }
    buildResponse() {
        // Append all cookies into one string and set it as set-cookie header
        (() => {
            const cookies = this.response.cookies;
            let totalCookiesString = "";
            Object.keys(cookies)
                .forEach(cookieName => {
                // Nothing user-input related
                // eslint-disable-next-line security/detect-object-injection
                const cookieValue = cookies[cookieName];
                totalCookiesString += `${cookieValue}`;
            });
            // If the header already exists, we just want to append to it
            this.response.headers["set-cookie"] = `${totalCookiesString};${this.response.headers["set-cookie"] || ""}`;
        })();
        // Set the content-type header if it does not exist
        this.response.headers["content-type"] = this.response.headers["content-type"] || this.response.contentType;
        // Move on to transforming the data to response
        if (this.route && this.route.router.main && this.route.router.main.customResponseTransformer) {
            // They want to build their own response, that's fine!
            return {
                tasks: this.response.tasks,
                response: this.route.router.main.customResponseTransformer(this.response),
                routerResponse: this,
                routerRequest: this.request
            };
        }
        return {
            tasks: this.response.tasks,
            response: this.response.customResponse ? this.response.customResponse : this.response.type !== "redirect" ? new Response(this.response.body, this.transformOptions()) : Response.redirect(this.response.redirect.url, this.response.statusCode),
            routerResponse: this,
            routerRequest: this.request
        };
    }
}
exports.RouterResponse = RouterResponse;
