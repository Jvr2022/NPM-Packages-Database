import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type GetCreatedAssetsOptions = {
    assetType: string;
    isArchived?: boolean;
    groupId?: number;
    sortOrder?: "Asc" | "Desc";
};
export type GetCreatedAssets = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        assetId: number;
        name: string;
    }[];
};
export type GetMultiCreatedAssetDetailsOptions = {
    assetIds: number[];
};
export type GetMultiCreatedAssetDetails = {
    assetId: number;
    name: string;
    status: string;
    description: string;
    creatorType: string;
    creatorTargetId: number;
    price: number;
    priceConfiguration: {
        priceInRobux: number;
        premiumDiscountPercentage: number;
        premiumPriceInRobux: number;
    };
    isArchived: boolean;
    assetType: string;
}[];
export type GetItemTagsByItemIdsOptions = {
    itemIds: number[];
};
export type GetItemTagsByItemIds = {
    data: {
        id: string;
        itemTags: {
            id: string;
            tag: {
                tagId: string;
                name: string;
                localizedDisplayName: string;
                status: "Success" | string;
            };
        }[];
    }[];
};
export type CreateItemTagOptions = {
    itemId: number;
    tagId: string;
};
export type CreateItemTag = GetItemTagsByItemIds["data"][0]["itemTags"][0];
export type GetItemTagsMetaData = {
    isItemTagsFeatureEnabled: boolean;
    enabledAssetTypes: string[];
    maximumItemTagsPerItem: number;
};
export type DeleteItemTagOptions = {
    itemTagId: number;
};
export type DeleteItemTag = unknown;
export type GetTagsByTagIdsOptions = {
    tagIds: number[];
};
export type GetTagsByTagIds = {
    data: Omit<GetItemTagsByItemIds["data"][0]["itemTags"][0], "id">[];
};
export type SearchTagsOptions = {
    prefix: string;
    results: number;
};
export type SearchTags = GetTagsByTagIds;
export default class InventoryAPI extends BaseAPI {
    constructor(client: Client);
    getCreatedAssets(options: GetCreatedAssetsOptions): Promise<GetCreatedAssets>;
    getMultiCreatedAssets(options: GetMultiCreatedAssetDetailsOptions): Promise<GetMultiCreatedAssetDetails>;
    getItemTagsByItemIds(options: GetItemTagsByItemIdsOptions): Promise<GetItemTagsByItemIds>;
    createItemTag(options: CreateItemTagOptions): Promise<CreateItemTag>;
    getItemTagsMetaData(): Promise<GetItemTagsMetaData>;
    deleteItemTag(options: DeleteItemTagOptions): Promise<DeleteItemTag>;
    getTagsByTagIds(options: GetTagsByTagIdsOptions): Promise<GetTagsByTagIds>;
    searchTags(options: SearchTagsOptions): Promise<SearchTags>;
}
