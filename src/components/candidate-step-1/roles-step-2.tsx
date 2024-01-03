import React from "react";
import { Typography, Box } from "@mui/material";
import TextEditor from "@components/common/TextEditor";
import { IconWrapper } from "@components/common/customSvgIcon";
import ButtonText from "@components/Layout/ButtonText";
import { getUpdateRnRDetails } from "@redux/Redux/Actions/Client";
import { useDispatch } from "react-redux";
import { responseEnum } from "@lib/enum";
import ToastMessage from "@components/common/ToastMessage";
import localStoreUtil from "@redux/Api/localstore.util";
import { useAppSelector } from "@redux/Redux/app/hooks";
import StyledAccordian from "@components/common/styledAccordian";
import StyledAccordianSummary from "@components/common/styledAccordianSummary";
import StyledAccordianDetails from "@components/common/styledAccordianDetail";
import ErrorHandler from "@lib/errorHandler";
import useSnackBar from "@redux/hooks/useSnackBar";
import ButtonOutlined from "@components/Layout/ButtonOutlined";

export default function RolesStep({ editRequisitionData }: any) {
  //Hooks
  const dispatch = useDispatch();
  const { setSnackBar } = useSnackBar();

  //State
  const [generalRemaks, setGeneralRemaks] = React.useState<any>("");
  const [kra, setKra] = React.useState<any>("");
  const [kpi, setKpi] = React.useState<any>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [data, setData] = React.useState<any>({});
  const requisitionData = useAppSelector(
    (state: any) => state?.client?.isGetCreateRequisition?.requistionData
  );

  //Handler
  const onEditorChange = async (event: any) => {
    setKra(event);
  };
  const onEditorChange1 = async (event: any) => {
    setKpi(event);
  };
  const onEditorChange2 = async (event: any) => {
    setGeneralRemaks(event);
  };

  const createRequisition = async () => {
    try {
      setLoading(true);
      const body = {
        kra: kra,
        kpi: kpi,
        generalRemaks: generalRemaks,
        requisitionId: data?.requisitionId,
      };
      const roleResponsibility = await dispatch(getUpdateRnRDetails(body));
      let error = await ErrorHandler(roleResponsibility, setSnackBar);

      if (error) {
        setSnackBar("success", "Role & Responsiblities update successfully.");
        setLoading(false);
      } else {
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setSnackBar("error", "Something went wrong !");
      setLoading(false);
    }
  };

  const handleAccordion =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      if (data?.requisitionId) {
        setExpanded(newExpanded ? panel : false);
      }
    };

  React.useEffect(() => {
    if (requisitionData) {
      setData(requisitionData?.data);
    }
  }, [requisitionData]);
  React.useEffect(() => {
    if (editRequisitionData) {
      setData(editRequisitionData);
    }
  }, [editRequisitionData]);

  return (
    <>
      <Box marginBottom={1.5}>
        <StyledAccordian
          expanded={expanded === "panel2"}
          onChange={handleAccordion("panel2")}
        >
          <StyledAccordianSummary
            expandIcon={<IconWrapper fontSize="11px" icon="down" />}
            aria-controls="panel1a-content"
            id="panel2"
          >
            <Typography fontWeight={"inherit"}>
              Roles & Responsibities
            </Typography>
          </StyledAccordianSummary>
          <StyledAccordianDetails>
            <TextEditor
              category={"Responsiblities"}
              onChange={(value: any) => onEditorChange(value)}
              defaultValue={data?.jd?.rnR?.kpiHtml}
            />
            <TextEditor
              category={"KRAs and KPIs"}
              onChange={(value: any) => onEditorChange1(value)}
              defaultValue={data?.jd?.rnR?.kraHtml}
            />
            <TextEditor
              category={"Success Tips/General Remarks"}
              onChange={(value: any) => onEditorChange2(value)}
              defaultValue={data?.jd?.rnR?.generalRemaksHtml}
            />
            <Box display="flex" justifyContent={"flex-end"} marginTop={5}>
              <ButtonOutlined
                text={"Save"}
                width="auto"
                height="35px"
                borderRadius={5}
                onClick={createRequisition}
                loading={loading}
              />
            </Box>
          </StyledAccordianDetails>
        </StyledAccordian>
      </Box>
    </>
  );
}
