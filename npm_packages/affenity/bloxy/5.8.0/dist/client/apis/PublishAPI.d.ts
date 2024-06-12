import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type UploadAssetsOptions = {
    files: unknown;
};
export type UploadAssets = {
    AssetDetails: {
        assetId: number;
        assetFileName: string;
        uploadAssetError: "None" | string;
    }[];
};
export type PublishAudioOptions = {
    name: string;
    file: unknown;
    groupId?: number;
    paymentSource: string;
};
export type PublishAudio = {
    Id: number;
    Name: string;
};
export type VerifyAudioOptions = PublishAudioOptions;
export type VerifyAudio = {
    price: number;
    canAfford: boolean;
};
export type PublishBadgeIconOptions = {
    badgeId: number;
    files: unknown;
};
export type PublishBadgeIcon = {
    targetId: number;
};
export type PublishGamePassIconOptions = {
    gamePassId: number;
    files: unknown;
};
export type PublishGamePassIcon = {
    targetId: number;
};
export type UploadGameThumbnailOptions = {
    gameId: number;
    files: unknown;
};
export type UploadGameThumbnail = {
    targetId: number;
};
export type UploadPluginIconOptions = {
    pluginId: number;
    files: unknown;
};
export type UploadPluginIcon = {
    targetId: number;
};
export default class PublishAPI extends BaseAPI {
    constructor(client: Client);
    uploadAssets(options: UploadAssetsOptions): Promise<UploadAssets>;
    publishAudio(options: PublishAudioOptions): Promise<PublishAudio>;
    verifyAudio(options: VerifyAudioOptions): Promise<VerifyAudio>;
    publishBadgeIcon(options: PublishBadgeIconOptions): Promise<PublishBadgeIcon>;
    publishGamePassIcon(options: PublishGamePassIconOptions): Promise<PublishGamePassIcon>;
    uploadGameThumbnail(options: UploadGameThumbnailOptions): Promise<UploadGameThumbnail>;
    uploadPluginIcon(options: UploadPluginIconOptions): Promise<UploadPluginIcon>;
}
