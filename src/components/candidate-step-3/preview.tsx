import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Assets from "@components/common/image_container";
import { makeStyles } from "tss-react/mui";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { IconWrapper } from "@components/common/customSvgIcon";
import { getRequisitionDetail } from "@redux/Redux/Actions/Client";
import { useDispatch } from "react-redux";
import { getGetRequisitionDetail } from "@redux/Redux/Actions/PartnerRequisition";
import FullWidthLoader from "@components/common/FullWidthLoader";
import { useAppSelector } from "@redux/Redux/app/hooks";
import { numDifferentiation } from "@lib/calculateCTC";
import PageTour, { PageTourHints } from "@components/common/pageTour";
import tourSteps, { tourName } from "@data/page-tours/viewRequisitionTour";
import cleanHtml from "@lib/cleanHtml";
import ReadMoreLessHelper from "@components/common/readMoreLessHelper";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import usePageLoader from "@redux/hooks/usePageLoader";
import { format } from "date-fns";


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
    },
    techSkill: {
      color: theme.palette.bgBlue.main,
    },
    cusDraBox: {
      padding: "10px 12px",
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
      borderRadius: "25px",
      marginRight: "20px",
      marginTop: "15px",
    },
  };
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "black" : theme.palette.bgWhite.main,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Preview({ editRequisitionData, requisitionId }: any) {
  //Hooks
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const setFullPageLoader = usePageLoader();
  //State
  const [data1, setData1] = React.useState<any>({});
  const [pageTourEnabled, setPageTourEnabled] = React.useState<boolean>(false);
  const requisitionDetail = useAppSelector(
    (state: any) => state?.client?.isGetCreateRequisition?.requistionData?.data
  );
  const preferred_skill =
    requisitionDetail?.jd?.skills?.preferredSkill?.length > 0
      ? requisitionDetail?.jd?.skills?.preferredSkill
      : [];
  const required_skill =
    requisitionDetail?.jd?.skills?.requiredSkill?.length > 0
      ? requisitionDetail?.jd?.skills?.requiredSkill
      : [];
  const lang =
    requisitionDetail?.jd?.languages?.length > 0
      ? requisitionDetail?.jd?.languages
        ?.map((val: any) => {
          return val?.value;
        })
        .join(", ")
      : [];
  const data = [
    {
      icon: <IconWrapper fontSize="medium" icon="user-status" />,
      title: "No. of positions",
      desc: requisitionDetail?.jd?.positionCount,
    },
    {
      icon: <IconWrapper fontSize="medium" icon="compensation" />,
      title: "Salary Budget",
      desc: `${numDifferentiation(
        requisitionDetail?.jd?.compensation?.minSalary || 0,
        0
      )} - ${numDifferentiation(
        requisitionDetail?.jd?.compensation?.maxSalary || 0,
        0
      )}`,
    },
    {
      icon: <IconWrapper fontSize="medium" icon="business-operations" />,
      title: "Total Experience",
      desc: `${requisitionDetail?.jd?.workExperience?.totalMinimumYear || 0
        } - ${requisitionDetail?.jd?.workExperience?.totalMaximumYear || 0
        } years`,
    },
    {
      icon: <IconWrapper fontSize="medium" icon="transaction-history" />,
      title: "Relevant Experience",
      desc: `${requisitionDetail?.jd?.workExperience?.releventMinimumYear || 0
        } - ${requisitionDetail?.jd?.workExperience?.releventMaximumYear || 0
        } years`,
      intro_key: `${tourName}-step1`,
    },
    {
      icon: <IconWrapper fontSize="medium" icon="transaction-history" />,
      title: "Video Resume",
      desc: requisitionDetail?.jd?.isVideoResume ? "Yes" : "No",
    },
  ];

  const dataline = [
    {
      icon: <IconWrapper fontSize="medium" icon="organogram" />,
      title: "Position Type",
      desc: "Permanent",
    },
    {
      icon: <IconWrapper fontSize="medium" icon="user" />,
      title: "Candidate Preference",
      desc: requisitionDetail?.candidatePreference?.value,
      intro_key: `${tourName}-step2`,
    },
    {
      icon: <IconWrapper fontSize="medium" icon="geo" />,
      title: "Location",
      desc: "Mumbai",
      intro_key: `${tourName}-step3`,
    },
    {
      icon: <IconWrapper fontSize="small" icon="calendar" />,
      title: "Intended DOJ",
      desc: requisitionDetail?.jd?.intendedDoj ? format(new Date(requisitionDetail?.jd?.intendedDoj), "yyyy-MM-dd") : "",
    },
    {
      icon: <IconWrapper fontSize="small" icon="industry" />,
      title: "Industry",
      desc: requisitionDetail?.jd?.industry || "-",
    },
  ];

  const Instruction = [
    {
      icon: <IconWrapper fontSize="small" icon="business-operations" />,
      title: "Work From",
      desc: requisitionDetail?.matrix?.workFrom?.value,
    },
    {
      icon: <IconWrapper fontSize="small" icon="tasklist" />,
      title: "Language preference",
      desc: lang,
    },
    {
      icon: <IconWrapper fontSize="small" icon="transaction-history" />,
      title: "Notice period",
      desc: requisitionDetail?.jd?.noticePeriod,
    },
  ];

  const Instruction2 = [
    {
      icon: <IconWrapper fontSize="small" icon="degree" />,
      title: "Mandatory Educational Requirements",
      desc: requisitionDetail?.matrix?.educationalRequirement,
    },
    // {
    //   icon: <IconWrapper fontSize="small" icon="request" />,
    //   title: "Requisition Classification",
    //   desc: requisitionDetail?.matrix?.educationalRequirement,
    // },
  ];

  const Instruction3 = [
    {
      icon: <IconWrapper fontSize="small" icon="business" />,
      title: "Ideal Companies to be sourced from",
      desc: requisitionDetail?.matrix?.idealCompanyCandidates,
    },
    {
      icon: <IconWrapper fontSize="small" icon="rostering" />,
      title: "Sourcing Keywords",
      desc: requisitionDetail?.matrix?.sourcingKeyword,
    },
    {
      icon: <IconWrapper fontSize="small" icon="meeting" />,
      title: "Interview Process",
      desc: "3 Rounds",
    },
  ];
  let Mandatory_skills = (required_skill || []).join(", ");
  const Instruction4 = [
    {
      icon: <IconWrapper fontSize="small" icon="star-employee" />,
      title: "Who is an ideal candidate ?",
      desc: `${requisitionDetail?.matrix?.idealCandidateDescription}`,
    },
    {
      icon: <IconWrapper fontSize="small" icon="skills" />,
      title: "Mandatory Skills Required",
      desc: Mandatory_skills,
    },
  ];
  useEffect(() => {
    if (requisitionDetail) {
      setData1(requisitionDetail);
    }
  }, [requisitionDetail]);
  useEffect(() => {
    if (editRequisitionData) {
      setData1(editRequisitionData);
    }
  }, [editRequisitionData]);

  useEffect(() => {
    setFullPageLoader(true);
    (async () => {
      const body = `?RequisitionId=${requisitionId ? requisitionId : requisitionDetail?.requisitionId
        }`;
      await dispatch(getGetRequisitionDetail(body));
      setFullPageLoader(false);
    })();
    setTimeout(() => {
      setPageTourEnabled(true);
    }, 1000);
  }, []);

  return (
    <>
      {!data1?.requisitionId && (
        <Typography fontWeight={600} marginTop={2} mb={1} fontSize={"22px"}>
          {`Requisition Preview for ${requisitionDetail?.jobTitle}`}
        </Typography>
      )}
      <Grid item xs={12}>
        <Grid container spacing={1}>
          {data?.map((v: any, index: number) => {
            return (
              <>
                <Grid
                  item
                  xl={2.4}
                  lg={2.4}
                  md={3.9}
                  sm={6}
                  xs={6}
                  borderRadius={1.3}
                  boxShadow="none"
                  key={index.toString()}
                >
                  <Item className={classes?.item}>
                    <Grid
                      container
                      wrap="nowrap"
                      justifyContent="center"
                      alignItems="center"
                      gap={0.8}
                      data-intro={v?.intro_key}
                    >
                      <Grid item>{v?.icon}</Grid>
                      <Grid
                        item
                        container
                        direction="column"
                        justifyContent="center"
                      >
                        <Typography
                          color="gray"
                          textAlign="left"
                          fontSize="12px"
                          marginBottom="2px"
                        >
                          {v?.title}
                        </Typography>
                        <Typography
                          color="black"
                          fontWeight="bold"
                          textAlign="left"
                          fontSize="14px"
                        >
                          {v?.desc}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Grid>

      <Grid item xs={12} marginTop={"20px"}>
        <Grid container spacing={1}>
          {dataline?.map((v) => {
            return (
              <>
                <Grid
                  item
                  xl={2.4}
                  lg={2.4}
                  md={3.9}
                  sm={6}
                  xs={6}
                  borderRadius={1.3}
                  boxShadow="none"
                  data-intro={v?.intro_key}
                >
                  <Item className={classes?.item}>
                    <Grid
                      container
                      wrap="nowrap"
                      justifyContent="center"
                      alignItems="center"
                      gap={0.8}
                    >
                      <Grid item>{v?.icon}</Grid>
                      <Grid
                        item
                        container
                        direction="column"
                        justifyContent="center"
                      >
                        <Typography
                          color="gray"
                          textAlign="left"
                          fontSize="12px"
                          marginBottom="2px"
                        >
                          {v?.title}
                        </Typography>
                        <Typography
                          color="black"
                          fontWeight="bold"
                          textAlign="left"
                          fontSize="14px"
                        >
                          {v?.desc}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Grid>

      {requisitionDetail?.jd?.videoJd?.videoLink ||
        requisitionDetail?.jd?.videoJd?.blobFile?.fileUrl ? (
        <Grid spacing={1}>
          <Box bgcolor="white" borderRadius={1.25}>
            <Typography
              variant="h6"
              fontWeight="bold"
              margin="20px 0px 10px 10px"
              paddingTop="15px"
              paddingLeft="10px"
            >
              Video JD
            </Typography>

            <Box padding="20px">
              <iframe
                width="100%"
                height="500"
                src={
                  requisitionDetail?.jd?.videoJd?.videoLink ||
                  requisitionDetail?.jd?.videoJd?.blobFile?.fileUrl
                }
                title="video player"
                frameBorder="0"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Box>
          </Box>
        </Grid>
      ) : null}
      <Grid container spacing={1}>
        <Grid item md={12} xs={12} sm={12}>
          <Box bgcolor="white" borderRadius={1.25} marginTop={"20px"}>
            <Box padding="15px">
              <Box display="flex" alignItems="center" marginBottom="20px">
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  margin="7px 0px 10px 10px"
                >
                  Description
                </Typography>
              </Box>
              <ReadMoreLessHelper htmlNode>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: cleanHtml(
                      requisitionDetail?.jd?.jobDescription,
                      true
                    ),
                  }}
                />
              </ReadMoreLessHelper>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item md={12} xs={12} sm={12}>
          <Box bgcolor="white" borderRadius={1.25} marginTop={"20px"}>
            <Box padding="15px">
              <Box display="flex" alignItems="center" marginBottom="20px">
                <Box component="h3" margin="7px 0px 10px 10px">
                  KPIs and KRis
                </Box>
              </Box>
              <ReadMoreLessHelper htmlNode>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: cleanHtml(
                      requisitionDetail?.jd?.rnR?.kpiHtml,
                      true
                    ),
                  }}
                />
              </ReadMoreLessHelper>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item md={12} xs={12} sm={12}>
          <Box bgcolor="white" borderRadius={1.25} marginTop={"20px"}>
            <Box padding="15px">
              <Box display="flex" alignItems="center" marginBottom="20px">
                <Box component="h3" margin="7px 0px 10px 10px">
                  Responsibilities
                </Box>
              </Box>

              <ReadMoreLessHelper htmlNode>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: cleanHtml(
                      requisitionDetail?.jd?.rnR?.kraHtml,
                      true
                    ),
                  }}
                />
              </ReadMoreLessHelper>
              {/* {Responsibilities?.map((v) => {
                return (
                  <>
                    <Box
                      component="p"
                      margin="7px 0px"
                      display="flex"
                      alignItems="center"
                      paddingLeft="10px"
                    >
                      {v?.title}
                    </Box>
                  </>
                );
              })} */}
            </Box>
          </Box>
        </Grid>
      </Grid>
      {requisitionDetail?.jd?.isVideoResume ? (
        <Grid container spacing={1}>
          <Grid item md={12} xs={12} sm={12}>
            <Box bgcolor="white" borderRadius={1.25}>
              <Typography
                variant="h6"
                fontWeight="bold"
                margin="20px 0px 0px 10px"
                paddingTop="15px"
                paddingLeft="10px"
              >
                Video Resume
              </Typography>
              <Box padding="20px" display="flex" gap={40}>
                <Box>
                  <Box className={classes?.icon}>Category </Box>
                  <Box margin="0px" fontWeight="bold">
                    {requisitionDetail?.jd?.jdQuizDtos?.categoryName}
                  </Box>
                </Box>
                <Box>
                  <Box className={classes?.icon}>Quiz</Box>
                  <Box margin="0px" fontWeight="bold">
                    {requisitionDetail?.jd?.jdQuizDtos?.quiz?.quizName}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      ) : null}

      <Box bgcolor="white" borderRadius={1.25}>
        <Typography
          variant="h6"
          fontWeight="bold"
          margin="20px 0px 0px 10px"
          paddingTop="15px"
          paddingLeft="10px"
        >
          Must have Skills
        </Typography>
        <Box padding=" 0px 20px 20px">
          <Box
            marginBottom="0px"
            paddingTop="15px"
            color={(theme) => theme.palette.bgGray.main}
          >
            Technical Skills (Essential)
          </Box>
          <Stack direction="row" flexWrap="wrap">
            {required_skill &&
              required_skill?.map((val: any, index: number) => {
                return (
                  <Chip
                    className={classes?.techSkill}
                    variant="outlined"
                    sx={{ mr: 1, my: 0.5 }}
                    color="primary"
                    size="small"
                    key={index.toString()}
                    label={val}
                  ></Chip>
                );
              })}
          </Stack>
          <Box
            marginBottom="0px"
            paddingTop="15px"
            color={(theme) => theme.palette.bgGray.main}
          >
            Other skills (Good to have)
          </Box>
          <Stack direction="row" flexWrap="wrap">
            {preferred_skill &&
              preferred_skill?.map((val: any, index: number) => {
                return (
                  <Chip
                    className={classes?.techSkill}
                    variant="outlined"
                    sx={{ mr: 1, my: 0.5 }}
                    color="primary"
                    size="small"
                    key={index.toString()}
                    label={val}
                  ></Chip>
                );
              })}
          </Stack>
        </Box>
      </Box>
      <Grid>
        <Grid
          container
          display="flex"
          justifyContent="space-between"
          spacing={2}
          marginTop="20px"
        >
          <Grid item xs={6} md={6} sm={12}>
            <Box
              bgcolor={(theme) => theme.palette.bgWhite.main}
              borderRadius={1.25}
              data-intro={`${tourName}-step6`}
            >
              <Box padding="15px">
                <Box
                  display="flex"
                  alignItems="center"
                  marginBottom="20px"
                >
                  <Assets
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Z9y3jMBBY62b5TPrtSsQfP9GUyze_uLyGX__WeEdQFTh1g-wNJjxtVVx1VF_6wbuvmU&usqp=CAU"
                    width={27}
                    absolutePath={true}
                  />
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    margin="7px 0px 10px 10px"
                  >
                    Success Tips/ General Remarks
                  </Typography>
                </Box>
                <Box>
                  <ReadMoreLessHelper htmlNode>
                    <Box
                      dangerouslySetInnerHTML={{
                        __html: cleanHtml(
                          requisitionDetail?.jd?.rnR?.generalRemaksHtml,
                          true
                        ),
                      }}
                    />
                  </ReadMoreLessHelper>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} md={6} sm={12}>
            <Box
              bgcolor={(theme) => theme.palette.bgWhite.main}
              borderRadius={1.25}
              padding="15px"
            >
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  margin="7px 0px 10px 10px"
                >
                  Allotment Details
                </Typography>
                <Box
                  padding="10px 10px"
                  // marginBottom="30px"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Box>
                    <Box className={classes?.icon}>Account Manager </Box>
                    <Box fontWeight="bold">Aabhas Bandlish</Box>
                  </Box>
                  <Box>
                    <Box className={classes?.icon}>Coordinator</Box>
                    <Box margin="0px" fontWeight="bold">
                      Roopal
                    </Box>
                  </Box>
                </Box>
                <Box
                  padding="10px 10px"
                  // marginBottom="42px"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Box>
                    <Box className={classes?.icon}>QC Manager</Box>
                    <Box margin="0px" fontWeight="bold">
                      Naman
                    </Box>
                  </Box>
                  <Box>
                    <Box className={classes?.icon}>Partner Manager</Box>
                    <Box margin="0px" fontWeight="bold">
                      Prateek
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid>
        <Box
          marginTop={"20px"}
          bgcolor={(theme) => theme.palette.bgWhite.main}
          borderRadius={1.25}
        >
          <Box padding="15px" data-intro={`${tourName}-step4`}>
            <Typography variant="h6" fontWeight="bold" margin="0px">
              Screening Questions
            </Typography>
            {requisitionDetail?.jd?.questions?.map((e: any, index: number) => {
              return (
                <Box className={classes?.seQus} key={index.toString()}>
                  {e?.question}
                </Box>
              );
            })}
          </Box>{" "}
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box
          bgcolor={(theme) => theme.palette.bgWhite.main}
          borderRadius={1.25}
          marginTop={"20px"}
        >
          <Box padding="15px" data-intro={`${tourName}-step5`}>
            <Typography variant="h6" margin="0px" fontWeight="bold">
              Instruction Input Matrix
            </Typography>
          </Box>{" "}
          <Box padding="15px" display="flex" justifyContent="space-between">
            {Instruction?.map((v) => {
              return (
                <>
                  <Grid
                    container
                    display="flex"
                    justifyContent="space-between"
                    spacing={2}
                    marginBottom="15px"
                  >
                    <Grid item>{v?.icon}</Grid>
                    <Grid item xs>
                      <Typography
                        color={(theme) => theme.palette.bgGray.main}
                        fontSize="14px"
                      >
                        {v?.title}
                      </Typography>
                      <Typography
                        margin="0px"
                        fontWeight="bold"
                        fontSize="15px"
                      >
                        {" "}
                        {v?.desc}{" "}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </Box>
          <Box padding="15px">
            {Instruction2?.map((v) => {
              return (
                <>
                  <Grid
                    container
                    display="flex"
                    justifyContent="space-between"
                    spacing={2}
                    marginBottom="15px"
                  >
                    <Grid item>{v?.icon}</Grid>
                    <Grid item xs>
                      <Typography
                        color={(theme) => theme.palette.bgGray.main}
                        fontSize="14px"
                      >
                        {v?.title}
                      </Typography>
                      <Typography
                        margin="0px"
                        fontWeight="bold"
                        fontSize="15px"
                      >
                        {" "}
                        {v?.desc}{" "}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </Box>
          <Box padding="15px" display="flex" justifyContent="space-between">
            {Instruction3?.map((v: any, index: number) => {
              return (
                <>
                  <Grid
                    container
                    display="flex"
                    justifyContent="space-between"
                    spacing={2}
                    marginBottom="15px"
                    key={index.toString()}
                  >
                    <Grid item>{v?.icon}</Grid>
                    <Grid item xs>
                      <Typography
                        color={(theme) => theme.palette.bgGray.main}
                        fontSize="14px"
                      >
                        {v?.title}
                      </Typography>
                      <Typography
                        margin="0px"
                        fontWeight="bold"
                        fontSize="15px"
                      >
                        {" "}
                        {v?.desc}{" "}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </Box>
          <Box padding="15px" display="flex">
            {Instruction4?.map((v) => {
              return (
                <>
                  <Grid
                    container
                    display="flex"
                    spacing={2}
                    marginBottom="15px"
                  >
                    <Grid item>{v?.icon}</Grid>
                    <Grid item xs>
                      <Typography
                        color={(theme) => theme.palette.bgGray.main}
                        fontSize="14px"
                      >
                        {v?.title}
                      </Typography>
                      <Typography
                        margin="0px"
                        fontWeight="bold"
                        fontSize="15px"
                      >
                        {" "}
                        {v?.desc}{" "}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </Box>
        </Box>
      </Grid>
      <PageTour
        enabled={pageTourEnabled}
        steps={tourSteps}
        initialStep={0}
        onExit={() => { }}
      />
    </>
  );
}
