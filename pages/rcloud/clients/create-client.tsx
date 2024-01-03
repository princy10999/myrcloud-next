import React from "react";
import StandardLayout from "@components/Layout/StandardLayout";
import ToastMessage from "@components/common/ToastMessage";
import CreateRequisition from "@components/create-requisitions";
import CreateClientStepper from "@components/create-client/createClientStepper";

export default function Create_Requisition({ menuCode }: any) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<any>("");
  const [errorType, setErrorType] = React.useState<any>("");
  return (
    <>
      <ToastMessage
        open={open}
        message={toastMessage}
        handleClose={() => setOpen(false)}
        severity={errorType}
      />
      <CreateClientStepper />
    </>
  );
}
