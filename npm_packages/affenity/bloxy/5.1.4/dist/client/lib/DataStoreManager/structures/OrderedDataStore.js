"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const GenericDataStore_1 = tslib_1.__importDefault(require("./GenericDataStore"));
const DataStoreHttpRequest_1 = tslib_1.__importDefault(require("./DataStoreHttpRequest"));
const constants_1 = tslib_1.__importStar(require("../util/constants"));
const OrderedDataStorePage_1 = tslib_1.__importDefault(require("./OrderedDataStorePage"));
class OrderedDataStore extends GenericDataStore_1.default {
    constructor(manager, placeId, name, scope, legacy) {
        super(manager, "OrderedDataStore", placeId, name, scope || null, legacy || false);
    }
    getSortedAsync(options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.performPreflightChecks({});
            const createdRequest = new DataStoreHttpRequest_1.default(this.manager, {
                url: this.buildGetSortedUrl(options),
                placeId: this.placeId,
                data: "",
                requestType: constants_1.DataStoreRequestType.GET_SORTED_ASYNC_PAGE
            });
            const response = yield createdRequest.send();
            const [parsedResponseSuccess, parsedResponse] = this.parseRetrievedData(response.body);
            if (!parsedResponseSuccess) {
                throw new Error(`Failed to parse response!`);
            }
            return new OrderedDataStorePage_1.default(this, {
                options,
                result: parsedResponse
            });
        });
    }
    buildGetSortedUrl(options) {
        const encodedQueryString = this.createQueryString({
            key: this.safeEncodeValue(this.name),
            pageSize: options.pageSize || constants_1.default.DFInt.DataStoreMaxPageSize,
            ascending: options.ascending ? "True" : "False",
            inclusiveMinValue: options.minValue,
            inclusiveMaxValue: options.maxValue,
            exclusiveStartKey: options.startKey
        });
        return `${this.baseAPIUrl}getSortedValues?${encodedQueryString}`;
    }
}
exports.default = OrderedDataStore;
