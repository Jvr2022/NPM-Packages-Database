import BaseAPI from "./BaseAPI";
import Client from "../Client";
export declare type GetContactsMetaData = {
    multiGetContactsMaxSize: number;
};
export declare type GetUsersTagsOptions = {
    targetUserIds: number[];
};
export declare type GetUsersTags = {
    targetUserId: number;
    targetUserTag: string;
}[];
export declare type SetPendingUserTagOptions = {
    targetUserId: number;
    userTag: string;
};
export declare type SetPendingUserTag = {
    status: "Success" | string;
};
export declare type SetUserTagOptions = {
    targetUserId: number;
    userTag: string;
};
export declare type SetUserTag = {
    status: "Success" | string;
};
export default class ContactsAPI extends BaseAPI {
    constructor(client: Client);
    getContactsMetaData(): Promise<GetContactsMetaData>;
    getUsersTags(options: GetUsersTagsOptions): Promise<GetUsersTags>;
    setPendingUserTag(options: SetPendingUserTagOptions): Promise<SetPendingUserTag>;
    setUserTag(options: SetUserTagOptions): Promise<SetUserTag>;
}
