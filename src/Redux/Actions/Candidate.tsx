import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, ApiUrlCandidate, ApiUrlCommon } from "@api/Api/AuthApi";
import { ApiGetNoAuth, ApiPostNoAuth } from "@api/Api/CommonApi";
import localStoreUtil from "@redux/Api/localstore.util";

export const createCandidate: any = createAsyncThunk(
  "CreateCandidate",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlCandidate, api.CreateCandidate, body)
      .then((res: any) => {
        localStoreUtil.store_data("candidateId", res?.data?.data);
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const updateCandidate: any = createAsyncThunk(
  "UpdateCandidate",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlCandidate, api.UpdateCandidate, body)
      .then((res: any) => {
        localStoreUtil.store_data("candidateId", res?.data?.data);
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const updateCandidateVideoResume: any = createAsyncThunk(
  "CreateCandidate2",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlCandidate, api.UpdateCandidateVideoResume, body)
      .then((res: any) => {
        localStoreUtil.store_data("candidateId", res?.data?.data);
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const getAllMaritalStatus: any = createAsyncThunk(
  "getAllMaritalStatus",
  async (body: any) => {
    return ApiGetNoAuth(ApiUrlCommon, api.GetAllMaritalStatus, {})
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const getAllNationalities: any = createAsyncThunk(
  "GetAllNationalities",
  async (body: any) => {
    return ApiGetNoAuth(ApiUrlCommon, api.GetAllNationalities, {})
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const getGenders: any = createAsyncThunk(
  "GetGenders",
  async (body: any) => {
    return ApiGetNoAuth(ApiUrlCommon, api.GetGenders, {})
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const getCandidateJobExperience: any = createAsyncThunk(
  "getCandidateJobExperience",
  async (body: any) => {
    return ApiGetNoAuth(ApiUrlCandidate, api.GetCandidateJobExperience + body,{} )
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const getAllEmploymentTypeMaster: any = createAsyncThunk(
  "getAllEmploymentTypeMaster",
  async (body: any) => {
    return ApiGetNoAuth(ApiUrlCommon, api.GetAllEmploymentTypeMaster,{} )
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const getCandidateQualification: any = createAsyncThunk(
  "GetCandidateQualification",
  async (body: any) => {
    return ApiGetNoAuth(ApiUrlCandidate, api.GetCandidateQualification + body ,{} )
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const uploadResume: any = createAsyncThunk(
  "uploadResume",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlCandidate, api.UploadResume, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const createResume: any = createAsyncThunk(
  "CreateResume",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlCandidate, api.CreateResume, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const uploadDocument: any = createAsyncThunk(
  "uploadDocument",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlCandidate, api.uploadDocument, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const uploadCandidateQualificationAttachment: any = createAsyncThunk(
  "UploadCandidateQualificationAttachment",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlCandidate, api.UploadCandidateQualificationAttachment, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const UpdateCandidateJobExperience: any = createAsyncThunk(
  "UpdateCandidateJobExperience",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlCandidate, api.UpdateCandidateJobExperience, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const updateCandidateQualification: any = createAsyncThunk(
  "UpdateCandidateQualification",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlCandidate, api.UpdateCandidateQualification, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const updateCandidateAddress: any = createAsyncThunk(
  "UpdateCandidateAddress",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlCandidate, api.UpdateCandidateAddress, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const getCandidateUploadedDocument: any = createAsyncThunk(
  "GetCandidateUploadedDocument",
  async (body: any) => {
    return ApiGetNoAuth(ApiUrlCandidate, api.GetCandidateUploadedDocument + body, {})
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const deleteCandidateDocument: any = createAsyncThunk(
  "DeleteCandidateDocument",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlCandidate, api.DeleteCandidateDocument, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const getCandidateAdditionalDetails: any = createAsyncThunk(
  "GetCandidateAdditionalDetails",
  async (body: any) => {
    return ApiGetNoAuth(ApiUrlCandidate, api.GetCandidateAdditionalDetails + body, {})
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const getCandidateUpdateAdditionalDetails: any = createAsyncThunk(
  "GetCandidateUpdateAdditionalDetails",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlCandidate, api.GetCandidateUpdateAdditionalDetails , body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const getCandidateDetails: any = createAsyncThunk(
  "GetCandidateDetails",
  async (body: any) => {
    return ApiGetNoAuth(ApiUrlCandidate, api.GetCandidateDetails + body, {})
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const finalizeCandidate: any = createAsyncThunk(
  "FinalizeCandidate",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlCandidate, api.FinalizeCandidate ,body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

