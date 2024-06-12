import BaseAPI from "./BaseAPI";
import Client from "../Client";
import { GroupOptions, GroupRoleOptions, GroupRolePermissionsOptions } from "../../structures/Group";
export type GetGroupOptions = {
    groupId: number;
};
export type GetGroup = {
    id: number;
    name: string;
    description: string;
    owner: {
        buildersClubMembershipType: "None" | string;
        userId: number;
        username: string;
        displayName: string;
    };
    shout: {
        body: string;
        poster: {
            buildersClubMembershipType: "None" | string;
            userId: number;
            username: string;
            displayName: string;
        };
        created: string;
        updated: string;
    };
    memberCount: number;
    isBuildersClubOnly: boolean;
    publicEntryAllowed: boolean;
    isLocked: boolean;
};
export type GetMultiGroupsOptions = {
    groupIds: number[];
};
export type GetMultiGroups = {
    data: GroupOptions[];
};
export type GetGroupAuditLogsOptions = {
    groupId: number;
    actionType: "DeletePost" | "RemoveMember" | "AcceptJoinRequest" | "DeclineJoinRequest" | "PostStatus" | "ChangeRank" | "BuyAd" | "SendAllyRequest" | "CreateEnemy" | "AcceptAllyRequest" | "DeclineAllyRequest" | "DeleteAlly" | "DeleteEnemy" | "AddGroupPlace" | "RemoveGroupPlace" | "CreateItems" | "ConfigureItems" | "SpendGroupFunds" | "ChangeOwner" | "Delete" | "AdjustCurrencyAmounts" | "Abandon" | "Claim" | "Rename" | "ChangeDescription" | "InviteToClan" | "KickFromClan" | "CancelCLanInvite" | "BuyClan" | "CreateGroupAsset" | "UpdateGroupAsset" | "ConfigureGroupAsset" | "RevertGroupAsset" | "CreateGroupDeveloperProduct" | "ConfigureGroupGame" | "Lock" | "Unlock" | "CreateGamePass" | "CreateBadge" | "ConfigureBadge" | "SavePlace" | "PublishPlace";
    sortOrder?: "Asc" | "Desc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type GetGroupAuditLogs = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        actor: {
            user: {
                buildersClubMembershipType: "None" | string;
                userId: number;
                username: string;
                displayName: string;
            };
            role: {
                id: number;
                name: string;
                description: string;
                rank: number;
                memberCount: number;
            };
        };
        actionType: string;
        description: unknown;
        created: string;
    }[];
};
export type GetGroupSettingsOptions = {
    groupId: number;
};
export type GetGroupSettings = {
    groupId: number;
    isApprovalRequired: boolean;
    isBuildersClubRequired: boolean;
    areEnemiesAllowed: boolean;
    areGroupFundsVisible: boolean;
    areGroupGamesVisible: boolean;
};
export type UpdateGroupSettingsOptions = GetGroupSettings;
export type UpdateGroupSettings = unknown;
export type GetGroupConfigurationMetaData = {
    groupConfiguration: {
        nameMaxLength: number;
        descriptionMaxLength: number;
        iconMaxFileSizeMb: number;
        cost: number;
    };
    recurringPayoutsConfiguration: {
        maxPayoutPartners: number;
    };
    roleConfiguration: {
        nameMaxLength: number;
        descriptionMaxLength: number;
        limit: number;
        cost: number;
        minRank: number;
        maxRank: number;
    };
    isPremiumPayoutsEnabled: boolean;
    isDefaultEmblemPolicyEnabled: boolean;
};
export type GetGroupsMetaData = {
    groupLimit: number;
    currentGroupCount: number;
    groupStatusMaxLength: number;
    areProfileGroupsHidden: boolean;
    isGroupDetailsPolicyEnabled: boolean;
};
export type CreateGroupOptions = {
    name: string;
    description: string;
    publicGroup: boolean;
    buildersClubMembersOnly: boolean;
    files: unknown;
};
export type CreateGroup = GroupOptions;
export type UpdateGroupDescriptionOptions = {
    groupId: number;
    description: string;
};
export type UpdateGroupDescription = {
    newDescription: string;
};
export type UpdateGroupStatusOptions = {
    groupId: number;
    message: string;
};
export type UpdateGroupStatus = GroupOptions["shout"];
export type UpdateGroupIconOptions = {
    groupId: number;
    files: unknown;
};
export type UpdateGroupIcon = unknown;
export type DeclineJoinRequestsOptions = {
    groupId: number;
    userIds: number[];
};
export type DeclineJoinRequests = unknown;
export type GetJoinRequestsOptions = {
    groupId: number;
    sortOrder?: "Asc" | "Desc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type GetJoinRequests = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        requester: {
            userId: number;
            username: string;
            displayName: string;
        };
        created: string;
    }[];
};
export type AcceptJoinRequestsOptions = {
    groupId: number;
    userIds: number[];
};
export type AcceptJoinRequests = unknown;
export type DeclineJoinRequestOptions = {
    groupId: number;
    userId: number;
};
export type DeclineJoinRequest = unknown;
export type GetJoinRequestOptions = {
    groupId: number;
    userId: number;
};
export type GetJoinRequest = GetJoinRequests["data"][0];
export type AcceptJoinRequestOptions = {
    groupId: number;
    userId: number;
};
export type AcceptJoinRequest = unknown;
export type GetSelfGroupMembershipOptions = {
    groupId: number;
};
export type GetSelfGroupMembership = {
    groupId: number;
    isPrimary: boolean;
    isPendingJoin: boolean;
    userRole: {
        user: {
            buildersClubMembershipType: "None" | string;
            userId: number;
            username: string;
            displayName: string;
        };
        role: {
            id: number;
            name: string;
            description: string;
            rank: number;
            memberCount: number;
        };
    };
    permissions: GroupRolePermissionsOptions["permissions"];
};
export type GetGroupRolesOptions = {
    groupId: number;
};
export type GetGroupRoles = {
    groupId: number;
    roles: {
        id: number;
        name: string;
        description: string;
        rank: number;
        memberCount: number;
    }[];
};
export type GetMembersWithRoleOptions = {
    groupId: number;
    roleId: number;
    sortOrder?: "Asc" | "Desc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type GetMembersWithRole = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        buildersClubMembershipType: "None" | string;
        userId: number;
        username: string;
        displayName: string;
    }[];
};
export type GetMembersOptions = {
    groupId: number;
    sortOrder?: "Asc" | "Desc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type GetMembers = GetMembersWithRole;
export type JoinGroupOptions = {
    groupId: number;
    captchaToken: string;
    captchaProvider: "PROVIDER_ARKOSELABS" | string;
};
export type JoinGroup = unknown;
export type GetSelfPendingGroupJoins = {
    data: GroupOptions[];
};
export type GetUserGroupsOptions = {
    userId: number;
};
export type GetUserGroups = {
    data: {
        group: GroupOptions;
        role: GetGroupRoles["roles"][0];
    }[];
};
export type ChangeOwnerOptions = {
    groupId: number;
    userId: number;
};
export type ChangeOwner = unknown;
export type ClaimGroupOptions = {
    groupId: number;
};
export type ClaimGroup = unknown;
export type KickMemberOptions = {
    groupId: number;
    userId: number;
};
export type KickMember = unknown;
export type UpdateMemberOptions = {
    groupId: number;
    userId: number;
    roleId: number;
};
export type UpdateMember = unknown;
export type GetGroupPayoutsOptions = {
    groupId: number;
};
export type GetGroupPayouts = {
    data: {
        user: {
            buildersClubMembershipType: "None" | string;
            userId: number;
            username: string;
            displayName: string;
        };
        percentage: number;
    }[];
};
export type PayoutMembersOptions = {
    groupId: number;
    users: {
        userId: number;
        amount: number;
    }[];
    type: "FixedAmount" | "Percentage" | string;
};
export type PayoutMembers = unknown;
export type UpdateRecurringPayoutsOptions = PayoutMembersOptions;
export type UpdateRecurringPayouts = unknown;
export type GetGroupRelationshipsOptions = {
    groupId: number;
    relationshipType: "enemies" | "allies";
    startRowIndex?: number;
    maxRows?: number;
};
export type GetGroupRelationships = {
    groupId: number;
    relationshipType: GetGroupRelationshipsOptions["relationshipType"];
    totalGroupCount: number;
    relatedGroups: GroupOptions[];
    nextRowIndex: number;
};
export type DeclineRelationshipRequestsOptions = {
    groupId: number;
    relationshipType: GetGroupRelationshipsOptions["relationshipType"];
    withGroups: number[];
};
export type DeclineRelationshipRequests = unknown;
export type GetRelationshipRequestsOptions = GetGroupRelationshipsOptions;
export type GetRelationshipRequests = GetGroupRelationships;
export type AcceptRelationshipRequestsOptions = DeclineRelationshipRequestsOptions;
export type AcceptRelationshipRequests = unknown;
export type DeleteRelationshipOptions = Omit<DeclineRelationshipRequestsOptions, "withGroups"> & {
    withGroup: number;
};
export type DeleteRelationship = unknown;
export type CreateRelationshipOptions = Omit<DeclineRelationshipRequestsOptions, "withGroups"> & {
    withGroup: number;
};
export type CreateRelationship = unknown;
export type DeclineRelationshipRequestOptions = Omit<DeclineRelationshipRequestsOptions, "withGroups"> & {
    withGroup: number;
};
export type DeclineRelationshipRequest = unknown;
export type AcceptRelationshipRequestOptions = DeclineRelationshipRequestOptions;
export type AcceptRelationshipRequest = unknown;
export type GetRolePermissionsOptions = {
    groupId: number;
    roleId: number;
};
export type GetRolePermissions = GroupRolePermissionsOptions;
export type UpdateRolePermissionsOptions = {
    groupId: number;
    roleId: number;
    DeleteFromWall: boolean;
    PostToWall: boolean;
    InviteMembers: boolean;
    PostToStatus: boolean;
    RemoveMembers: boolean;
    ViewStatus: boolean;
    ViewWall: boolean;
    ChangeRank: boolean;
    AdvertiseGroup: boolean;
    ManageRelationships: boolean;
    AddGroupPlaces: boolean;
    ViewAuditLogs: boolean;
    CreateItems: boolean;
    ManageItems: boolean;
    SpendGroupFunds: boolean;
    ManageClan: boolean;
    ManageGroupGames: boolean;
};
export type UpdateRolePermissions = unknown;
export type GetGuestPermissionsOptions = {
    groupId: number;
};
export type GetGuestPermissions = GroupRolePermissionsOptions;
export type GetAllRolesPermissionsOptions = {
    groupId: number;
};
export type GetAllRolesPermissions = {
    data: GroupRolePermissionsOptions[];
};
export type GetSocialLinksOptions = {
    groupId: number;
};
export type GetSocialLinks = {
    data: {
        id: number;
        type: "Facebook" | string;
        url: string;
        title: string;
    }[];
};
export type PostSocialLinkOptions = {
    groupId: number;
    type: "Facebook" | string;
    url: string;
    title: string;
};
export type PostSocialLink = GetSocialLinks["data"][0];
export type DeleteSocialLinkOptions = {
    groupId: number;
    id: number;
};
export type DeleteSocialLink = unknown;
export type UpdateSocialLinkOptions = {
    groupId: number;
    id: number;
    type: "Facebook" | string;
    url: string;
    title: string;
};
export type UpdateSocialLink = unknown;
export type GetWallPostsOptions = {
    groupId: number;
    sortOrder?: "Asc" | "Desc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type GetWallPosts = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        id: number;
        body: string;
        created: string;
        updated: string;
        poster: {
            buildersClubMembershipType: "None" | string;
            userId: number;
            username: string;
            displayName: string;
        };
    }[];
};
export type CreateWallPostOptions = {
    groupId: number;
    body: string;
    captchaToken: string;
    captchaProvider: "PROVIDER_ARKOSELABS" | string;
};
export type CreateWallPost = GetWallPosts["data"][0];
export type DeleteWallPostOptions = {
    groupId: number;
    id: number;
};
export type DeleteWallPost = unknown;
export type DeleteWallPostsByUserOptions = {
    groupId: number;
    userId: number;
};
export type DeleteWallPostsByUser = unknown;
export type SearchGroupsByKeywordOptions = {
    keyword: string;
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type SearchGroupsByKeyword = {
    keyword: string;
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        id: number;
        name: string;
        description: string;
        memberCount: number;
        publicEntryAllowed: boolean;
        created: string;
        updated: string;
    }[];
};
export type SearchGroupsOptions = {
    groupName: string;
};
export type SearchGroups = {
    data: {
        id: number;
        name: string;
        memberCount: number;
    }[];
};
export type GetGroupSearchMetaData = {
    SuggestedGroupKeywords: string[];
};
export type GetRolesByIdsOptions = {
    roleIds: number[];
};
export type GetRolesByIds = {
    data: {
        groupId: number;
        id: number;
        name: string;
        description: string;
        rank: number;
        memberCount: number;
    }[];
};
export type GetUserPrimaryGroupOptions = {
    userId: number;
};
export type GetUserPrimaryGroup = {
    group?: GroupOptions;
    role?: GroupRoleOptions;
    isPrimaryGroup?: boolean;
};
export type RemovePrimaryGroup = unknown;
export type SetPrimaryGroupOptions = {
    groupId: number;
};
export type SetPrimaryGroup = unknown;
export type CreateRoleOptions = {
    groupId: number;
    name: string;
    description: string;
    rank: number;
    usingGroupFunds: boolean;
};
export type CreateRole = Omit<GetRolesByIds["data"][0], "groupId">;
export type DeleteRoleOptions = {
    groupId: number;
    roleId: number;
};
export type DeleteRole = unknown;
export type UpdateRoleOptions = {
    groupId: number;
    roleId: number;
    name: string;
    description: string;
    rank: number;
};
export type UpdateRole = CreateRole;
export default class GroupsAPI extends BaseAPI {
    constructor(client: Client);
    getGroup(options: GetGroupOptions): Promise<GetGroup>;
    getMultiGroups(options: GetMultiGroupsOptions): Promise<GetMultiGroups>;
    getAuditLogs(options: GetGroupAuditLogsOptions): Promise<GetGroupAuditLogs>;
    getGroupSettings(options: GetGroupSettingsOptions): Promise<GetGroupSettings>;
    updateGroupSettings(options: UpdateGroupSettingsOptions): Promise<UpdateGroupSettings>;
    getGroupConfigurationMetaData(): Promise<GetGroupConfigurationMetaData>;
    getGroupsMetaData(): Promise<GetGroupsMetaData>;
    createGroup(options: CreateGroupOptions): Promise<CreateGroup>;
    updateGroupDescription(options: UpdateGroupDescriptionOptions): Promise<UpdateGroupDescription>;
    updateGroupStatus(options: UpdateGroupStatusOptions): Promise<UpdateGroupStatus>;
    updateGroupIcon(options: UpdateGroupIconOptions): Promise<UpdateGroupIcon>;
    declineJoinRequests(options: DeclineJoinRequestsOptions): Promise<DeclineJoinRequests>;
    getJoinRequests(options: GetJoinRequestsOptions): Promise<GetJoinRequests>;
    acceptJoinRequests(options: AcceptJoinRequestsOptions): Promise<AcceptJoinRequests>;
    declineJoinRequest(options: DeclineJoinRequestOptions): Promise<DeclineJoinRequest>;
    getJoinRequest(options: GetJoinRequestOptions): Promise<GetJoinRequest>;
    acceptJoinRequest(options: AcceptJoinRequestOptions): Promise<AcceptJoinRequest>;
    getSelfGroupMembership(options: GetSelfGroupMembershipOptions): Promise<GetSelfGroupMembership>;
    getGroupRoles(options: GetGroupRolesOptions): Promise<GetGroupRoles>;
    getMembersWithRole(options: GetMembersWithRoleOptions): Promise<GetMembersWithRole>;
    getMembers(options: GetMembersOptions): Promise<GetMembers>;
    joinGroup(options: JoinGroupOptions): Promise<JoinGroup>;
    getSelfPendingGroupJoins(): Promise<GetSelfPendingGroupJoins>;
    getUserGroups(options: GetUserGroupsOptions): Promise<GetUserGroups>;
    changeGroupOwner(options: ChangeOwnerOptions): Promise<ChangeOwner>;
    claimGroup(options: ClaimGroupOptions): Promise<ClaimGroup>;
    kickMember(options: KickMemberOptions): Promise<KickMember>;
    updateMember(options: UpdateMemberOptions): Promise<UpdateMember>;
    getGroupPayouts(options: GetGroupPayoutsOptions): Promise<GetGroupPayouts>;
    payoutMembers(options: PayoutMembersOptions): Promise<PayoutMembers>;
    updateRecurringPayouts(options: UpdateRecurringPayoutsOptions): Promise<UpdateRecurringPayouts>;
    getGroupRelationships(options: GetGroupRelationshipsOptions): Promise<GetGroupRelationships>;
    declineRelationshipRequests(options: DeclineRelationshipRequestsOptions): Promise<DeclineRelationshipRequests>;
    getRelationshipRequests(options: GetRelationshipRequestsOptions): Promise<GetRelationshipRequests>;
    acceptRelationshipRequests(options: AcceptRelationshipRequestsOptions): Promise<AcceptRelationshipRequests>;
    deleteRelationship(options: DeleteRelationshipOptions): Promise<DeleteRelationship>;
    createRelationship(options: CreateRelationshipOptions): Promise<CreateRelationship>;
    acceptRelationshipRequest(options: AcceptRelationshipRequestOptions): Promise<AcceptRelationshipRequest>;
    declineRelationshipRequest(options: DeclineRelationshipRequestOptions): Promise<DeclineRelationshipRequest>;
    getRolePermissions(options: GetRolePermissionsOptions): Promise<GetRolePermissions>;
    updateRolePermissions(options: UpdateRolePermissionsOptions): Promise<UpdateRolePermissions>;
    getGuestPermissions(options: GetGuestPermissionsOptions): Promise<GetGuestPermissions>;
    getAllRolesPermissions(options: GetAllRolesPermissionsOptions): Promise<GetAllRolesPermissions>;
    getSocialLinks(options: GetSocialLinksOptions): Promise<GetSocialLinks>;
    createSocialLink(options: PostSocialLinkOptions): Promise<PostSocialLink>;
    deleteSocialLink(options: DeleteSocialLinkOptions): Promise<DeleteSocialLink>;
    updateSocialLink(options: UpdateSocialLinkOptions): Promise<UpdateSocialLink>;
    getWallPosts(options: GetWallPostsOptions): Promise<GetWallPosts>;
    createWallPost(options: CreateWallPostOptions): Promise<CreateWallPost>;
    deleteWallPost(options: DeleteWallPostOptions): Promise<DeleteWallPost>;
    deleteUserWallPosts(options: DeleteWallPostsByUserOptions): Promise<DeleteWallPostsByUser>;
    searchGroupsByKeyword(options: SearchGroupsByKeywordOptions): Promise<SearchGroupsByKeyword>;
    searchGroups(options: SearchGroupsOptions): Promise<SearchGroups>;
    getGroupSearchMetaData(): Promise<GetGroupSearchMetaData>;
    getRolesByIds(options: GetRolesByIdsOptions): Promise<GetRolesByIds>;
    getUserPrimaryGroup(options: GetUserPrimaryGroupOptions): Promise<GetUserPrimaryGroup>;
    removePrimaryGroup(): Promise<RemovePrimaryGroup>;
    setPrimaryGroup(options: SetPrimaryGroupOptions): Promise<SetPrimaryGroup>;
    createRole(options: CreateRoleOptions): Promise<CreateRole>;
    deleteRole(options: DeleteRoleOptions): Promise<DeleteRole>;
    updateRole(options: UpdateRoleOptions): Promise<UpdateRole>;
}
