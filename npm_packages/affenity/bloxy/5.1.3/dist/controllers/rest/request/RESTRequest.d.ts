import { RESTRequestOptions, RESTResponseDataType } from "../../../interfaces/RESTInterfaces";
import RESTController from "../RESTController";
declare class RESTRequest {
    controller: RESTController;
    /**
     * The options that will be used for sending the request
     */
    requestOptions: RESTRequestOptions;
    /**
     * The amount of times this request has been executed
     */
    attempts: number;
    constructor(controller: RESTController, options: RESTRequestOptions);
    setOptions(options: RESTRequestOptions): RESTRequestOptions;
    send(options?: RESTRequestOptions): Promise<RESTResponseDataType>;
}
export default RESTRequest;
