import BaseAPI from "./BaseAPI";
import Client from "../Client";
import { EnumUserPresence } from "../../interfaces/GeneralInterfaces";
export type RegisterAppPresenceOptions = {
    location: string;
    placeId: number;
    disconnect: boolean;
};
export type RegisterAppPresence = unknown;
export type GetUsersPresencesOptions = {
    userIds: number[];
};
export type GetUsersPresences = {
    userPresences: {
        userPresenceType: EnumUserPresence;
        lastLocation: string;
        placeId: number;
        rootPlaceId: number;
        gameId: string;
        universeId: number;
        userId: number;
        lastOnline: string;
    }[];
};
export default class PresenceAPI extends BaseAPI {
    constructor(client: Client);
    registerAppPresence(options: RegisterAppPresenceOptions): Promise<RegisterAppPresence>;
    getUsersPresences(options: GetUsersPresencesOptions): Promise<GetUsersPresences>;
}
