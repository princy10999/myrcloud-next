import React from "react";
import StandardLayout from "@components/Layout/StandardLayout";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Router, { useRouter } from "next/router";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  DialogContent,
  IconButton,
} from "@mui/material";
import CustomeDrawerHeader from "@components/common/customDrawerHeader";
import CustomDrawer from "@components/common/CustomDrawer";
import CustomDialog from "@components/common/CustomDialog";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchTextFieldComponents from "@components/Layout/SearchTextFieldComponents";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import ButtonText from "@components/Layout/ButtonText";
import ButtonContained from "@components/Layout/ButtonContained";
import Assets from "@components/common/image_container";
import { makeStyles } from "tss-react/mui";
import { IconWrapper } from "@components/common/customSvgIcon";
import { postAcceptRejectRequisition } from "@redux/Redux/Actions/PartnerRequisition";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@redux/Redux/app/hooks";
import { responseEnum } from "@lib/enum";
import FullWidthLoader from "@components/common/FullWidthLoader";
import Preview from "@components/candidate-step-3/preview";
import FullPageLayout from "@components/Layout/FullPageLayout";
import ButtonOutlined from "@components/Layout/ButtonOutlined";
import { format, formatDistance } from "date-fns";
import {
  standardDateFormat,
  standardDateFormatDistance,
} from "@lib/standardDateFormat";
import CustomTooltip from "@components/common/customTooltip";
import useSnackBar from "@redux/hooks/useSnackBar";
import usePageLoader from "@redux/hooks/usePageLoader";
import ErrorHandler from "@lib/errorHandler";

const useStyles = makeStyles()((theme) => {
  return {
    icon: {
      marginRight: "6px",
      color: theme.palette.bgGray.main,
      height: "35px",
    },
    icon2: {
      marginRight: "6px",
      color: theme.palette.bgGray.main,
      height: "33px",
    },
    instruction: {
      color: theme.palette.bgGray.main,
    },
    font16: {
      fontSize: "16px",
    },
    font15: {
      fontSize: "15px",
    },
    font6: {
      fontSize: "6px",
      margin: "0px 7px",
    },
    seQus: {
      background: theme.palette.bgLightBlue.main,
      margin: "10px 0px",
      padding: "7px",
      fontSize: "15px",
      fontWeight: "bold",
    },
    item: {
      height: "67px",
      boxShadow: "none",
      borderRadius: "5px",
      border: `1px solid #DDDDDD`,
    },
    techSkill: {
      padding: "4px 14px ",
      border: `1px solid ${theme.palette.bgBlue.main}`,
      color: theme.palette.bgBlue.main,
      borderRadius: "50px",
      marginRight: "10px",
      marginTop: "15px",
    },
    cusDraBox: {
      padding: "5px 12px",
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
      borderRadius: "25px",
      marginRight: "20px",
      marginTop: "15px",
    },
  };
});

export default function Requisitions() {
  //Hooks
  const { classes } = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { setSnackBar } = useSnackBar();
  const setFullPageLoader = usePageLoader();

  //State
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isHelpDrawerOpen, setIsHelpDrawerOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [comment, setComment] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [pageTourEnabled, setPageTourEnabled] = React.useState<boolean>(false);
  const [errors, setError] = React.useState<any>({});

  const { id, requisitionId } = router.query;

  //Handler
  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };
  const requisitionDetail = useAppSelector(
    (state: any) => state?.client?.isGetCreateRequisition?.requistionData?.data
  );
  const validateForm = () => {
    let errors: any = {};
    let formIsValid = true;

    if (!comment?.desc) {
      formIsValid = false;
      errors["comment"] = "Please enter description";
    }
    setError(errors);

    return formIsValid;
  };

  const rejectAcceptRequisition = async (type: boolean) => {
    if (!type) {
      if (validateForm()) {
        setLoading(true);
        try {
          const body = {
            requisitionId: requisitionDetail?.requisitionId,
            isAccepted: type,
            comment: comment?.desc,
          };
          const reject = await dispatch(postAcceptRejectRequisition(body));
          let error = await ErrorHandler(reject, setSnackBar);

          if (error) {
            Router.back();
            setLoading(false);
          } else {
            setLoading(false);
          }
        } catch (error) {
          setSnackBar("error", "Something went wrong !");
          setLoading(false);
        }
      }
    } else {
      try {
        setLoading(true);
        const body = {
          requisitionId: requisitionDetail?.requisitionId,
          isAccepted: type,
        };
        const accept = await dispatch(postAcceptRejectRequisition(body));
        let error = await ErrorHandler(accept, setSnackBar);

        if (error) {
          handleDialogOpen();
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setSnackBar("error", "Something went wrong !");
        setLoading(false);
      }
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (!router.isReady) return;
    (async () => {
      setFullPageLoader(true);
      const body = `?RequisitionId=${requisitionId}`;
      //await dispatch(getGetRequisitionDetail(body));
      setTimeout(() => {
        setFullPageLoader(false);
      }, 2000);
    })();
    setTimeout(() => {
      setPageTourEnabled(true);
    }, 1000);
  }, [router.isReady]);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  return (
    <>
      <StandardLayout title="View Requisitions" menuCode="partner">
        <Box
          borderTop="1px solid lightgray"
          bgcolor={(theme) => theme.palette.bgWhite.main}
          padding="20px"
          display="flex"
          justifyContent="space-between"
        >
          <Box display="flex">
            <Assets
              src="https://miro.medium.com/max/1400/1*sHmqYIYMV_C3TUhucHrT4w.png"
              height={90}
              width={90}
              absolutePath={true}
            />
            <Box paddingLeft="20px">
              <Typography variant="h6" fontWeight="bold" margin={0}>
                {requisitionDetail?.jd?.jobTitle}
              </Typography>
              <Box
                display="flex"
                fontSize="14px"
                fontWeight="600"
                paddingTop="5px"
              >
                {" "}
                {requisitionDetail?.jd?.client.clientName},
                <Box
                  fontWeight="500"
                  margin="0px"
                  paddingLeft="2px"
                  fontSize="14px"
                >
                  {requisitionDetail?.location}
                </Box>
              </Box>
              <Box display="flex" margin="0px" paddingTop="5px">
                <Box>
                  <Grid container wrap="nowrap">
                    <Grid
                      item
                      xs
                      color={(theme) => theme.palette.bgLightGreen.main}
                      fontSize={16}
                      display="flex"
                      alignItems="center"
                      paddingRight={0.5}
                    >
                      <FiberManualRecordIcon className={classes?.font16} />
                    </Grid>
                    <Grid item xs>
                      <Typography
                        component="p"
                        color={(theme) => theme.palette.bgLightGreen.main}
                        paddingRight={2}
                        fontWeight={500}
                      >
                        Active
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                {requisitionDetail?.publishedDate ? (
                  <CustomTooltip
                    title={`Posted on ${standardDateFormat(
                      requisitionDetail?.publishedDate
                    )}`}
                  >
                    <Box
                      margin="0px"
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      Posted{" "}
                      <Box color={(theme) => theme.palette.primary.main} ml={1}>
                        {standardDateFormatDistance(
                          requisitionDetail?.publishedDate
                        )}
                      </Box>
                    </Box>
                  </CustomTooltip>
                ) : null}
              </Box>
            </Box>
          </Box>
          <Box>
            <Box display="flex" alignItems="center">
              <Box>
                <Grid container wrap="nowrap">
                  <Grid
                    item
                    color={(theme) => theme.palette.error.main}
                    fontSize={14}
                    display="flex"
                    wrap="nowrap"
                    alignItems="center"
                    paddingRight={0.5}
                  >
                    <FiberManualRecordIcon className={classes?.font16} />
                  </Grid>
                  <Grid item xs>
                    <Typography
                      component="span"
                      color={(theme) => theme.palette.error.main}
                      fontWeight={600}
                    >
                      {requisitionDetail?.matrix?.priority?.value}
                    </Typography>
                    <Typography ml={2} component="span">
                      Req ID - {requisitionDetail?.requisitionCode}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* <Box
                bgcolor={(theme) => theme.palette.bgLightBlue.main}
                borderRadius="5px"
                padding="10px"
                marginLeft="50px"
                display="flex"
                justifyContent="end"
              >
                <Typography>
                  Tantative Time to Hire - {requisitionDetail?.jd?.noticePeriod}{" "}
                </Typography>
              </Box> */}
            </Box>
            <Box mt={1}>
              <Box display="flex" justifyContent="end">
                <Typography color={(theme) => theme.palette.bgGray.main} mr={1}>
                  Quality Team -{" "}
                </Typography>
                <Box fontWeight="bold"> Sonal Srivastava</Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <FullPageLayout>
          <Box my={2}>
            {router.isReady && <Preview requisitionId={requisitionId} />}

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
                    <IconButton
                      aria-label="close"
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.bgWhite.main,
                      }}
                    >
                      <IconWrapper fontSize="medium" icon="wrong" />
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
                      You have successfully accepted this Requisition!
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                      fontSize={16}
                      lineHeight={1}
                    >
                      Great! You have accepted this Requisition no. -{" "}
                      {requisitionDetail && requisitionDetail?.requisitionCode}
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                      fontSize={16}
                      mb={3}
                    >
                      Now You can start adding the candidate in this
                      requisition.
                    </Typography>
                    <Typography
                      variant="body1"
                      component="span"
                      fontSize={18}
                      sx={{ textDecoration: "underline" }}
                      mb={2}
                      onClick={() => {
                        handleDialogClose();
                        Router.back();
                      }}
                    >
                      Go to active pipeline.
                    </Typography>
                    <Typography
                      gutterBottom
                      onClick={() => {
                        handleDialogClose();
                        setIsHelpDrawerOpen(true);
                      }}
                    >
                      NEED HELP?{" "}
                    </Typography>
                  </DialogContent>
                </CustomDialog>
              )}

              {isDrawerOpen && (
                <CustomDrawer
                  isDrawerOpen={isDrawerOpen}
                  handleClose={() => {
                    setIsDrawerOpen(false);
                  }}
                  anchor={"right"}
                >
                  <Box sx={{ marginTop: 0 }}>
                    <CustomeDrawerHeader
                      handleClose={() => setIsDrawerOpen(false)}
                      title="Rejection reason"
                      subtitle="It will enable us to display more relevant requisitions. "
                    />
                    <Stack
                      direction="column"
                      spacing={1}
                      marginTop={2}
                      ml={2}
                      mr={2}
                    >
                      <TextFieldComponent
                        text="Remarks"
                        type="text"
                        placeholder=""
                        width="100%"
                        rows={10}
                        name="desc"
                        multiline={true}
                        value={comment?.desc}
                        onChange={handleChange}
                        valid
                      />
                      <Typography
                        variant="body2"
                        textAlign={"start"}
                        color={"error"}
                      >
                        {comment?.desc?.length > 0 ? "" : errors["comment"]}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={3}
                      marginTop={2}
                      ml={2}
                      mr={2}
                      justifyContent={"end"}
                    >
                      <ButtonText text="Cancel" width="15%" height="40px" />
                      <ButtonContained
                        marginBottom="20px"
                        marginTop="20px"
                        borderRadius="30px"
                        text="Reject"
                        width="20%"
                        color="error"
                        height="40px"
                        onClick={() => {
                          // setIsHelpDrawerOpen(true);
                          rejectAcceptRequisition(false);
                        }}
                        loading={loading}
                      />
                    </Stack>
                  </Box>
                </CustomDrawer>
              )}

              {isHelpDrawerOpen && (
                <CustomDrawer
                  isDrawerOpen={isHelpDrawerOpen}
                  handleClose={() => {
                    setIsHelpDrawerOpen(false);
                  }}
                  anchor={"right"}
                >
                  <Box sx={{ marginTop: 0 }}>
                    <CustomeDrawerHeader
                      handleClose={() => {
                        setIsHelpDrawerOpen(false);
                        setIsDrawerOpen(false);
                      }}
                      title="Help Section"
                      subtitle="It will enable us to display more relevant requisitions."
                    />
                    <Stack
                      direction="column"
                      spacing={2}
                      marginTop={4}
                      ml={2}
                      mr={2}
                    >
                      <Box width={"100%"}>
                        <SearchTextFieldComponents
                          type="text"
                          // text="Query"
                          placeholder="Enter Your Query here"
                          width="100%"
                        />
                      </Box>
                      <Box display="flex" flexWrap="wrap" marginBottom={5}>
                        <Box className={classes?.cusDraBox}>Add Candidates</Box>
                        <Box className={classes?.cusDraBox}>
                          Generate QR Code
                        </Box>
                        <Box className={classes?.cusDraBox}>
                          View Requisition
                        </Box>
                      </Box>
                      <Box>
                        <iframe
                          width="100%"
                          height="300"
                          src={"https://www.youtube.com/embed/8rjHC9A6wLo"}
                          title=""
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </Box>
                    </Stack>
                    <Stack
                      direction="column"
                      spacing={2}
                      marginTop={2}
                      ml={2}
                      mr={2}
                    >
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography fontWeight={`bold`}>
                            How to add Candidates to a Requisitions
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse malesuada lacus ex, sit amet
                            blandit leo lobortis eget.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Typography fontWeight={`bold`}>
                            How to generate QR Code
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Followed In Recruitment while Generating Employee
                            Code : If Employee code genera ... Last Generated
                            Employee Code . Ex : (I12345) 2. Update Last
                            generated Employee ... Employee Code in Setup circle
                            -- Portaln --- E-code Setup -- Save. ... with Above
                            process then start Employee code Generation from
                            Recruitment. Note
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel3a-content"
                          id="panel3a-header"
                        >
                          <Typography fontWeight={`bold`} borderColor="#EFEFEF">
                            How to view a requisition?
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Followed In Recruitment while Generating Employee
                            Code : If Employee code genera ... Last Generated
                            Employee Code . Ex : (I12345) 2. Update Last
                            generated Employee ... Employee Code in Setup circle
                            -- Portaln --- E-code Setup -- Save. ... with Above
                            process then start Employee code Generation from
                            Recruitment. Note
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Stack>
                  </Box>
                </CustomDrawer>
              )}
            </Box>
          </Box>
        </FullPageLayout>
        <Box
          bgcolor={(theme) => theme.palette.bgWhite.main}
          display="flex"
          justifyContent="space-between"
        >
          <FullPageLayout>
            {id !== "1" && (
              <Box display="flex" justifyContent="end" mt={3}>
                <ButtonOutlined
                  marginBottom="20px"
                  // marginTop="20px"
                  borderRadius="30px"
                  height="40px"
                  width="150px"
                  text="Reject"
                  endIcon={
                    <IconWrapper
                      fontSize="small"
                      icon="wrong"
                      color="primary"
                      style={{ marginLeft: "30px" }}
                    />
                  }
                  onClick={() => {
                    setIsDrawerOpen(true);
                  }}
                  loading={loading}
                  marginLeft={"20px"}
                  fontSize={"16px"}
                />
                <ButtonContained
                  marginBottom="20px"
                  // marginTop="20px"
                  borderRadius="30px"
                  height="40px"
                  width="150px"
                  text="Accept"
                  endIcon={
                    <IconWrapper
                      fontSize="small"
                      icon="right"
                      style={{ marginLeft: "30px" }}
                    />
                  }
                  onClick={() => {
                    rejectAcceptRequisition(true);
                    // setIsHelpDrawerOpen(true);
                  }}
                  marginLeft="20px"
                  loading={loading}
                  fontSize={"16px"}
                />
              </Box>
            )}
          </FullPageLayout>
        </Box>

        {/* <PageTour
        enabled={pageTourEnabled}
        steps={tourSteps}
        initialStep={0}
        onExit={() => {}}
      /> */}
      </StandardLayout>
    </>
  );
}
