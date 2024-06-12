import ClientBase, { ClientOptions } from "./ClientBase";
import { APIs } from "./apis";
import ClientUser from "../structures/ClientUser";
import RESTController from "../controllers/rest";
import { Group, PartialUser, User } from "../structures";
import * as ClientSocket from "./lib/ClientSocket/ClientSocket";
import ChatManager from "./lib/ChatManager/ChatManager";
import DataStoreManager from "./lib/DataStoreManager/DataStoreManager";
export default class Client extends ClientBase {
    user: ClientUser | null;
    apis: APIs;
    rest: RESTController;
    socket: ClientSocket.Socket;
    dataStoreManager: DataStoreManager;
    chat: ChatManager;
    constructor(options?: ClientOptions);
    isLoggedIn(): boolean;
    init(): void;
    login(cookie?: string): Promise<ClientUser>;
    getGroup(groupId: number): Promise<Group>;
    getUser(userId: number | string): Promise<User>;
    getUserIdFromUsername(username: string): Promise<PartialUser>;
    getUsernameFromUserId(userId: number | string): Promise<PartialUser>;
    getUsersByUserIds(userIds: number[] | string[], excludeBannedUsers?: boolean): Promise<PartialUser[]>;
    getUsersByUsernames(usernames: string[], excludeBannedUsers?: boolean): Promise<PartialUser[]>;
}
