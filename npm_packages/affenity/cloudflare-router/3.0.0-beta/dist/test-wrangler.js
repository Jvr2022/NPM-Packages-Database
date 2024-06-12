"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Router_1 = tslib_1.__importDefault(require("./Router"));
const router = new Router_1.default();
router.get("/", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return res
        .text("hello, world!");
}));
router.get("/hello/:name", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return res.text(`Hello, ${req.matchedParams.name}`);
}));
addEventListener('fetch', event => {
    event.respondWith(router.serveRequest(event.request)
        .then(built => built.response));
});
