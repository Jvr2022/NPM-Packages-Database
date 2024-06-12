import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type GetSelfGameRolesOptions = {
    gameId: number;
};
export type GetSelfGameRoles = {
    data: string[];
};
export type GetGameRoleAssigneesOptions = {
    gameId: number;
    role: "translator";
};
export type GetGameRoleAssignees = {
    data: {
        id: null;
        name: string;
        type: "user";
    }[];
};
export type GetSelfGamesAccessByRoleOptions = {
    role: "translator";
    exclusiveStartKey?: string;
    pageSize?: number;
};
export type GetSelfGamesAccessByRole = {
    games: {
        gameId: number;
        assignee: {
            assigneeType: "user";
            id: number;
        };
    }[];
};
export type UpdateUserAccess = {
    gameId: number;
    userId: number;
    role: "translator";
    revoke?: boolean;
};
export type UpdateUser = unknown;
export default class TradesAPI extends BaseAPI {
    constructor(client: Client);
    getSelfGameRoles(options: GetSelfGameRolesOptions): Promise<GetSelfGameRoles>;
    getGameRoleAssignees(options: GetGameRoleAssigneesOptions): Promise<GetGameRoleAssignees>;
    getSelfGamesAccessByRole(options: GetSelfGamesAccessByRoleOptions): Promise<GetSelfGamesAccessByRole>;
    updateUserAccess(options: UpdateUserAccess): Promise<UpdateUser>;
}
