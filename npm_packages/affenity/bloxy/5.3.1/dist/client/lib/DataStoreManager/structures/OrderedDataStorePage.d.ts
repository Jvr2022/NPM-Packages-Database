import OrderedDataStore, { GetSortedUrlOptions, OrderedDataStoreResultType } from "./OrderedDataStore";
export default class OrderedDataStorePage<DataType extends any> {
    orderedDataStore: OrderedDataStore<DataType>;
    options: GetSortedUrlOptions;
    data: {
        key: string;
        value: number;
    }[];
    startKey: string | null;
    constructor(orderedDataStore: OrderedDataStore<DataType>, data: {
        options: GetSortedUrlOptions;
        result: OrderedDataStoreResultType;
    });
    fetchNextPage(): Promise<OrderedDataStorePage<DataType>>;
}
