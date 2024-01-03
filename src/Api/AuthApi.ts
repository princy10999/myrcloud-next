export const BaseUrl = (process.env.NEXT_PUBLIC_BASE_API_URL || "") + "/api/";

export const ApiUrlPersona = "persona/";
export const ApiUrlAuth = "auth/";
export const ApiUrlCommon = "common/";
export const ApiUrlRequisition = "requisition/";
export const ApiUrlCandidate = "candidate/";
export const ApiUrlAggregator = "aggregator/";

export const versionControl = "v1/";

export const api = {
  GetPartnerTypeList: "PartnerType/GetPartnerTypeList",
  PartnerSignup: "Partner/PartnerSignup",
  PartnerSignupByPSM: "Partner/PartnerSignupByPSM",
  VerifyUserAccount: "User/VerifyUserAccount",
  CreatePassword: "Login/CreatePassword",
  ForgotPassword: "Login/ForgotPassword",
  UserLogin: "Login/Login",
  ResendVerificationLink: "User/ResendVerificationLink",
  GetIndustryPreferenceList: "Preference/IndustryPreferenceList",
  GetPartnerDetail: "Partner/GetPartnerDetail",
  GetPartnerDetailById: "Partner/GetPartnerDetailById",
  HiringExpertiseList: "HiringExpertise/HiringExpertiseList",
  RolePreferenceList: "Preference/RolePreferenceList",
  UpdateBasicInformationBySelf: "Partner/UpdateBasicInformationBySelf",
  UpdatePartnerComplianceInformationSelf:
    "Partner/UpdatePartnerComplianceInformationSelf",
  GetCountry: "Country/Countries",
  GetState: "State/States",
  GetCity: "City/CitiesByStateId",
  GetBanks: "Bank/GetAllBanks",
  GetPartnerUploadedDocumentSelf: "Document/PersonaWiseDocument",
  GetPartnerUploadedDocumentSelfPersona:
    "Partner/GetPartnerUploadedDocumentSelf",
  GetPartnerUploadedDocument: "Partner/GetPartnerUploadedDocument",
  UploadPartnerDocumentSelf: "Partner/UploadPartnerDocumentSelf",
  DeletePartnerDocumentSelf: "Partner/DeletePartnerUploadedDocumentSelf",
  GetClient: "Client/GetClientList",
  GetRequisitionTranType: "RequisitionTransaction/GetRequisitionTranType",
  GetJobTitleByClientId: "JDTemplate/GetJobTitleByClientId",
  GetJdByClientCodeAndJobTitle: "JDTemplate/GetJdByClientCodeAndJobTitle",
  CreateRequisition: "Requisition/CreateRequisition",
  UpdateRequisitionBasicDetail: "Requisition/UpdateRequisitionBasicDetail",
  UpdateScreeningQuestion: "Requisition/UpdateScreeningQuestion",
  UpdateRequisitionMatrix: "Requisition/UpdateRequisitionMatrix",
  CreateRequisitionWithJdParsing: "Requisition/CreateRequisitionWithJdParsing",
  UpdateRequisitionWithJdParsing: "Requisition/UpdateRequisitionWithJdParsing",
  GetAllLanguageMaster: "LanguageMaster/GetAllLanguageMaster",
  GetAllSkillMaster: "SkillMaster/GetAllSkillMaster",
  PublishedRequisitionForPartner:
    "PartnerRequisition/PublishedRequisitionForPartner",
  AcceptRejectRequisitionList: "PartnerRequisition/AcceptRejectRequisitionList",
  GetDraftRequisitionList: "Requisition/GetDraftRequisitionList",
  GetRequisitionDetail: "Requisition/GetRequisitionDetail",
  FinalizeRequisition: "Requisition/FinalizeRequisition",
  GetUpdateRnRDetails: "Requisition/UpdateRnRDetails",
  UpdateVideoResumeDetails: "Requisition/UpdateVideoResumeDetails",
  GetCategoryList: "Quiz/GetCategoryListByClientId",
  GetQuizList: "Quiz/getQuizListByCategoryId",
  UpdateCompensation: "Requisition/UpdateCompensation",
  UploadOtherAttachment: "Requisition/UploadOtherAttachment",
  AcceptRejectRequisition: "PartnerRequisition/AcceptRejectRequisition",
  GetAllQualificationMaster: "QualificationMaster/GetAllQualificationMaster",
  CreateCategory: "Quiz/CreateCategory",
  GetPartnerComplianceInformationSelf:
    "Partner/GetPartnerComplianceInformationSelf",
  GetPartnerComplianceInformation: "Partner/GetPartnerComplianceInformation",
  GetUnverifiedPartnerListForPSM: "Partner/UnverifiedPartnerListForPSM",
  ApprovePartner: "Partner/ApprovePartner",
  GetPartnerListForPSM: "Partner/PartnerListForPSM",
  CreateCandidate: "Candidate/CreateCandidate",
  UpdateCandidate: "Candidate/UpdateCandidateBasicInformation",
  GetAllMaritalStatus: "MaritalStatus/GetAllMaritalStatus",
  GetAllNationalities: "NationalityStatus/GetAllNationalities",
  GetGenders: "Gender/Genders",
  UploadResume: "Resume/UploadResume",
  CreateResume: "Resume/CreateCandidateWithResume",
  uploadDocument: "Candidate/UploadCandidateDocument",
  UploadCandidateQualificationAttachment:
    "Candidate/UploadCandidateQualificationAttachment",
  UpdateCandidateVideoResume: "Candidate/UpdateCandidateVideoResume",
  GetCandidateJobExperience: "Candidate/GetCandidateJobExperience",
  GetAllEmploymentTypeMaster: "EmploymentTypeMaster/GetAllEmploymentTypeMaster",
  UpdateCandidateJobExperience: "Candidate/UpdateCandidateJobExperience",
  GetCandidateQualification: "Candidate/GetCandidateQualification",
  UpdateCandidateQualification: "Candidate/UpdateCandidateQualification",
  UpdateCandidateAddress: "Candidate/UpdateCandidateAddress",
  GetCandidateUploadedDocument: "Candidate/GetCandidateUploadedDocument",
  GetCandidateAdditionalDetails: "Candidate/GetCandidateAdditionalDetails",
  GetCandidateUpdateAdditionalDetails:
    "Candidate/UpdateCandidateAdditionalDetails",
  GetCandidateDetails: "Candidate/GetCandidateDetails",
  UploadPartnerLogo: "Partner/UploadPartnerLogo",
  CreateClient: "Client/ClientCreationByAdmin",
  UpdateSpokePerson: "Client/UpdateSpokePerson",
  UpdateContractInformation: "Client/UpdateContractInformation",
  UploadClientDocument: "Client/UploadClientDocument",
  UpdateClientAllocation: "Client/UpdateClientAllocation",
  ClientDetailById: "Client/ClientDetailById",
  UpdateBasicDetailByAdmin: "Client/UpdateBasicDetailByAdmin",
  DeleteCandidateDocument: "Candidate/DeleteCandidateDocument",
  FinalizeCandidate: "Candidate/FinalizeCandidate",
  UploadClientLogo: "Client/UploadClientLogo",
  GetAllClientList: "Persona/GetClientList",
  UpdatePartnerPlacementFeeByPsm: "Partner/UpdatePartnerPlacementFeeByPsm",
};

export const LOGIN_TOKEN = "LOGIN_TOKEN";
export const candidateId = "candidateId";
// export const baseUrlPerson = BaseUrl + ApiUrlPersona+version;
// export const baseUrlAuth = BaseUrl + ApiUrlAuth +version;
// User​/VerifyUserAccount
// ​v1​/Login​/CreatePassword
// ​v1​/Preference​/IndustryPreferenceList
// ​v1​/Partner​/GetPartnerDetail
// v1/HiringExpertise/HiringExpertiseList
// v1/Preference/RolePreferenceList?PageIndex=1&PageSize=10&SearchText=i
// ​v1​/Requisition​/UpdateScreeningQuestion
// v1​/RequisitionTransaction​/GetRequisitionTranType
// v1/Requisition/UpdateScreeningQuestion
// ​v1​/Requisition​/UpdateRequisitionMatrix
// v1​/PartnerRequisition​/PublishedRequisitionForPartner
// v1​/PartnerRequisition​/AcceptRejectRequisitionList
// ​v1​/Requisition​/GetRequisitionDetail
// v1​/PartnerRequisition​/AcceptRejectRequisition
