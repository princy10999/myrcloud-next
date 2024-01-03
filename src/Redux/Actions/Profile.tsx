import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGetNoAuth, ApiPostNoAuth } from "@api/Api/CommonApi";
import { api, ApiUrlPersona, ApiUrlCommon } from "@api/Api/AuthApi";
import Router from "next/router";

export const getPartnerUploadedDocumentSelf: any = createAsyncThunk(
  "GetPersonaWiseDocument",
  async (body: any) => {
    return ApiGetNoAuth(
      ApiUrlCommon,
      api.GetPartnerUploadedDocumentSelf + body,
      {}
    ).then((res: any) => res?.data);
  }
);
export const getPartnerUploadedDocumentSelfPersona: any = createAsyncThunk(
  "GetPersonaWiseDocumenttParsona",
  async (body: any) => {
    return ApiGetNoAuth(
      ApiUrlPersona,
      api.GetPartnerUploadedDocumentSelfPersona,
      {}
    ).then((res: any) => res?.data);
  }
);
export const getPartnerUploadedDocument: any = createAsyncThunk(
  "GetPartnerUploadedDocument",
  async (body: any) => {
    return ApiGetNoAuth(
      ApiUrlPersona,
      api.GetPartnerUploadedDocument + body,
      {}
    ).then((res: any) => res?.data);
  }
);
export const UploadPartnerDocumentSelf: any = createAsyncThunk(
  "UploadPartnerDocumentSelf",
  async (body: any) => {
    return ApiPostNoAuth(
      ApiUrlPersona,
      api.UploadPartnerDocumentSelf,
      body
    ).then((res: any) => {
      res?.data;
    });
  }
);
export const DeletePartnerDocumentSelf: any = createAsyncThunk(
  "UploadPartnerDocumentSelf",
  async (body: any) => {
    return ApiPostNoAuth(
      ApiUrlPersona,
      api.DeletePartnerDocumentSelf,
      body
    ).then((res: any) => {
      res?.data;
    });
  }
);
