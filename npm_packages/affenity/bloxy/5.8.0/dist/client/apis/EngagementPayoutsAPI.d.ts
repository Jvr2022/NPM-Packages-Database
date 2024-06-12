import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type GetUniversePayoutHistoryOptions = {
    universeId: number;
    startDate: string;
    endDate: string;
};
export type GetUniversePayoutHistory = unknown;
export default class EngagementPayoutsAPI extends BaseAPI {
    constructor(client: Client);
    getUniversePayoutHistory(options: GetUniversePayoutHistoryOptions): Promise<GetUniversePayoutHistory>;
}
