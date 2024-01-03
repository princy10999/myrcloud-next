import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import DropDownComponent from "@components/Layout/DropDownComponent";
import { Grid } from "@mui/material";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import Chip from "@mui/material/Chip";
import RadioGroup from "@mui/material/RadioGroup";
import CheckBoxCircle from "@components/Layout/CheckBoxCircle";
import { IconWrapper } from "@components/common/customSvgIcon";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@redux/Redux/app/hooks";
import {
  getRequisitionTranType,
  updateRequisitionMatrix,
} from "@redux/Redux/Actions/Client";
import { responseEnum } from "@lib/enum";
import ButtonOutlined from "@components/Layout/ButtonOutlined";
import ToastMessage from "@components/common/ToastMessage";
import StyledAccordian from "@components/common/styledAccordian";
import StyledAccordianSummary from "@components/common/styledAccordianSummary";
import StyledAccordianDetails from "@components/common/styledAccordianDetail";
import ButtonText from "@components/Layout/ButtonText";
import useSnackBar from "@redux/hooks/useSnackBar";
import ErrorHandler from "@lib/errorHandler";

export default function Instruction({ editRequisitionData }: any) {
  //Hooks
  const theme = useTheme();
  const dispatch = useDispatch();
  const { setSnackBar } = useSnackBar();

  //State
  const [errors, setError] = React.useState<any>({});
  const [data1, setData1] = React.useState<any>({});
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [expanded, setExpanded] = React.useState<string | false>("panel18");
  const [selectLan, setSelectLan] = React.useState<any>([]);
  const [chipData, setChipData] = React.useState([]);
  const [chip, setChip] = React.useState([]);
  const requisitionData = useAppSelector(
    (state: any) => state?.client?.isGetCreateRequisition?.requistionData
  );

  const requisitionTranTypeList = useAppSelector(
    (state: any) =>
      state?.client?.isGetRequisitionTranType?.requisitionTranTypeList?.data
  );
  const workFrom = requisitionTranTypeList?.filter(
    (e: any) => e?.tranCode === "workfrom"
  );

  const requisitionPriority = requisitionTranTypeList?.filter(
    (e: any) => e?.tranCode === "requisitionpriority"
  );
  const requisitionClassification = requisitionTranTypeList?.filter(
    (e: any) => e?.tranCode === "requisitionclassification"
  );

  //Handler
  const handleChangeInput = (e: any) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleWorkFrom = (e: any) => {
    const { value, name } = e.target;
    const workFromChange = workFrom?.filter(
      (item: any) => item.value === value
    );
    setData({ ...data, work: workFromChange[0] });
  };

  const handleRequisitionPriority = (e: any) => {
    const { value, name } = e.target;
    const reqPriority = requisitionPriority?.filter(
      (item: any) => item.value === value
    );
    setData({ ...data, reqpriority: reqPriority[0] });
  };

  const handleRequisitionClassification = (e: any) => {
    const { value, name } = e.target;
    const reqClassification = requisitionClassification?.filter(
      (item: any) => item.value === value
    );
    setData({ ...data, reqclassification: reqClassification[0] });
  };
  const validateStep2 = () => {
    let errors: any = {};
    let formIsValid = true;

    if (!data?.work?.value) {
      formIsValid = false;
      errors["work"] = "* Please select work";
    }
    if (!data?.sourcingKeyword) {
      formIsValid = false;
      errors["sourcingKeyword"] = "* Please enter sourcing keyword";
    }
    if (!data?.idealCompanies) {
      formIsValid = false;
      errors["idealCompanies"] = "* Please select ideal companies";
    }
    if (!data?.mandatoryEducation) {
      formIsValid = false;
      errors["mandatoryEducation"] = "* Please select mandatory education";
    }
    if (!data?.noticePeriod) {
      formIsValid = false;
      errors["noticePeriod"] = "* Please select notice period";
    }
    setError(errors);
    return formIsValid;
  };

  const submitInstruction = async () => {
    if (validateStep2()) {
      setLoading(true);
      try {
        const body = {
          workFrom: {
            id: data?.work?.id,
            code: data?.work?.code,
            value: data?.work?.value,
          },
          priority: {
            id: data?.reqpriority?.id,
            code: data?.reqpriority?.code,
            value: data?.reqpriority?.value,
          },
          classification: {
            id: data?.reqclassification?.id,
            code: data?.reqclassification?.code,
            value: data?.reqclassification?.value,
          },
          sourcingKeyword: data?.sourcingKeyword,
          educationalRequirement: data?.mandatoryEducation,
          idealCompanyCandidates: data?.idealCompanies,
          idealCandidateDescription: data?.candidateDescription,
          requisitionId: data1?.requisitionId,
          noticePeriod: data?.noticePeriod,
        };
        const instruction = await dispatch(updateRequisitionMatrix(body));
        let error = await ErrorHandler(instruction, setSnackBar);

        if (error) {
          setSnackBar(
            "success",
            "Instruction Input Matrix update successfully."
          );
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setSnackBar("error", "Something went wrong !");
        setLoading(false);
      }
      setLoading(false);
    }
  };

  const handleAccordion =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  React.useEffect(() => {
    if (requisitionData) {
      setData1(requisitionData?.data);
    }
  }, [requisitionData]);
  React.useEffect(() => {
    if (editRequisitionData) {
      setData1(editRequisitionData);
    }
  }, [editRequisitionData]);
  React.useEffect(() => {
    dispatch(getRequisitionTranType());
  }, []);
  React.useEffect(() => {
    if (editRequisitionData) {
      setData({
        ...data,
        candidateDescription:
          editRequisitionData?.matrix?.idealCandidateDescription,
        idealCompanies: editRequisitionData?.matrix?.idealCompanyCandidates,
        mandatoryEducation: editRequisitionData?.matrix?.educationalRequirement,
        sourcingKeyword: editRequisitionData?.matrix?.sourcingKeyword,
        reqclassification: editRequisitionData?.matrix?.classification,
        reqpriority: editRequisitionData?.matrix?.priority,
        work: editRequisitionData?.matrix?.workFrom,
      });
      setSelectLan(editRequisitionData?.jd?.languages);
      setChip(editRequisitionData?.jd?.skills?.preferredSkill);
      setChipData(editRequisitionData?.jd?.skills?.requiredSkill);
    }
  }, [editRequisitionData]);

  return (
    <>
      <Box mb={1.5}>
        <StyledAccordian
          expanded={expanded === "panel14"}
          onChange={handleAccordion("panel14")}
        >
          <StyledAccordianSummary
            expandIcon={<IconWrapper fontSize="11px" icon="down" />}
            aria-controls="panel1a-content"
            id="panel14"
          >
            <Typography fontWeight={"inherit"}>
              Instruction Input Matrix (Review)
            </Typography>
          </StyledAccordianSummary>
          <StyledAccordianDetails>
            <Grid container spacing={2}>
              <Grid item md={4} xs={6} sm={6}>
                <DropDownComponent
                  text="Work From"
                  values={workFrom && workFrom?.map((e: any) => e?.value)}
                  width="100%"
                  valid
                  onChange={handleWorkFrom}
                  name="work"
                  value={data?.work?.value}
                  defaultValue={
                    data?.work?.value ? data?.work?.value : "Select work"
                  }
                  labelSize={"14px"}
                  labelColor={theme.palette.bgGray.main}
                />
                <Typography variant="body2" textAlign={"start"} color={"error"}>
                  {data?.work?.value?.length > 0 ? "" : errors["work"]}
                </Typography>
              </Grid>
              <Grid item md={4} xs={6} sm={6}>
                <DropDownComponent
                  text="Requisition Priority"
                  values={
                    requisitionPriority &&
                    requisitionPriority?.map((e: any) => e?.value)
                  }
                  width="100%"
                  name="requisitionPriority"
                  value={data?.reqpriority?.value}
                  onChange={handleRequisitionPriority}
                  labelSize={"14px"}
                  labelColor={theme.palette.bgGray.main}
                />
              </Grid>
              <Grid item md={4} xs={12} sm={12}>
                <DropDownComponent
                  text="Requisition Classification"
                  values={
                    requisitionClassification &&
                    requisitionClassification?.map((e: any) => e?.value)
                  }
                  width="100%"
                  name="requisitionClassification"
                  value={data?.reqclassification?.value}
                  onChange={handleRequisitionClassification}
                  labelSize={"14px"}
                  labelColor={theme.palette.bgGray.main}
                />
              </Grid>
              <Grid item md={4} xs={6} sm={6}>
                <TextFieldComponent
                  type="text"
                  width="100%"
                  name="sourcingKeyword"
                  value={data?.sourcingKeyword}
                  onChange={handleChangeInput}
                  text={"Sourcing Keywords"}
                  valid
                  labelSize={"14px"}
                  labelColor={theme.palette.bgGray.main}
                />
                <Typography variant="body2" textAlign={"start"} color={"error"}>
                  {data?.sourcingKeyword?.length > 0
                    ? ""
                    : errors["sourcingKeyword"]}
                </Typography>
              </Grid>
              <Grid item md={4} xs={6} sm={6}>
                <TextFieldComponent
                  type="text"
                  width="100%"
                  name="mandatoryEducation"
                  value={data?.mandatoryEducation}
                  onChange={handleChangeInput}
                  text="Mandatory Educational Requirement"
                  labelSize={"14px"}
                  labelColor={theme.palette.bgGray.main}
                  valid
                />
                <Typography variant="body2" textAlign={"start"} color={"error"}>
                  {data?.mandatoryEducation?.length > 0
                    ? ""
                    : errors["mandatoryEducation"]}
                </Typography>
              </Grid>
              <Grid item md={4} xs={12} sm={12}>
                <TextFieldComponent
                  type="text"
                  width="100%"
                  name="noticePeriod"
                  value={data?.noticePeriod}
                  onChange={handleChangeInput}
                  text="Notice Period"
                  labelSize={"14px"}
                  labelColor={theme.palette.bgGray.main}
                  valid
                />
                <Typography variant="body2" textAlign={"start"} color={"error"}>
                  {data?.noticePeriod?.length > 0 ? "" : errors["noticePeriod"]}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12} sm={12}>
                <TextFieldComponent
                  type="text"
                  width="100%"
                  name="idealCompanies"
                  value={data?.idealCompanies}
                  onChange={handleChangeInput}
                  text="Ideal Companies to be sourced from"
                  labelSize={"14px"}
                  labelColor={theme.palette.bgGray.main}
                  valid
                />
                <Typography variant="body2" textAlign={"start"} color={"error"}>
                  {data?.idealCompanies?.length > 0
                    ? ""
                    : errors["idealCompanies"]}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12} sm={12}>
                <TextFieldComponent
                  text="Who is an ideal candidate ?"
                  width="100%"
                  rows={1}
                  multiline
                  name="candidateDescription"
                  value={data?.candidateDescription}
                  onChange={handleChangeInput}
                  labelSize={"14px"}
                  labelColor={theme.palette.bgGray.main}
                />
              </Grid>
            </Grid>
            <Box>
              <Typography
                fontWeight={600}
                marginTop={2}
                mb={2}
                fontSize={"18px"}
              >
                Skills
              </Typography>
              <Typography
                marginBottom={2}
                color={(theme) => theme.palette.bgGray.main}
              >
                Technical Skills (Must Have)
              </Typography>
              <Box display="flex" flexWrap="wrap">
                {chipData.map((data: any, index: number) => {
                  return (
                    <Box key={index} gap={"10px"} paddingRight={1} marginBottom={1}>
                      <Chip
                        key={data}
                        color="primary"
                        variant="outlined"
                        label={data}
                      />
                    </Box>
                  );
                })}
              </Box>
              <Typography
                marginTop={2}
                marginBottom={2}
                color={(theme) => theme.palette.bgGray.main}
              >
                Other skills (Good to have)
              </Typography>
              <Box display="flex" flexWrap="wrap">
                {chip.map((data: any, index: number) => {
                  return (
                    <Box key={index} gap={"10px"} paddingRight={1} marginBottom={1}>
                      <Chip
                        key={data}
                        color="primary"
                        variant="outlined"
                        label={data}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Box>
              {" "}
              <Typography
                fontWeight={600}
                marginTop={3}
                mb={2}
                fontSize={"18px"}
              >
                Language Skills
              </Typography>
            </Box>

            <Typography
              marginTop={3}
              marginBottom={3}
              font-weight="400"
              font-size="12px"
              line-height="110%"
              color="#777777"
            >
              Selected languages
            </Typography>
            {selectLan?.map((e: any) => {
              return (
                <Box
                  key={e}
                  display="flex"
                  alignItems="center"
                  marginBottom={2}
                >
                  <Typography
                    fontSize="14px"
                    width="104px"
                    fontWeight={700}
                    color={(theme) => theme.palette.bgBlack.main}
                  >
                    {e?.value}
                  </Typography>
                  <RadioGroup
                    className="checkbox_signup"
                    defaultValue="female"
                    aria-labelledby="demo-customized-radios"
                    name="customized-radios"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                    }}
                  >
                    <CheckBoxCircle
                      labelPlacement="start"
                      value={1}
                      label="Read"
                      name="ERead"
                      bg={true}
                      checked={e?.canRead}
                      disabled={true}
                    />
                    <CheckBoxCircle
                      labelPlacement="start"
                      value={2}
                      label="Write"
                      name="EWrite"
                      bg={true}
                      checked={e?.canWrite}
                      disabled={true}
                    />
                    <CheckBoxCircle
                      labelPlacement="start"
                      value={3}
                      label="Speak"
                      name="ESpeak"
                      bg={true}
                      checked={e?.canSpeak}
                      disabled={true}
                    />
                  </RadioGroup>
                </Box>
              );
            })}
            <Box display="flex" justifyContent={"flex-end"} marginTop={5}>
              <ButtonOutlined
                text={"Save"}
                width="auto"
                height="35px"
                borderRadius={5}
                onClick={submitInstruction}
                loading={loading}
              />
            </Box>
          </StyledAccordianDetails>
        </StyledAccordian>
      </Box>
    </>
  );
}
