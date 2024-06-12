import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type PremiumUpsellCheckOptions = {
    userId: number;
    universeId: number;
    placeId: number;
};
export type PremiumUpsellCheck = unknown;
export type ValidateUserMembershipOptions = {
    userId: number;
};
export type ValidateUserMembership = boolean;
export default class PremiumFeaturesAPI extends BaseAPI {
    constructor(client: Client);
    premiumUpsellCheck(options: PremiumUpsellCheckOptions): Promise<PremiumUpsellCheck>;
    validateUserMembership(options: ValidateUserMembershipOptions): Promise<ValidateUserMembership>;
}
