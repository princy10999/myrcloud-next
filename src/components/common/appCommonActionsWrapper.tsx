import React from "react";
import CustomSnackBar from "./customSnackBar";
import FullWidthLoader from "./FullWidthLoader";

import { useAppSelector } from "@redux/Redux/app/hooks";
export default function AppCommonActionsWrapper() {
  const fullPageLoaderOpen = useAppSelector(
    (state) => state?.app?.common?.fullPageLoaderOpen
  );
  return (
    <>
      <FullWidthLoader open={fullPageLoaderOpen} />
      <CustomSnackBar />
    </>
  );
}
