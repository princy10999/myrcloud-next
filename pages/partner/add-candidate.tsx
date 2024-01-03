import React from "react";
import AddDocument from "@components/addCandidate/addDocument";
import BasicDetails from "@components/addCandidate/basicDetails";
import Screening from "@components/addCandidate/screening";
import Preview from "@components/addCandidate/preview";
import StandardLayout from "@components/Layout/StandardLayout";
import { makeStyles } from "tss-react/mui";
import { Grid, Step, StepLabel, Stepper, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import ButtonPreviousArrow from "@components/Layout/ButtonPreviousArrow";
import ButtonArrow from "@components/Layout/ButtonArrow";
import { StepIconProps } from "@mui/material/StepIcon";
import { IconWrapper } from "@components/common/customSvgIcon";
import FullPageLayout from "@components/Layout/FullPageLayout";
import ButtonOutlined from "@components/Layout/ButtonOutlined";
import { getGetRequisitionDetail } from "@redux/Redux/Actions/PartnerRequisition";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const useStyles = makeStyles()((theme) => {
  return {
    lablesteper: {
      display: "flex",
    },
    overFlowScroll:{
      overflowX:"hidden",
      height:'auto',
      [theme.breakpoints.up("md")]: {
        height: "calc(100vh - 222px)",
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
    backgroundColor: "#1BA39C",
    color: "#fff",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    color: "#fff",
    backgroundColor: "#1BA39C",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <IconWrapper fontSize="small" icon="upload" />,
    2: <IconWrapper fontSize="small" icon="file" />,
    3: <IconWrapper fontSize="small" icon="file-add" />,
    4: <IconWrapper fontSize="small" icon="file-ok" />,
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
    description: `Upload your resume, basic details, experience, and address.`,
    stepDescription: "Follow the simple steps to complete your requisition",
  },
  {
    label: "Documents",
    description: "Screening questions and Candidate Story",
    stepDescription: "Follow the simple steps to complete your requisition",
  },
  {
    label: "Additional Details",
    description: "View your candidate details",
    stepDescription: "Follow the simple steps to complete your requisition",
  },
  {
    label: "Preview",
    description: "View your candidate details",
    stepDescription: "Follow the simple steps to complete your requisition",
  },
];

export default function Add_Candidate() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { classes } = useStyles();
  const [activeStep, setActiveStep] = React.useState<any>(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [jdData, setJdData] = React.useState<any>({})
  const [completed, setCompleted] = React.useState<{[k: number]: boolean;}>({});

  const isStepOptional = (step: number) => {
    return step === 1;
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
    setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: any) => prevActiveStep - 1);
  };
 
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
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
    setActiveStep(0);
  };
  React.useEffect(() => {
    if (router?.query?.requisitionId) {
      (async () => {
        const body = `?RequisitionId=${router?.query?.requisitionId}`;
        const response = await dispatch(getGetRequisitionDetail(body));
        setJdData(response?.payload?.data)
      })();
    }
  }, [router?.isReady]);
  return (
    <StandardLayout title="Add Candidate" menuCode="partner">
      <Box
        bgcolor={(theme) => theme.palette.bgLightGray.main}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={"20px 30px 20px 30px "}
      >
       <Box>
          <Typography variant="h5" fontWeight={500}>
            Add Candidate for {jdData?.jd?.jobTitle} - {jdData?.jd?.client?.clientName}
          </Typography>
          <Typography variant="caption">
            Req ID: {jdData?.requisitionId} | {jdData?.location}
          </Typography>
        </Box>
        <Grid item md={3} xs={2} spacing={2} flexWrap="wrap">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <ButtonPreviousArrow
              onClick={handleBack}
              text="Back"
              borderRadius="30px"
              height="40px"
              width="110px"
              marginRight="15px"
              disabled={activeStep <= 0}
            />
            {activeStep === 3 && (
              <ButtonOutlined
                text="Edit"
                borderRadius="30px"
                height="40px"
                width="100px"
                marginRight="20px"
                sx={{  display: "flex",
                justifyContent: "space-around" }}
                onClick={handleReset}
                startIcon={<IconWrapper fontSize="small" icon="edit" />}
              />
            )}
            <ButtonArrow
              onClick={handleNext}
              text="Next"
              borderRadius="30px"
              height="40px"
              width="100px"
              disabled
            />
          </Box>
        </Grid>
      </Box>
      <FullPageLayout>
        <Grid container spacing={0}>
          <Grid item lg={4} md={3} xs={12}>
            <Box padding={"20px 0px"}>
              <Box
                bgcolor={(theme) => theme.palette.bgWhite.main}
                p={2}
                height={`calc(100vh - 242px)`}
              >
                <Stepper activeStep={activeStep} orientation="vertical" className="requisition_pipeline">
                  {steps.map((label, index) => {
                    return (
                      <Step key={label.label} completed={completed[index]}>
                        <StepLabel
                          StepIconComponent={ColorlibStepIcon}
                          color="inherit"
                          onClick={handleStep(index)}
                        >
                          <Typography
                            fontWeight="600"
                            fontSize="14px"
                            color="black"
                            marginBottom="2px"
                          >
                            {label.label}
                          </Typography>
                          <Typography variant="caption">
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
          <Grid item lg={8} md={9} xs={12}>
            <Box padding={"20px 0px 20px 30px"}className={classes.overFlowScroll}>
              {activeStep !== 3 && (
                <>
                  {" "}
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
                        color={(theme) => theme.palette.bgBlack.main}
                        marginBottom="2px"
                      >
                        Step {`${activeStep + 1}`}/4
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
                </>
              )}

              {activeStep === 0 && (
                <Box marginTop={2}>
                  <BasicDetails  jdData={jdData}/>
                </Box>
              )}
              {activeStep === 1 && (
                <Box marginTop={2}>
                  <AddDocument />
                </Box>
              )}
              {activeStep === 2 && (
                <Box marginTop={2}>
                  <Screening />
                </Box>
              )}
              {activeStep === 3 && (
                <Box>
                  <Preview />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </FullPageLayout>
    </StandardLayout>
  );
}
