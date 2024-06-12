"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Router_1 = tslib_1.__importDefault(require("./Router"));
const router = new Router_1.default();
const sub1 = new Router_1.default();
const sub2 = new Router_1.default();
const sub3 = new Router_1.default();
router.use("/sub1", sub1);
sub1.use("/sub2", sub2);
sub2.use("/sub3", sub3);
sub3.get("/hello", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
}));
router.getMatchingRoutesByPath("/sub1/sub2/sub3/hello/");
