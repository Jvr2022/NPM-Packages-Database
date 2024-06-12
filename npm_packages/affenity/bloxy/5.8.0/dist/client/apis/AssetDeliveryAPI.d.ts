import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type BaseAssetDeliveryOptions = {
    acceptEncoding: string;
    robloxPlaceId: number;
    assetType: string;
    accept: string;
    skipSigningScripts: boolean;
    clientInsert: number;
    scriptInsert: number;
    modulePlaceId: number;
    serverPlaceId: number;
    expectedAssetType: string;
};
export type BaseAsset = {
    location?: string;
    errors?: {
        code: number;
        message: string;
    }[];
    requestId?: string;
    isHashDynamic?: boolean;
    isCopyrightProtected?: boolean;
    isArchived?: boolean;
};
export type BaseAssetRaw = {
    Location?: string;
    Errors?: {
        Code: number;
        Message: string;
    }[];
    RequestId?: string;
    IsHashDynamic?: boolean;
    IsCopyrightProtected?: boolean;
    IsArchived?: boolean;
};
export type GetAssetByAliasOptions = BaseAssetDeliveryOptions & {
    alias: string;
};
export type GetAssetByAlias = BaseAsset;
export type GetAssetByIdOptions = BaseAssetDeliveryOptions & {
    id: number;
};
export type GetAssetById = {
    location?: string;
    request?: unknown;
};
export type GetAssetByHashOptions = BaseAssetDeliveryOptions & {
    hash: string;
};
export type GetAssetByHash = unknown;
export type GetAssetByAssetIdOptions = BaseAssetDeliveryOptions & {
    assetId: number;
};
export type GetAssetByAssetId = unknown;
export type GetAssetVersionByAssetIdOptions = BaseAssetDeliveryOptions & {
    assetId: number;
    version: number;
};
export type GetAssetVersionByAssetId = unknown;
export type GetAssetByAssetVersionIdOptions = BaseAssetDeliveryOptions & {
    assetVersionId: number;
};
export type GetAssetByAssetVersionId = unknown;
export type GetAssetByMarAssetHashOptions = BaseAssetDeliveryOptions & {
    marAssetHash: string;
    marCheckSum: string;
};
export type GetAssetByMarAssetHash = unknown;
export type GetAssetByUserAssetIdOptions = BaseAssetDeliveryOptions & {
    userAssetId: number;
};
export type GetAssetByUserAssetId = unknown;
export type GetBatchAssetsOptions = {
    assetName: string;
    assetType: string;
    clientInsert: boolean;
    placeId: number;
    requestId: string;
    scriptInsert: boolean;
    serverPlaceId: number;
    universeId: number;
    accept: string;
    encoding: string;
    hash: string;
    userAssetId: number;
    assetId: number;
    version: number;
    assetVersionId: number;
    modulePlaceId: number;
};
export type GetBatchAssets = BaseAsset[];
export default class AssetDeliveryAPI extends BaseAPI {
    constructor(client: Client);
    getAssetByAlias(options: GetAssetByAliasOptions): Promise<GetAssetByAlias>;
    getAssetById(options: GetAssetByIdOptions): Promise<GetAssetById>;
    getAssetByHash(options: GetAssetByHashOptions): Promise<GetAssetByHash>;
    getAssetByAssetId(options: GetAssetByAssetIdOptions): Promise<GetAssetByAssetId>;
    getAssetVersionByAssetId(options: GetAssetVersionByAssetIdOptions): Promise<GetAssetVersionByAssetId>;
    getAssetByAssetVersionId(options: GetAssetByAssetVersionIdOptions): Promise<GetAssetByAssetVersionId>;
    getAssetByMarAssetHash(options: GetAssetByMarAssetHashOptions): Promise<GetAssetByMarAssetHash>;
    getAssetByUserAssetId(options: GetAssetByUserAssetIdOptions): Promise<GetAssetByUserAssetId>;
    getBatchAssets(options: GetBatchAssetsOptions): Promise<GetBatchAssets>;
}
