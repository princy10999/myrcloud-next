import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGetNoAuth, ApiPostNoAuth } from "@api/Api/CommonApi";
import {
  api,
  ApiUrlPersona,
  ApiUrlCommon,
  ApiUrlRequisition,
} from "@api/Api/AuthApi";
import Router from "next/router";
import localStoreUtil from "@redux/Api/localstore.util";

export const getClient: any = createAsyncThunk(
  "getClient",
  async (body: any) => {
    return ApiGetNoAuth(ApiUrlPersona, api.GetClient, {}).then(
      (res: any) => res?.data
    );
  }
);

export const getRequisitionTranType: any = createAsyncThunk(
  "getRequisitionTranType",
  async (body: any) => {
    return ApiGetNoAuth(ApiUrlCommon, api.GetRequisitionTranType, {}).then(
      (res: any) => res?.data
    );
  }
);

export const getJobTitleByClientId: any = createAsyncThunk(
  "getJobTitleByClientId",
  async (body: any) => {
    return ApiGetNoAuth(
      ApiUrlRequisition,
      api.GetJobTitleByClientId + body,
      {}
    ).then((res: any) => res?.data);
  }
);
export const getJdByClientCodeAndJobTitle: any = createAsyncThunk(
  "getJdByClientCodeAndJobTitle",
  async (body: any) => {
    return ApiGetNoAuth(
      ApiUrlRequisition,
      api.GetJdByClientCodeAndJobTitle + body,
      {}
    ).then((res: any) => res?.data);
  }
);

export const getCreateRequisition: any = createAsyncThunk(
  "CreateRequisition",
  async (formData: any) => {
    return ApiPostNoAuth(ApiUrlRequisition, api.CreateRequisition, formData).then(
      (res: any) => {
        return res?.data
      }
    );
  }
);

export const getUpdateRequisitionBasicDetail: any = createAsyncThunk(
  "UpdateRequisitionBasicDetail",
  async (formData: any) => {
    return ApiPostNoAuth(ApiUrlRequisition, api.UpdateRequisitionBasicDetail, formData).then(
      (res: any) => {
        localStoreUtil.store_data("requisitionData", res?.data);
        return res?.data
      }
    );
  }
);

export const updateScreeningQuestion: any = createAsyncThunk(
  "UpdateScreeningQuestion",
  async (body: any) => {
    return ApiPostNoAuth(
      ApiUrlRequisition,
      api.UpdateScreeningQuestion,
      body
    ).then((res: any) => res?.data);
  }
);
export const finalizeRequisition: any = createAsyncThunk(
  "FinalizeRequisition",
  async (body: any) => {
    return ApiPostNoAuth(
      ApiUrlRequisition,
      api.FinalizeRequisition,
      body
    ).then((res: any) => res?.data);
  }
);

export const updateRequisitionMatrix: any = createAsyncThunk(
  "UpdateRequisitionMatrix",
  async (body: any) => {
    return ApiPostNoAuth(
      ApiUrlRequisition,
      api.UpdateRequisitionMatrix,
      body
    ).then((res: any) => {
      console.log(res?.data, "res?.data res?.data");
      return res?.data;
    });
  }
);

export const getAllLanguageMaster: any = createAsyncThunk(
  "getAllLanguageMaster",
  async (body: any) => {
    return ApiGetNoAuth(ApiUrlCommon, api.GetAllLanguageMaster, {}).then(
      (res: any) => res?.data
    );
  }
);
export const getAllSkillMaster: any = createAsyncThunk(
  "getAllSkillMaster",
  async (body: any) => {
    return ApiGetNoAuth(ApiUrlCommon, api.GetAllSkillMaster, {}).then(
      (res: any) => res?.data
    );
  }
);
export const getUpdateRnRDetails: any = createAsyncThunk(
  "getUpdateRnRDetails",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlRequisition, api.GetUpdateRnRDetails, body).then(
      (res: any) => res?.data
    );
  }
);
export const updateVideoResumeDetails: any = createAsyncThunk(
  "updateVideoResumeDetails",
  async (body: any) => {
    return ApiPostNoAuth(
      ApiUrlRequisition,
      api.UpdateVideoResumeDetails,
      body
    ).then((res: any) => res?.data);
  }
);
export const UpdateCompensation: any = createAsyncThunk(
  "UpdateCompensation",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlRequisition, api.UpdateCompensation, body).then(
      (res: any) => res?.data
    );
  }
);

export const getCategoryList: any = createAsyncThunk(
  "getCategoryList",
  async (body: any) => {
    return ApiGetNoAuth(ApiUrlRequisition, api.GetCategoryList + body, {}).then(
      (res: any) => res?.data
    );
  }
);

export const getQuizList: any = createAsyncThunk(
  "getQuizList",
  async (body: any) => {
    return ApiGetNoAuth(ApiUrlRequisition, api.GetQuizList + body, {}).then(
      (res: any) => res?.data
    );
  }
);

export const getRequisitionDetail: any = createAsyncThunk(
  "GetRequisitionDetail",
  async (body: any) => {
    return ApiGetNoAuth(ApiUrlCommon, api.GetRequisitionDetail + body, {}).then(
      (res: any) => res?.data
    );
  }
);
export const getAllQualificationMaster: any = createAsyncThunk(
  "getAllQualificationMaster",
  async (body: any) => {
    return ApiGetNoAuth(ApiUrlCommon, api.GetAllQualificationMaster, {}).then(
      (res: any) => res?.data
    );
  }
);
export const createCategory: any = createAsyncThunk(
  "createCategory",
  async (body: any) => {
    console.log("body", body);

    return ApiPostNoAuth(ApiUrlRequisition, api.CreateCategory, body).then(
      (res: any) => res?.data
    );
  }
);
export const createRequisitionWithJdParsing: any = createAsyncThunk(
  "CreateRequisitionWithJdParsing",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlRequisition, api.CreateRequisitionWithJdParsing, body).then(
      (res: any) => res?.data
    );
  }
);
export const UpdateRequisitionWithJdParsing: any = createAsyncThunk(
  "UpdateRequisitionWithJdParsing",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlRequisition, api.UpdateRequisitionWithJdParsing, body).then(
      (res: any) => res?.data
    );
  }
);

export const UploadOtherAttachment: any = createAsyncThunk(
  "UploadOtherAttachment",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlRequisition, api.UploadOtherAttachment, body).then(
      (res: any) => res?.data
    );
  }
);


