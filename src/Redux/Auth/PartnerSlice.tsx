import { createSlice, combineReducers } from "@reduxjs/toolkit";
import {
  createCandidate,
  createResume,
  getAllMaritalStatus,
  getAllNationalities,
  getCandidateAdditionalDetails,
  getCandidateDetails,
  getCandidateJobExperience,
  getCandidateUploadedDocument,
  getGenders,
} from "../Actions/Candidate";
import {
  getAcceptRequisitionList,
  getGetRequisitionDetail,
  getPublishedRequisitionForPartner,
  getRejectRequisitionList,
  getDraftRequisitionList,
} from "../Actions/PartnerRequisition";

import { getPartnerDetails } from "../Actions/Partners";

const initialState = {
  publishRequisition: [],
  acceptRequisition: [],
  rejectRequisition: [],
  requisitionDetails: [],
  getAllMaritalStatusList: [],
  getGendersList: [],
  getAllNationalitiesList: [],
  createCandidateData: [],
  createCandidateResumeData: [],
  getCandidateUploadedDocumentData: [],
  getCandidateAdditionalDetailsData: [],
  getCandidateDetailsData: [],
  getCandidateJobExperienceData: [],
};

export let GetPublishedRequisitionForPartner: any = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getPublishedRequisitionForPartner.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      getPublishedRequisitionForPartner.fulfilled,
      (state: any, { payload }: any) => {
        state.publishRequisition = payload?.requisitions || [];
        state.publishRequisitionCount = payload?.requisitionCount || 0;
        state.status = "success";
      }
    );
    builder.addCase(
      getPublishedRequisitionForPartner.rejected,
      (state: any, { payload }: any) => {
        state.publishRequisition = [];
        state.publishRequisitionCount = 0;
        state.status = "failed";
      }
    );
  },
});

export let GetRejectRequisitionList: any = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getRejectRequisitionList.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      getRejectRequisitionList.fulfilled,
      (state: any, { payload }: any) => {
        state.rejectRequisition = payload?.requisitions || [];
        state.rejectRequisitionCount = payload?.requisitionCount || 0;
        state.status = "success";
      }
    );
    builder.addCase(
      getRejectRequisitionList.rejected,
      (state: any, { payload }: any) => {
        state.rejectRequisition = [];
        state.rejectRequisitionCount = 0;
        state.status = "failed";
      }
    );
  },
});

export let GetAcceptRequisitionList: any = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getAcceptRequisitionList.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      getAcceptRequisitionList.fulfilled,
      (state: any, { payload }: any) => {
        state.acceptRequisition = payload?.requisitions || [];
        state.acceptRequisitionCount = payload?.requisitionCount || 0;
        state.status = "success";
      }
    );
    builder.addCase(
      getAcceptRequisitionList.rejected,
      (state: any, { payload }: any) => {
        state.acceptRequisition = [];
        state.acceptRequisitionCount = 0;
        state.status = "failed";
      }
    );
  },
});

export let GetRequisitionDetail: any = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getGetRequisitionDetail.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      getGetRequisitionDetail.fulfilled,
      (state: any, { payload }: any) => {
        state.requisitionDetails = payload;
        state.status = "success";
      }
    );
    builder.addCase(
      getGetRequisitionDetail.rejected,
      (state: any, { payload }: any) => {
        state.requisitionDetails = payload;
        state.status = "failed";
      }
    );
  },
});
export let GetAllMaritalStatus: any = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getAllMaritalStatus.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      getAllMaritalStatus.fulfilled,
      (state: any, { payload }: any) => {
        state.getAllMaritalStatusList = payload;
        state.status = "success";
      }
    );
    builder.addCase(
      getAllMaritalStatus.rejected,
      (state: any, { payload }: any) => {
        state.requisitionDetails = payload;
        state.status = "failed";
      }
    );
  },
});
export let GetAllNationalities: any = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getAllNationalities.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      getAllNationalities.fulfilled,
      (state: any, { payload }: any) => {
        state.getAllNationalitiesList = payload;
        state.status = "success";
      }
    );
    builder.addCase(
      getAllNationalities.rejected,
      (state: any, { payload }: any) => {
        state.requisitionDetails = payload;
        state.status = "failed";
      }
    );
  },
});
export let GetGenders: any = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getGenders.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(getGenders.fulfilled, (state: any, { payload }: any) => {
      state.getGendersList = payload;
      state.status = "success";
    });
    builder.addCase(getGenders.rejected, (state: any, { payload }: any) => {
      state.requisitionDetails = payload;
      state.status = "failed";
    });
  },
});
export let CreateCandidate: any = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(createCandidate.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      createCandidate.fulfilled,
      (state: any, { payload }: any) => {
        state.createCandidateResumeData = payload;
        state.status = "success";
      }
    );
    builder.addCase(
      createCandidate.rejected,
      (state: any, { payload }: any) => {
        state.requisitionDetails = payload;
        state.status = "failed";
      }
    );
  },
});
export let CreateResume: any = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(createResume.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      createResume.fulfilled,
      (state: any, { payload }: any) => {
        state.createCandidateData = payload;
        state.status = "success";
      }
    );
    builder.addCase(
      createResume.rejected,
      (state: any, { payload }: any) => {
        state.requisitionDetails = payload;
        state.status = "failed";
      }
    );
  },
});
export let GetCandidateUploadedDocument: any = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getCandidateUploadedDocument.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      getCandidateUploadedDocument.fulfilled,
      (state: any, { payload }: any) => {
        state.getCandidateUploadedDocumentData = payload;
        state.status = "success";
      }
    );
    builder.addCase(
      getCandidateUploadedDocument.rejected,
      (state: any, { payload }: any) => {
        state.requisitionDetails = payload;
        state.status = "failed";
      }
    );
  },
});
export let GetCandidateAdditionalDetails: any = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getCandidateAdditionalDetails.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      getCandidateAdditionalDetails.fulfilled,
      (state: any, { payload }: any) => {
        state.getCandidateAdditionalDetailsData = payload;
        state.status = "success";
      }
    );
    builder.addCase(
      getCandidateAdditionalDetails.rejected,
      (state: any, { payload }: any) => {
        state.requisitionDetails = payload;
        state.status = "failed";
      }
    );
  },
});
export let GetCandidateDetails: any = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getCandidateDetails.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      getCandidateDetails.fulfilled,
      (state: any, { payload }: any) => {
        state.getCandidateDetailsData = payload;
        state.status = "success";
      }
    );
    builder.addCase(
      getCandidateDetails.rejected,
      (state: any, { payload }: any) => {
        state.requisitionDetails = payload;
        state.status = "failed";
      }
    );
  },
});

export let GetDraftRequisitionList: any = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getDraftRequisitionList.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      getDraftRequisitionList.fulfilled,
      (state: any, { payload }: any) => {
        state.requisitionCount = payload?.requisitionCount;
        state.draftedRequisition = payload?.requisitions;
        state.status = "success";
      }
    );
    builder.addCase(
      getDraftRequisitionList.rejected,
      (state: any, { payload }: any) => {
        state.requisitionCount = 0;
        state.draftedRequisition = [];
        state.status = "failed";
      }
    );
  },
});

export let GetPartnerDetail: any = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getPartnerDetails.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      getPartnerDetails.fulfilled,
      (state: any, { payload }: any) => {
        state.partnerDetails = payload?.data || {};
        state.status = "success";
      }
    );
    builder.addCase(
      getPartnerDetails.rejected,
      (state: any, { payload }: any) => {
        state.partnerDetails = {};
        state.status = "failed";
      }
    );
  },
});
export let GetCandidateJobExperience: any = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getCandidateJobExperience.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      getCandidateJobExperience.fulfilled,
      (state: any, { payload }: any) => {
        state.getCandidateJobExperienceData = payload?.data || {};
        state.status = "success";
      }
    );
    builder.addCase(
      getCandidateJobExperience.rejected,
      (state: any, { payload }: any) => {
        state.partnerDetails = {};
        state.status = "failed";
      }
    );
  },
});

export default combineReducers({
  isGetPublishedRequisitionForPartner:
    GetPublishedRequisitionForPartner.reducer,
  isGetRejectRequisitionList: GetRejectRequisitionList.reducer,
  isGetAcceptRequisitionList: GetAcceptRequisitionList.reducer,
  isGetDraftRequisitionList: GetDraftRequisitionList.reducer,
  // isGetRequisitionDetail: GetRequisitionDetail.reducer,
  isGetAllMaritalStatus: GetAllMaritalStatus.reducer,
  isGetAllNationalities: GetAllNationalities.reducer,
  isGetGenders: GetGenders.reducer,
  isCreateCandidate: CreateCandidate.reducer,
  isCreateResume: CreateResume.reducer,
  isGetCandidateUploadedDocument: GetCandidateUploadedDocument.reducer,
  isGetCandidateAdditionalDetails: GetCandidateAdditionalDetails.reducer,
  isGetCandidateDetails: GetCandidateDetails.reducer,
  isGetPartnerDetail: GetPartnerDetail.reducer,
  isGetCandidateJobExperience: GetCandidateJobExperience.reducer,
});
