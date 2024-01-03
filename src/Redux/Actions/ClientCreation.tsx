import { api, ApiUrlAggregator, ApiUrlPersona } from "@redux/Api/AuthApi";
import { ApiGetNoAuth, ApiPostNoAuth } from "@redux/Api/CommonApi";
import localStoreUtil from "@redux/Api/localstore.util";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createClient: any = createAsyncThunk(
  "CreateClient",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlPersona, api.CreateClient, body)
      .then((res: any) => {
        localStoreUtil.store_data("clientId", res?.data?.data?.clientId);
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const updateBasicDetails: any = createAsyncThunk(
    "updateBasicDetails",
    async (body: any) => {
      return ApiPostNoAuth(ApiUrlPersona, api.UpdateBasicDetailByAdmin, body)
        .then((res: any) => {
          return res?.data;
        })
        .catch((err) => err);
    }
  );

export const updateSpoc: any = createAsyncThunk(
  "UpdateSpoc",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlPersona, api.UpdateSpokePerson, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const updateContractInfo: any = createAsyncThunk(
  "UpdateContractInfo",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlPersona, api.UpdateContractInformation, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const uploadClientDocument: any = createAsyncThunk(
  "UploadClientDocument",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlPersona, api.UploadClientDocument, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const updateClientAllocation: any = createAsyncThunk(
  "UpdateClientAllocation",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlPersona, api.UpdateClientAllocation, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const clientDetailById: any = createAsyncThunk(
  "CreateClient",
  async (body: any) => {
    return ApiGetNoAuth(ApiUrlPersona, api.ClientDetailById + body, {}).then(
      (res: any) => res?.data
    );
  }
);

export const uploadClientLogo: any = createAsyncThunk(
  "uploadClientLogo",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlPersona, api.UploadClientLogo, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const getAllClients: any = createAsyncThunk(
  "getAllClientList",
  async (body: any) => {
    return ApiGetNoAuth(ApiUrlAggregator, api.GetAllClientList + body, {}).then(
      (res: any) => res?.data
    );
  }
);