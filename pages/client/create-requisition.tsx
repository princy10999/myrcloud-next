import React from "react";
import StandardLayout from "@components/Layout/StandardLayout";
import ToastMessage from "@components/common/ToastMessage";
import CreateRequisition from "@components/create-requisitions";

export default function Create_Requisition({ menuCode }: any) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<any>("");
  const [errorType, setErrorType] = React.useState<any>("");
  return (
    <StandardLayout title="Create Requisitions" menuCode={menuCode || "rcloud"} position="fixed" hasBottomBorder>
      <ToastMessage
        open={open}
        message={toastMessage}
        handleClose={() => setOpen(false)}
        severity={errorType}
      />
      <CreateRequisition />
    </StandardLayout>
  );
}
