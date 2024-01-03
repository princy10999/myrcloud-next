import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, ApiUrlRequisition } from "@api/Api/AuthApi";
import { ApiGetNoAuth, ApiPostNoAuth } from "@api/Api/CommonApi";

export const getPublishedRequisitionForPartner: any = createAsyncThunk(
  "getPublishedRequisitionForPartner",
  async (body: any) => {
    return ApiGetNoAuth(
      ApiUrlRequisition,
      api.PublishedRequisitionForPartner + body,
      {}
    ).then((res: any) => res?.data?.data);
  }
);

export const getRejectRequisitionList: any = createAsyncThunk(
  "getRejectRequisitionList",
  async (body: any) => {
    return ApiGetNoAuth(
      ApiUrlRequisition,
      api.AcceptRejectRequisitionList + body,
      {}
    ).then((res: any) => res?.data?.data);
  }
);

export const getAcceptRequisitionList: any = createAsyncThunk(
  "getAcceptRequisitionList",
  async (body: any) => {
    return ApiGetNoAuth(
      ApiUrlRequisition,
      api.AcceptRejectRequisitionList + body,
      {}
    ).then((res: any) => res?.data?.data);
  }
);

export const getDraftRequisitionList: any = createAsyncThunk(
  "getDraftRequisitionList",
  async (body: any) => {
    return ApiGetNoAuth(
      ApiUrlRequisition,
      api.GetDraftRequisitionList + body,
      {}
    ).then((res: any) => res?.data?.data);
  }
);

export const getGetRequisitionDetail: any = createAsyncThunk(
  "getGetRequisitionDetail",
  async (body: any) => {
    return ApiGetNoAuth(
      ApiUrlRequisition,
      api.GetRequisitionDetail + body,
      {}
    ).then((res: any) => res?.data);
  }
);
export const postAcceptRejectRequisition: any = createAsyncThunk(
  "postAcceptRejectRequisition",
  async (body: any) => {
    return ApiPostNoAuth(
      ApiUrlRequisition,
      api.AcceptRejectRequisition,
      body
    ).then((res: any) => res?.data);
  }
);
