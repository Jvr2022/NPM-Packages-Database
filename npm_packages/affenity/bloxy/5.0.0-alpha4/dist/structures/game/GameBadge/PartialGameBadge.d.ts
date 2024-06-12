import GameBadgeBase, { GameBadgeBaseOptions } from "./GameBadgeBase";
import Client from "../../../client";
export declare type PartialGameBadgeOptions = GameBadgeBaseOptions;
export default class PartialGameBadge extends GameBadgeBase {
    constructor(data: PartialGameBadgeOptions, client: Client);
}
