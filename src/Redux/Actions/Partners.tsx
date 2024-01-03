import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, ApiUrlPersona, ApiUrlCommon } from "@api/Api/AuthApi";
import { ApiGetNoAuth, ApiPostNoAuth } from "@api/Api/CommonApi";
import Router from "next/router";

//Partner's Actions
export const getPartnerType: any = createAsyncThunk(
  "GetPartnerTypeList",
  async () => {
    return ApiPostNoAuth(ApiUrlPersona, api.GetPartnerTypeList, {}).then(
      (res: any) => res?.data?.data
    );
  }
);

export const getIndustryPreferenceList: any = createAsyncThunk(
  "GetIndustryPreferenceList",
  async (body: any) => {
    return ApiGetNoAuth(
      ApiUrlCommon,
      api.GetIndustryPreferenceList + body,
      {}
    ).then((res: any) => res?.data);
  }
);

export const getPartnerDetails: any = createAsyncThunk(
  "GetPartnerDetail",
  async () => {
    return ApiGetNoAuth(ApiUrlPersona, api.GetPartnerDetail, {}).then(
      (res: any) => res?.data
    );
  }
);

export const getPartnerDetailsById: any = createAsyncThunk(
  "GetPartnerDetailById",
  async (body: any) => {
    return ApiGetNoAuth(
      ApiUrlPersona,
      api.GetPartnerDetailById + body,
      {}
    ).then((res: any) => res?.data);
  }
);

export const getHiringExpertiseList: any = createAsyncThunk(
  "HiringExpertiseList",
  async () => {
    return ApiGetNoAuth(ApiUrlCommon, api.HiringExpertiseList, {}).then(
      (res: any) => res?.data
    );
  }
);

export const getRolePreferenceList: any = createAsyncThunk(
  "RolePreferenceList",
  async () => {
    return ApiGetNoAuth(ApiUrlCommon, api.RolePreferenceList, {}).then(
      (res: any) => res?.data
    );
  }
);
export const UpdateBasicInformationBySelf: any = createAsyncThunk(
  "UpdateBasicInformationBySelf",
  async (body: any) => {
    return ApiPostNoAuth(
      ApiUrlPersona,
      api.UpdateBasicInformationBySelf,
      body
    ).then((res: any) => {
      res?.data;
      if (res?.data?.code === 1) {
        Router.push("/profile/update-profile-step-2");
      }
    });
  }
);
export const UpdatePartnerComplianceInformationSelf: any = createAsyncThunk(
  "UpdatePartnerComplianceInformationSelf",
  async (body: any) => {
    return ApiPostNoAuth(
      ApiUrlPersona,
      api.UpdatePartnerComplianceInformationSelf,
      body
    ).then((res: any) => {
      res?.data;
      if (res?.data?.code === 1) {
        Router.push("/profile/upload-document-step-2");
      }
    });
  }
);

export const getPartnerComplianceInformationSelf: any = createAsyncThunk(
  "GetPartnerComplianceInformationSelf",
  async () => {
    return ApiGetNoAuth(
      ApiUrlPersona,
      api.GetPartnerComplianceInformationSelf,
      {}
    ).then((res: any) => res?.data);
  }
);

export const getPartnerComplianceInformation: any = createAsyncThunk(
  "GetPartnerComplianceInformation",
  async (body) => {
    return ApiGetNoAuth(
      ApiUrlPersona,
      api.GetPartnerComplianceInformation + body || "",
      {}
    ).then((res: any) => res?.data);
  }
);

export const getUnverifiedPartnerListForPSM: any = createAsyncThunk(
  "GetUnverifiedPartnerListForPSM",
  async (body: any) => {
    return ApiGetNoAuth(
      ApiUrlPersona,
      api.GetUnverifiedPartnerListForPSM + body,
      {}
    ).then((res: any) => res?.data);
  }
);

export const approvePartner: any = createAsyncThunk(
  "ApprovePartner",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlPersona, api.ApprovePartner, body).then(
      (res: any) => res?.data
    );
  }
);

export const getPartnerListForPSM: any = createAsyncThunk(
  "GetPartnerListForPSM",
  async (body: any) => {
    return ApiGetNoAuth(
      ApiUrlPersona,
      api.GetPartnerListForPSM + body,
      {}
    ).then((res: any) => res?.data);
  }
);

export const uploadPartnerLogo: any = createAsyncThunk(
  "UploadPartnerLogo",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlPersona, api.UploadPartnerLogo, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const updatePartnerPlacementFeeByPsm: any = createAsyncThunk(
  "UpdatePartnerPlacementFeeByPsm",
  async (body: any) => {
    return ApiPostNoAuth(
      ApiUrlPersona,
      api.UpdatePartnerPlacementFeeByPsm,
      body
    )
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
