import Client from "../../../client";
import PartialGameUniverse from "./PartialGameUniverse";

export interface PlaceOptions {
    placeId: number;
    name: string;
    url: string;
    description: string;
    builder: string;
    builderId: number;
    isPlayable: boolean;
    reasonProhibited: string;
    universeId: number;
    universeRootPlaceId: number;
    price: number;
    imageToken: string;
}

export default class Place {
    public client: Client;
    public id: number;
    public name: string;
    public description: string;
    public url: string;
    public creatorName: string;
    public creatorId: number;
    public playable: boolean;
    public prohibitedReason: string;
    public prohibited: boolean;
    public universe: PartialGameUniverse;
    public price: number;
    public imageToken: string;

    constructor (data: PlaceOptions, client: Client) {
        this.client = client;
        this.id = data.placeId;
        this.name = data.name;
        this.description = data.description;
        this.url = data.url;
        this.creatorName = data.builder;
        this.creatorId = data.builderId;
        this.playable = data.isPlayable;
        this.prohibitedReason = data.reasonProhibited;
        this.prohibited = this.prohibitedReason.toLowerCase() !== "none";
        this.universe = new PartialGameUniverse({
            id: data.universeId,
            rootPlace: {
                id: data.universeRootPlaceId
            }
        }, client);
        this.price = data.price;
        this.imageToken = data.imageToken;
    }
}
