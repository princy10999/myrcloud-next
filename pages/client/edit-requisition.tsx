import React, { useEffect } from "react";
import StandardLayout from "@components/Layout/StandardLayout";
import ToastMessage from "@components/common/ToastMessage";
import CreateRequisition from "@components/create-requisitions";
import { useRouter } from "next/router";
import { getGetRequisitionDetail } from "@redux/Redux/Actions/PartnerRequisition";
import { useDispatch } from "react-redux";


export default function Edit_Requisition({ menuCode }: any) {
    const dispatch = useDispatch();
    const router = useRouter();
    const requisitionId = router?.asPath.split('=')[1];
    const [data, setData] = React.useState<any>([])
    const [open, setOpen] = React.useState<boolean>(false);
    const [toastMessage, setToastMessage] = React.useState<any>("");
    const [errorType, setErrorType] = React.useState<any>("");

    useEffect(() => {
        if (requisitionId) {
            (async () => {
                const body = `?RequisitionId=${requisitionId}`;
                const response = await dispatch(getGetRequisitionDetail(body));
                setData(response?.payload?.data)
            })();
        }
    }, [requisitionId]);
    return (
        <StandardLayout title="Create Requisitions" menuCode={menuCode || "rcloud"}>
            <ToastMessage
                open={open}
                message={toastMessage}
                handleClose={() => setOpen(false)}
                severity={errorType}
            />
            <CreateRequisition data={data} />
        </StandardLayout>
    );
}
