import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type GetTradeOptions = {
    tradeId: number;
};
export type GetTrade = {
    offers: {
        user: {
            id: number;
            name: string;
            displayName: string;
        };
        userAssets: {
            id: number;
            serialNumber: number;
            assetId: number;
            name: string;
            recentAveragePrice: number;
            originalPrice: number;
            assetStock: number;
            membershipType: "None" | string;
        }[];
        robux: number;
    }[];
    id: number;
    user: {
        id: number;
        name: string;
        displayName: string;
    };
    created: string;
    expiration: string;
    isActive: boolean;
    status: string;
};
export type GetTradesByStatusTypeOptions = {
    tradeStatusType: "Inbound" | "Outbound" | "Completed" | "Inactive";
    sortOrder?: "Asc" | "Desc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type GetTradesByStatusType = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        id: number;
        user: {
            id: number;
            name: string;
            displayName: string;
        };
        created: string;
        expiration: string;
        isActive: boolean;
        status: string;
    }[];
};
export type GetTradesCountByStatusTypeOptions = {
    tradeStatusType: GetTradesByStatusTypeOptions["tradeStatusType"];
};
export type GetTradesCountByStatusType = {
    count: number;
};
export type GetTradesMetaData = {
    maxItemsPerSide: number;
    minValueRatio: number;
    tradeSystemMaxRobuxPercent: number;
    tradeSystemRobuxFee: number;
};
export type CanSelfTradeWithUserOptions = {
    userId: number;
};
export type CanSelfTradeWithUser = {
    canTrade: boolean;
    status: string;
};
export type AcceptTradeOptions = {
    tradeId: number;
};
export type AcceptTrade = unknown;
export type CounterTradeOptions = {
    tradeId: number;
    offers: {
        userId: number;
        userAssetIds: number[];
        robux: number;
    }[];
};
export type CounterTrade = {
    id: number;
};
export type DeclineTradeOptions = {
    tradeId: number;
};
export type DeclineTrade = unknown;
export type SendTradeOptions = Omit<CounterTradeOptions, "tradeId">;
export type SendTrade = {
    id: number;
};
export default class TradesAPI extends BaseAPI {
    constructor(client: Client);
    getTrade(options: GetTradeOptions): Promise<GetTrade>;
    getTradesByStatusType(options: GetTradesByStatusTypeOptions): Promise<GetTradesByStatusType>;
    getTradesCountByStatusType(options: GetTradesCountByStatusTypeOptions): Promise<GetTradesCountByStatusType>;
    getTradesMetaData(): Promise<GetTradesMetaData>;
    canTradeWith(options: CanSelfTradeWithUserOptions): Promise<CanSelfTradeWithUser>;
    acceptTrade(options: AcceptTradeOptions): Promise<AcceptTrade>;
    counterTrade(options: CounterTradeOptions): Promise<CounterTrade>;
    declineTrade(options: DeclineTradeOptions): Promise<DeclineTrade>;
    sendTrade(options: SendTradeOptions): Promise<SendTrade>;
}
