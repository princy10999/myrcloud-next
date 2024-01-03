import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, ApiUrlPersona, ApiUrlAuth, LOGIN_TOKEN } from "@api/Api/AuthApi";
import { setToken } from "@api/Api/ClientHelper";
import { ApiPostNoAuth } from "@api/Api/CommonApi";
import localStorage from "@api/Api/localstore.util";
// Auth User Actions
export const signUpPartner: any = createAsyncThunk(
  "PartnerSignup",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlPersona, api.PartnerSignup, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
export const partnerSignupByPSM: any = createAsyncThunk(
  "PartnerSignupByPSM",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlPersona, api.PartnerSignupByPSM, body)
      .then((res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const verifyUserAccount: any = createAsyncThunk(
  "VerifyUserAccount",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlAuth, api.VerifyUserAccount, body)
      .then((res: any) => res?.data)
      .catch((err) => err);
  }
);

export const createPassword: any = createAsyncThunk(
  "CreatePassword",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlAuth, api.CreatePassword, body)
      .then((res: any) => res?.data)
      .catch((err) => err);
  }
);

export const forgotPassword: any = createAsyncThunk(
  "ForgotPassword",
  async (body: any) => {
    return ApiPostNoAuth(ApiUrlAuth, api.ForgotPassword, body)
      .then((res: any) => res?.data)
      .catch((err) => err);
  }
);

export const userLogin: any = createAsyncThunk(
  "UserLogin",
  async (body: any) => {
    return await ApiPostNoAuth(ApiUrlAuth, api.UserLogin, body)
      .then(async (res: any) => {
        if (res?.data?.data) {
          await setToken(res?.data?.data?.jwt);
          await localStorage.store_data(LOGIN_TOKEN, res?.data?.data?.jwt);
        }
        return res?.data;
      })
      .catch((err) => err);
  }
);

export const resendVerificationLink: any = createAsyncThunk(
  "ResendVerificationLink",
  async (body: any) => {
    return await ApiPostNoAuth(ApiUrlAuth, api.ResendVerificationLink, body)
      .then(async (res: any) => {
        return res?.data;
      })
      .catch((err) => err);
  }
);
