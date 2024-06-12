const tmpCache = {};

module.exports = (client, message) => {
	const messageType = message.Type;
	const conversationId = message.ConversationId;

	if (!messageType) throw new Error("Unable to categorize incoming WS request");

	if (messageType === "ConversationRemoved") {
		if (!tmpCache[conversationId]) {
			client.emit("chatConversationRemoved", conversationId);
			tmpCache[conversationId] = true;
			setTimeout(() => {
				delete tmpCache[conversationId];
			}, 500);
		}
	} else if (messageType === "ParticipantTyping") {
		client.emit("chatTyping", { isTyping: message.IsTyping, userId: message.UserId, conversationId });
	} else if (messageType === "NewMessage") {
		client.emit("chatMessage", conversationId);
	} else if (messageType === "NewMessageBySelf") {
		client.emit("chatMessageSent", conversationId);
	} else if (messageType === "ParticipantAdded") {
		client.emit("chatMemberAdded", conversationId);
	} else if (messageType === "ParticipantLeft") {
		client.emit("chatMemberLeft", conversationId);
	} else if (messageType === "NewConversation" || messageType === "AddedToConversation") {
		client.emit("chatConversation", conversationId);
	}
};
