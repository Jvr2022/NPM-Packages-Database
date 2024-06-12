"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../User");
class ChatMessage {
    constructor(data, client) {
        this.client = client;
        this.id = data.id;
        this.sender = new User_1.PartialUser({
            id: data.senderTargetId
        }, client);
        this.sentAt = new Date(data.sent);
        this.type = data.messageType;
        this.decorators = data.decorators;
        this.content = data.content;
    }
}
exports.default = ChatMessage;
