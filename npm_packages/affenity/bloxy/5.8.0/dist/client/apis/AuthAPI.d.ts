import BaseAPI from "./BaseAPI";
import Client from "../Client";
export type GetAuthTicket = {
    authTicket: string;
};
export type GetAuthMetaData = {
    cookieLawNoticeTimeout: number;
};
export type LoginOptions = {
    ctype: "Email" | "Username" | string;
    cvalue: string;
    password: string;
    captchaToken: string;
    captchaProvider: "PROVIDER_ARKOSELABS" | string;
};
export type Login = {
    user: {
        id: number;
        name: string;
        displayName: string;
    };
    twoStepVerificationData?: {
        mediaType: "Email" | string;
        ticket: string;
    };
};
export type Logout = unknown;
export type GetCredentialsVerificationStatusOptions = {
    credentialType: "Email" | "Username" | "PhoneNumber";
    credentialValue: string;
    password: string;
};
export type GetCredentialsVerificationStatus = {
    canSend: boolean;
};
export type SendCredentialsVerificationMessageOptions = {
    credentialType: "Email" | "Username" | "PhoneNumber";
    credentialValue: string;
    password: string;
};
export type SendCredentialsVerificationMessage = unknown;
export type GetMetaData = {
    isUpdateUsernameEnabled: boolean;
    ftuxAvatarAssetMap: string;
};
export type GetCurrentPasswordStatus = {
    valid: boolean;
};
export type GetPasswordResetMetaDataOptions = {
    targetType: "Email" | "PhoneNumber";
    ticket: string;
};
export type GetPasswordResetMetaData = {
    users: {
        userId: number;
        username: string;
        displayName: string;
    }[];
};
export type ResetPasswordOptions = {
    targetType: "Email" | "PhoneNumber";
    ticket: string;
    userId: number;
    password: string;
    passwordRepeated: string;
};
export type ResetPassword = Login;
export type ValidatePasswordOptions = {
    username: string;
    password: string;
};
export type ValidatePassword = {
    code: string;
    message: string;
};
export type SendPasswordResetOptions = {
    targetType: ResetPasswordOptions["targetType"];
    target: string;
    captchaToken: string;
    captchaProvider: "PROVIDER_ARKOSELABS" | string;
};
export type SendPasswordReset = {
    nonce: string;
    transmissionType: string;
};
export type VerifyPasswordResetOptions = {
    targetType: ResetPasswordOptions["targetType"];
    nonce: string;
    code: string;
};
export type VerifyPasswordReset = {
    userTickets: {
        user: {
            userId: number;
            username: string;
            displayName: string;
        };
        ticket: string;
    }[];
};
export type ChangeUserPasswordOptions = {
    currentPassword: string;
    newPassword: string;
};
export type ChangeUserPassword = unknown;
export type GetRecoveryMetaData = {
    isOnPhone: boolean;
    codeLength: number;
    isPhoneFeatureEnabledForUsername: boolean;
    isPhoneFeatureEnabledForPassword: boolean;
    isBedev2CaptchaEnabledForPasswordReset: boolean;
};
export type RevertAccountInfoOptions = {
    ticket: string;
};
export type RevertAccountInfo = {
    isTwoStepVerificationEnabled: boolean;
    isEmailVerified: boolean;
    isEmailChanged: boolean;
    userId: number;
    username: string;
    ticket: string;
};
export type RevertAccountOptions = {
    userId: number;
    newPassword: string;
    ticket: string;
};
export type RevertAccount = Login;
export type GetSAMLMetaData = unknown;
export type SAMLRequest = unknown;
export type GetTwoStepVerificationMetaData = {
    codeLength: number;
    loadingImageUrl: string;
    supportUrl: string;
};
export type ResendTwoStepVerificationOptions = {
    username: string;
    ticket: string;
    actionType: string;
};
export type ResendTwoStepVerification = RequestTwoStepVerification;
export type RequestTwoStepVerification = {
    mediaType: "Email" | "PhoneNumber" | string;
    ticket: string;
};
export type VerifyTwoStepVerificationOptions = {
    username: string;
    ticket: string;
    code: string;
    rememberDevice: boolean;
    actionType: string;
};
export type VerifyTwoStepVerification = unknown;
export type GetExistingUsernamesOptions = {
    username: string;
};
export type GetExistingUsernames = {
    usernames: string[];
};
export type ValidateUsernameOptions = {
    username: string;
    birthday: string;
    context: "Unknown" | "Signup" | "UsernameChange" | string;
};
export type ValidateUsername = {
    code: string;
    message: string;
};
export type RecoverUsernamesOptions = {
    targetType: "Email" | string;
    target: string;
};
export type RecoverUsernames = {
    transmissionType: string;
};
export type SignUpOptions = {
    username: string;
    password: string;
    gender: "Unknown" | string;
    birthday: string;
    isTosAgreementBoxChecked: boolean;
    email: string;
    locale: string;
    assetIds: number[];
    bodyColorId: number;
    bodyTypeScale: number;
    headScale: number;
    heightScale: number;
    widthScale: number;
    proportionScale: number;
    captchaToken: string;
    captchaProvider: string;
};
export type SignUp = {
    userId: number;
    starterPlaceId: number;
};
export type ChangeUsernameOptions = {
    username: string;
    password: string;
};
export type ChangeUsername = unknown;
export default class AuthAPI extends BaseAPI {
    constructor(client: Client);
    getAuthTicket(): Promise<GetAuthTicket>;
    getAuthMetaData(): Promise<GetAuthMetaData>;
    login(options: LoginOptions): Promise<Login>;
    logout(): Promise<Logout>;
    getCredentialsVerificationStatus(options: GetCredentialsVerificationStatusOptions): Promise<GetCredentialsVerificationStatus>;
    sendCredentialsVerificationMessage(options: SendCredentialsVerificationMessageOptions): Promise<SendCredentialsVerificationMessage>;
    getMetaData(): Promise<GetMetaData>;
    getCurrentUserPasswordStatus(): Promise<GetCurrentPasswordStatus>;
    getPasswordResetMetaData(options: GetPasswordResetMetaDataOptions): Promise<GetPasswordResetMetaData>;
    resetPassword(options: ResetPasswordOptions): Promise<ResetPassword>;
    validatePassword(options: ValidatePasswordOptions): Promise<ValidatePassword>;
    sendPasswordReset(options: SendPasswordResetOptions): Promise<SendPasswordReset>;
    verifyPasswordReset(options: VerifyPasswordResetOptions): Promise<VerifyPasswordReset>;
    changeUserPassword(options: ChangeUserPasswordOptions): Promise<ChangeUserPassword>;
    getRecoveryMetaData(): Promise<GetRecoveryMetaData>;
    getRevertAccountInfo(options: RevertAccountInfoOptions): Promise<RevertAccountInfo>;
    revertAccount(options: RevertAccountOptions): Promise<RevertAccount>;
    getSAMLMetaData(): Promise<GetSAMLMetaData>;
    samlAuthenticate(): Promise<SAMLRequest>;
    getTwoStepVerificationMetaData(): Promise<GetTwoStepVerificationMetaData>;
    resendTwoStepVerificationCode(options: ResendTwoStepVerificationOptions): Promise<ResendTwoStepVerification>;
    verifyTwoStepCode(options: VerifyTwoStepVerificationOptions): Promise<VerifyTwoStepVerification>;
    getExistingUsernames(options: GetExistingUsernamesOptions): Promise<GetExistingUsernames>;
    validateUsername(options: ValidateUsernameOptions): Promise<ValidateUsername>;
    recoverUsernames(options: RecoverUsernamesOptions): Promise<RecoverUsernames>;
    signUp(options: SignUpOptions): Promise<SignUp>;
    changeUserUsername(options: ChangeUsernameOptions): Promise<ChangeUsername>;
}
