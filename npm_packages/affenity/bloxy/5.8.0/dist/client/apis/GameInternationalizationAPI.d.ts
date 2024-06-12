import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type GetGameInfoOptions = {
    gameId: number;
};
export type GetGameInfo = {
    data: {
        name: string;
        description: string;
        languageCode: string;
    }[];
};
export type UpdateGameInfoOptions = {
    gameId: number;
    data: GetGameInfo;
};
export type UpdateGameInfo = {
    successOperations: GetGameInfo["data"];
    failedOperations: {
        languageCode: string;
        errorCode: number;
    }[];
};
export type GetNameDescriptionMetaData = {
    isNameDescriptionMigrationEnabled: boolean;
};
export type GetGameInfoHistoryOptions = {
    gameId: number;
    requestType: string;
    languageCode: string;
    cursor: string;
    count: number;
    sortOrder: "Asc" | "Desc" | string;
};
export type GetGameInfoHistory = {
    history: {
        translationText: string;
        translator: {
            id: number;
            agentType: "User" | string;
        };
        created: Date;
    }[];
    lastEvaluatedId: string;
};
export type GetGameSourceLanguageOptions = {
    gameId: number;
};
export type GetGameSourceLanguage = {
    name: string;
    nativeName: string;
    languageCode: string;
};
export type UpdateGameSourceLanguageOptions = {
    gameId: number;
    languageCode: string;
};
export type UpdateGameSourceLanguage = unknown;
export type GetGameSupportedLanguagesOptions = {
    gameId: number;
};
export type GetGameSupportedLanguages = {
    data: {
        name: string;
        languageCodeType: string;
        languageCode: string;
    }[];
};
export type ModifyGameSupportedLanguagesOptions = {
    data: {
        languageCodeType: string;
        languageCode: string;
        delete: boolean;
    }[];
    gameId: number;
};
export type ModifyGameSupportedLanguages = unknown;
export type GetGameAutomaticTranslationResultsOptions = {
    gameId: number;
};
export type GetGameAutomaticTranslationResults = {
    data: {
        languageCodeType: string;
        languageCode: string;
        isAutomaticTranslationEnabled: boolean;
    }[];
};
export type GetSupportedLanguagesMetaData = {
    isFeatureEnabled: boolean;
    areAllLanguagesEnabled: boolean;
    minimumUniverseIdForFeature: number;
    isHumanTranslationProgressUIEnabled: boolean;
    isAutomaticTranslationProgressUIEnabled: boolean;
    isSupportedLanguagesChildLocalesUIEnabled: boolean;
};
export type ToggleAutomaticGameTranslationOptions = {
    gameId: number;
    languageCode: string;
    enableAutomaticTranslation: boolean;
};
export type ToggleAutomaticGameTranslation = {
    gameId: number;
    languageCode: string;
    isAutomaticTranslationEnabled: boolean;
};
export default class GameInternationalizationAPI extends BaseAPI {
    constructor(client: Client);
    getGameInfo(options: GetGameInfoOptions): Promise<GetGameInfo>;
    updateGameInfo(options: UpdateGameInfoOptions): Promise<UpdateGameInfo>;
    getNameDescriptionMetaData(): Promise<GetNameDescriptionMetaData>;
    getGameInfoHistory(options: GetGameInfoHistoryOptions): Promise<GetGameInfoHistory>;
    getGameSourceLanguage(options: GetGameSourceLanguageOptions): Promise<GetGameSourceLanguage>;
    updateGameSourceLanguage(options: UpdateGameSourceLanguageOptions): Promise<UpdateGameSourceLanguage>;
    getGameSupportedLanguages(options: GetGameSupportedLanguagesOptions): Promise<GetGameSupportedLanguages>;
    modifyGameSupportedLanguages(options: ModifyGameSupportedLanguagesOptions): Promise<ModifyGameSupportedLanguages>;
    getGameAutomaticTranslationStatus(options: GetGameAutomaticTranslationResultsOptions): Promise<GetGameAutomaticTranslationResults>;
    getSupportedLanguagesMetaData(): Promise<GetSupportedLanguagesMetaData>;
    toggleGameAutomaticTranslation(options: ToggleAutomaticGameTranslationOptions): Promise<ToggleAutomaticGameTranslation>;
}
