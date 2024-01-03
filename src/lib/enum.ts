export enum responseEnum {
  FailureCode = 0,
  SuccessCode = 1,
  ValidationCode = 400,
  InternalServerCode = 500,
  TokenSuccess,
}

export enum loginEnum {
  LoginSuccess = 1,
  TokenSuccess,
  ForcePasswordChange,
  PartnerSelfVerificationPending, //applicable for Partner admin while Partner sign up
  PartnerCreatePassword, //applicable for Partner admin while Partner sign up
  PartnerProfileCreationPending = 6, //applicable for Partner admin while Partner sign up
  PartnerVerificationPending = 7,
  PartnerUserVerificationPending, //applicable for Partner user
  PartnerUserCreatePassword, //applicable for Partner user
  ClientSelfVerificationPending, //applicable for Client admin while Partner sign up
  ClientCreatePassword, //applicable for Client admin while Partner sign up
  ClientProfileCreationPending, //applicable for Client admin while Partner sign up
  ClientVerificationPending,
  ClientUserVerificationPending, //applicable for Client user
  ClientUserCreatePassword, //applicable for Client user
}

export enum PartnerSubscriptionType {
  platinum = 1,
  gold,
  silver,
  bronze,
}
export enum EnumCandidateStatus {
  SaveAsDraft = 1,
  Active,
  InActive,
}

export enum RecruiterType {
  agency = 1,
  freelancer,
  referral,
}

export enum PersonaType {
  MyRCloud = 1,
  Client,
  Partner,
}

export enum PriorityType {
  High = 1,
  Medium,
  Low,
}

export enum VerificationType {
  ForgotPassword = "ForgotPassword",
  AccountVerification = "AccountVerification",
  CreatePassword = "CreatePassword",
}

export enum PlacementFeeType {
  Percentage = 1,
  Fixed,
}
