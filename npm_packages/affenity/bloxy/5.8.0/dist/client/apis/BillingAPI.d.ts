import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type GetDeveloperExchangeRate = {
    rate: number;
    "currency-code": string;
};
export type SubmitDeveloperExchangeOptions = {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
    robuxAmount: number;
};
export type SubmitDeveloperExchange = unknown;
export type GetLuobuDeveloperExchangeBalance = {
    amount: number;
};
export type GetLuobuDeveloperExchangeEligibility = {
    eligibility?: "Eligible" | string;
    errors?: {
        code: number;
        message: string;
        userFacingMessage: string;
    };
};
export type GetLatestLuobuDeveloperExchangeStatus = {
    date?: string;
    status?: string;
    amount?: number;
};
export type SubmitLuobuDeveloperExchangeOptions = {
    firstName: string;
    lastName: string;
    email: string;
    amount: number;
};
export type SubmitLuobuDeveloperExchange = unknown;
export type GetUserPaymentsOptions = {
    sortOrder?: "Asc" | "Desc";
    limit?: 10 | 25 | 50 | 100;
    cursor?: string;
};
export type GetUserPayments = {
    previousPageCursor: string;
    nextPageCursor: string;
    data: {
        paymentDate: string;
        products: {
            name: string;
        }[];
        money: {
            Amount: number;
            USDAmount: number;
            Currency: {
                Id: number;
                CurrencyType: string;
                CurrencyName: string;
                CurrencySymbol: string;
            };
        };
        paymentProviderType: "AppleAppStore";
        creditCardType: string;
        cardNumber: string;
    };
};
export type PurchaseAmazonProductOptions = {
    receiptId: string;
    amazonUserId: string;
    isRetry: boolean;
};
export type PurchaseAmazonProduct = unknown;
export type ValidateAmazonProductOptions = {
    productId: string;
    currency: string;
};
export type ValidateAmazonProduct = unknown;
export type PurchaseAppleProductOptions = PurchaseAmazonProductOptions;
export type PurchaseAppleProduct = PurchaseAmazonProduct;
export type ValidateAppleProductOptions = ValidateAmazonProductOptions;
export type ValidateAppleProduct = ValidateAmazonProduct;
export type RedeemDigitalCodeOptions = {
    redemptionCode: string;
};
export type RedeemDigitalCode = unknown;
export type RedeemGameCardOptions = {
    pinCode: string;
    captchaToken: string;
    captchaProvider: "PROVIDER_ARKOSELABS" | string;
};
export type RedeemGameCard = {
    balance: string;
    successMsg: string;
    successSubText: string;
    bonusMsg: string;
    error: string;
    errorMsg: string;
};
export type ReverseGameCardOptions = {
    PinCode: string;
    UserId: number;
};
export type ReverseGameCard = unknown;
export type PurchaseGoogleProductOptions = {
    packageName: string;
    productId: string;
    token: string;
    isRetry: boolean;
    orderId: string;
};
export type PurchaseGoogleProduct = unknown;
export type ValidateGoogleProductOptions = ValidateAmazonProductOptions;
export type ValidateGoogleProduct = ValidateAmazonProduct;
export type SendXsollaWebhookOptions = unknown;
export type SendXsollaWebhook = unknown;
export type GetXsollaIFrameTokenOptions = {
    mainProductId: number;
    upsellProductId: number;
    paymentProviderType: string;
    verifiedEmailOrPhone: boolean;
};
export type GetXsollaIFrameToken = {
    token: string;
    success: boolean;
    message: string;
};
export type IncrementCounterByAgentOptions = {
    counterPrefix: string;
};
export type IncrementCounterByAgent = unknown;
export type RedeemPromoCodeOptions = {
    code: string;
};
export type RedeemPromoCode = {
    success: boolean;
    errorMsg: string;
    successMsg: string;
};
export default class BillingAPI extends BaseAPI {
    constructor(client: Client);
    getDeveloperExchangeRate(): Promise<GetDeveloperExchangeRate>;
    submitDeveloperExchange(options: SubmitDeveloperExchangeOptions): Promise<SubmitDeveloperExchange>;
    getLuobuDeveloperExchangeBalance(): Promise<GetLuobuDeveloperExchangeBalance>;
    getLuobuDeveloperExchangeEligibility(): Promise<GetLuobuDeveloperExchangeEligibility>;
    getLuobuDeveloperExchangeLatestRequestStatus(): Promise<GetLatestLuobuDeveloperExchangeStatus>;
    submitLuobuDeveloperExchange(options: SubmitLuobuDeveloperExchangeOptions): Promise<SubmitLuobuDeveloperExchange>;
    getUserPaymentsHistory(options: GetUserPaymentsOptions): Promise<GetUserPayments>;
    purchaseAmazonProduct(options: PurchaseAmazonProductOptions): Promise<PurchaseAmazonProduct>;
    validateAmazonProduct(options: ValidateAmazonProductOptions): Promise<ValidateAmazonProduct>;
    purchaseAppleProduct(options: PurchaseAppleProductOptions): Promise<PurchaseAppleProduct>;
    validateAppleProduct(options: ValidateAppleProductOptions): Promise<ValidateAppleProduct>;
    redeemDigitalCode(options: RedeemDigitalCodeOptions): Promise<RedeemDigitalCode>;
    redeemGameCard(options: RedeemGameCardOptions): Promise<RedeemGameCard>;
    reverseGameCard(options: ReverseGameCardOptions): Promise<ReverseGameCard>;
    purchaseGoogleProduct(options: PurchaseGoogleProductOptions): Promise<PurchaseGoogleProduct>;
    validateGoogleProduct(options: ValidateGoogleProductOptions): Promise<ValidateGoogleProduct>;
    sendXsollaWebhook(options: SendXsollaWebhookOptions): Promise<SendXsollaWebhook>;
    getXsollaIFrameToken(options: GetXsollaIFrameTokenOptions): Promise<GetXsollaIFrameToken>;
    incrementCounterByAgent(options: IncrementCounterByAgentOptions): Promise<IncrementCounterByAgent>;
    redeemPromoCode(options: RedeemPromoCodeOptions): Promise<RedeemPromoCode>;
}
