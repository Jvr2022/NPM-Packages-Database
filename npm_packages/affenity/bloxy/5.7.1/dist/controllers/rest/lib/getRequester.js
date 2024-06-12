"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRequester(controller, custom) {
    if (!controller.requester && custom === undefined) {
        controller.requester = require("got");
    }
    else {
        controller.requester = custom;
    }
    return controller.requester;
}
exports.default = getRequester;
