import Client from "../../../client";
export interface PartialVIPServerOptions {
    id: number;
}
export default class PartialVIPServer {
    client: Client;
    id: number;
    constructor(data: PartialVIPServerOptions, client: Client);
}
