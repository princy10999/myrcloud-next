import { createSlice, combineReducers } from "@reduxjs/toolkit";
import {
  createPassword,
  signUpPartner,
  userLogin,
  verifyUserAccount,
} from "@redux/Redux/Actions/AuthUser";
import { getPartnerDetails, getPartnerType } from "@redux/Redux/Actions/Partners";
import { getBanks, getCity, getCountry, getState } from "../Actions/country";
import { getPartnerUploadedDocumentSelf, getPartnerUploadedDocumentSelfPersona, UploadPartnerDocumentSelf } from "../Actions/Profile";

const initialState = {
  lists: [],
  userData: [],
  user: [],
  createPassword: [],
  partnerDetails: [],
  verfiedUser: {},
  status: "loading",
  country:[],
  state:[],
  city:[],
  banks:[],
  personaWiseDocument:[],
  personaWiseDocumentPersona:[],
  uploadDocument:[],
  count: 0 as any,
};

export let SignUpSlice: any = createSlice({
  name: "signUpPartner",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(signUpPartner.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(signUpPartner.fulfilled, (state: any, { payload }: any) => {
      state.lists = payload;
      state.status = "success";
    });
    builder.addCase(signUpPartner.rejected, (state: any, { payload }: any) => {
      state.lists = payload;
      state.status = "failed";
    });
  },
});

export let UserSlice: any = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getPartnerType.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      getPartnerType.fulfilled,
      (state: any, { payload }: any) => {
        state.userData = payload;
        state.status = "success";
      }
    );
    builder.addCase(getPartnerType.rejected, (state: any) => {
      state.status = "failed";
    });
  },
});

export let GetPartnerDetails: any = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getPartnerDetails.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      getPartnerDetails.fulfilled,
      (state: any, { payload }: any) => {
        console.log(payload, "success payload");
        state.partnerDetails = payload;
        state.status = "success";
      }
    );
    builder.addCase(
      getPartnerDetails.rejected,
      (state: any, { payload }: any) => {
        console.log(payload, "reject Payload");
        state.partnerDetails = payload;
        state.status = "failed";
      }
    );
  },
});
export let GetPersonaWiseDocument: any = createSlice({
  name: "personaWiseDocumentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getPartnerUploadedDocumentSelf.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      getPartnerUploadedDocumentSelf.fulfilled,
      (state: any, { payload }: any) => {
        console.log(payload, "success payload");
        state.personaWiseDocumentPersona = payload;
        state.status = "success";
      }
    );
    builder.addCase(
      getPartnerUploadedDocumentSelf.rejected,
      (state: any, { payload }: any) => {
        console.log(payload, "reject Payload");
        state.personaWiseDocumentPersona = payload;
        state.status = "failed";
      }
    );
  },
});
export let GetPersonaWiseDocumentSelfPersona: any = createSlice({
  name: "personaWiseDocumentParsonaSlice",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getPartnerUploadedDocumentSelfPersona.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      getPartnerUploadedDocumentSelfPersona.fulfilled,
      (state: any, { payload }: any) => {
        console.log(payload, "success payload");
        state.personaWiseDocument = payload;
        state.status = "success";
      }
    );
    builder.addCase(
      getPartnerUploadedDocumentSelfPersona.rejected,
      (state: any, { payload }: any) => {
        console.log(payload, "reject Payload");
        state.personaWiseDocument = payload;
        state.status = "failed";
      }
    );
  },
});
export let GetCountry: any = createSlice({
  name: "countrySlice",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getCountry.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      getCountry.fulfilled,
      (state: any, { payload }: any) => {
        console.log(payload, "success payload");
        state.country = payload;
        state.status = "success";
      }
    );
    builder.addCase(
      getCountry.rejected,
      (state: any, { payload }: any) => {
        console.log(payload, "reject Payload");
        state.country = payload;
        state.status = "failed";
      }
    );
  },
})
export let GetState: any = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getState.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      getState.fulfilled,
      (state: any, { payload }: any) => {
        console.log(payload, "success payload");
        state.state = payload;
        state.status = "success";
      }
    );
    builder.addCase(
      getState.rejected,
      (state: any, { payload }: any) => {
        console.log(payload, "reject Payload");
        state.state = payload;
        state.status = "failed";
      }
    );
  },
})
export let GetCity: any = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getCity.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      getCity.fulfilled,
      (state: any, { payload }: any) => {
        console.log(payload, "success payload");
        state.city = payload;
        state.status = "success";
      }
    );
    builder.addCase(
      getCity.rejected,
      (state: any, { payload }: any) => {
        console.log(payload, "reject Payload");
        state.city = payload;
        state.status = "failed";
      }
    );
  },
})
export let GetBanks: any = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getBanks.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      getBanks.fulfilled,
      (state: any, { payload }: any) => {
        console.log(payload, "success payload");
        state.banks = payload;
        state.status = "success";
      }
    );
    builder.addCase(
      getBanks.rejected,
      (state: any, { payload }: any) => {
        console.log(payload, "reject Payload");
        state.banks = payload;
        state.status = "failed";
      }
    );
  },
})

export let verfiyUserSlice: any = createSlice({
  name: "verfiyUserSlice",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(verifyUserAccount.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      verifyUserAccount.fulfilled,
      (state: any, { payload }: any) => {
        state.verfiedUser = payload;
        state.status = "success";
      }
    );
    builder.addCase(
      verifyUserAccount.rejected,
      (state: any, { payload }: any) => {
        state.verfiedUser = payload;
        state.status = "failed";
      }
    );
  },
});

export let createPasswordSlice: any = createSlice({
  name: "createPasswordSlice",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(createPassword.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(
      createPassword.fulfilled,
      (state: any, { payload }: any) => {
        state.createPassword = payload;
        state.status = "success";
      }
    );
    builder.addCase(createPassword.rejected, (state: any, { payload }: any) => {
      state.createPassword = payload;
      state.status = "failed";
    });
  },
});

export let userLoginSlice: any = createSlice({
  name: "userLoginSlice",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(userLogin.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(userLogin.fulfilled, (state: any, { payload }: any) => {
      state.user = payload;
      state.status = "success";
    });
    builder.addCase(userLogin.rejected, (state: any, { payload }: any) => {
      state.user = payload;
      state.status = "failed";
    });
  },
});
export let uploadDocumentSlice: any = createSlice({
  name: "uploadDocumentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(UploadPartnerDocumentSelf.pending, (state: any) => {
      state.uploadDocument = "loading";
    });
    builder.addCase(UploadPartnerDocumentSelf.fulfilled, (state: any, { payload }: any) => {
      state.user = payload;
      state.uploadDocument = "success";
      
    });
    builder.addCase(UploadPartnerDocumentSelf.rejected, (state: any, { payload }: any) => {
      state.user = payload;
      state.uploadDocument = "failed";
    });
  },
});

// Action creators are generated for each case reducer function
// export const {} = apiDemoSlice.actions;

export default combineReducers({
  isSignUpUser: SignUpSlice.reducer,
  IsPartnerType: UserSlice.reducer,
  IsUserVerfied: verfiyUserSlice.reducer,
  IsLogin: userLoginSlice.reducer,
  IspasswordSet: createPasswordSlice.reducer,
  IsPartnerDetailsSet: GetPartnerDetails.reducer,
  IsCountrySet: GetCountry.reducer,
  IsStateSet: GetState.reducer,
  IsCitySet: GetCity.reducer,
  IsBanksSet: GetBanks.reducer,
  IsPersonaWiseDocumentSet: GetPersonaWiseDocument.reducer,
  IsPersonaWiseDocumentParsonaSet: GetPersonaWiseDocumentSelfPersona.reducer,
  IsUploadDocumentSet: uploadDocumentSlice.reducer,
});
