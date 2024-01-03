import { createSlice, combineReducers } from "@reduxjs/toolkit";
import { createRequisitionWithJdParsing, getAllLanguageMaster, getAllQualificationMaster, getAllSkillMaster, getCategoryList, getClient, getCreateRequisition, getJobTitleByClientId, getQuizList, getRequisitionTranType } from "../Actions/Client";
import { getGetRequisitionDetail } from "../Actions/PartnerRequisition";

const initialState = {
  clientList: [],
  requisitionTranTypeList: [],
  languageList: [],
  skillList: [],
  categoryList: [],
  AllQualificationMasterList: [],
  requistionData: [],
  quizList: [],
  getJobTitle: []
};

export let GetClientSlice: any = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getClient.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(getClient.fulfilled, (state: any, { payload }: any) => {
      state.clientList = payload;
      state.status = "success";
    });
    builder.addCase(getClient.rejected, (state: any, { payload }: any) => {
      state.lists = payload;
      state.status = "failed";
    });
  },
});

export let GetRequisitionTranTypeSlice: any = createSlice({
  name: "requisitionTranType",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getRequisitionTranType.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(getRequisitionTranType.fulfilled, (state: any, { payload }: any) => {
      state.requisitionTranTypeList = payload;
      state.status = "success";
    });
    builder.addCase(getRequisitionTranType.rejected, (state: any, { payload }: any) => {
      state.lists = payload;
      state.status = "failed";
    });
  },
});

export let GetJobTitleByClientId: any = createSlice({
  name: "jobTitleByClientId",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getJobTitleByClientId.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(getJobTitleByClientId.fulfilled, (state: any, { payload }: any) => {
      state.getJobTitle = payload;
      state.status = "success";
    });
    builder.addCase(getJobTitleByClientId.rejected, (state: any, { payload }: any) => {
      state.lists = payload;
      state.status = "failed";
    });
  },
});


export let GetAllLanguageMaster: any = createSlice({
  name: "requisitionTranType",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getAllLanguageMaster.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(getAllLanguageMaster.fulfilled, (state: any, { payload }: any) => {
      state.languageList = payload;
      state.status = "success";
    });
    builder.addCase(getAllLanguageMaster.rejected, (state: any, { payload }: any) => {
      state.lists = payload;
      state.status = "failed";
    });
  },
});

export let GetAllSkillMaster: any = createSlice({
  name: "requisitionTranType",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getAllSkillMaster.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(getAllSkillMaster.fulfilled, (state: any, { payload }: any) => {
      state.skillList = payload;
      state.status = "success";
    });
    builder.addCase(getAllSkillMaster.rejected, (state: any, { payload }: any) => {
      state.lists = payload;
      state.status = "failed";
    });
  },
});
export let GetCategoryList: any = createSlice({
  name: "requisitionTranType",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getCategoryList.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(getCategoryList.fulfilled, (state: any, { payload }: any) => {
      state.categoryList = payload;
      state.status = "success";
    });
    builder.addCase(getCategoryList.rejected, (state: any, { payload }: any) => {
      state.lists = payload;
      state.status = "failed";
    });
  },
});
export let GetQuizList: any = createSlice({
  name: "requisitionTranType",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getQuizList.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(getQuizList.fulfilled, (state: any, { payload }: any) => {
      state.QuizList = payload;
      state.status = "success";
    });
    builder.addCase(getQuizList.rejected, (state: any, { payload }: any) => {
      state.lists = payload;
      state.status = "failed";
    });
  },
});
export let GetAllQualificationMaster: any = createSlice({
  name: "requisitionTranType",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getAllQualificationMaster.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(getAllQualificationMaster.fulfilled, (state: any, { payload }: any) => {
      state.AllQualificationMasterList = payload;
      state.status = "success";
    });
    builder.addCase(getAllQualificationMaster.rejected, (state: any, { payload }: any) => {
      state.lists = payload;
      state.status = "failed";
    });
  },
});
export let GetCreateRequisition: any = createSlice({
  name: "requisitionTranType",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getCreateRequisition.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(getCreateRequisition.fulfilled, (state: any, { payload }: any) => {
      state.requistionData = payload;
      state.status = "success";
    });
    builder.addCase(getCreateRequisition.rejected, (state: any, { payload }: any) => {
      state.lists = payload;
      state.status = "failed";
    });
    builder.addCase(getGetRequisitionDetail.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(getGetRequisitionDetail.fulfilled, (state: any, { payload }: any) => {
      state.requistionData = payload;
      state.status = "success";
    });
    builder.addCase(getGetRequisitionDetail.rejected, (state: any, { payload }: any) => {
      state.lists = payload;
      state.status = "failed";
    });
    builder.addCase(createRequisitionWithJdParsing.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(createRequisitionWithJdParsing.fulfilled, (state: any, { payload }: any) => {
      state.requistionData = payload;
      state.status = "success";
    });
    builder.addCase(createRequisitionWithJdParsing.rejected, (state: any, { payload }: any) => {
      state.lists = payload;
      state.status = "failed";
    });
  },
});

export default combineReducers({
  isGetClient: GetClientSlice.reducer,
  isGetRequisitionTranType: GetRequisitionTranTypeSlice.reducer,
  isGetJobTitleByClientId: GetJobTitleByClientId.reducer,
  isGetAllLanguageMaster: GetAllLanguageMaster.reducer,
  isGetAllSkillMaster: GetAllSkillMaster.reducer,
  isGetCategoryList: GetCategoryList.reducer,
  isGetQuizList: GetQuizList.reducer,
  isGetCreateRequisition: GetCreateRequisition.reducer,
  isGetAllQualificationMaster: GetAllQualificationMaster.reducer
});
