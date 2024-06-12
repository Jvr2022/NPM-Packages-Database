import BaseAPI from "./BaseAPI";
import Client from "../Client";
import { GameBadgeOptions } from "../../structures/Game";
export type GetBadgeOptions = {
    badgeId: number;
};
export type GetBadge = GameBadgeOptions;
export type UpdateBadgeOptions = {
    id: number;
    name: string;
    description: string;
    enabled: boolean;
};
export type UpdateBadge = unknown;
export type GetUniverseBadgesOptions = {
    universeId: number;
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
    sortOrder?: "Asc" | "Desc";
};
export type GetUniverseBadges = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: GetBadge[];
};
export type GetUserBadgesOptions = {
    userId: number;
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
    sortOrder?: "Asc" | "Desc";
};
export type GetUserBadges = GetUniverseBadges;
export type GetUserBadgesAwardedDatesOptions = {
    userId: number;
    badgeIds: number[];
};
export type GetUserBadgesAwardedDates = {
    data: {
        badgeId: number;
        awardedDate: string;
    }[];
};
export type DeleteBadgeFromUserOptions = {
    userId: number;
    badgeId: number;
};
export type DeleteBadgeFromUser = unknown;
export type DeleteBadgeFromSelfOptions = {
    badgeId: number;
};
export type DeleteBadgeFromSelf = DeleteBadgeFromUser;
export default class AvatarAPI extends BaseAPI {
    constructor(client: Client);
    getBadge(options: GetBadgeOptions): Promise<GetBadge>;
    updateBadge(options: UpdateBadgeOptions): Promise<UpdateBadge>;
    getUniverseBadges(options: GetUniverseBadgesOptions): Promise<GetUniverseBadges>;
    getUserBadges(options: GetUserBadgesOptions): Promise<GetUserBadges>;
    getUserBadgesAwardedDates(options: GetUserBadgesAwardedDatesOptions): Promise<GetUserBadgesAwardedDates>;
    deleteBadgeFromUser(options: DeleteBadgeFromUserOptions): Promise<DeleteBadgeFromUser>;
    deleteBadgeFromSelf(options: DeleteBadgeFromSelfOptions): Promise<DeleteBadgeFromSelf>;
}
