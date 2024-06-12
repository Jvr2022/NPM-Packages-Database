import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type GetUserFollowedUniversesOptions = {
    userId: number;
};
export type GetUserFollowedUniverses = {
    universeId: number;
    userId: number;
}[];
export type GetUserFollowingUniverseStatusOptions = {
    userId: number;
    universeId: number;
};
export type GetUserFollowingUniverseStatus = {
    UniverseId: number;
    UserId: number;
    CanFollow: boolean;
    IsFollowing: boolean;
    FollowingCountByType: number;
    FollowingLimitByType: number;
};
export type UnFollowUniverseOptions = {
    userId: number;
    universeId: number;
};
export type UnFollowUniverse = {
    universeId: number;
    userId: number;
};
export type FollowUniverseOptions = UnFollowUniverseOptions;
export type FollowUniverse = UnFollowUniverse;
export default class FollowingsAPI extends BaseAPI {
    constructor(client: Client);
    getUserFollowedUniverses(options: GetUserFollowedUniversesOptions): Promise<GetUserFollowedUniverses>;
    getUserFollowingUniverseStatus(options: GetUserFollowingUniverseStatusOptions): Promise<GetUserFollowingUniverseStatus>;
    unFollowUniverse(options: UnFollowUniverseOptions): Promise<UnFollowUniverse>;
    followUniverse(options: FollowUniverseOptions): Promise<FollowUniverse>;
}
