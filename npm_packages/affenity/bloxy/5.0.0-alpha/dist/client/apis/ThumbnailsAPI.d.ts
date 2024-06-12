import BaseAPI from "./BaseAPI";
import Client from "../Client";
export declare type GetAssetsThumbnailsOptions = {
    assetIds: number[];
    returnPolicy?: "PlaceHolder" | "AutoGenerated" | "ForceAutoGenerated";
    size?: "42x42" | "50x50" | "75x75" | "110x110" | "140x140" | "150x150" | "160x100" | "160x600" | "250x250" | "256x144" | "300x250" | "304x166" | "384x216" | "396x216" | "420x420" | "480x270" | "512x512" | "576x324" | "700x700" | "728x90" | "768x432";
    format?: number;
    isCircular?: boolean;
};
export declare type GetAssetsThumbnails = {
    data: {
        targetId: number;
        state: "Error" | string;
        imageUrl: string;
    }[];
};
export declare type GetBadgesIconsOptions = {
    badgeIds: number[];
    size?: "150x150";
    format?: number;
    isCircular?: boolean;
};
export declare type GetBadgesIcons = GetAssetsThumbnails;
export declare type GetBundlesThumbnailsOptions = {
    bundleIds: number[];
    size?: "150x150" | "420x420";
    format?: number;
    isCircular?: boolean;
};
export declare type GetBundlesThumbnails = GetAssetsThumbnails;
export declare type GetDeveloperProductsIconsOptions = {
    developerProductIds: number[];
    size?: "150x150" | "420x420";
    format?: number;
    isCircular?: boolean;
};
export declare type GetDeveloperProductsIcons = GetAssetsThumbnails;
export declare type GetGamePassesIconsOptions = {
    gamePassIds: number[];
    size?: "150x150";
    format?: number;
    isCircular?: boolean;
};
export declare type GetGamePassesIcons = GetAssetsThumbnails;
export declare type GetUniverseThumbnailsOptions = {
    universeId: number;
    thumbnailIds: number[];
    size?: "768x432" | "576x324" | "480x270" | "384x216" | "256x144";
    format?: number;
    isCircular?: boolean;
};
export declare type GetUniverseThumbnails = GetAssetsThumbnails;
export declare type GetUniversesRootPlaceThumbnailsOptions = {
    universeIds: number[];
    returnPolicy?: "PlaceHolder" | "AutoGenerated" | "ForceAutoGenerated";
    size?: "50x50" | "128x128" | "150x150" | "256x256" | "512x512";
    format?: number;
    isCircular?: boolean;
};
export declare type GetUniversesRootPlaceThumbnails = GetAssetsThumbnails;
export declare type GetUniversesThumbnailsOptions = {
    universeIds: number[];
    countPerUniverse?: number;
    defaults?: boolean;
    size?: "768x432" | "576x324" | "480x270" | "384x216" | "256x144";
    format?: number;
    isCircular?: boolean;
};
export declare type GetUniversesThumbnails = {
    data: {
        universeId: number;
        error?: {
            code: number;
            message: string;
            userFacingMessage: string;
            field: string;
            fieldData: unknown;
        };
        thumbnails: {
            targetId: number;
            state: "Error" | string;
            imageUrl: string;
        }[];
    }[];
};
export declare type GetGroupsIconsOptions = {
    groupIds: number[];
    size?: "150x150" | "420x420";
    format?: number;
    isCircular?: boolean;
};
export declare type GetGroupsIcons = GetAssetsThumbnails;
export declare type GetUsersFullBodyAvatarImagesOptions = {
    userIds: number[];
    size?: "30x30" | "48x48" | "60x60" | "75x75" | "100x100" | "140x140" | "150x150" | "150x200" | "180x180" | "250x250" | "352x352" | "420x420" | "720x720";
    format?: number;
    isCircular?: boolean;
};
export declare type GetUsersFullBodyAvatarImages = GetAssetsThumbnails;
export declare type GetUsersAvatarBustImagesOptions = {
    userIds: number[];
    size?: "50x50" | "60x60" | "75x75";
    format?: number;
    isCircular?: boolean;
};
export declare type GetUsersAvatarBustImages = GetAssetsThumbnails;
export declare type GetUsersAvatarHeadShotsImagesOptions = {
    userIds: number[];
    size?: "48x48" | "50x50" | "60x60" | "75x75" | "110x110" | "150x150" | "180x180" | "352x352" | "420x420" | "720x720";
    format?: number;
    isCircular?: boolean;
};
export declare type GetUsersAvatarHeadShotsImages = GetAssetsThumbnails;
export declare type GetUsersOutfitsImagesOptions = {
    userOutfitIds: number[];
    size?: "150x150" | "420x420";
    format?: number;
    isCircular?: boolean;
};
export declare type GetUsersOutfitsImages = GetAssetsThumbnails;
export declare type GetBatchImagesOptions = {
    requestId: string;
    targetId: number;
    type: "Avatar" | "AvatarHeadShot" | "GameIcon" | "BadgeIcon" | "GameThumbnail" | "GamePass" | "Asset" | "BundleThumbnail" | "Outfit" | "GroupIcon" | "DeveloperProduct" | "AutoGeneratedAsset";
    size: string;
    isCircular: boolean;
};
export declare type GetBatchImages = {
    data: {
        requestId: string;
        errorCode?: number;
        errorMessage?: string;
        targetId: number;
        state: "Error" | string;
        imageUrl: string;
    }[];
};
export default class ThumbnailsAPI extends BaseAPI {
    constructor(client: Client);
    getAssetsThumbnails(options: GetAssetsThumbnailsOptions): Promise<GetAssetsThumbnails>;
    getBadgesIcons(options: GetBadgesIconsOptions): Promise<GetBadgesIcons>;
    getBundlesThumbnails(options: GetBundlesThumbnailsOptions): Promise<GetBundlesThumbnails>;
    getDeveloperProductIcons(options: GetDeveloperProductsIconsOptions): Promise<GetDeveloperProductsIcons>;
    getGamePassesIcons(options: GetGamePassesIconsOptions): Promise<GetGamePassesIcons>;
    getUniverseThumbnailIds(options: GetUniverseThumbnailsOptions): Promise<GetUniverseThumbnails>;
    getUniversesRootPlaceThumbnail(options: GetUniversesRootPlaceThumbnailsOptions): Promise<GetUniversesRootPlaceThumbnails>;
    getUniversesThumbnailIds(options: GetUniversesThumbnailsOptions): Promise<GetUniversesThumbnails>;
    getGroupsIcons(options: GetGroupsIconsOptions): Promise<GetGroupsIcons>;
    getUsersFullBodyAvatarImages(options: GetUsersFullBodyAvatarImagesOptions): Promise<GetUsersFullBodyAvatarImages>;
    getUsersAvatarBustImages(options: GetUsersAvatarBustImagesOptions): Promise<GetUsersAvatarBustImages>;
    getUsersAvatarHeadShotImages(options: GetUsersAvatarHeadShotsImagesOptions): Promise<GetUsersAvatarHeadShotsImages>;
    getUsersOutfitsImages(options: GetUsersOutfitsImagesOptions): Promise<GetUsersOutfitsImages>;
    getBatchImages(options: GetBatchImagesOptions): Promise<GetBatchImages>;
}
