import React, { useRef } from "react";
import StandardLayout from "@components/Layout/StandardLayout";
import PaperContainer from "@components/common/paperContainer";
import {
  Grid,
  Box,
  Stack,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import BreadCrumbs from "@components/Layout/BreadCrumbs";
import { useRouter } from "next/router";
import ButtonPreviousArrow from "@components/Layout/ButtonPreviousArrow";
import ButtonArrow from "@components/Layout/ButtonArrow";
import { makeStyles } from "tss-react/mui";
import { styled } from "@mui/material/styles";
import { StepIconProps } from "@mui/material/StepIcon";
import { IconWrapper } from "@components/common/customSvgIcon";
import PrivacyInformation from "@components/create-client/primary";
import SopcInformation from "@components/create-client/spoc";
import Contract from "@components/create-client/contract";
import Documents from "@components/create-client/document";
import AllocationDetails from "@components/create-client/allocation";
import CustomDialog from "@components/common/CustomDialog";
import { DialogContent, IconButton } from "@mui/material";
import FullPageLayout from "@components/Layout/FullPageLayout";
import localStoreUtil from "@redux/Api/localstore.util";
import { useAppSelector } from "@redux/Redux/app/hooks";
import { useDispatch } from "react-redux";
import { clientDetailById } from "@redux/Redux/Actions/ClientCreation";
import PreviewClient from "@components/create-client/previewClient";

const useStyles = makeStyles()((theme) => {
  return {
    lablesteper: {
      display: "flex",
      flexDirection: "row-reverse",
      textAlign: "right",
    },
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
    1: <IconWrapper fontSize="small" icon="exclamation" />,
    2: <IconWrapper fontSize="small" icon="users" />,
    3: <IconWrapper fontSize="small" icon="file-ok" />,
    4: <IconWrapper fontSize="small" icon="file-upload" />,
    // 5: <IconWrapper fontSize="small" icon="employee-transfer" />,
    5: <IconWrapper fontSize="small" icon="file-ok" />,
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
    label: "Primary Information",
    description: `Basic details of Client`,
  },
  {
    label: "SPOC Information",
    description: "Add contact details",
  },
  {
    label: "Contract Information",
    description: "Enter Contract Information",
  },
  {
    label: "Documents",
    description: "Add Documents",
  },
  //   {
  //     label: "Allocation Details",
  //     description: "Add Allocation Details",
  //   },
  {
    label: "Preview",
    description: "View client details",
  },
];

export default function CreateClientStepper() {
  const { classes } = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [isSubmitStep, setIsSubmitStep] = React.useState(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const clientDetails = useAppSelector(
    (state: any) => state?.rcloud?.isCreateClient?.createClientData
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const [isEditStep, setIsEditStep] = React.useState(false);
  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const handleNext = async () => {
    setLoading(false);
    setIsSubmitStep(0);
    if (clientDetails && clientDetails.clientId) {
      const body = `?ClientId=${clientDetails.clientId}`;
      await dispatch(clientDetailById(body));
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    if (clientDetails && clientDetails.clientId) {
      setActiveStep(step);
    }
  };
  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const handleLoading = () => {
    setLoading(true);
  };
  return (
    <>
      <StandardLayout title="Client List" menuCode="rcloud">
        <PaperContainer elevation={0} sx={{ p: 2 }} >
          <BreadCrumbs
            item={[
              // { name: "Client", href: "/app/rcloud/clients" },
              { name: "Client List", href: "/app/rcloud/clients" },
              {
                name: "Create Client",
                href: "/app/rcloud/clients/create-client",
              },
            ]}
          />
        </PaperContainer>
        <Stack
          direction="row"
          padding={2}
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          borderBottom={"1px solid #DDDDDD"}
          sx={{
            backgroundColor: (theme) => theme.palette.bgLightGray.main,
            position: "sticky"
          }}
        >
          <Box gap={2}>
            <Typography
              variant="h4"
              fontWeight="700"
              fontSize="24px"
              lineHeight="28px"
              color={(theme) => theme.palette.bgBlack.main}
            >
              Create Client
            </Typography>
            <Typography
              variant="h4"
              fontWeight="400"
              fontSize="14px"
              lineHeight="15px"
              color={(theme) => theme.palette.bgGray.main}
            >
              Follow the simple steps to add Client
            </Typography>
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
                text="Back"
                borderRadius="30px"
                height="40px"
                width="110px"
                marginRight="15px"
                disabled={activeStep <= 0}
              />
              {activeStep >= 4 ? (
                <ButtonArrow
                  text="Save"
                  borderRadius="30px"
                  height="40px"
                  width="100px"
                  onClick={() => {
                    handleDialogOpen();
                  }}
                />
              ) : (
                <ButtonArrow
                  onClick={() => {
                    setIsSubmitStep((val) => val + 1);
                  }}
                  loading={loading}
                  text="Next"
                  borderRadius="30px"
                  height="40px"
                  width="100px"
                  disabled={activeStep >= 4}
                />
              )}
            </Box>
          </Grid>
        </Stack>
        <Grid container spacing={0} paddingLeft={2} paddingRight={2}>
          <Grid item lg={4} md={3} xs={12}>
            <Box padding={"20px 0px"}>
              <Box
                bgcolor={(theme) => theme.palette.bgWhite.main}
                p={2}
                height={"100vh"}
              >
                <Stepper
                  activeStep={activeStep}
                  orientation="vertical"
                  className="create_requisition"
                >
                  {steps.map((label, index) => {
                    return (
                      <Step key={label.label} completed={completed[index]}>
                        <StepLabel
                          StepIconComponent={ColorlibStepIcon}
                          color="inherit"
                          className={classes.lablesteper}
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
                          <Typography
                            variant="caption"
                            color={"textSecondary"}
                            paddingRight={1}
                          >
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
            <Box padding={"20px 0px 0px 20px"}>
              {activeStep === steps.length - 1 ? (
                ""
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    fontWeight="600"
                    fontSize="18px"
                    lineHeight="21px"
                    color={(theme) => theme.palette.bgBlack.main}
                    marginBottom="2px"
                  >
                    Step {`${activeStep + 1}`} / 5
                  </Typography>
                </Box>
              )}

              {activeStep === 0 && (
                <Box marginTop={2}>
                  <PrivacyInformation
                    handleLoading={handleLoading}
                    isSubmitStep={isSubmitStep}
                    handleNext={handleNext}
                  />
                </Box>
              )}
              {activeStep === 1 && (
                <Box marginTop={2}>
                  <SopcInformation
                    handleLoading={handleLoading}
                    isSubmitStep={isSubmitStep}
                    handleNext={handleNext}
                  />
                </Box>
              )}
              {activeStep === 2 && (
                <Box marginTop={2}>
                  <Contract
                    handleLoading={handleLoading}
                    isSubmitStep={isSubmitStep}
                    handleNext={handleNext}
                  />
                </Box>
              )}
              {activeStep === 3 && (
                <Box marginTop={2}>
                  <Documents
                    handleLoading={handleLoading}
                    isSubmitStep={isSubmitStep}
                    handleNext={handleNext}
                  />
                </Box>
              )}
              {/* {activeStep === 4 && (
                <Box marginTop={2}>
                  <AllocationDetails />
                </Box>
              )} */}
              {activeStep === 4 && (
                <Box>
                  <PreviewClient
                    handleEditStep={(step: any) => {
                      setActiveStep(step);
                    }}
                  />
                </Box>
              )}
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
                    <IconButton
                      aria-label="close"
                      onClick={() => {
                        handleDialogClose();
                      }}
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.bgWhite.main,
                      }}
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
                      mt={1}
                    >
                      Client has been created sucessfully
                    </Typography>
                  </DialogContent>
                </CustomDialog>
              )}
            </Box>
          </Grid>
        </Grid>
      </StandardLayout>
    </>
  );
}
