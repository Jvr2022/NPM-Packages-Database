import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type GetCountryRegionsOptions = {
    locale: string;
};
export type GetCountryRegions = {
    countryRegionList: {
        code: string;
        name: string;
        displayName: string;
    }[];
};
export type GetLocalesOptions = {
    displayValueLocale?: string;
};
export type GetLocales = {
    data: {
        locale: {
            id: number;
            locale: string;
            name: string;
            nativeName: string;
            language: {
                id: number;
                name: string;
                nativeName: string;
                languageCode: string;
            };
        };
        isEnabledForFullExperience: boolean;
        isEnabledForSignupAndLogin: boolean;
        isEnabledForInGameUgc: boolean;
    }[];
};
export type GetSupportedLocales = {
    supportedLocales: GetLocales["data"][0]["locale"][];
};
export type GetUserLocale = {
    supportedLocale: GetLocales["data"][0]["locale"];
};
export type GetLocusSupportedLocales = {
    signupAndLogin: GetLocales["data"][0]["locale"];
    generalExperience: GetLocales["data"][0]["locale"];
    ugc: GetLocales["data"][0]["locale"];
};
export type SetUserLocaleOptions = {
    supportedLocaleCode: string;
};
export type SetUserLocale = {
    success: boolean;
};
export default class LocaleAPI extends BaseAPI {
    constructor(client: Client);
    getCountryRegions(options: GetCountryRegionsOptions): Promise<GetCountryRegions>;
    getLocales(options: GetLocalesOptions): Promise<GetLocales>;
    getSupportedLocales(): Promise<GetSupportedLocales>;
    getUserLocale(): Promise<GetUserLocale>;
    getLocusSupportedLocales(): Promise<GetLocusSupportedLocales>;
    setUserLocale(options: SetUserLocaleOptions): Promise<SetUserLocale>;
}
