"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Router_1 = tslib_1.__importDefault(require("../Router"));
const sub1_1 = tslib_1.__importDefault(require("./sub1"));
const router = new Router_1.default();
router.use("/sub1", sub1_1.default);
router.getMatchingRoutesByPath("/sub1/sub2/sub3/hello/");
