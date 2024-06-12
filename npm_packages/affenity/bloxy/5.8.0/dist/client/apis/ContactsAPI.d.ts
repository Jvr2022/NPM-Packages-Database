import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type GetContactsMetaData = {
    multiGetContactsMaxSize: number;
};
export type GetUsersTagsOptions = {
    targetUserIds: number[];
};
export type GetUsersTags = {
    targetUserId: number;
    targetUserTag: string;
}[];
export type SetPendingUserTagOptions = {
    targetUserId: number;
    userTag: string;
};
export type SetPendingUserTag = {
    status: "Success" | string;
};
export type SetUserTagOptions = {
    targetUserId: number;
    userTag: string;
};
export type SetUserTag = {
    status: "Success" | string;
};
export default class ContactsAPI extends BaseAPI {
    constructor(client: Client);
    getContactsMetaData(): Promise<GetContactsMetaData>;
    getUsersTags(options: GetUsersTagsOptions): Promise<GetUsersTags>;
    setPendingUserTag(options: SetPendingUserTagOptions): Promise<SetPendingUserTag>;
    setUserTag(options: SetUserTagOptions): Promise<SetUserTag>;
}
