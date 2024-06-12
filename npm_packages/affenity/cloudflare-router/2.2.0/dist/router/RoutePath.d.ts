import UrlPattern from "url-pattern";
import Route from "./Route";
export default class RoutePath<AdditionalDataType> {
    /**
     * The route that this path belongs to
     * @type {Route<AdditionalDataType>}
     */
    route: Route<AdditionalDataType>;
    /**
     * The URL pattern used for matching incoming requests
     * @type {UrlPattern}
     */
    urlPattern: UrlPattern;
    /**
     * The path after it's been formatted and fixed properly (i.e. trailing /, etc.)
     * @type {string}
     */
    fixedPath: string;
    /**
     * The "raw" input path that was provided to this RoutePath instance, before it was "fixed"
     * @type {string}
     */
    inputPath: string;
    /**
     * Creates a RoutePath for a Route object, which is used to handle anything path-related for a route
     * @param {Route<AdditionalDataType>} route
     * @param {string} inputPath
     */
    constructor(route: Route<AdditionalDataType>, inputPath: string);
    fixPath(inputPath: string): string;
    /**
     * If this RoutePath instance matches with a given input (request) path
     * @param {string} inputPath
     * @returns {any }
     */
    matchesInputPath(inputPath: string): {
        doesMatch: boolean;
        matchData: any;
    };
    /**
     * Creates a URL Pattern from the given argument "path"
     * @param {string} path
     * @returns {UrlPattern}
     */
    createPatternFromPath(path: string): UrlPattern;
}
