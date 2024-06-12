import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type GetCaptchaMetadata = {
    funCaptchaPublicKeys: {
        type: string;
        value: string;
    }[];
};
export type GetLanguageResources = {
    languageResources: unknown;
};
export default class CaptchaAPI extends BaseAPI {
    constructor(client: Client);
    getCaptchaMetaData(): Promise<GetCaptchaMetadata>;
    getLanguageResources(): Promise<GetLanguageResources>;
}
