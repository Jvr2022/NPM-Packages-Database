import Client from "../client";
import PartialUser from "./user/PartialUser";

export interface ClientUserOptions {
    id: number;
    name: string;
}

export default class ClientUser extends PartialUser {
    public client: Client;

    constructor (data: ClientUserOptions, client: Client) {
        super(data, client);
        this.client = client;
    }
}