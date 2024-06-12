

class UserFunctions {
	constructor () {

	}
}

class PartialGroupFunctions {
	constructor () {

	}
}

exports.RobloxGroup = require("../../group/group");
exports.GroupFunctions = require("../../group/GroupFunctions");


exports.RobloxUser = class RobloxUser extends UserFunctions {


	constructor (data, self) {
		super();

		this.self = self;

		this.userId = Number(data.UserId || data.userId || data.userid || data.Id);
		this.username = (data.Username || data.username || data.Name || data.name || data.userName).toString();
		this.status = (data.Status || data.status).toString();
		this.blurb = (data.Blurb || data.blurb).toString();

		this.joinDate = new Date(data.JoinDate || data.joinDate || data.joindate);
		this.accountAge = Number(data.AccountAge || data.accountAge || data.age || data.Age);
		this.membership = Memberships[(data.BC || data.bc || data.membership || data.Membership || data.buildersClubMembershipType || data.memberShip || data.MemberShip || "undefined").toString().toLowerCase()];
		this.numFriends = Number(data.numFriends || data.NumFriends || data.numfriends);

		this.profilePicture = (data.pfp).toString();
		this.avatarPicture  = (data.avatarPic).toString();
	}

};

exports.PartialUser =  class PartialUser extends UserFunctions {

	constructor (data, self) {
		super();

		this.self = self;

		this.userId = parseInt(data.UserId || data.userId || data.userid || data.Id);
		this.username = (data.Username || data.username || data.Name || data.name || data.userName || data.UserName).toString();
		this.membership = Memberships[(data.BuildersClubStatus || data.BC || data.bc || data.Membership || data.membership || data.buildersClubMembershipType || "undefined").toString().toLowerCase()];

	}
    
};


exports.RobloxMessage = class RobloxMessage {
	constructor (message, self) {
		
		this.self = self;

		this.messageId = message.Id;
		this.sender    = new exports.PartialUser(message.Sender, self);
		this.recipient = new exports.PartialUser(message.Recipient, self);

		this.subject = message.Subject;
		this.body 	 = message.Body;
		this.created = new Date(message.Created);
		this.updated = new Date(message.Updated);

		this.isRead  = (message.IsRead === true);
		this.isSystemMessage = (message.IsSystemMessage === true);
	}
};

exports.FriendRequest = class FriendRequest extends UserFunctions {

	constructor (data, self) {
		super();

		this.self = self;

		this.userId = data.UserId;
		this.username = data.Username;
		this.thumbnail = data.Thumbnail;
		this.onlineStatus = data.OnlineStatus;
		this.invitationId = data.InvitationId;
		this.isOnline = data.IsOnline === true;

	}

	async accept () {

	}

	async decline () {

	}

};


exports.PartialGroup = class PartialGroup extends exports.GroupFunctions {

	constructor (data, self) {
		super();

		this.self = self;

		this.name = (data.Name || data.name || "").toString();
		this.groupId = parseInt(data.id || data.Id || data.Groupid || data.GroupId || data.groupId || data.groupid);
		this.emblemUrl = (data.EmblemUrl || data.emblem || data.emblemUrl || "").toString();

	}
};

exports.UserGroup = class UserGroup extends exports.GroupFunctions {

	constructor (data, self) {
		super();

		this.self = self;

		this.group = new exports.PartialGroup({name: data.Name, groupId: data.Id, emblem: data.EmblemUrl});
		this.userRank = parseInt(data.Rank || data.rank);
		this.userRole = (data.Role || data.role).toString();
		this.isPrimary = (data.IsPrimary === true || data.isPrimary === true);
		this.isInClan = (data.IsInClan === true || data.isInClan === true);

	}
};



exports.GroupJoinRequest = class GroupJoinRequest extends UserFunctions {

	constructor (data, self) {
		super();

		this.self = self;

		this.username = (data.username || data.Username).toString();
		this.userId = parseInt(data.UserId || data.userId || data.Id);
		this.date = new Date(data.date);
		this.requestId = parseInt(data.requestId);
		this.groupId = data.groupId;

	}

	async accept () {

	}

	async decline () {

	}
};



exports.GroupWallPost = class GroupWallPost extends UserFunctions {

	constructor (data, self) {
		super();

		this.self = self;

		this.postId = parseInt(data.id);
		this.groupId = parseInt(this.groupId);
		this.poster = new exports.PartialUser(data.poster, self);
		this.body = data.body;
		this.created = new Date(data.created);
		this.updated = new Date(data.updated);
	}

	async delete () {

	}

	async deletePostsFromUser () {

	}

	async exileUser () {

	}
};



exports.GroupPermissions = class GroupPermissions {

	constructor (data, self) {

		this.groupId = data.groupId;
		this.isPrimary = data.isPrimary == true;
		this.isPendingJoin = data.isPendingJoin == true;

		this.userRole = {
			user: new exports.PartialUser(data.userRole.user, self),
			role: {
				id: data.userRole.role.id,
				name: data.userRole.role.name,
				rank: data.userRole.role.rank
			}
		};

		this.maxGroups = data.maxGroups;
		this.permissions = {
			groupPostsPermissions: {
				viewWall: data.permissions.groupPostsPermissions.viewWall == true,
				postToWall: data.permissions.groupPostsPermissions.postToWall == true,
				deleteFromWall: data.permissions.groupPostsPermissions.deleteFromWall == true,
				viewStatus: data.permissions.groupPostsPermissions.viewStatus == true,
				postToStatus: data.permissions.groupPostsPermissions.postToStatus == true
			},

			groupMembershipPermissions: {
				changeRank: data.permissions.groupMembershipPermissions.changeRank == true,
				inviteMembers: data.permissions.groupMembershipPermissions.inviteMembers == true,
				removeMembers: data.permissions.groupMembershipPermissions.removeMembers == true
			},

			groupManagementPermissions: {
				manageRelationships: data.permissions.groupManagementPermissions.manageRelationships == true,
				manageClan: data.permissions.groupManagementPermissions.manageClan == true,
				viewAuditLogs: data.permissions.groupManagementPermissions.viewAuditLogs == true
			},

			groupEconomyPermissions: {
				spendGroupFunds: data.permissions.groupEconomyPermissions.spendGroupFunds == true,
				advertiseGroup: data.permissions.groupEconomyPermissions.advertiseGroup == true,
				createItems: data.permissions.groupEconomyPermissions.createItems == true,
				manageItems: data.permissions.groupEconomyPermissions.manageItems == true,
				addGroupPlaces: data.permissions.groupEconomyPermissions.addGroupPlaces == true,
				manageGroupGames: data.permissions.manageGroupGames == true
			}
		};

	}
};



exports.GroupAuditLog = class GroupAuditLog {
	constructor (data, self) {

		this.self = self;

		this.action = data.action;
		this.user = new exports.PartialUser(data.user, self);
		this.date = new Date(data.date);

	}
};

exports.GroupRole = class GroupRole {

	constructor (data, self) {
		
		this.self = self;

		this.name = (data.Name || data.name).toString(),
		this.rank = parseInt(data.rank || data.Rank);
		this.id = parseInt(data.id || data.Id);
	}

};

exports.GroupSearchResult = class GroupSearchResult extends PartialGroupFunctions {

	constructor (data, self) {
		super();

		this.self = self;
		
		this.bcOnly = data.BcOnlyJoin;
		this.description = data.Description;
		this.groupId = data.ID;
		this.name = data.Name;
		this.publicEntryAllowed = data.PublicEntryAllowed;
		this.numMembers = data.Members;
		this.groupUrl = data.GroupUri;
		this.thumbnail = {
			final: data.Thumbnail.final,
			url: data.Thumbnail.Url
		};
	}

};


exports.UserSearchResult = class UserSearchResult extends UserFunctions {

	constructor (data, self) {
		super();

		this.self = self;
		
		this.userId = data.UserId;
		this.username = data.Name;
		this.blurb = data.Blurb;
		this.isOnline = data.IsOnline === true;
		this.primaryGroup = {groupId: (data.PrimaryGroupUrl.match(/\d+/g) != null ? data.PrimaryGroupUrl.match(/\d+/g)[0] : null), name: data.PrimaryGroup};
	}
};

exports.UsersWithRoleResult = class UsersWithRoleResult {

	constructor (data, role, self) {
		this.self = self;

		this.role = role;
		this.previousPageCursor = data.previousPageCursor;
		this.nextPageCursor = data.nextPageCursor;
		this.users = data.data.map(x=> new exports.PartialUser(x, self));
	}

	async next () {
		return this.self.getUsersWithRole(this.role, this.nextPageCursor);
	}

	async previous () {
		return this.self.getUsersWithRole(this.role, this.previousPageCursor);
	}
};

exports.GroupWallResult = class GroupWallResult {

	constructor (data, self) {
		this.self = self;

		this.previousPageCursor = data.previousPageCursor;
		this.nextPageCursor = data.nextPageCursor;
		this.posts = data.data.map(x=> new exports.GroupWallPost(x, self));
	}

	async next () {
		return this.self.getWall(this.nextPageCursor);
	}

	async previous () {
		return this.self.getWall(this.previousPageCursor);
	}
};


exports.GroupShout = class GroupShout {
	constructor (data, self) {

		this.self = self;
		this.body = (data || {}).body;
		this.poster = (data && data.poster !== null ? new exports.PartialUser(data.poster, self) : null);
		this.created = new Date((data || {}).created);

	}
};



exports.ProductInfo = class ProductInfo {

	constructor (data, self) {

		this.self = self;

		this.targetId = data.TargetId;
		this.productType = data.ProductType;
		this.assetId = data.AssetId;
		this.productId = data.ProductId;
		this.name = data.Name;
		this.description = data.Description;
		this.assetTypeId = data.AssetTypeId;
		this.creator = new exports.PartialUser(data.Creator, self);
		this.iconImageAssetId = data.IconImageAssetId;
		this.created = new Date(data.Created);
		this.updated = new Date(data.Updated);
		this.price = data.PriceInRobux;
		this.isNew = data.IsNew == true;
		this.isForSale = data.IsForSale == true;
		this.isPublicDomain = data.IsPublicDomain == true;
		this.isLimited = data.IsLimited;
		this.isLimitedUnique = data.IsLimitedUnique;
		this.remining = data.Remaining;
		this.minimumMembershipLevel = data.MinimumMembershipLevel;
		this.contentRatingTypeId = data.ContentRatingTypeId;
	}

	async buy () {

	}

	async deleteFromInventory () {

	}
};


exports.RobloxBadge = class RobloxBadge {

	constructor (data, self) {

		this.self =self;

		this.imageUrl = data.ImageUri;
		this.name = data.Name;
	}
};


exports.RoVerDiscordResponse = class RoVerDiscordResponse {
	constructor (data) {
		this.userIds = data.users;
	}
};

exports.RoVerRobloxResponse = class RoVerRobloxResponse extends UserFunctions {
	
	constructor (data, self) {
		super();

		this.self = self;

		this.username = data.robloxUsername;
		this.robloxId = data.robloxId;

	}
};


const Memberships = {

	nbc: "NBC",
	bc:  "BC",
	tbc: "TBC",
	obc: "OBC",
	0: "NBC",
	1: "BC",
	2: "TBC",
	3: "OBC",
	"undefined": undefined

};