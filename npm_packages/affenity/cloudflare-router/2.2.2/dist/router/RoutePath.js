"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const url_pattern_1 = tslib_1.__importDefault(require("url-pattern"));
class RoutePath {
    /**
     * Creates a RoutePath for a Route object, which is used to handle anything path-related for a route
     * @param {Route<AdditionalDataType>} route
     * @param {string} inputPath
     */
    constructor(route, inputPath) {
        this.route = route;
        this.inputPath = inputPath;
        this.fixedPath = this.fixPath(this.inputPath);
        this.urlPattern = this.createPatternFromPath(this.fixedPath);
    }
    fixPath(inputPath) {
        return this.route.router.fixPath(inputPath);
    }
    /**
     * If this RoutePath instance matches with a given input (request) path
     * @param {string} inputPath
     * @returns {any }
     */
    matchesInputPath(inputPath) {
        const matchResult = this.urlPattern.match(inputPath);
        return {
            doesMatch: !!matchResult,
            matchData: matchResult
        };
    }
    /**
     * Creates a URL Pattern from the given argument "path"
     * @param {string} path
     * @returns {UrlPattern}
     */
    createPatternFromPath(path) {
        return new url_pattern_1.default(path);
    }
}
exports.default = RoutePath;
;
