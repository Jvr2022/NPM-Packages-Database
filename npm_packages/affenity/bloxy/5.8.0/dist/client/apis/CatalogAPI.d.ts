import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type ProductDetails = {
    id: number;
    type: string;
    isPublicDomain: boolean;
    isForSale: boolean;
    priceInRobux: number;
    premiumPricing: {
        premiumDiscountPercentage: number;
        premiumPriceInRobux: number;
    };
};
export type GetAssetBundlesOptions = {
    assetId: number;
    sortOrder?: "Asc" | "Desc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type GetAssetBundles = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        id: number;
        name: string;
        description: string;
        bundleType: string;
        items: {
            owned: boolean;
            id: number;
            name: string;
            type: string;
        }[];
        creator: {
            id: number;
            name: string;
            type: string;
        };
        creatorType: number;
        product: ProductDetails;
    }[];
};
export type GetBundleDetailsOptions = {
    bundleId: number;
};
export type GetBundleDetails = GetAssetBundles["data"][0];
export type GetBundleRecommendationsByBundleIdOptions = {
    bundleId: number;
    numItems?: number;
};
export type GetBundleRecommendationsByBundleId = {
    data: GetAssetBundles["data"];
};
export type GetMultiBundleDetailsOptions = {
    bundleIds: number[];
};
export type GetMultiBundleDetails = GetAssetBundles["data"];
export type GetUserBundlesOptions = {
    userId: number;
    sortOrder?: "Asc" | "Desc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type GetUserBundles = GetAssetBundles;
export type GetUserBundlesByTypeOptions = GetUserBundlesOptions & {
    bundleType: "BodyParts" | "AvatarAnimations" | string;
};
export type GetUserBundlesByType = GetUserBundles;
export type UnpackBundleOptions = {
    bundleId: number;
};
export type UnpackBundle = unknown;
export type GetAssetToCategory = Record<string, number>;
export type GetAssetToSubCategory = GetAssetToCategory;
export type GetCategories = GetAssetToCategory;
export type GetSubCategories = GetAssetToCategory;
export type GetAppStoreExclusiveBundlesOptions = {
    appStoreType: "iOS" | "GooglePlay" | "Xbox" | "Amazon";
};
export type GetAppStoreExclusiveBundles = {
    data: ProductDetails[];
};
export type GetAssetFavoriteCountOptions = {
    assetId: number;
};
export type GetAssetFavoriteCount = number;
export type GetBundleFavoriteCountOptions = {
    bundleId: number;
};
export type GetBundleFavoriteCount = number;
export type RemoveSelfAssetFavoriteOptions = {
    userId: number;
    assetId: number;
};
export type RemoveSelfAssetFavorite = unknown;
export type GetUserFavoriteAssetOptions = {
    userId: number;
    assetId: number;
};
export type GetUserFavoriteAsset = {
    assetId: number;
    userId: number;
    created: string;
};
export type FavoriteAssetOptions = {
    userId: number;
    assetId: number;
};
export type FavoriteAsset = unknown;
export type RemoveFavoriteBundleOptions = {
    userId: number;
    bundleId: number;
};
export type RemoveFavoriteBundle = unknown;
export type GetSelfFavoriteBundleOptions = {
    userId: number;
    bundleId: number;
};
export type GetSelfFavoriteBundle = {
    bundleId: number;
    userId: number;
    created: string;
};
export type FavoriteBundleOptions = {
    userId: number;
    bundleId: number;
};
export type FavoriteBundle = unknown;
export default class CatalogAPI extends BaseAPI {
    constructor(client: Client);
    getAssetBundles(options: GetAssetBundlesOptions): Promise<GetAssetBundles>;
    getBundleDetails(options: GetBundleDetailsOptions): Promise<GetBundleDetails>;
    getBundleRecommendationsByBundleId(options: GetBundleRecommendationsByBundleIdOptions): Promise<GetBundleRecommendationsByBundleId>;
    getMultiBundleDetails(options: GetMultiBundleDetailsOptions): Promise<GetMultiBundleDetails>;
    getUserBundles(options: GetUserBundlesOptions): Promise<GetUserBundles>;
    getUserBundlesByType(options: GetUserBundlesByTypeOptions): Promise<GetUserBundlesByType>;
    unpackBundle(options: UnpackBundleOptions): Promise<UnpackBundle>;
    getAssetToCategory(): Promise<GetAssetToCategory>;
    getAssetToSubCategory(): Promise<GetAssetToSubCategory>;
    getCategories(): Promise<GetCategories>;
    getSubCategories(): Promise<GetSubCategories>;
    getAppStoreExclusiveBundles(options: GetAppStoreExclusiveBundlesOptions): Promise<GetAppStoreExclusiveBundles>;
    getAssetFavoriteCount(options: GetAssetFavoriteCountOptions): Promise<GetAssetFavoriteCount>;
    getBundleFavoriteCount(options: GetBundleFavoriteCountOptions): Promise<GetBundleFavoriteCount>;
    removeAssetFavorite(options: RemoveSelfAssetFavoriteOptions): Promise<RemoveSelfAssetFavorite>;
    getUserFavoriteAsset(options: GetUserFavoriteAssetOptions): Promise<GetUserFavoriteAsset>;
    favoriteAsset(options: FavoriteAssetOptions): Promise<FavoriteAsset>;
    removeBundleFavorite(options: RemoveFavoriteBundleOptions): Promise<RemoveFavoriteBundle>;
    getUserFavoriteBundle(options: GetSelfFavoriteBundleOptions): Promise<GetSelfFavoriteBundle>;
    favoriteBundle(options: FavoriteBundleOptions): Promise<FavoriteBundle>;
}
