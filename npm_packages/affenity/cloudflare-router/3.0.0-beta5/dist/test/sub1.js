"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Router_1 = tslib_1.__importDefault(require("../Router"));
const sub2_1 = tslib_1.__importDefault(require("./sub2"));
const sub1Router = new Router_1.default();
sub1Router.use("/sub2", sub2_1.default);
exports.default = sub1Router;
