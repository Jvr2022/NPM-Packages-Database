const EventEmitter = require('events');
const Methods      = require('./methods');
const Group        = require('./group.js');
const ClientMethods = require('../client/methods')

class GroupFunctions {

    async acceptJoinRequest (requestId) {
        return Methods.acceptJoinRequest(requestId, this._setup)
    }

    async changeRank (userId, amount) {
        return Methods.changeRank({ userId: userId, amount: amount, groupId: this.groupId }, this._setup);
    }

    async declineJoinRequest (requestId) {
        return Methods.declineJoinRequest(requestId, this._setup);
    }

    async deleteWallPost (postId) {
        return Methods.deleteWallPost({
            groupId: this.groupId,
            postId: postId}, this._setup);
    }

    async deleteWallPostsByUser (userId) {
        return Methods.deleteWallPostsByUser({ groupId: this.groupId, userId: userId }, this._setup);
    }

    async demote (userId) {
        return Methods.demote({ groupId: this.groupId, userId: userId }, this._setup);
    }

    async exileUser (userId) {
        return Methods.exileUser({ groupId: this.groupId, userId: userId }, this._setup);
    }

    async getAuditLogs (options={}) {
        return Methods.getAuditLogs(Object.assign(options, { groupId: this.groupId }), this._setup);
    }

    async getGroupFunds () {
        return Methods.getGroupFunds({ groupId: this.groupId }, this._setup);
    }

    async getJoinRequests (options={}) {
        if (options && options.userId !== undefined && options.username !== undefined) {
            let getUsername = await ClientMethods.getUsernameById(options.userId, this._setup);
            options.username = getUsername;
        }
        return Methods.getJoinRequests(Object.assign(options, {groupId: this.groupId}), this._setup);
    }

    async getRankNameInGroup (userId) {
        return Methods.getRankNameInGroup({groupId: this.groupId, userId: userId}, this._setup);
    }

    async getRole (options={}) {
        return Methods.getRole(Object.assign(options, {groupId: this.groupId}), this._setup);
    }

    async getRoles () {
        return Methods.getRoles(this.groupId, this._setup);
    }

    async getUsers (options={}) {
        return Methods.getUsers(Object.assign(options, {groupId: this.groupId}), this._setup)
    }

    async getUsersWithRole (options) {
        let setup;
        if (typeof(setup) == 'object') {
            setup = Object.assign({ groupId: this.groupId }, options);
        } else {
            setup = Object.assign({ groupId: this.groupId, roleId: options})
        }

        return Methods.getUsersWithRole(setup, this._setup);
    }

    async getWall (options={}) {
        return Methods.getWall(Object.assign(options, {groupId: this.groupId}), this._setup);
    }

    async isInGroup (userId) {
        return Methods.isInGroup({userId: userId, groupId: this.groupId}, this._setup);
    }

    async joinGroup () {
        return Methods.joinGroup({groupId: this.groupId}, this._setup);
    }

    onGroupChange (options={}) {
        return new Methods.onGroupChange(this, options);
    }

    onJoinRequest (options={}) {
        return new Methods.onJoinRequest(this, options);
    }

    onWallPost (options={}) {
        return new Methods.onWallPost(this, options);
    }

    async payout (options) {
        let setup = Object.assign(options||{}, {
            groupId: this.groupId
        })
        return Methods.payout(setup, this._setup);
    }

    async postOnWall (message) {
        let setup = {
            message: message,
            groupId: this.groupId
        }
        return Methods.postOnWall(setup, this._setup);
    }

    async postShout (message) {
        let setup = {
            message: message,
            groupId: this.groupId
        }
        return Methods.postShout(setup, this._setup);
    }

    async promote (userId) {
        let setup = {
            userId: userId,
            groupId: this.groupId,
            amount: 1
        }
        return Methods.promote(setup, this._setup);
    }

    async setAsPrimaryGroup () {
        return Methods.setAsPrimaryGroup({ groupId: this.groupId }, this._setup);
    }

    async setRank (userId, roleId) {
        let setup = {
            userId: userId,
            roleId: roleId,
            groupId: this.groupId
        }
        return Methods.setRank(setup, this._setup);
    }
    
    async getMyPermissions () {
        return Methods.getGroupPermissions({groupId: this.groupId}, this._setup);
    }
}

module.exports = GroupFunctions;