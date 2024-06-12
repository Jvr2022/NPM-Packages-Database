import BaseAPI from "./BaseAPI";
import Client from "../Client";
import { GameUniverseOptions, PartialGameUniverse, PlaceOptions, VIPServerOptions } from "../../structures/Game";
export type GameServer = {
    id: string;
    maxPlayers: number;
    playing: number;
    fps: number;
    ping: number;
    name: string;
    vipServerId: number;
    accessCode: string;
};
export type GetGameUniversesOptions = {
    universeIds: number[];
};
export type GetGameUniverses = GameUniverseOptions[];
export type GetGameServersByTypeOptions = {
    placeId: number;
    serverType: "Public" | "Friend" | "VIP";
    sortOrder?: "Asc" | "Desc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type GetGameServersByType = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: GameServer[];
};
export type GetGamesProductInfoOptions = {
    universeIds: number[];
};
export type GameGamesProductInfo = {
    data: {
        universeId: number;
        isForSale: boolean;
        price: number;
        sellerId: number;
        productId: number;
    }[];
};
export type ListGamesOptions = {
    sortToken?: string;
    gameFilter?: string;
    timeFilter?: string;
    genreFilter?: string;
    exclusiveStartId?: number;
    sortOrder?: string;
    gameSetTargetId?: number;
    keyword?: string;
    startRows?: number;
    maxRows?: number;
    isKeywordSuggestionEnabled?: boolean;
    contextCountryRegionId?: number;
    contextUniverseId?: number;
    pageContextPageId?: number;
    pageContextSeeAll?: boolean;
    sortPosition?: number;
};
export type ListGames = {
    games: {
        creatorId: number;
        creatorName: string;
        creatorType: "User" | "Group" | string;
        upVotes: number;
        downVotes: number;
        universeId: number;
        placeId: number;
        playerCount: number;
        imageToken: string;
        users: {
            userId: number;
            gameId: string;
        }[];
        isSponsored: boolean;
        nativeAdData: string;
        price: number;
        analyticsIdentifier: string;
    }[];
    suggestedKeyword: string;
    correctedKeyword: string;
    filteredKeyword: string;
    hasMoreRows: boolean;
    nextPageExclusiveStartId: number;
    featuredSearchUniverseId: number;
    emphasis: boolean;
    cutOffIndex: number;
    algorithm: string;
    algorithmQueryType: string;
    suggestionAlgorithm: string;
};
export type MultiGetPlacesOptions = {
    placeIds: number[];
};
export type MultiGetPlaces = PlaceOptions[];
export type MultiGetGameUniversesPlayabilityOptions = {
    universeIds: number[];
};
export type MultiGetGameUniversesPlayability = {
    playabilityStatus: "UnplayableOtherReason" | string;
    isPlayable: boolean;
    universeId: number;
}[];
export type GetGameRecommendationsByAlgorithmOptions = {
    algorithmName: string;
    paginationKey?: string;
    maxRows?: number;
};
export type GetGameRecommendationsByAlgorithm = {
    games: ListGames["games"];
    nextPaginationKey: string | null;
};
export type GetGameRecommendationsByGameOptions = {
    universeId: number;
    paginationKey?: string;
    maxRows?: number;
};
export type GetGameRecommendationsByGame = GetGameRecommendationsByAlgorithm;
export type GetGameSortsOptions = {
    gameSortsContext?: "GamesDefaultSorts" | "GamesAllSorts" | "HomeSorts" | "ChatSorts" | "UnifiedHomeSorts" | "GamesPageAbTestSorts1" | "GamesPageAbTestSorts2";
};
export type GetGameSorts = {
    sorts: {
        token: string;
        name: string;
        displayName: string;
        gameSetTargetId: null;
        timeOptionsAvailable: boolean;
        genreOptionsAvailable: boolean;
        numberOfRows: number;
        numberOfGames: null;
        isDefaultSort: boolean;
        contextUniverseId: null;
        contextCountryRegionId: number;
        tokenExpiryInSeconds: number;
    }[];
    timeFilters: {
        token: string;
        name: string;
        tokenExpiryInSeconds: number;
    }[];
    genreFilters: {
        token: string;
        name: string;
        tokenExpiryInSeconds: number;
    }[];
    pageContext: {
        pageId: string;
        isSeeAllPage: boolean;
    };
};
export type IsGameFavoritedOptions = {
    universeId: number;
};
export type IsGameFavorited = {
    isFavorited: boolean;
};
export type ToggleGameFavoriteOptions = {
    universeId: number;
    favorite: boolean;
};
export type ToggleGameFavorite = unknown;
export type GetGameFavoriteCountOptions = {
    universeId: number;
};
export type GetGameFavoriteCount = {
    favoritesCount: number;
};
export type GetGameGamePassesOptions = {
    universeId: number;
    sortOrder?: "Asc" | "Desc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type GetGameGamePasses = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        id: number;
        name: string;
        displayName: string;
        productId: number;
        price: number;
    }[];
};
export type GetSelfUniverseVoteStatusOptions = {
    universeId: number;
};
export type GetSelfUniverseVoteStatus = {
    canVote: boolean;
    userVote: boolean;
    reasonForNotVoteable: string;
};
export type GetGamesVotesOptions = {
    universeIds: number[];
};
export type GetGamesVotes = {
    data: {
        number: PartialGameUniverse;
        upVotes: number;
        downVotes: number;
    }[];
};
export type SetSelfGameVoteOptions = {
    universeId: number;
    vote: boolean;
};
export type SetSelfGameVote = unknown;
export type CanSelfInviteUserToVIPServerOptions = {
    userId: number;
};
export type CanSelfInviteUserToVIPServer = {
    canInvite: boolean;
};
export type GetVIPServerOptions = {
    id: number;
};
export type GetVIPServer = VIPServerOptions;
export type UpdateVIPServerOptions = {
    id: number;
    name: string;
    newJoinCode: boolean;
    active: boolean;
};
export type UpdateVIPServer = VIPServerOptions;
export type CreateVIPServerOptions = {
    universeId: number;
    name: string;
    expectedPrice: number;
};
export type CreateVIPServer = GameServer;
export type UpdateVIPServerPermissionsOptions = {
    id: number;
    clanAllowed: boolean;
    enemyClanId: number;
    friendsAllowed: boolean;
    usersToAdd: number[];
    usersToRemove: number[];
};
export type UpdateVIPServerPermissions = {
    clanAllowed: boolean;
    enemyClanId: number;
    friendsAllowed: boolean;
    users: {
        id: number;
        name: string;
        displayName: string;
    }[];
};
export type UpdateVIPServerSubscriptionOptions = {
    id: number;
    active: boolean;
    price: number;
};
export type UpdateVIPServerSubscription = {
    active: boolean;
    expired: boolean;
    expirationDate: string;
    price: number;
};
export default class GamesAPI extends BaseAPI {
    constructor(client: Client);
    getGames(options: GetGameUniversesOptions): Promise<GetGameUniverses>;
    getGameServersByType(options: GetGameServersByTypeOptions): Promise<GetGameServersByType>;
    getGamesProductInfo(options: GetGamesProductInfoOptions): Promise<GameGamesProductInfo>;
    listGames(options: ListGamesOptions): Promise<ListGames>;
    getMultiPlaces(options: MultiGetPlacesOptions): Promise<MultiGetPlaces>;
    getMultiGamesPlayabilityStatus(options: MultiGetGameUniversesPlayabilityOptions): Promise<MultiGetGameUniversesPlayability>;
    getGameRecommendationsByAlgorithm(options: GetGameRecommendationsByAlgorithmOptions): Promise<GetGameRecommendationsByAlgorithm>;
    getGameRecommendationsByGame(options: GetGameRecommendationsByGameOptions): Promise<GetGameRecommendationsByGame>;
    getGameSorts(options: GetGameSortsOptions): Promise<GetGameSorts>;
    isGameFavorited(options: IsGameFavoritedOptions): Promise<IsGameFavorited>;
    toggleGameFavorite(options: ToggleGameFavoriteOptions): Promise<ToggleGameFavorite>;
    getGameFavoriteCount(options: GetGameFavoriteCountOptions): Promise<GetGameFavoriteCount>;
    getGameGamePasses(options: GetGameGamePassesOptions): Promise<GetGameGamePasses>;
    getSelfGameVote(options: GetSelfUniverseVoteStatusOptions): Promise<GetSelfUniverseVoteStatus>;
    getGamesVotes(options: GetGamesVotesOptions): Promise<GetGamesVotes>;
    setSelfGameVote(options: SetSelfGameVoteOptions): Promise<SetSelfGameVote>;
    canSelfInviteUserToVIPServer(options: CanSelfInviteUserToVIPServerOptions): Promise<CanSelfInviteUserToVIPServer>;
    getVIPServer(options: GetVIPServerOptions): Promise<GetVIPServer>;
    updateVIPServer(options: UpdateVIPServerOptions): Promise<UpdateVIPServer>;
    createVIPServer(options: CreateVIPServerOptions): Promise<CreateVIPServer>;
    updateVIPServerPermissions(options: UpdateVIPServerPermissionsOptions): Promise<UpdateVIPServerPermissions>;
    updateVIPServerSubscription(options: UpdateVIPServerSubscriptionOptions): Promise<UpdateVIPServerSubscription>;
}
