import BaseAPI from "./BaseAPI";
import Client from "../Client";
export declare type GetTwoStepVerificationMetaDataOptions = {
    userId: number;
    challengeId: string;
    actionType: string;
};
export declare type GetTwoStepVerificationMetaData = {
    twoStepVerificationEnabled: boolean;
    authenticatorEnabled: boolean;
    authenticatorQrCodeSize: string;
    emailCodeLength: number;
    authenticatorCodeLength: number;
};
export declare type GetTwoStepConfigurationOptions = GetTwoStepVerificationMetaDataOptions;
export declare type GetTwoStepConfiguration = {
    primaryMediaType: "Email" | string;
    methods: {
        mediaType: "Email" | string;
        enabled: boolean;
        updated: string;
    }[];
};
export declare type AuthenticatorVerifyOptions = {
    challengeId: string;
    actionType: string;
    code: string;
};
export declare type AuthenticatorVerify = {
    verificationToken: string;
};
export declare type AuthenticatorDisableOptions = {
    password: string;
};
export declare type AuthenticatorDisable = unknown;
export declare type AuthenticatorEnableOptions = {
    userId: number;
};
export declare type AuthenticatorEnable = {
    setupToken: string;
    qrCodeImageUrl: string;
    manualEntryKey: string;
};
export declare type AuthenticatorVerifySetupOptions = {
    setupToken: string;
    code: string;
};
export declare type AuthenticatorVerifySetup = unknown;
export declare type EmailSendCodeOptions = {
    challengeId: string;
    actionType: string;
};
export declare type EmailSendCode = {
    challengeId: string;
    actionType: string;
};
export declare type EmailVerifyOptions = {
    challengeId: string;
    actionType: string;
    code: string;
};
export declare type EmailVerify = {
    verificationToken: string;
};
export declare type EmailDisableOptions = {
    password: string;
};
export declare type EmailDisable = unknown;
export declare type EmailEnableOptions = {
    userId: number;
};
export declare type EmailEnable = unknown;
export default class TwoStepVerification extends BaseAPI {
    constructor(client: Client);
    getMetaData(options: GetTwoStepVerificationMetaDataOptions): Promise<GetTwoStepVerificationMetaData>;
    getConfiguration(options?: GetTwoStepConfigurationOptions): Promise<GetTwoStepVerificationMetaData>;
    verifyWithAuthenticator(options: AuthenticatorVerifyOptions): Promise<AuthenticatorVerify>;
    disableAuthenticator(options: AuthenticatorDisableOptions): Promise<AuthenticatorDisable>;
    enableAuthenticator(options: AuthenticatorEnableOptions): Promise<AuthenticatorEnable>;
    verifyAuthenticatorSetup(options: AuthenticatorVerifySetupOptions): Promise<AuthenticatorVerifySetup>;
    sendEmailCode(options: EmailSendCodeOptions): Promise<EmailSendCode>;
    verifyEmail(options: EmailVerifyOptions): Promise<EmailVerify>;
    disableEmail(options: EmailDisableOptions): Promise<EmailDisable>;
    enableEmail(options: EmailEnableOptions): Promise<EmailEnable>;
}
