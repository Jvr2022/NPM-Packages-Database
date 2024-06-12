import RESTController from "../RESTController";
export default function getRequester(controller: RESTController, customRequester?: RESTController["requester"]): import("../../../interfaces/RESTInterfaces").RESTRequester;
