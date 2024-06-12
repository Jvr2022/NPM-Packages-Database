import DataStoreManager from "../DataStoreManager";
import { RESTRequestOptions, RESTResponseDataType } from "../../../../interfaces/RESTInterfaces";
import { DataStoreRequestType } from "../util/constants";
type DataStoreHttpRequestOptions = RESTRequestOptions & {
    placeId: number;
    requestType: DataStoreRequestType;
    data: string;
};
export default class DataStoreHttpRequest {
    initiator: DataStoreManager;
    options: DataStoreHttpRequestOptions;
    constructor(manager: DataStoreManager, options: DataStoreHttpRequestOptions);
    send(): Promise<RESTResponseDataType>;
}
export {};
