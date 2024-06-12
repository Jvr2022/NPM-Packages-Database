import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type GetTwoStepVerificationMetaDataOptions = {
    userId: number;
    challengeId: string;
    actionType: string;
};
export type GetTwoStepVerificationMetaData = {
    twoStepVerificationEnabled: boolean;
    authenticatorEnabled: boolean;
    authenticatorQrCodeSize: string;
    emailCodeLength: number;
    authenticatorCodeLength: number;
};
export type GetTwoStepConfigurationOptions = GetTwoStepVerificationMetaDataOptions;
export type GetTwoStepConfiguration = {
    primaryMediaType: "Email" | string;
    methods: {
        mediaType: "Email" | string;
        enabled: boolean;
        updated: string;
    }[];
};
export type AuthenticatorVerifyOptions = {
    challengeId: string;
    actionType: string;
    code: string;
};
export type AuthenticatorVerify = {
    verificationToken: string;
};
export type AuthenticatorDisableOptions = {
    password: string;
};
export type AuthenticatorDisable = unknown;
export type AuthenticatorEnableOptions = {
    userId: number;
};
export type AuthenticatorEnable = {
    setupToken: string;
    qrCodeImageUrl: string;
    manualEntryKey: string;
};
export type AuthenticatorVerifySetupOptions = {
    setupToken: string;
    code: string;
};
export type AuthenticatorVerifySetup = unknown;
export type EmailSendCodeOptions = {
    challengeId: string;
    actionType: string;
};
export type EmailSendCode = {
    challengeId: string;
    actionType: string;
};
export type EmailVerifyOptions = {
    challengeId: string;
    actionType: string;
    code: string;
};
export type EmailVerify = {
    verificationToken: string;
};
export type EmailDisableOptions = {
    password: string;
};
export type EmailDisable = unknown;
export type EmailEnableOptions = {
    userId: number;
};
export type EmailEnable = unknown;
export default class TwoStepVerificationAPI extends BaseAPI {
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
