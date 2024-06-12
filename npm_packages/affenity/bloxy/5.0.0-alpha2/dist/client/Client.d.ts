import ClientBase, { ClientOptions } from "./ClientBase";
import { APIs } from "./apis";
import ClientUser from "../structures/ClientUser";
import RESTController from "../controllers/rest";
import { Structures } from "../structures";
import { Group } from "../structures/Group";
import * as ClientSocket from "./lib/ClientSocket/ClientSocket";
import { PartialUser, User } from "../structures/User";
import ChatManager from "./lib/ChatManager/ChatManager";
export default class Client extends ClientBase {
    user: ClientUser | null;
    apis: APIs;
    rest: RESTController;
    structures: Structures;
    socket: ClientSocket.Socket;
    chat: ChatManager;
    constructor(options?: ClientOptions);
    init(): void;
    login: (cookie?: string | undefined) => Promise<ClientUser>;
    getGroup(groupId: number): Promise<Group>;
    getUser(userId: number): Promise<User>;
    getUserIdFromUsername(username: string): Promise<PartialUser>;
    getUsernameFromUserId(userId: number): Promise<PartialUser>;
    getUsersByUserIds(userIds: number[], excludeBannedUsers?: boolean): Promise<PartialUser[]>;
    getUsersByUsernames(usernames: string[], excludeBannedUsers?: boolean): Promise<PartialUser[]>;
}
