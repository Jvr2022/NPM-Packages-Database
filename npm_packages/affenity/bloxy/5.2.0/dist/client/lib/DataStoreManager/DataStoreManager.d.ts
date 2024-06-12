import Client from "../../Client";
import OrderedDataStore from "./structures/OrderedDataStore";
import GlobalDataStore from "./structures/GlobalDataStore";
export default class DataStoreManager {
    client: Client;
    constructor(client: Client);
    getOrderedDataStore(placeId: number, name: string, scope?: string): OrderedDataStore<unknown>;
    getDataStore(placeId: number, name: string, scope?: string): GlobalDataStore<unknown>;
}
