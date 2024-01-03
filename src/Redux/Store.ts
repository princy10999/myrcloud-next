import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "@redux/Redux/Auth/AuthSlice";
import ClientSlice from "./Auth/ClientSlice";
import PartnerSlice from "./Auth/PartnerSlice";
import AppSlice from "./CommonApp/appSlice";
import RcloudSlice from "./Auth/RcloudSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    client: ClientSlice,
    partner: PartnerSlice,
    app: AppSlice,
    rcloud: RcloudSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
