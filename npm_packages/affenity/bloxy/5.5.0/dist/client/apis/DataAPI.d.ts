import BaseAPI from "./BaseAPI";
import Client from "../Client";
export declare type UploadDataOptions = {
    assetId: number;
    data: unknown;
};
export declare type UploadDataResult = unknown;
export default class DataAPI extends BaseAPI {
    constructor(client: Client);
    uploadData(options: UploadDataOptions): Promise<UploadDataResult>;
}
