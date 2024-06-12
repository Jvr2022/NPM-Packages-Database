import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type UploadDataOptions = {
    assetId: number;
    data: unknown;
};
export type UploadDataResult = unknown;
export default class DataAPI extends BaseAPI {
    constructor(client: Client);
    uploadData(options: UploadDataOptions): Promise<UploadDataResult>;
}
