import GenericDataStore from "./GenericDataStore";
import DataStoreManager from "../DataStoreManager";
import OrderedDataStorePage from "./OrderedDataStorePage";
export type GetSortedUrlOptions = {
    ascending?: boolean;
    pageSize?: number;
    minValue?: number;
    maxValue?: number;
    startKey?: string;
};
export type OrderedDataStoreResultType = {
    data: {
        Entries: {
            Target: string;
            Value: number;
        }[];
        ExclusiveStartKey: string | null;
    };
};
export default class OrderedDataStore<DataType extends any> extends GenericDataStore<DataType> {
    constructor(manager: DataStoreManager, placeId: number, name: string, scope?: string, legacy?: boolean);
    getSortedAsync(options: GetSortedUrlOptions): Promise<OrderedDataStorePage<DataType>>;
    private buildGetSortedUrl;
}
