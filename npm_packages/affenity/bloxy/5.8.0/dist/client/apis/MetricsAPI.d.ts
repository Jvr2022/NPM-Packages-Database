import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type GetThumbnailsMetaData = {
    logRatio: number;
};
export type RecordThumbnailLoadOptions = {
    duration: number;
    loadState: string;
    thumbnailType: string;
};
export type RecordThumbnailLoad = unknown;
export type RecordBundleLoadOptions = {
    bundleUrl: string;
    bundleName: string;
    loadTimeInMilliseconds: number;
    cdnProviderName: string;
    loadState: string;
    bundleContentType: string;
};
export type RecordBundleLoad = unknown;
export default class LocaleAPI extends BaseAPI {
    constructor(client: Client);
    getThumbnailsMetaData(): Promise<GetThumbnailsMetaData>;
    recordThumbnailLoad(options: RecordThumbnailLoadOptions): Promise<RecordThumbnailLoad>;
    recordBundleLoad(options: RecordBundleLoadOptions): Promise<RecordBundleLoad>;
}
