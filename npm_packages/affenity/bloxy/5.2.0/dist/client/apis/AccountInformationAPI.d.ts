import BaseAPI from "./BaseAPI";
import Client from "../Client";
export declare type UpdateUserBirthdateOptions = GetUserBirthdate;
export declare type UpdateUserDescriptionOptions = {
    description: string;
};
export declare type UpdateUserGenderOptions = {
    gender: number;
};
export declare type SetPhoneNumberOptions = {
    countryCode: string;
    prefix: string;
    phone: string;
    password: string;
};
export declare type DeletePhoneOptions = SetPhoneNumberOptions;
export declare type ResendPhoneCodeOptions = SetPhoneNumberOptions;
export declare type VerifyPhoneOptions = SetPhoneNumberOptions;
export declare type AddStarCodeAffiliateOptions = {
    code: string;
};
export declare type UpdateUserPromotionChannelsOptions = {
    facebook: string;
    twitter: string;
    youtube: string;
    twitch: string;
    promotionChannelsVisibilityPrivacy: string;
};
export declare type GetUserBirthdate = {
    birthMonth: number;
    birthDay: number;
    birthYear: number;
};
export declare type UpdateUserBirthdate = boolean;
export declare type GetUserDescription = {
    description: string;
};
export declare type UpdateUserDescription = boolean;
export declare type GetUserGender = {
    gender: number;
};
export declare type UpdateUserGender = unknown;
export declare type GetConsecutiveXboxLoginDays = {
    count: number;
};
export declare type GetMetaData = {
    isAllowedNotificationsEndpointDisabled: boolean;
    isAccountSettingsPolicyEnabled: boolean;
    isPhoneNumberEnabled: boolean;
};
export declare type GetVerifiedPhoneNumber = SetPhoneNumberOptions;
export declare type SetPhoneNumber = unknown;
export declare type DeletePhone = unknown;
export declare type ResendPhoneCode = unknown;
export declare type VerifyPhone = unknown;
export declare type GetSelfPromotionChannels = UpdateUserPromotionChannelsOptions;
export declare type GetUserPromotionChannelsOptions = {
    userId: number;
};
export declare type GetUserPromotionChannels = Omit<GetSelfPromotionChannels, "promotionChannelsVisibilityPrivacy">;
export declare type UpdateUserPromotionChannels = unknown;
export declare type RemoveStarCodeAffiliate = unknown;
export declare type GetStarCodeAffiliate = {
    userId: number;
    name: string;
    code: string;
};
export declare type AddStarCodeAffiliate = GetStarCodeAffiliate;
export default class AccountInformationAPI extends BaseAPI {
    constructor(client: Client);
    getUserBirthdate(): Promise<GetUserBirthdate>;
    updateUserBirthdate(options: UpdateUserBirthdateOptions): Promise<UpdateUserBirthdate>;
    getUserDescription(): Promise<GetUserDescription>;
    updateUserDescription(options: UpdateUserDescriptionOptions): Promise<UpdateUserDescription>;
    getUserGender(): Promise<GetUserGender>;
    updateUserGender(options: UpdateUserGenderOptions): Promise<UpdateUserGender>;
    getConsecutiveXboxLoginDays(): Promise<GetConsecutiveXboxLoginDays>;
    getMetaData(): Promise<GetMetaData>;
    getVerifiedPhoneNumber(): Promise<GetVerifiedPhoneNumber>;
    setPhoneNumber(options: SetPhoneNumberOptions): Promise<SetPhoneNumber>;
    deletePhone(options: DeletePhoneOptions): Promise<DeletePhone>;
    resendPhoneCode(options: ResendPhoneCodeOptions): Promise<ResendPhoneCode>;
    verifyPhone(options: VerifyPhoneOptions): Promise<VerifyPhone>;
    getSelfPromotionChannels(): Promise<GetSelfPromotionChannels>;
    getUserPromotionChannels(options: GetUserPromotionChannelsOptions): Promise<GetUserPromotionChannels>;
    updateUserPromotionChannels(options: UpdateUserPromotionChannelsOptions): Promise<UpdateUserPromotionChannels>;
    removeStarCodeAffiliate(): Promise<RemoveStarCodeAffiliate>;
    getStarCodeAffiliate(): Promise<GetStarCodeAffiliate>;
    addStarCodeAffiliate(options: AddStarCodeAffiliateOptions): Promise<AddStarCodeAffiliate>;
}
