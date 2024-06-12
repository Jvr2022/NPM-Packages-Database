import BaseAPI from "./BaseAPI";
import Client from "../Client";
import { UpdateUserPromotionChannelsOptions as AccountInformationUpdateUserPromotionChannelsOptions } from "./AccountInformationAPI";
export type GetSettingsGroups = {
    title: string;
    url: string;
    suffix: string;
}[];
export type GetAppChatPrivacy = {
    appChatPrivacy: string;
};
export type UpdateAppChatPrivacyOptions = {
    appChatPrivacy: string;
};
export type UpdateAppChatPrivacy = boolean;
export type GetGameChatPrivacy = {
    gameChatPrivacy: string;
};
export type UpdateGameChatPrivacyOptions = {
    gameChatPrivacy: string;
};
export type UpdateGameChatPrivacy = boolean;
export type GetInventoryPrivacy = {
    inventoryPrivacy: string;
};
export type UpdateInventoryPrivacyOptions = {
    inventoryPrivacy: string;
};
export type UpdateInventoryPrivacy = {
    inventoryPrivacy: string;
    tradePrivacy: string;
    privacySettingResponse: string;
};
export type GetUserPrivacy = {
    phoneDiscovery: string;
};
export type UpdateUserPrivacyOptions = {
    phoneDiscovery: string;
};
export type UpdateUserPrivacy = {
    phoneDiscovery: string;
};
export type GetUserPrivacySettingsInfo = {
    isPhoneDiscoveryEnabled: boolean;
};
export type GetUserPrivateMessagePrivacy = {
    privateMessagePrivacy: string;
};
export type UpdateUserPrivateMessagePrivacyOptions = {
    privateMessagePrivacy: string;
};
export type UpdateUserPrivateMessagePrivacy = boolean;
export type GetUserEmailStatus = {
    email: string;
    verified: boolean;
};
export type UpdateUserEmailOptions = {
    password: string;
    emailAddress: string;
};
export type UpdateUserEmail = boolean;
export type SendEmailVerification = boolean;
export type GetWebsiteTheme = {
    themeType: string;
};
export type UpdateWebsiteThemeOptions = {
    themeType: string;
};
export type UpdateWebsiteTheme = boolean;
export type GetWebsiteThemes = {
    data: string[];
};
export type GetUserTradePrivacy = {
    tradePrivacy: string;
};
export type UpdateUserTradePrivacyOptions = {
    tradePrivacy: string;
};
export type UpdateUserTradePrivacy = {
    tradePrivacy: string;
    inventoryPrivacy: string;
    privacySettingResponse: string;
};
export type GetUserTradeQualityFilter = {
    tradeValue: string;
};
export type UpdateUserTradeQualityFilterOptions = {
    tradeValue: string;
};
export type UpdateUserTradeQualityFilter = boolean;
export type UpdateTwoStepStatusOptions = {
    enabled: boolean;
    password: string;
};
export type UpdateTwoStepStatus = {
    enabled: boolean;
    password: string;
};
export type GetContactUpsell = {
    upsellScreenType: string;
};
export type UpdateContactUpsellSuppressionOptions = {
    suppress: boolean;
};
export type UpdateContactUpsellSuppression = boolean;
export type GetIsXboxUsernameValidOptions = {
    authorization: string;
    signature: string;
    username: string;
};
export type GetIsXboxUsernameValid = {
    isValid: boolean;
    errorMessage?: string;
    errorCode?: string;
};
export type UpdateUserPromotionChannelsOptions = AccountInformationUpdateUserPromotionChannelsOptions;
export type UpdateUserPromotionChannels = boolean;
export default class AccountSettingsAPI extends BaseAPI {
    constructor(client: Client);
    getSettingsGroups(): Promise<GetSettingsGroups>;
    getAppChatPrivacy(): Promise<GetAppChatPrivacy>;
    updateAppChatPrivacy(options: UpdateAppChatPrivacyOptions): Promise<UpdateAppChatPrivacy>;
    getGameChatPrivacy(): Promise<GetGameChatPrivacy>;
    updateGameChatPrivacy(options: UpdateGameChatPrivacyOptions): Promise<UpdateGameChatPrivacy>;
    getInventoryPrivacy(): Promise<GetInventoryPrivacy>;
    updateInventoryPrivacy(options: UpdateInventoryPrivacyOptions): Promise<UpdateInventoryPrivacy>;
    getUserPrivacy(): Promise<GetUserPrivacy>;
    updateUserPrivacy(options: UpdateUserPrivacyOptions): Promise<UpdateUserPrivacy>;
    getUserPrivacySettingsInfo(): Promise<GetUserPrivacySettingsInfo>;
    getUserPrivateMessagePrivacy(): Promise<GetUserPrivateMessagePrivacy>;
    updateUserPrivateMessagePrivacy(options: UpdateUserPrivateMessagePrivacyOptions): Promise<UpdateUserPrivateMessagePrivacy>;
    getUserEmailStatus(): Promise<GetUserEmailStatus>;
    updateUserEmail(options: UpdateUserEmailOptions): Promise<UpdateUserEmail>;
    sendEmailVerification(): Promise<SendEmailVerification>;
    getWebsiteTheme(): Promise<GetWebsiteTheme>;
    updateWebsiteTheme(options: UpdateWebsiteThemeOptions): Promise<UpdateWebsiteTheme>;
    getWebsiteThemes(): Promise<GetWebsiteThemes>;
    getUserTradePrivacy(): Promise<GetUserTradePrivacy>;
    updateUserTradePrivacy(options: UpdateUserTradePrivacyOptions): Promise<UpdateUserTradePrivacy>;
    getUserTradeQualityFilter(): Promise<GetUserTradeQualityFilter>;
    updateUserTradeQualityFilter(options: UpdateUserTradeQualityFilterOptions): Promise<UpdateUserTradeQualityFilter>;
    updateTwoStepStatus(options: UpdateTwoStepStatusOptions): Promise<UpdateTwoStepStatus>;
    getContactUpsell(): Promise<GetContactUpsell>;
    updateContactUpsellSuppression(options: UpdateContactUpsellSuppressionOptions): Promise<UpdateContactUpsellSuppression>;
    getIsXboxUsernameValid(options: GetIsXboxUsernameValidOptions): Promise<GetIsXboxUsernameValid>;
    updateUserPromotionChannels(options: UpdateUserPromotionChannelsOptions): Promise<UpdateUserPromotionChannels>;
}
