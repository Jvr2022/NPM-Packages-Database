import BaseAPI from "./BaseAPI";
import Client from "../Client";
import { ChatConversationOptions, ChatMessageOptions, ChatMessageSentOptions, PartialChatConversationOptions } from "../../structures/Chat";
export type GetChatSettings = {
    chatEnabled: boolean;
};
export type GetConversationsOptions = {
    conversationIds: number[];
};
export type GetConversations = ChatConversationOptions[];
export type GetConversationMessagesOptions = {
    conversationId: number;
    pageSize: number;
    exclusiveStartMessageId?: string;
};
export type GetConversationMessages = ChatMessageOptions[];
export type GetRolloutSettingsOptions = {
    featureNames: string[];
};
export type GetRolloutSettings = {
    rolloutFeatures: {
        featureName: string;
        isRolloutEnabled: boolean;
    }[];
};
export type GetUnreadConversationCount = {
    count: number;
};
export type GetUnreadMessagesInConversationsOptions = {
    conversationIds: number[];
    pageSize?: number;
};
export type GetUnreadMessagesInConversations = {
    conversationId: number;
    chatMessages: ChatMessageOptions[];
}[];
export type GetUserConversationsOptions = {
    pageNumber: number;
    pageSize: number;
};
export type GetUserConversations = ChatConversationOptions[];
export type GetMetaData = {
    isChatEnabledByPrivacySetting: string;
    languageForPrivacySettingUnavailable: string;
    maxConversationTitleLength: number;
    numberOfMembersForPartyChrome: number;
    partyChromeDisplayTimeStampInterval: number;
    signalRDisconnectionResponseInMilliseconds: number;
    typingInChatFromSenderThrottleMs: number;
    typingInChatForReceiverExpirationMs: number;
    relativeValueToRecordUiPerformance: number;
    isChatDataFromLocalStorageEnabled: boolean;
    chatDataFromLocalStorageExpirationSeconds: number;
    isUsingCacheToLoadFriendsInfoEnabled: boolean;
    cachedDataFromLocalStorageExpirationMS: number;
    senderTypesForUnknownMessageTypeError: string[];
    isInvalidMessageTypeFallbackEnabled: boolean;
    isRespectingMessageTypeEnabled: boolean;
    validMessageTypesWhiteList: string[];
    shouldRespectConversationHasUnreadMessageToMarkAsRead: boolean;
    isVoiceChatForClientSideEnabled: boolean;
    isAliasChatForClientSideEnabled: boolean;
    isPlayTogetherForGameCardsEnabled: boolean;
    isRoactChatEnabled: boolean;
};
export type GetMultiLatestConversationMessagesOptions = {
    conversationIds: number[];
    pageSize: number;
};
export type GetMultiLatestConversationMessages = GetUnreadMessagesInConversations;
export type AddUsersToConversationOptions = {
    participantUserIds: number[];
    conversationId: number;
};
export type AddUsersToConversation = {
    conversationId: number;
    rejectedParticipants: {
        rejectedReason: string;
        type: "User" | string;
        targetId: number;
        name: string;
        displayName: string;
    }[];
    resultType: "Success" | string;
    statusMessage: string;
};
export type MarkMessageInConversationAsReadOptions = {
    conversationId: number;
    endMessageId: string;
};
export type MarkMessageInConversationAsRead = {
    resultType: "Success" | string;
};
export type MarkConversationsAsSeenOptions = {
    conversationsToMarkSeen: number[];
};
export type MarkConversationsAsSeen = {
    resultType: "Success" | string;
};
export type RemoveUserFromConversationOptions = {
    participantUserId: number;
    conversationId: number;
};
export type RemoveUserFromConversation = {
    conversation: PartialChatConversationOptions;
    resultType: "Success" | string;
    statusMessage: string;
};
export type RenameGroupConversationOptions = {
    conversationId: number;
    newTitle: string;
};
export type RenameGroupConversation = {
    conversationTitle: string;
    statusMessage: string;
    resultType: "Success" | string;
    title: {
        titleForViewer: string;
        isDefaultTitle: boolean;
    };
};
export type ResetConversationUniverseOptions = {
    conversationId: number;
};
export type ResetConversationUniverse = {
    statusMessage: string;
};
export type SendGameLinkMessageOptions = {
    universeId: number;
    conversationId: number;
    decorators: string[];
};
export type SendGameLinkMessage = ChatMessageSentOptions;
export type SendMessageOptions = {
    message: string;
    conversationId: number;
    decorators: string[];
};
export type SendMessage = ChatMessageSentOptions;
export type SetConversationUniverseOptions = {
    conversationId: number;
    universeId: number;
};
export type SetConversationUniverse = {
    statusMessage: string;
};
export type StartCloudEditConversationOptions = {
    placeId: number;
};
export type StartCloudEditConversation = {
    conversation: ChatConversationOptions;
    rejectedParticipants: {
        rejectedReason: string;
        type: "User";
        targetId: number;
        name: string;
        displayName: string;
    }[];
    resultType: "Success" | string;
    statusMessage: string;
};
export type StartGroupConversationOptions = {
    participantUserIds: number[];
    title: string;
};
export type StartGroupConversation = StartCloudEditConversation;
export type StartOneToOneConversationOptions = {
    participantUserId: number;
};
export type StartOneToOneConversation = StartCloudEditConversation;
export type UpdateUserTypingStatusOptions = {
    conversationId: number;
    isTyping: boolean;
};
export type UpdateUserTypingStatus = {
    statusMessage: string;
};
export default class ChatAPI extends BaseAPI {
    constructor(client: Client);
    getChatSettings(): Promise<GetChatSettings>;
    getConversations(options: GetConversationsOptions): Promise<GetConversations>;
    getConversationMessages(options: GetConversationMessagesOptions): Promise<GetConversationMessages>;
    getRolloutSettings(options: GetRolloutSettingsOptions): Promise<GetRolloutSettings>;
    getUnreadConversationCount(): Promise<GetUnreadConversationCount>;
    getUnreadMessagesInConversations(options: GetUnreadMessagesInConversationsOptions): Promise<GetUnreadMessagesInConversations>;
    getUserConversations(options: GetUserConversationsOptions): Promise<GetUserConversations>;
    getMetaData(): Promise<GetMetaData>;
    getMultiLatestConversationMessages(options: GetMultiLatestConversationMessagesOptions): Promise<GetMultiLatestConversationMessages>;
    addUsersToConversation(options: AddUsersToConversationOptions): Promise<AddUsersToConversation>;
    markConversationMessagesRead(options: MarkMessageInConversationAsReadOptions): Promise<MarkMessageInConversationAsRead>;
    markConversationsSeen(options: MarkConversationsAsSeenOptions): Promise<MarkConversationsAsSeen>;
    removeUserFromConversation(options: RemoveUserFromConversationOptions): Promise<RemoveUserFromConversation>;
    renameGroupConversation(options: RenameGroupConversationOptions): Promise<RenameGroupConversation>;
    resetConversationUniverse(options: ResetConversationUniverseOptions): Promise<ResetConversationUniverse>;
    sendGameLinkMessage(options: SendGameLinkMessageOptions): Promise<SendGameLinkMessage>;
    sendMessage(options: SendMessageOptions): Promise<SendMessage>;
    setConversationUniverse(options: SetConversationUniverseOptions): Promise<SetConversationUniverse>;
    startCloudEditConversation(options: StartCloudEditConversationOptions): Promise<StartCloudEditConversation>;
    startGroupConversation(options: StartGroupConversationOptions): Promise<StartGroupConversation>;
    startOneToOneConversation(options: StartOneToOneConversationOptions): Promise<StartOneToOneConversation>;
    updateUserTypingStatus(options: UpdateUserTypingStatusOptions): Promise<UpdateUserTypingStatus>;
}
