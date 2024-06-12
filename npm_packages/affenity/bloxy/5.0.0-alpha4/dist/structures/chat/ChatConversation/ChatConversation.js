"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../User");
const Game_1 = require("../../Game");
class ChatConversation {
    constructor(data, client) {
        this.client = client;
        this.id = data.id;
        this.title = data.title;
        this.initiator = new User_1.PartialUser({
            id: data.initiator.targetId,
            name: data.initiator.name || undefined
        }, client);
        this.hasUnreadMessages = data.hasUnreadMessages;
        this.members = data.participants.map(participantData => new User_1.PartialUser({
            id: participantData.targetId,
            name: participantData.name
        }, client));
        this.type = data.conversationType;
        this.lastUpdated = new Date(data.lastUpdated);
        this.universe = data.conversationUniverse ? new Game_1.PartialGameUniverse({
            id: data.conversationUniverse
        }, client) : null;
        this.conversationTitle = {
            forViewer: data.conversationTitle.titleForViewer,
            isDefaultTitle: data.conversationTitle.isDefaultTitle
        };
    }
}
exports.default = ChatConversation;
