import BaseAPI from "./BaseAPI";
import Client from "../Client";
import { GetUserFriendsCount, GetUserFriendsCountOptions } from "./GeneralAPI";
import { PartialUser } from "../../structures/User";
import { EnumUserPresence, UserPresence } from "../../interfaces/GeneralInterfaces";
export type FindFriendByCodeOptions = {
    code: string;
};
export type FindFriendByCode = {
    userId: number;
    username: string;
    friendshipStatus: "NoFriendship" | string;
};
export type CheckSessionHealth = unknown;
export type RedeemNearbyFriendCodeOptions = {
    code: string;
};
export type RedeemNearbyFriendCode = unknown;
export type DeleteSession = unknown;
export type GetOrCreateNearbySession = {
    code: string;
    expires: number;
};
export type RedeemQRCodeOptions = {
    code: string;
};
export type RedeemQRCode = {
    userId: number;
    username: string;
};
export type DeleteQRCodeSession = unknown;
export type GetOrCreateQRCodeSession = GetOrCreateNearbySession;
export type GetMetaDataOptions = {
    targetUserId: number;
};
export type GetMetaData = {
    isFriendFinderEnabled: boolean;
    isNearbyUpsellEnabled: boolean;
    isFriendsUserDataStoreCacheEnabled: boolean;
    userName: string;
};
export type GetSelfFriendsCount = {
    count: number;
};
export type GetSelfFriendRequestsOptions = {
    sortOrder?: "Desc" | "Asc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type GetSelfFriendRequests = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        description: string;
        created: string;
        isBanned: boolean;
        userId: number;
        username: string;
    }[];
};
export type GetSelfFriendRequestsCount = {
    count: number;
};
export type GetUserFollowersOptions = {
    userId: number;
    sortOrder?: "Asc" | "Desc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type GetUserFollowers = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        isOnline: boolean;
        isDeleted: boolean;
        description: string;
        created: string;
        isBanned: boolean;
        id: number;
        name: string;
    }[];
};
export type GetUserFollowersCountOptions = {
    userId: number;
};
export type GetUserFollowersCount = {
    count: number;
};
export type GetUserFollowingOptions = GetUserFollowersOptions;
export type GetUserFollowing = GetUserFollowers;
export type GetUserFollowingCountOptions = GetUserFollowersCountOptions;
export type GetUserFollowingCount = GetUserFollowersCount;
export type GetUserFriendsOptions = {
    cursor?: string;
    limit?: 10 | 25 | 50 | 100;
    userId: number;
};
export type GetUserFriends = {
    data: {
        isOnline: boolean;
        isDeleted: boolean;
        description: string;
        created: string;
        isBanned: boolean;
        id: number;
        name: string;
    }[];
};
export type GetUserOnlineFriendsOptions = {
    userId: number;
};
export type GetUserOnlineFriends = {
    data: {
        userId: number;
        username: string;
        presence: {
            placeId: number | null;
            universeId: number | null;
            UserPresenceType: UserPresence | null;
            UserLocationType: string | null;
            lastLocation: string | null;
            gameInstanceId: string | null;
            lastOnline: string | null;
        };
    }[];
};
export type GetUserFriendsWithStatusesOptions = {
    userId: number;
    withUserIds: number[];
};
export type GetUserFriendsWithStatuses = {
    data: {
        id: number;
        status: "NotFriends" | string;
    }[];
};
export type DeclineAllFriendRequests = unknown;
export type AcceptFriendRequestOptions = {
    userId: number;
};
export type AcceptFriendRequest = unknown;
export type DeclineFriendRequestOptions = AcceptFriendRequestOptions;
export type DeclineFriendRequest = unknown;
export type FollowUserOptions = {
    userId: number;
};
export type FollowUser = {
    success: boolean;
    isCaptchaRequired: boolean;
};
export type SendFriendRequestOptions = {
    userId: number;
    source?: "Unknown" | string;
};
export type SendFriendRequest = {
    success: boolean;
    isCaptchaRequired: boolean;
};
export type UnFollowUserOptions = FollowUserOptions;
export type UnFollowUser = FollowUser;
export type UnfriendUserOptions = {
    userId: number;
};
export type UnfriendUser = unknown;
export type GetSelfRecommendedUsers = {
    user: PartialUser;
    profileUrl: string;
    presenceType: EnumUserPresence;
}[];
export default class FriendsAPI extends BaseAPI {
    constructor(client: Client);
    findFriendByCode(options: FindFriendByCodeOptions): Promise<FindFriendByCode>;
    checkSessionHealth(): Promise<CheckSessionHealth>;
    redeemFriendCode(options: RedeemNearbyFriendCodeOptions): Promise<RedeemNearbyFriendCode>;
    deleteFriendSession(): Promise<DeleteSession>;
    getSession(): Promise<FindFriendByCode>;
    redeemFriendQRCode(options: RedeemQRCodeOptions): Promise<RedeemQRCode>;
    deleteFriendQRSession(): Promise<DeleteQRCodeSession>;
    getFriendQRSession(): Promise<GetOrCreateQRCodeSession>;
    getMetaData(options: GetMetaDataOptions): Promise<GetMetaData>;
    getSelfFriendsCount(): Promise<GetSelfFriendsCount>;
    getSelfFriendRequests(options: GetSelfFriendRequestsOptions): Promise<GetSelfFriendRequests>;
    getSelfFriendRequestsCount(): Promise<GetSelfFriendRequestsCount>;
    getUserFollowers(options: GetUserFollowersOptions): Promise<GetUserFollowers>;
    getUserFollowersCount(options: GetUserFollowersCountOptions): Promise<GetUserFollowersCount>;
    getUserFollowing(options: GetUserFollowingOptions): Promise<GetUserFollowing>;
    getUserFollowingCount(options: GetUserFollowingCountOptions): Promise<GetUserFollowingCount>;
    getUserFriends(options: GetUserFriendsOptions): Promise<GetUserFriends>;
    getUserFriendsCount(options: GetUserFriendsCountOptions): Promise<GetUserFriendsCount>;
    getUserFriendsOnline(options: GetUserOnlineFriendsOptions): Promise<GetUserOnlineFriends>;
    getUserFriendsWithStatuses(options: GetUserFriendsWithStatusesOptions): Promise<GetUserFriendsWithStatuses>;
    declineAllFriendRequests(): Promise<DeclineAllFriendRequests>;
    acceptFriendRequest(options: AcceptFriendRequestOptions): Promise<AcceptFriendRequest>;
    declineFriendRequest(options: DeclineFriendRequestOptions): Promise<DeclineFriendRequest>;
    followUser(options: FollowUserOptions): Promise<FollowUser>;
    sendFriendRequest(options: SendFriendRequestOptions): Promise<SendFriendRequest>;
    unFollowUser(options: UnFollowUserOptions): Promise<UnFollowUser>;
    unfriendUser(options: UnfriendUserOptions): Promise<UnfriendUser>;
    getRecommendedUsers(): Promise<GetSelfRecommendedUsers>;
}
