import React, { useEffect } from "react";
import StandardLayout from "@components/Layout/StandardLayout";
import ToastMessage from "@components/common/ToastMessage";
import CreateRequisition from "@components/create-requisitions";
import { useRouter } from "next/router";
import { getGetRequisitionDetail } from "@redux/Redux/Actions/PartnerRequisition";
import { useDispatch } from "react-redux";
import { clientDetailById } from "@redux/Redux/Actions/ClientCreation";
import CreateClientStepper from "@components/create-client/createClientStepper";

export default function EditClient() {
  const dispatch = useDispatch();
  const router = useRouter();
    const clientId = router?.asPath.split("=")[1];
//   const clientId = "636caa6484066d6ed0eda9de";
  const [clientDetails, setClientDetails] = React.useState<any>({});
  const [open, setOpen] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<any>("");
  const [errorType, setErrorType] = React.useState<any>("");

  useEffect(() => {
    if (clientId) {
      (async () => {
        const body = `?ClientId=${clientId}`;
        await dispatch(clientDetailById(body));
      })();
    }
  }, [clientId]);
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
