import React from "react";
import StandardLayout from "@components/Layout/StandardLayout";
import PaperContainer from "@components/common/paperContainer";
import {
  Box,
  Typography,
  Stack,
  Grid,
  Paper,
  StepContent,
  IconButton,
  DialogContent,
} from "@mui/material";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepButton from "@mui/material/StepButton";
import ButtonArrow from "@components/Layout/ButtonArrow";
import Button from "@mui/material/Button";
import Switch, { SwitchProps } from "@mui/material/Switch";
import ButtonPreviousArrow from "@components/Layout/ButtonPreviousArrow";
import PositionDetail from "@components/candidate-step-1/position-detail-step-1";
import RolesStep from "@components/candidate-step-1/roles-step-2";
import AdditionalDocumentsStep from "@components/candidate-step-1/additional-docs-step";
import VideoResume from "@components/candidate-step-1/video-resume-step-3";
import Compensation from "@components/candidate-step-1/Compensation-step-4";
import Screening from "@components/candidate-step-2/screening-step-1";
import Instruction from "@components/candidate-step-2/instruction-step-2";
import Allocation from "@components/candidate-step-2/allocation-step-3";
import ButtonText from "@components/Layout/ButtonText";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { makeStyles } from "tss-react/mui";
import { StepIconProps } from "@mui/material/StepIcon";
import Preview from "@components/candidate-step-3/preview";
import { IconWrapper } from "@components/common/customSvgIcon";
import localStoreUtil from "@redux/Api/localstore.util";
import { useAppSelector } from "@redux/Redux/app/hooks";
import FullPageLayout from "@components/Layout/FullPageLayout";
import { finalizeRequisition } from "@redux/Redux/Actions/Client";
import { useDispatch } from "react-redux";
import CustomDialog from "@components/common/CustomDialog";
import ButtonContained from "@components/Layout/ButtonContained";
import { useRouter } from "next/router";
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';

const useStyles = makeStyles()((theme) => {
  return {
    lablesteper: {
      display: "flex",
      flexDirection: "row-reverse",
      textAlign: "right"
    },
    overFlowScroll:{
      overflowX:"hidden",
      height:'auto',
      [theme.breakpoints.up("md")]: {
        height: "calc(100vh - 162px)",
      },
    }
  };
});

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#fff",
  zIndex: 1,
  color: "#1BA39C",
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  border: "1px solid #1BA39C",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: "#FFFFFF",
    color: "#1BA39C",
    // boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    color: "#fff",
    backgroundColor: "#1BA39C",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <IconWrapper fontSize="16px" icon="job-application" />,
    2: <IconWrapper fontSize="16px" icon="user" />,
    3: <IconWrapper fontSize="16px" icon="file-ok" />,
  };
  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}
const steps = [
  {
    label: "Basic Details",
    description: `Position Details & Job Description`,
  },
  {
    label: "Assessments",
    description: "Screening Questions and Instruction Matrix",
  },
  {
    label: "Preview",
    description: "Preview Your Requisition",
  },
];

export default function CreateRequisition({ data }: any) {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<any>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorType, setErrorType] = React.useState<any>("");
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean; }>({});
  const [data1, setData1] = React.useState<any>("");
  const [requisitionCode, setRequisitionCode] = React.useState("");
  const requisitionData = useAppSelector(
    (state: any) => state?.client?.isGetCreateRequisition?.requistionData
  );

  const isStepOptional = (step: number) => {
    return step === 1;
  };
  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };
  const handleDialogOpen2 = () => {
    setIsOpen2(true);
  };

  const handleDialogClose2 = () => {
    setIsOpen2(false);
  };
  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const createRequisition = async (e: boolean) => {
    let body = {
      requisitionId: data1?.requisitionId,
      updateJdTemplate: e,
    };
    let response = await dispatch(finalizeRequisition(body));
    if (response?.payload?.code === 1) {
      setLoading(false);
      handleDialogClose();
      handleDialogOpen2();
      setRequisitionCode(response?.payload?.data?.requisitionCode);
    }
    if (response?.payload?.code === 0) {
      setOpen(true);
      setToastMessage(response?.payload?.message);
      setErrorType("error");
      setLoading(false);
      handleDialogClose();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleStep = (step: number) => () => {
    if (data1?.requisitionId) {
      setActiveStep(step);
    }
  };

  React.useEffect(() => {
    if (requisitionData) {
      setData1(requisitionData?.data);
    }
  }, [requisitionData]);
  React.useEffect(() => {
    if (data) {
      setData1(data);
    }
  }, [data]);
  return (
    <>
      <PaperContainer>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap={"wrap"}
          gap={"10px"}
          p={"0px 10px 0px 10px "}
        >
          <Box display="flex" alignItems="center">
            <Box
              bgcolor={(theme) => theme.palette.bgLightGray.main}
              borderRadius="50%"
              width="42px"
              height="42px"
              padding={1.2}
              paddingLeft={1.6}
              color={(theme) => theme.palette.bgGray.main}
            >
              <IconWrapper icon="back-arrow" fontSize="14px" />
            </Box>
            <Box marginLeft={2}>
              <Typography
                variant="h4"
                fontWeight="700"
                fontSize="24px"
                lineHeight="28px"
                color={(theme) => theme.palette.bgBlack.main}
              >
                Requisition Creation
              </Typography>
            </Box>
          </Box>
          <Grid item md={3} xs={2} spacing={2} flexWrap="wrap">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="nowrap"
            >
              <ButtonPreviousArrow
                onClick={handleBack}
                text="Previous"
                borderRadius="30px"
                height="40px"
                width="110px"
                marginRight="20px"
                disabled={activeStep <= 0}
              />
              <ButtonArrow
                onClick={handleNext}
                text="Next"
                borderRadius="30px"
                height="40px"
                width="100px"
                marginRight="20px"
                disabled={activeStep >= 2 || !data1?.requisitionId}
              />
              {activeStep == 2 && data1?.requisitionId && (
                <ButtonArrow
                  onClick={handleDialogOpen}
                  text="Create Requisition"
                  borderRadius="30px"
                  height="40px"
                  width="200px"
                />
              )}
            </Box>
          </Grid>
        </Box>
      </PaperContainer>
      <FullPageLayout>
        <Grid container spacing={2} mt={1}>
          <Grid item lg={4} md={3} xs={12}>
            <Box>
              <Box
                bgcolor={(theme) => theme.palette.bgWhite.main}
                p={2}
                height={`calc(100vh - 162px)`}
              >
                <Stepper activeStep={activeStep} orientation="vertical" className="create_requisition">
                  {steps.map((label, index) => {
                    return (
                      <Step key={label.label} completed={completed[index]} >
                        <StepLabel
                          className={classes.lablesteper}
                          StepIconComponent={ColorlibStepIcon}
                          color="inherit"
                          onClick={handleStep(index)}
                        >
                          <Typography
                            fontWeight="600"
                            fontSize="14px"
                            color="black"
                            marginBottom="2px"
                            paddingRight={1}
                          >
                            {label.label}
                          </Typography>
                          <Typography variant="caption" paddingRight={1}>
                            {label.description}
                          </Typography>
                        </StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={8} md={9} xs={12} >
            <Box className={classes.overFlowScroll}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    fontWeight="600"
                    fontSize="18px"
                    lineHeight="21px"
                    color="#444444"
                    marginBottom="2px"
                  >
                    Step {`${activeStep + 1}`}/3
                  </Typography>
                  <Typography
                    fontWeight="400"
                    fontSize="14px"
                    lineHeight="16px"
                    color={(theme) => theme.palette.bgGray.main}
                  >
                    Follow the simple steps to complete your requisition
                  </Typography>
                </Box>
              </Box>
              {activeStep === 0 && (
                <Box marginTop={2}>
                  <PositionDetail editRequisitionData={data1} />
                  <AdditionalDocumentsStep editRequisitionData={data1} />
                  <RolesStep editRequisitionData={data1} />
                  {/* <VideoResume editRequisitionData={data1} /> */}
                  <Compensation editRequisitionData={data1} />
                </Box>
              )}
              {activeStep === 1 && (
                <Box marginTop={2}>
                  <Screening editRequisitionData={data1} />
                  <Instruction editRequisitionData={data1} />
                  <Allocation editRequisitionData={data1} />
                </Box>
              )}
              {activeStep === 2 && (
                <Box marginTop={2}>
                  <Preview editRequisitionData={data1} />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
        <Box>
          {isOpen && (
            <CustomDialog isOpen={isOpen} handleClose={handleDialogClose}>
              <DialogContent
                sx={{
                  bgcolor: "#1BA39C",
                  display: "flex",
                  flexDirection: "column",
                  m: "auto",
                  width: "500px",
                  color: (theme) => theme.palette.bgWhite.main,
                  textAlign: "center",
                }}
              >
                <Typography sx={{ p: 1 }}>
                  <IconWrapper fontSize="large" icon="ok" />
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  gutterBottom
                  fontWeight={400}
                  lineHeight={1.1}
                  mb={3}
                >
                  Do you want to save this requisition as template?
                </Typography>
                <Box display="flex" mt={5}>
                  <ButtonContained
                    onClick={() => createRequisition(false)}
                    text="No"
                    borderRadius="30px"
                    height="40px"
                    width="100%"
                  />
                  <ButtonContained
                    onClick={() => createRequisition(true)}
                    text="Yes"
                    borderRadius="30px"
                    height="40px"
                    width="100%"
                  />
                </Box>
              </DialogContent>
            </CustomDialog>
          )}
        </Box>
        <Box>
          {isOpen2 && (
            <CustomDialog isOpen={isOpen2} handleClose={handleDialogClose2}>
              <DialogContent
                sx={{
                  bgcolor: "#1BA39C",
                  display: "flex",
                  flexDirection: "column",
                  m: "auto",
                  width: "500px",
                  color: (theme) => theme.palette.bgWhite.main,
                  textAlign: "center",
                }}
              >
                <IconButton
                  aria-label="close"
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.bgWhite.main,
                  }}
                  onClick={handleDialogClose2}
                >
                  <IconWrapper fontSize="small" icon="wrong" />
                </IconButton>
                <Typography sx={{ p: 1 }}>
                  <IconWrapper fontSize="large" icon="ok" />
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  gutterBottom
                  fontWeight={400}
                  lineHeight={1.1}
                  mb={3}
                >
                  {`You have successfully created
                                    requisition no - ${requisitionCode}`}
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  gutterBottom
                  fontSize={19}
                  fontWeight={400}
                  lineHeight={1.1}
                  mb={3}
                >
                  Now you can start publishing the requisition
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  gutterBottom
                  fontSize={17}
                  borderBottom="1px solid white"
                  fontWeight={400}
                  width="30%"
                  marginLeft="9.8pc"
                  lineHeight={1.1}
                  mb={3}
                  onClick={() => {
                    router.push("/partner/requisition-pipeline");
                  }}
                >
                  View Requisition
                </Typography>
                <Typography gutterBottom>NEED HELP? </Typography>
              </DialogContent>
            </CustomDialog>
          )}
        </Box>
      </FullPageLayout>
    </>
  );
}
