import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type GetAnnouncements = {
    collection: {
        id: number;
        sender: {
            id: number;
            name: string;
            displayName: string;
        };
        subject: string;
        body: string;
        created: string;
        updated: string;
    };
    totalCollectionSize: number;
};
export type GetAnnouncementsMetaData = {
    numOfAnnouncements: number;
};
export type GetMessagesOptions = {
    pageNumber?: number;
    pageSize?: number;
    messageTab?: "Inbox" | "Sent" | "Archive";
};
export type GetMessages = {
    collection: {
        id: number;
        sender: {
            id: number;
            name: string;
            displayName: string;
        };
        recipient: {
            id: number;
            name: string;
            displayName: string;
        };
        subject: string;
        body: string;
        created: string;
        updated: string;
        isRead: boolean;
        isSystemMessage: boolean;
        isReportAbuseDisplayed: boolean;
    }[];
    totalCollectionSize: number;
    totalPages: number;
    pageNumber: number;
};
export type GetMessageOptions = {
    messageId: number;
};
export type GetMessage = GetMessages["collection"][0];
export type GetUnreadMessagesCount = {
    count: number;
};
export type ArchiveMessagesOptions = {
    messageIds: number[];
};
export type ArchiveMessages = {
    failedMessages?: {
        messageId: number;
        errorMessage: string;
    }[];
};
export type MarkMessagesReadOptions = ArchiveMessagesOptions;
export type MarkMessagesRead = ArchiveMessages;
export type MarkMessagesUnreadOptions = ArchiveMessagesOptions;
export type MarkMessagesUnread = ArchiveMessages;
export type SendMessageOptions = {
    userId: number;
    subject: string;
    body: string;
    recipientId: number;
    replyMessageId?: number;
    includePreviousMessage?: boolean;
};
export type SendMessage = {
    success: boolean;
    shortMessage: string;
    message: string;
};
export type UnArchiveMessagesOptions = ArchiveMessagesOptions;
export type UnArchiveMessages = ArchiveMessages;
export default class PrivateMessagesAPI extends BaseAPI {
    constructor(client: Client);
    getAnnouncements(): Promise<GetAnnouncements>;
    getAnnouncementsMetaData(): Promise<GetAnnouncementsMetaData>;
    getMessages(options: GetMessagesOptions): Promise<GetMessages>;
    getMessage(options: GetMessageOptions): Promise<GetMessage>;
    getUnreadMessagesCount(): Promise<GetUnreadMessagesCount>;
    archiveMessages(options: ArchiveMessagesOptions): Promise<ArchiveMessages>;
    markMessagesRead(options: MarkMessagesReadOptions): Promise<MarkMessagesRead>;
    markMessagesUnread(options: MarkMessagesUnreadOptions): Promise<MarkMessagesUnread>;
    sendMessage(options: SendMessageOptions): Promise<SendMessage>;
    unArchiveMessages(options: UnArchiveMessagesOptions): Promise<UnArchiveMessages>;
}
