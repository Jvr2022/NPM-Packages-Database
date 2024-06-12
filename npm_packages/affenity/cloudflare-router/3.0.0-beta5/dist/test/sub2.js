"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Router_1 = tslib_1.__importDefault(require("../Router"));
const sub3_1 = tslib_1.__importDefault(require("./sub3"));
const sub2Router = new Router_1.default();
sub2Router.use("/sub2", sub3_1.default);
exports.default = sub2Router;
