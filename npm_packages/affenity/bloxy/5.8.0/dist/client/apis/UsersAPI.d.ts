import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type ValidateDisplayNameNewUserOptions = {
    displayName: string;
    birthdate: string;
};
export type ValidateDisplayNameNewUser = unknown;
export type ValidateDisplayNameExistingUserOptions = {
    userId: number;
    displayName: string;
};
export type ValidateDisplayNameExistingUser = unknown;
export type SetSelfDisplayNameOptions = {
    userId: number;
    newDisplayName: string;
};
export type SetSelfDisplayName = unknown;
export type GetUserByIdOptions = {
    userId: number;
};
export type GetUserById = {
    description: string;
    created: string;
    isBanned: boolean;
    id: number;
    name: string;
    displayName: string;
};
export type GetSelfAuthenticatedUserInformation = {
    id: number;
    name: string;
    displayName: string;
};
export type GetUsersByUsernamesOptions = {
    usernames: string[];
    excludeBannedUsers?: boolean;
};
export type GetUsersByUsernames = {
    data: {
        requestedUsername: string;
        id: number;
        name: string;
        displayName: string;
    }[];
};
export type GetUsersByUserIdsOptions = {
    userIds: number[];
    excludeBannedUsers?: boolean;
};
export type GetUsersByUserIds = {
    data: Omit<GetUsersByUsernames["data"][0], "requestedUsername">[];
};
export type GetUserStatusOptions = {
    userId: number;
};
export type GetUserStatus = {
    status: string;
};
export type UpdateSelfStatusOptions = {
    userId: number;
    status: string;
};
export type UpdateSelfStatus = {
    status: string;
};
export type SearchUsersOptions = {
    keyword: string;
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type SearchUsers = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        previousUsernames: string[];
        id: number;
        name: string;
        displayName: string;
    }[];
};
export default class UsersAPI extends BaseAPI {
    constructor(client: Client);
    validateDisplayNameNewUser(options: ValidateDisplayNameNewUserOptions): Promise<ValidateDisplayNameNewUser>;
    validateDisplayNameExistingUser(options: ValidateDisplayNameExistingUserOptions): Promise<ValidateDisplayNameExistingUser>;
    setDisplayName(options: SetSelfDisplayNameOptions): Promise<SetSelfDisplayName>;
    getUserById(options: GetUserByIdOptions): Promise<GetUserById>;
    getAuthenticatedUserInformation(): Promise<GetSelfAuthenticatedUserInformation>;
    getUsersByUsernames(options: GetUsersByUsernamesOptions): Promise<GetUsersByUsernames>;
    getUsersByIds(options: GetUsersByUserIdsOptions): Promise<GetUsersByUserIds>;
    getUserStatus(options: GetUserStatusOptions): Promise<GetUserStatus>;
    updateStatus(options: UpdateSelfStatusOptions): Promise<UpdateSelfStatus>;
    searchUsers(options: SearchUsersOptions): Promise<SearchUsers>;
}
