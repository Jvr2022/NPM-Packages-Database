"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetVersion = void 0;
const User_1 = require("../User");
const Game_1 = require("../Game");
class AssetVersion {
    constructor(data, client) {
        this.client = client;
        this.id = data.Id;
        this.assetId = data.AssetId;
        this.versionNumber = data.VersionNumber;
        this.parentAssetVersionId = data.ParentAssetVersionId;
        this.creatorType = data.CreatorType;
        this.creator = new User_1.PartialUser({
            id: data.CreatorTargetId
        }, this.client);
        this.createdForUniverse = data.CreatingUniverseId ? new Game_1.PartialGameUniverse({
            id: data.CreatingUniverseId
        }, client) : null;
        this.created = new Date(data.Created);
        this.updated = new Date(data.Updated);
    }
}
exports.AssetVersion = AssetVersion;
