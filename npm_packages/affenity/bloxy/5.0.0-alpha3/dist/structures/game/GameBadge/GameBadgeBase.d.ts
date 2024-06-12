import Client from "../../../client";
export interface GameBadgeBaseOptions {
    id: number;
    name?: string;
}
export default class GameBadgeBase {
    client: Client;
    id: number;
    name: string | null;
    constructor(data: GameBadgeBaseOptions, client: Client);
}
