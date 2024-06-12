import BaseAPI from "./BaseAPI";
import Client from "../Client";
import { GameUniverseOptions } from "../../structures/Game";
import { PartialGroupOptions } from "../../structures/Group";
export type GetAssetsVoteInformationOptions = {
    assetIds: number[];
};
export type GetAssetsVoteInformation = {
    data: {
        assetId: number;
        hasUserVoted: number;
        canUserVote: number;
        shouldShowVote: boolean;
        upVotes: number;
        downVotes: number;
        reasonForNotAbleToVote: string;
    }[];
};
export type GetGameTemplates = {
    gameTemplateType: string;
    hasTutorials: boolean;
    universe: GameUniverseOptions;
}[];
export type GetGameUpdatesHistoryOptions = {
    universeId: number;
};
export type GetGameUpdatesHistory = {
    universeId: number;
    createdOn: string;
    createdOnKey: string;
    creatorType: string;
    creatorId: number;
    creatorName: string;
    expiredOn: string;
    content: string;
    impressions: number;
    plays: number;
    unfollows: number;
}[];
export type PublishGameNotificationOptions = {
    universeId: number;
    gameUpdateText: unknown;
};
export type PublishGameNotification = GetGameUpdatesHistory;
export type FilterPublishGameNotificationOptions = {
    text: string;
};
export type FilterPublishGameNotification = {
    filteredGameUpdateText: string;
    isFiltered: boolean;
    moderationLevel: number;
};
export type GetGroupUniversesOptions = {
    groupId: number;
    sortOrder?: "Asc" | "Desc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type GetGroupUniverses = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        id: number;
        name: string;
        description: string;
        isArchived: boolean;
        rootPlaceId: number | null;
        isActive: boolean;
        privacyType: "Private" | string;
        creatorType: "Group" | string;
        creatorTargetId: null;
        creatorName: string;
        created: string;
        updated: string;
    }[];
};
export type GetPlaceCompatibilitiesOptions = {
    placeId: number;
};
export type GetPlaceCompatibilities = {
    Compatibilities: {
        status: "Good" | string;
        platformName: string;
        crashRatePercentage: number;
    }[];
};
export type UpdatePlaceConfigurationOptions = {
    placeId: number;
    name: string;
    description: string;
};
export type UpdatePlaceConfiguration = {
    id: number;
    universeId: number;
    name: string;
    description: string;
};
export type GetPlaceStatisticsByTypeOptions = {
    placeId: number;
    type: "Revenue" | "RevenuePerVisit" | "AverageVisitLength" | "Visits";
    granularity?: "Hourly" | "Daily" | "Monthly";
    divisionType?: "Device" | "Age";
    startTime?: string;
    endTime?: string;
};
export type GetPlaceStatisticsByType = {
    placeId: number;
    dataType: GetPlaceStatisticsByTypeOptions["type"];
    dataGranularity: GetPlaceStatisticsByTypeOptions["granularity"];
    startTime: string;
    endTime: string;
    data: unknown;
};
export type GetPluginsByIdOptions = {
    pluginIds: number[];
};
export type GetPluginsById = {
    data: {
        id: number;
        name: string;
        description: string;
        commentsEnabled: boolean;
        versionId: number;
        created: string;
        updated: string;
    }[];
};
export type UpdatePluginOptions = {
    pluginId: number;
    name: string;
    description: string;
    commentsEnabled: boolean;
};
export type UpdatePlugin = unknown;
export type SearchUniversesOptions = {
    q: {
        creator: "user" | "group" | "team";
        archived?: boolean;
        active?: boolean;
        groups?: unknown[];
        search?: string;
    };
    sort?: ("+GameCreated" | "-GameCreated" | "+GameName" | "-GameName" | "+RootPlaceName" | "-RootPlaceName" | "+RootPlaceUpdated" | "-RootPlaceUpdated" | "+LastUpdated" | "-LastUpdated")[];
    sortOrder?: "Asc" | "Desc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type SearchUniverseData = {
    id: number;
    name: string;
    description: string;
    isArchived: boolean;
    rootPlaceId: number;
    isActive: boolean;
    privacyType: "Public" | "Private";
    creatorType: "User" | "Group";
    creatorTargetId: number;
    creatorName: string;
    created: string;
    updated: string;
};
export type SearchUniverses = {
    previousPageCursor: string | null;
    nextPageCursor: string | null;
    data: SearchUniverseData[];
};
export type SearchToolboxOptions = {
    category: string;
    keyword?: string;
    sort?: string;
    creatorId?: number;
    num?: number;
    page?: number;
    groupId?: number;
    cacheMode?: "Normal" | "Bypass" | "ForceUpdate";
};
export type SearchToolbox = {
    TotalResults: number;
    Results: {
        Asset: {
            Id: number;
            Name: string;
            TypeId: number;
            AssetGenres: string[];
            IsEndorsed: boolean;
            Description: string;
            Duration: number;
            Created: string;
            Updated: string;
            CreatedRaw: string;
            UpdatedRaw: string;
        };
        Creator: {
            Id: number;
            Name: string;
            Type: number;
        };
        Thumbnail: {
            Final: boolean;
            Url: string;
            RetryUrl: string;
            UserId: number;
            EndpointType: string;
        };
        Voting: {
            ShowVotes: boolean;
            UpVotes: number;
            DownVotes: number;
            CanVote: boolean;
            UserVote: boolean;
            HasVoted: number;
            ReasonForNotVoteable: string;
            Product: {
                ProductId: number;
                Price: number;
            };
        };
    }[];
};
export type GetUniverseOptions = {
    universeId: number;
};
export type GetUniverse = GameUniverseOptions;
export type GetUniversePermissionsOptions = {
    universeId: number;
};
export type GetUniversePermissions = {
    canManage: boolean;
    canCloudEdit: boolean;
};
export type GetUniversePlacesOptions = {
    universeId: number;
    sortOrder?: "Asc" | "Desc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type GetUniversePlaces = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: unknown[];
};
export type GetUniverseStatisticsReportsOptions = {
    universeId: number;
};
export type GetUniverseStatisticsReports = {
    reports: {
        universeId: number;
        yearDashMonth: string;
        status: "NotGenerated" | string;
        spreadsheetId: string;
    }[];
};
export type GetUniverseStatisticsReportsByTimeOptions = {
    universeId: number;
    yearDashMonth: string;
};
export type GetUniverseStatisticsReportByTime = {
    universeId: number;
    yearDashMonth: string;
    status: "NotGenerated" | string;
    spreadsheetId: string;
};
export type DownloadUniverseStatisticsReportByTimeOptions = {
    universeId: number;
    yearDashMonth: string;
};
export type DownloadUniverseStatisticsReportByTime = unknown;
export type MultiGetUniversesOptions = {
    ids: number[];
};
export type MultiGetUniverses = GameUniverseOptions[];
export type MultiGetUniversesPermissionsOptions = {
    ids: number[];
};
export type MultiGetUniversesPermissions = {
    data: {
        universeId: number;
        canManage: boolean;
        canCloudEdit: boolean;
    }[];
};
export type ActivateUniverseOptions = {
    universeId: number;
};
export type ActivateUniverse = unknown;
export type DeactivateUniverseOptions = {
    universeId: number;
};
export type DeactivateUniverse = unknown;
export type GenerateUniverseStatisticReportsByTimeOptions = {
    universeId: number;
    yearDashMonth: string;
};
export type GenerateUniverseStatisticReportsByTime = unknown;
export type GetUniverseConfigurationOptions = {
    universeId: number;
};
export type GetUniverseConfiguration = {
    id: number;
    name: string;
    universeAvatarType: "MorphToR6" | "MorphToR15";
    universeScaleType: "NoScales" | string;
    universeAnimationType: "Standard" | string;
    universeCollisionType: "InnerBox" | string;
    universeBodyType: "Standard" | string;
    universeJointPositioningType: "Standard" | string;
    isArchived: boolean;
    isFriendsOnly: boolean;
    genre: "All" | string;
    playableDevices: ("Computer" | string)[];
    isForSale: boolean;
    price: number;
};
export type UpdateUniverseConfigurationOptions = Omit<GetUniverseConfiguration, "id"> & {
    universeId: number;
};
export type UpdateUniverseConfiguration = GetUniverseConfiguration;
export type GetUniverseVIPServersConfigurationOptions = {
    universeId: number;
};
export type GetUniverseVIPServersConfiguration = {
    isEnabled: boolean;
    price: number;
    activeServersCount: number;
    activeSubscriptionsCount: number;
};
export type GetUniverseTeamCreateSettingsOptions = {
    universeId: number;
};
export type GetUniverseTeamCreateSettings = {
    isEnabled: boolean;
};
export type UpdateUniverseTeamCreateSettingsOptions = GetUniverseTeamCreateSettingsOptions;
export type UpdateUniverseTeamCreateSettings = unknown;
export type RemoveUserFromUniverseTeamCreateOptions = {
    universeId: number;
    userId: number;
};
export type RemoveUserFromUniverseTeamCreate = unknown;
export type GetUsersInUniverseTeamCreateOptions = {
    universeId: number;
    sortOrder?: "Asc" | "Desc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type GetUsersInUniverseTeamCreate = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        buildersClubMembershipType: "None" | string;
        userId: number;
        username: string;
        displayName: string;
    }[];
};
export type GetSelfTeamCreateUniversesAccessOptions = {
    sortOrder?: "Asc" | "Desc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type GetSelfTeamCreateUniversesAccess = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: GameUniverseOptions[];
};
export type GetSelfGroupsAccess = {
    data: PartialGroupOptions[];
};
export type GetNotificationsStatisticReports = {
    data: {
        UserId: number;
        UniverseId: number;
        Expires: number;
        RootPlaceId: number;
        GameName: string;
    }[];
};
export type GetStudioDataOptions = {
    clientKey: string;
};
export type GetStudioData = unknown;
export type SetStudioDataOptions = {
    clientKey: string;
    data: unknown;
};
export type SetStudioData = {
    success: boolean;
};
export type GetSelfUniversesOptions = {
    sortOrder?: "Asc" | "Desc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type GetSelfUniverses = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: GameUniverseOptions[];
};
export type CreateUniverseAliasOptions = {
    name: string;
    type: "Asset" | string;
    targetId: number;
};
export type CreateUniverseAlias = unknown;
export type DeleteUniverseAliasOptions = {
    universeId: number;
    name: string;
};
export type DeleteUniverseAlias = unknown;
export type UpdateUniverseAliasOptions = CreateUniverseAliasOptions;
export type UpdateUniverseAlias = unknown;
export type CreateDeveloperProductOptions = {
    universeId: number;
    name: string;
    description: string;
    priceInRobux: number;
    iconImageAssetId?: number;
};
export type CreateDeveloperProduct = {
    id: number;
    name: string;
    Description: string;
    shopId: number;
    iconImageAssetId: number;
};
export type UpdateDeveloperProductOptions = {
    universeId: number;
    developerProductId: number;
    Name: string;
    Description: string;
    IconImageAssetId?: number;
    PriceInRobux: number;
};
export type UpdateDeveloperProduct = unknown;
export default class DevelopAPI extends BaseAPI {
    constructor(client: Client);
    getGameTemplates(): Promise<GetGameTemplates>;
    getGameUpdatesHistory(options: GetGameUpdatesHistoryOptions): Promise<GetGameUpdatesHistory>;
    publishGameUpdateNotification(options: PublishGameNotificationOptions): Promise<PublishGameNotification>;
    filterGameUpdateNotificationText(options: FilterPublishGameNotificationOptions): Promise<FilterPublishGameNotification>;
    getGroupUniverses(options: GetGroupUniversesOptions): Promise<GetGroupUniverses>;
    getPlaceCompatibilities(options: GetPlaceCompatibilitiesOptions): Promise<GetPlaceCompatibilities>;
    updatePlaceConfiguration(options: UpdatePlaceConfigurationOptions): Promise<UpdatePlaceConfiguration>;
    getPlaceStatistics(options: GetPlaceStatisticsByTypeOptions): Promise<GetPlaceStatisticsByType>;
    getMultiPlugins(options: GetPluginsByIdOptions): Promise<GetPluginsById>;
    updatePlugin(options: UpdatePluginOptions): Promise<UpdatePlugin>;
    searchUniverses(options: SearchUniversesOptions): Promise<SearchUniverses>;
    searchToolbox(options: SearchToolboxOptions): Promise<SearchToolbox>;
    getUniverse(options: GetUniverseOptions): Promise<GetUniverse>;
    getSelfUniversePermissions(options: GetUniversePermissionsOptions): Promise<GetUniversePermissions>;
    getPlacesInUniverse(options: GetUniversePlacesOptions): Promise<GetUniversePlaces>;
    getUniverseStatisticReports(options: GetUniverseStatisticsReportsOptions): Promise<GetUniverseStatisticsReports>;
    getUniverseStatisticReportsByTime(options: GetUniverseStatisticsReportsByTimeOptions): Promise<GetUniverseStatisticsReportByTime>;
    downloadUniverseStatisticReportsByTime(options: DownloadUniverseStatisticsReportByTimeOptions): Promise<DownloadUniverseStatisticsReportByTime>;
    getMultiUniverses(options: MultiGetUniversesOptions): Promise<MultiGetUniverses>;
    getMultiUniversesPermissions(options: MultiGetUniversesPermissionsOptions): Promise<MultiGetUniversesPermissions>;
    activateUniverse(options: ActivateUniverseOptions): Promise<ActivateUniverse>;
    deactivateUniverse(options: DeactivateUniverseOptions): Promise<DeactivateUniverse>;
    generateUniverseStatisticReportsByTime(options: GenerateUniverseStatisticReportsByTimeOptions): Promise<GenerateUniverseStatisticReportsByTime>;
    getUniverseConfiguration(options: GetUniverseConfigurationOptions): Promise<GetUniverseConfiguration>;
    updateUniverseConfiguration(options: UpdateUniverseConfigurationOptions): Promise<UpdateUniverseConfiguration>;
    getUniverseVIPServersConfiguration(options: GetUniverseVIPServersConfigurationOptions): Promise<GetUniverseVIPServersConfiguration>;
    getUniverseTeamCreateSettings(options: GetUniverseTeamCreateSettingsOptions): Promise<GetUniverseTeamCreateSettings>;
    updateUniverseTeamCreateSettings(options: UpdateUniverseTeamCreateSettingsOptions): Promise<UpdateUniverseTeamCreateSettings>;
    removeUserFromUniverseTeamCreate(options: RemoveUserFromUniverseTeamCreateOptions): Promise<RemoveUserFromUniverseTeamCreate>;
    getUniverseTeamCreateMembers(options: GetUsersInUniverseTeamCreateOptions): Promise<GetUsersInUniverseTeamCreate>;
    getSelfUniversesTeamCreateAccess(options: GetSelfTeamCreateUniversesAccessOptions): Promise<GetSelfTeamCreateUniversesAccess>;
    getSelfManageableGroups(): Promise<GetSelfGroupsAccess>;
    getSelfNotificationStatisticReports(): Promise<GetNotificationsStatisticReports>;
    getStudioData(options: GetStudioDataOptions): Promise<GetStudioData>;
    setStudioData(options: SetStudioDataOptions): Promise<SetStudioData>;
    getSelfUniverses(options: GetSelfUniversesOptions): Promise<GetSelfUniverses>;
    createUniverseAlias(options: CreateUniverseAliasOptions): Promise<CreateUniverseAlias>;
    deleteUniverseAlias(options: DeleteUniverseAliasOptions): Promise<DeleteUniverseAlias>;
    updateUniverseAlias(options: UpdateUniverseAliasOptions): Promise<UpdateUniverseAlias>;
    createDeveloperProduct(options: CreateDeveloperProductOptions): Promise<CreateDeveloperProduct>;
    updateDeveloperProduct(options: UpdateDeveloperProductOptions): Promise<UpdateDeveloperProduct>;
}
