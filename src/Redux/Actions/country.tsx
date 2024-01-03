import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, ApiUrlPersona, ApiUrlCommon } from "@api/Api/AuthApi";
import { ApiGetNoAuth, ApiPostNoAuth } from "@api/Api/CommonApi";
import Router from "next/router";


export const getCountry: any = createAsyncThunk(
    "GetCountryDetail",
    async () => {
      return ApiGetNoAuth(ApiUrlCommon, api.GetCountry, {}).then(
        (res: any) => res?.data
      );
    }
  );

export const getState: any = createAsyncThunk(
    "GetStateDetail",
    async (body:any) => {
      return ApiGetNoAuth(ApiUrlCommon, api.GetState + body, {}).then(
        (res: any) => res?.data
      );
    }
  );
export const getCity: any = createAsyncThunk(
    "GetCityDetail",
    async (body:any) => {
      return ApiGetNoAuth(ApiUrlCommon, api.GetCity + body, {}).then(
        (res: any) => res?.data
      );
    }
  );
  
export const getBanks: any = createAsyncThunk(
    "GetBanksDetail",
    async (body:any) => {
      return ApiGetNoAuth(ApiUrlCommon, api.GetBanks, {}).then(
        (res: any) => res?.data
      );
    }
  );
  