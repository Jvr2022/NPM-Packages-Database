import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type GetUniverseStatsOptions = {
    universeId: number;
    type: "PremiumUpsells" | "PremiumVisits";
    startTime: string;
    endTime: string;
};
export type GetUniverseStats = {
    dataGranularity: "Hourly" | string;
    data: unknown;
};
export default class EconomyCreatorStatsAPI extends BaseAPI {
    constructor(client: Client);
    getUniverseStats(options: GetUniverseStatsOptions): Promise<GetUniverseStats>;
}
