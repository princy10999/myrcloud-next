import React from "react";
import { DeleteOutlined, FileCopyOutlined } from "@mui/icons-material";
import {
  Switch,
  TextField,
  Box,
  Grid,
  Typography,
  Stack,
  Rating,
  Avatar,
  Chip,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@mui/material";
import PaperContainer from "@components/common/paperContainer";
import Assets from "@components/common/image_container";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { styled } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import ExpereinceEducationCard from "@components/addCandidate/expereinceEducationCard";
import { ParameterRating } from "./screening";
import TextEditor from "@components/common/TextEditor";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import { IconWrapper } from "@components/common/customSvgIcon";
import { useAppSelector } from "@redux/Redux/app/hooks";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getCandidateDetails } from "@redux/Redux/Actions/Candidate";
import { format } from "date-fns";
import cleanHtml from "@lib/cleanHtml";
import { getGetRequisitionDetail } from "@redux/Redux/Actions/PartnerRequisition";
import CustomTooltip from "@components/common/customTooltip";
import Link from "next/link";
import DocPreview from "@components/common/docPreview";
import { getFileIcon } from "@lib/getFileIconName";
import { DocWithPreview } from "@pages/partner/profile";
import { EmailShareButton } from "react-share";
import { EnumCandidateStatus } from "@lib/enum";
import SwitchTitle from "@components/Layout/SwitchTitle";

const useStyles = makeStyles()((theme) => {
  return {
    icon: {
      marginRight: "6px",
      color: theme.palette.bgGray.main,
      height: "35px",
      fontSize: "2rem",
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
    item: {
      height: "70px",
      boxShadow: "none",
      borderRadius: "5px",
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
export default function Preview({
  jdData,
  getCandidateAdditionalDetailsData,
}: any) {
  //Hooks
  const { classes } = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  //State && Data
  const getCandidateDetailsData = useAppSelector(
    (state: any) => state?.partner?.isCreateCandidate?.createCandidateData?.data
  );
  const data = [
    {
      icon: <IconWrapper fontSize="large" icon="birthday" />,
      title: "Date of Birth",
      desc: getCandidateAdditionalDetailsData?.basicInfo?.dateOfBirth ? format(new Date(getCandidateAdditionalDetailsData?.basicInfo?.dateOfBirth), "dd-MM-yyyy") : "",
    },
    {
      icon: <IconWrapper fontSize="large" icon="family" />,
      title: "Marital Status ",
      desc: getCandidateAdditionalDetailsData?.basicInfo?.maritalStatus?.code,
    },
    {
      icon: <IconWrapper fontSize="large" icon="web" />,
      title: "Nationality",
      desc: getCandidateAdditionalDetailsData?.basicInfo?.nationality,
    },
    {
      icon: <IconWrapper fontSize="large" icon="man" />,
      title: "Gender",
      desc: getCandidateAdditionalDetailsData?.basicInfo?.gender?.code,
    },
    {
      icon: <IconWrapper fontSize="large" icon="file-ok" />,
      title: "Serving Notice Period",
      desc: getCandidateAdditionalDetailsData?.basicInfo?.isServingNoticePeriod
        ? "Yes"
        : "No",
    },
    {
      icon: <IconWrapper fontSize="large" icon="calendar" />,
      title: "Notice Period(In Days) ",
      desc: getCandidateAdditionalDetailsData?.basicInfo?.noticePeriodInDays,
    },
    {
      icon: <IconWrapper fontSize="large" icon="clock" />,
      title: "Preferred Time to Connect",
      desc: getCandidateAdditionalDetailsData?.basicInfo?.otherDetails
        ?.preferredTimeToConnect,
    },
    {
      icon: <IconWrapper fontSize="large" icon="geo" />,
      title: "Ex-Employee",
      desc: getCandidateAdditionalDetailsData?.basicInfo?.otherDetails
        ?.preferredTimeToConnect,
    },
    {
      icon: <IconWrapper fontSize="large" icon="geo" />,
      title: "Physically Disabled",
      desc: getCandidateAdditionalDetailsData?.basicInfo?.otherDetails
        ?.isPhysicallyDisabled
        ? "Yes"
        : "No",
    },
    {
      icon: <IconWrapper fontSize="large" icon="business" />,
      title: "Experience",
      desc: getCandidateAdditionalDetailsData?.basicInfo?.yearsOfExperience,
    },
  ];
  const createdDate = (+format(new Date(), "dd")) - (+format(new Date(getCandidateAdditionalDetailsData?.basicInfo?.createdDatetime), "dd"))
  const maxDate = new Date(
    Math.max(
      ...getCandidateAdditionalDetailsData?.educationAndCertificationDetails?.educationAndCertification.map((element:any) => {
        return new Date(element?.endDate);
      }),
    ),
  );
  const latestEducation = getCandidateAdditionalDetailsData?.educationAndCertificationDetails?.educationAndCertification?.filter((e:any) => format(new Date(e?.endDate), "yyyy") === format(new Date(maxDate), "yyyy"))

  React.useEffect(() => {
    const body = `?RequisitionId=${router?.query?.requisitionId}&CandidateId=${router?.query?.candidateId} `;
    {
      router?.query?.candidateId && dispatch(getCandidateDetails(body));
    }
  }, [router?.pathname]);


  return (
    <>
      <Box p={1} pl={0} pt={0}>
        <PaperContainer>
          <Grid container>
            <Grid xs={12} md={2}>
              <Box p={1} pl={0} display="flex">
                <Assets
                  src={`/assets/img/candidate.svg`}
                  className="email_img_verify"
                />
              </Box>
            </Grid>
            <Grid xs={12} md={10} p={1} pl={3}>
              <Box gap={2} display="flex" flexWrap="wrap" alignItems={"center"}>
                <Typography
                  fontSize={22}
                  fontWeight={600}
                  color={(theme) => theme.palette.bgDarkBlack.main}
                >
                  {getCandidateAdditionalDetailsData?.basicInfo?.firstName}{" "}
                  {getCandidateAdditionalDetailsData?.basicInfo?.lastName}
                </Typography>
                <Box color="#2F80ED">
                  <IconWrapper fontSize="small" icon="linkedin" />
                </Box>
                <EmailShareButton
                  url="www.example.com"
                  subject="subject"
                  body={
                    "hey there, pls share my link" +
                    <a href="www.example.com">Link</a>
                  }
                >
                  <Box color={(theme) => theme.palette.bgGray.main}>
                    {" "}
                    <IconWrapper fontSize="small" icon="share" />
                  </Box>
                </EmailShareButton>
                <Box color={(theme) => theme.palette.bgGray.main}>
                  {" "}
                  <IconWrapper fontSize="small" icon="download" />
                </Box>
              </Box>
              <Box mb={1}>
                {/* <Typography
                  fontSize={14}
                  fontWeight={700}
                  color={(theme) => theme.palette.bgGray.main}
                >
                  Assistant Manager - Enterprise Global Channel Partner, EMA
                  Partners
                </Typography> */}
              </Box>
              <Box
                gap={"10px"}
                display="flex"
                flexWrap="wrap"
                alignItems={"center"}
              >
                <Box color={(theme) => theme.palette.bgGray.main}>
                  {" "}
                  <IconWrapper fontSize="small" icon="e-mail" />
                </Box>
                <Typography
                  fontSize={12}
                  fontWeight={400}
                  color={(theme) => theme.palette.bgGray.main}
                >
                  {getCandidateAdditionalDetailsData?.basicInfo?.emailId}
                </Typography>
                <Box color={(theme) => theme.palette.bgGray.main} mt={1}>
                  {" "}
                  <IconWrapper fontSize="small" icon="phone" />
                </Box>
                <Typography
                  fontSize={12}
                  fontWeight={400}
                  color={(theme) => theme.palette.bgGray.main}
                >
                  {getCandidateAdditionalDetailsData?.basicInfo?.mobileNumber}
                </Typography>
                <Box color={(theme) => theme.palette.bgGray.main} mt={1}>
                  {" "}
                  <IconWrapper fontSize="small" icon="geo" />
                </Box>
                <Typography
                  fontSize={12}
                  fontWeight={400}
                  color={(theme) => theme.palette.bgGray.main}
                >
                  {
                    getCandidateAdditionalDetailsData?.basicInfo
                      ?.currentLocation
                  }
                </Typography>
              </Box>
              <Box gap={"10px"} display="flex" alignItems={"center"}>
                <Box color={(theme) => theme.palette.bgGray.main} mt={1}>
                  {" "}
                  <IconWrapper fontSize="small" icon="degree" />
                </Box>
                <Typography
                  fontSize={12}
                  fontWeight={400}
                  color={(theme) => theme.palette.bgGray.main}
                >
                 {latestEducation?.[0]?.degree}
                </Typography>
              </Box>
              <Box gap={"10px"} display="flex" alignItems={"center"}>
                <Box color={(theme) => theme.palette.bgGray.main} mt={1}>
                  {" "}
                  <IconWrapper fontSize="small" icon="finance" />
                </Box>
                <Typography
                  fontSize={12}
                  fontWeight={400}
                  color={(theme) => theme.palette.bgGray.main}
                >
                  Current:{" "}
                  {
                    getCandidateAdditionalDetailsData?.basicInfo?.otherDetails
                      ?.currentSalary
                  }{" "}
                  LPA | Expected:{" "}
                  {
                    getCandidateAdditionalDetailsData?.basicInfo?.otherDetails
                      ?.expectedSalary
                  }{" "}
                  LPA
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </PaperContainer>
      </Box>
      <Box
        display={"flex"}
        justifyContent="space-between"
        mt={2}
        p={2}
        sx={{
          backgroundColor: "#FAFAFA",
          border: "1px solid #DDDDDD",
          borderRadius: "5px",
        }}
      >
        <Grid container xs={12} md={10}>
          <Box alignItems="center">
            <Box gap={2}>
              <Typography
                fontSize={14}
                fontWeight={400}
                color={(theme) => theme.palette.bgGray.main}
              >
                Current Applied Position Details
              </Typography>
              <Box mb={1}>
                <Typography
                  fontSize={14}
                  fontWeight={700}
                  color={(theme) => theme.palette.bgDarkBlack.main}
                >
                  {jdData?.jd?.jobTitle}
                </Typography>
                <Typography
                  fontSize={14}
                  fontWeight={400}
                  color={(theme) => theme.palette.bgBlack.main}
                >
                  {jdData?.jd?.client?.clientName}
                </Typography>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  gap={30}
                  alignItems="center"
                >
                  <Typography
                    display="flex"
                    fontSize={14}
                    fontWeight={400}
                    color={(theme) => theme.palette.bgDarkBlack.main}
                  >
                    {jdData?.jd?.location}
                    {/* <Typography
                      fontSize={14}
                      fontWeight={400}
                      color={(theme) => theme.palette.bgGray.main}
                    >
                      Bangalore
                    </Typography> */}
                  </Typography>
                </Box>
                <Box mt={1} gap={2} display={"flex"}>
                  <Grid
                    item
                    xs
                    color={(theme) => theme.palette.bgLightGreen.main}
                    fontSize={16}
                    display="flex"
                    alignItems="center"
                    paddingRight={0.5}
                  >
                    <FiberManualRecordIcon />
                    <Grid item xs>
                      <Typography
                        component="p"
                        color={(theme) => theme.palette.bgLightGreen.main}
                        paddingRight={2}
                        fontWeight={500}
                      >
                        {getCandidateAdditionalDetailsData?.basicInfo?.candidateStatus === EnumCandidateStatus?.SaveAsDraft && "Save As Draft"}
                        {getCandidateAdditionalDetailsData?.basicInfo?.candidateStatus === EnumCandidateStatus?.Active && "Active"}
                        {getCandidateAdditionalDetailsData?.basicInfo?.candidateStatus === EnumCandidateStatus?.InActive && "InActive"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography
                    fontSize={14}
                    fontWeight={400}
                    color={(theme) => theme.palette.bgBlack.main}
                  >
                    Created {(createdDate === 0 || !createdDate) ? "Today" : `${createdDate} days ago`}
                  </Typography>
                </Box>
                {/* <Typography
                  mt={1}
                  display="flex"
                  fontSize={14}
                  fontWeight={400}
                  color={(theme) => theme.palette.bgGray.main}
                >
                  Shared to:{" "}
                  <Typography
                    fontSize={14}
                    fontWeight={400}
                    color={(theme) => theme.palette.bgDarkBlack.main}
                  >
                    {" "}
                    Beyond Careers Consultants
                  </Typography>
                </Typography> */}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid container flexWrap={"wrap"} xs={12} md={4}>
          <Box
            display="flex"
            color={(theme) => theme.palette.bgBlue.main}
            mt={5}
            gap={"10px"}
          >
            {" "}
            <a
              className="downloadButton"
              href={getCandidateAdditionalDetailsData?.basicInfo?.resume}
              target="_black"
              download={getCandidateAdditionalDetailsData?.basicInfo?.resume}
            >
              <IconWrapper fontSize="small" icon="download" />
              <Typography fontSize={16} fontWeight={400} ml={0.4}>
                Download Resume
              </Typography>
            </a>
          </Box>
        </Grid>
      </Box>
      <Grid item xs={12} mt={2}>
        <Grid container spacing={2}>
          {data?.map((v) => {
            return (
              <>
                {/* {v?.desc &&  */}
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={3.9}
                  sm={12}
                  xs={12}
                  borderRadius={1.3}
                  boxShadow="none"
                >
                  <Item className={classes?.item}>
                    <Grid
                      container
                      wrap="nowrap"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid item className={classes?.icon}>
                        {v?.icon}
                      </Grid>
                      <Grid
                        item
                        container
                        direction="column"
                        justifyContent="center"
                      >
                        <Typography
                          color={(theme) => theme.palette.bgGray.main}
                          textAlign="left"
                          fontSize="14px"
                          marginBottom="2px"
                        >
                          {v?.title}
                        </Typography>
                        <Typography
                          color={(theme) => theme.palette.bgBlack.main}
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
                {/* } */}
              </>
            );
          })}
        </Grid>
      </Grid>
      {/* <Grid spacing={1}>
        <Box
          bgcolor={(theme) => theme.palette.bgWhite.main}
          borderRadius={"10px"}
        >
          <Typography
            fontWeight={600}
            marginTop={3}
            mb={1}
            fontSize={"18px"}
            paddingTop="15px"
            paddingLeft="18px"
          >
            Video Resume
          </Typography>
          <Box
            display="flex"
            color={(theme) => theme.palette.bgGray.main}
            paddingLeft="15px"
          >
            <IconWrapper fontSize="small" icon="information" />
            <Typography
              variant="caption"
              marginLeft={"8px"}
              color={(theme) => theme.palette.bgGray.main}
            >
              Amet minim mollit non deserunt ullamco est sit aliqua dolor
            </Typography>
          </Box>
          <Box padding="20px">
            <iframe
              width="100%"
              height="500"
              src="https://www.youtube.com/embed/8rjHC9A6wLo"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
        </Box>
      </Grid> */}
      <Grid spacing={1}>
        {getCandidateAdditionalDetailsData?.basicInfo?.resume && (
          <Box
            bgcolor={(theme) => theme.palette.bgWhite.main}
            borderRadius={"5px"}
            mt={3}
          >
            <Box
              display={"flex"}
              alignItems="center"
              p={2}
              gap={"10px"}
              justifyContent={"space-between"}
            >
              <Typography fontWeight={600} mb={1} fontSize={"22px"}>
                Resume
              </Typography>
              <Box
                display="flex"
                color={(theme) => theme.palette.primary.main}
                gap={0.5}
              >
                <a
                  className="downloadButton"
                  href={getCandidateAdditionalDetailsData?.basicInfo?.resume}
                  target="_black"
                  download={
                    getCandidateAdditionalDetailsData?.basicInfo?.resume
                  }
                >
                  <IconWrapper fontSize="small" icon="download" />
                  <Typography fontSize={14} fontWeight={400} ml={0.4}>
                    Download
                  </Typography>
                </a>
              </Box>
            </Box>
            <Box p={2}>
              <iframe
                width="100%"
                height="500"
                src={getCandidateAdditionalDetailsData?.basicInfo?.resume}
                title="Resume"
                allowFullScreen
              ></iframe>
            </Box>
          </Box>
        )}
      </Grid>
      <Grid spacing={1}>
        <Box
          bgcolor={(theme) => theme.palette.bgWhite.main}
          borderRadius={"5px"}
          mt={3}
        >
          <Box alignItems="center" p={2} gap={2}>
            <Typography fontWeight={600} mb={2} fontSize={"22px"}>
              Experience
            </Typography>
            <Divider />
            {getCandidateAdditionalDetailsData && getCandidateAdditionalDetailsData?.experienceDetails?.experience?.length > 0
              ? getCandidateAdditionalDetailsData?.experienceDetails?.experience?.map((item: any, i: any) => {
                return (
                  <ExpereinceEducationCard
                    hideEdit={true}
                    key={i}
                    isEducation={item?.isEducation}
                    jobTitle={item?.jobTitle}
                    Designation={item?.employmentType}
                    institutionName={item?.companyName}
                    duration={`${item.startDate && format(new Date(item.startDate), "dd/MM/yyyy")} to ${item.endDate && format(new Date(item.endDate), "dd/MM/yyyy")}`}
                    location={item?.location}
                    description={item?.description}
                  />
                );
              })
              : ""}
          </Box>
        </Box>
      </Grid>
      <Grid spacing={1}>
        <Box
          bgcolor={(theme) => theme.palette.bgWhite.main}
          borderRadius={"5px"}
          mt={3}
        >
          <Box alignItems="center" p={2} gap={2}>
            <Typography fontWeight={600} mb={2} fontSize={"22px"}>
              Certification and education
            </Typography>
            <Divider />
            {getCandidateAdditionalDetailsData && getCandidateAdditionalDetailsData?.educationAndCertificationDetails?.educationAndCertification.length > 0 ? getCandidateAdditionalDetailsData?.educationAndCertificationDetails?.educationAndCertification.map((item: any, i: any) => {
              return (
                <ExpereinceEducationCard
                  hideEdit={true}
                  key={i}
                  isEducation={true}
                  institutionName={item?.name}
                  courseName={item?.degree}
                  grade={item.grade}
                  skill={item.skills}
                  duration={`${item.startDate && format(new Date(item.startDate), "dd/MM/yyyy")} to ${item.endDate && format(new Date(item.endDate), "dd/MM/yyyy")}`}
                  location={item?.location}
                  description={item?.description}
                />
              );
            })
              : ""}
            <Stack direction={"column"} marginTop={2}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography fontWeight={600}>Gap in Education</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  {/* <Typography>No</Typography>
                  <Switch checked={getCandidateAdditionalDetailsData?.educationAndCertificationDetails?.isGapInEducation ? true : false} readOnly />
                  <Typography>Yes</Typography> */}
                  <SwitchTitle
                  checked={getCandidateAdditionalDetailsData?.educationAndCertificationDetails?.isGapInEducation ? true : false} readOnly={true}
                  switchName1="No" switchName2="Yes"/>

                </Stack>
              </Stack>
              <Stack
                direction={"row"}
                marginTop={1}
                marginBottom={2}
                alignItems={"center"}
              >
                <IconWrapper fontSize="small" icon="information" />
                <Typography
                  variant="caption"
                  color={(theme) => theme.palette.bgGray.main}
                  marginLeft={"8px"}
                >
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequa
                </Typography>
              </Stack>
              <Box
                dangerouslySetInnerHTML={{
                  __html: cleanHtml(
                    getCandidateAdditionalDetailsData
                      ?.educationAndCertificationDetails
                      ?.gapInEducationDescription,
                    true
                  ),
                }}
              />
              {/* <TextField size="small" fullWidth rows={1} multiline /> */}
            </Stack>
          </Box>
        </Box>
      </Grid>
      <Grid spacing={1}>
        <Box
          bgcolor={(theme) => theme.palette.bgWhite.main}
          borderRadius={"5px"}
          mt={3}
        >
          <Box alignItems="center" p={2} gap={2}>
            <Typography fontWeight={600} mb={2} fontSize={"22px"}>
              Candidate Address
            </Typography>
            <Divider />
            <Box display={"flex"} flexWrap="wrap" mt={2}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Typography
                  fontWeight={500}
                  mb={2}
                  fontSize={"18px"}
                  color={(theme) => theme.palette.bgBlack.main}
                >
                  Current
                </Typography>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Typography
                    flexWrap={"wrap"}
                    fontWeight={400}
                    mb={2}
                    fontSize={"16px"}
                    color="#000000"
                  >
                    {getCandidateAdditionalDetailsData?.address?.presentAddress
                      ?.address +
                      "," +
                      getCandidateAdditionalDetailsData?.address?.presentAddress
                        ?.city +
                      "," +
                      getCandidateAdditionalDetailsData?.address?.presentAddress
                        ?.state +
                      "," +
                      getCandidateAdditionalDetailsData?.address?.presentAddress
                        ?.country +
                      "-" +
                      getCandidateAdditionalDetailsData?.address?.presentAddress
                        ?.pinCode}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                {(!getCandidateAdditionalDetailsData?.address?.permanentAddress?.sameAsPresent && getCandidateAdditionalDetailsData?.address
                          ?.permanentAddress?.address) && <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Typography
                    fontWeight={500}
                    mb={2}
                    fontSize={"18px"}
                    color={(theme) => theme.palette.bgBlack.main}
                  >
                    Permanent
                  </Typography>
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Typography
                      flexWrap={"wrap"}
                      fontWeight={400}
                      mb={2}
                      fontSize={"16px"}
                      color="#000000"
                    >
                      {getCandidateAdditionalDetailsData?.address
                        ?.permanentAddress?.sameAsPresent
                        ? getCandidateAdditionalDetailsData?.address
                          ?.presentAddress?.address +
                        "," +
                        getCandidateAdditionalDetailsData?.address
                          ?.presentAddress?.city +
                        "," +
                        getCandidateAdditionalDetailsData?.address
                          ?.presentAddress?.state +
                        "," +
                        getCandidateAdditionalDetailsData?.address
                          ?.presentAddress?.country +
                        "-" +
                        getCandidateAdditionalDetailsData?.address
                          ?.presentAddress?.pinCode
                        : getCandidateAdditionalDetailsData?.address
                          ?.permanentAddress?.address +
                        "," +
                        getCandidateAdditionalDetailsData?.address
                          ?.permanentAddress?.city +
                        "," +
                        getCandidateAdditionalDetailsData?.address
                          ?.permanentAddress?.state +
                        "," +
                        getCandidateAdditionalDetailsData?.address
                          ?.permanentAddress?.country +
                        "-" +
                        getCandidateAdditionalDetailsData?.address
                          ?.permanentAddress?.pinCode}
                    </Typography>
                  </Grid>
                </Grid>}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid spacing={1}>
        <Box
          bgcolor={(theme) => theme.palette.bgWhite.main}
          borderRadius={"10px"}
        >
          <Typography
            fontWeight={600}
            marginTop={3}
            mb={1}
            fontSize={"18px"}
            paddingTop="15px"
            paddingLeft="18px"
          >
            Documents
          </Typography>
          <Box
            display="flex"
            color={(theme) => theme.palette.bgGray.main}
            paddingLeft="15px"
          >
            <IconWrapper fontSize="small" icon="information" />
            <Typography
              variant="caption"
              marginLeft={"8px"}
              color={(theme) => theme.palette.bgGray.main}
              mb={2}
            >
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequa
            </Typography>
          </Box>
          <Divider />
          <Box mt={1} p={2}>
            <Grid container spacing={2}>
              {getCandidateAdditionalDetailsData?.candidateDocuments?.map(
                (item: any, idx: number) => (
                  <Grid key={idx} item md={4} xs={12}>
                    <DocWithPreview
                      docArray={item.file.length > 0 ? item.file : []}
                      src={item.file.length > 0 ? item.file[0].fileUrl : ""}
                      docName={item.documentName}
                    // canEdit={!isVerify}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </Box>
          {/* {getCandidateAdditionalDetailsData?.candidateDocuments?.map((e: any) => {
            return (
              <>
                {e?.file?.[0]?.fileName && <Box color={(theme) => theme.palette.bgGray.main} p={3}>
                  <Typography
                    display={"flex"}
                    fontWeight={700}
                    fontSize={"14px"}
                    color={(theme) => theme.palette.bgDarkBlack.main}
                  >
                    {e?.documentName} <Typography color="#EF627A">*</Typography>
                  </Typography>
                  <Stack
                    direction={"row"}
                    border={"1px solid"}
                    borderColor={(theme) => theme.palette.grey[300]}
                    borderRadius={"5px"}
                    marginTop={2}
                    padding={3}
                  >
                    <FileCopyOutlined fontSize="large" color="disabled" />
                    <Stack direction={"column"} marginLeft={2}>
                      <Typography
                        variant="subtitle1"
                        color={(theme) => theme.palette.bgDarkBlack.main}
                        fontWeight={600}
                        fontSize={"16px"}
                      >
                        {e?.file?.[0]?.fileName}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>}
              </>
            )
          })} */}
          <Divider />
        </Box>
      </Grid>
      <Grid spacing={1}>
        <Box
          bgcolor={(theme) => theme.palette.bgWhite.main}
          borderRadius={"5px"}
          mt={3}
        >
          <Box alignItems="center" p={2} gap={2}>
            <Typography fontWeight={600} mb={2} fontSize={"22px"}>
              Screening Questions
            </Typography>
            <Box display="flex" color={(theme) => theme.palette.bgGray.main}>
              <IconWrapper fontSize="small" icon="information" />
              <Typography
                variant="caption"
                marginLeft={"8px"}
                color={(theme) => theme.palette.bgGray.main}
                mb={2}
              >
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequa
              </Typography>
            </Box>
            <Divider />
            {getCandidateAdditionalDetailsData?.additionalDetails?.screeningQuestion?.map(
              (e: any, index: number) => {
                return (
                  <Box mt={1} mb={1} key={index.toString()}>
                    <Typography
                      display="flex"
                      variant="caption"
                      fontSize={14}
                      fontWeight={700}
                      color={(theme) => theme.palette.bgBlack.main}
                      mb={2}
                      style={{
                        lineBreak: "anywhere",
                      }}
                    >
                      {e?.question}
                      {/* <Typography color="red"> *</Typography> */}
                    </Typography>

                    <Box p={1} pt={0}>
                      <Typography
                        variant="caption"
                        fontSize={12}
                        fontWeight={400}
                        color={(theme) => theme.palette.bgBlack.main}
                        mb={2}
                        style={{
                          lineBreak: "anywhere",
                        }}
                      >
                        {e?.answer}
                      </Typography>
                    </Box>
                  </Box>
                );
              }
            )}
            {/* <Box mt={1} mb={1}>
              <Typography display="flex"
                variant="caption"
                fontSize={14} fontWeight={700}
                color={(theme) => theme.palette.bgBlack.main} mb={2}
              >
                Are you willing to relocate? <Typography color="red"> *</Typography>
              </Typography>

              <Box p={1} pt={0}>
                <Typography
                  variant="caption"
                  fontSize={12} fontWeight={400}
                  color={(theme) => theme.palette.bgBlack.main} mb={2}
                >
                  Yes
                </Typography>
              </Box>
              </Box>
            <Box mt={1} mb={1}>
              <Typography display="flex"
                variant="caption"
                fontSize={14} fontWeight={700}
                color={(theme) => theme.palette.bgBlack.main} mb={2}
              >
                Why are you leaving your current job?<Typography color="red"> *</Typography>
              </Typography>
              <Box p={1} pt={0}>
                <Typography
                  variant="caption"
                  fontSize={12} fontWeight={400}
                  color={(theme) => theme.palette.bgBlack.main} mb={2}
                >
                  {`I feel like I'm ready to take on more responsibility. I believe I've progressed as far as I can in my current role. I need a change of environment to motivate me.`}
                </Typography>
              </Box>
              </Box> */}
            {/* <Grid item xs={12} marginTop={1}>
              <TextFieldComponent fontWeight={700}
                text=" What are your key strengths? "
                type="text"
                width="100%"
                name="que"
                value="Creativity, originality, open-mindedness, detail-oriented."
                valid
              />
            </Grid> */}
            <Stack direction="column" marginTop={3}>
              <Typography
                variant="subtitle1"
                fontSize={"18px"}
                fontWeight={"bold"}
              >
                Candidate Rating
              </Typography>
              <Grid container xs={12} marginTop={1}>
                {getCandidateAdditionalDetailsData?.additionalDetails?.candidateRating?.map(
                  (item: any, i: number) => {
                    return (
                      <ParameterRating
                        key={i}
                        param={item?.ratingType}
                        rate={item?.rating}
                      />
                    );
                  }
                )}
              </Grid>
              <Grid item xs={8} marginTop={2}>
                <Stack direction={"row"} alignItems={"center"}>
                  <Grid item md={4} xs={8}>
                    <Typography
                      variant="subtitle1"
                      fontSize={"18px"}
                      fontWeight={"bold"}
                    >
                      Overall Rating
                    </Typography>
                  </Grid>
                  <Grid item md={4} xs={8}>
                    <Rating
                      value={
                        getCandidateAdditionalDetailsData?.additionalDetails
                          ?.overallRating
                      }
                      readOnly
                    />
                  </Grid>
                </Stack>
              </Grid>
            </Stack>
          </Box>
        </Box>
      </Grid>
      <Grid spacing={1}>
        <Box
          bgcolor={(theme) => theme.palette.bgWhite.main}
          borderRadius={"5px"}
          mt={3}
        >
          <Box alignItems="center" p={2} gap={2}>
            <Typography fontWeight={600} mb={2} fontSize={"22px"}>
              Candidate Story
            </Typography>
            <Box
              display="flex"
              color={(theme) => theme.palette.bgGray.main}
              mb={2}
            >
              <IconWrapper fontSize="small" icon="information" />
              <Typography
                variant="caption"
                marginLeft={"8px"}
                color={(theme) => theme.palette.bgGray.main}
              >
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequa
              </Typography>
            </Box>
            <Divider />
            <Box
              dangerouslySetInnerHTML={{
                __html: cleanHtml(
                  getCandidateAdditionalDetailsData?.additionalDetails
                    ?.candidateStory,
                  true
                ),
              }}
            />
            {/* <TextEditor /> */}
            {/* <Typography
              display="flex" justifyContent="flex-end"
              variant="caption"
              color={"textSecondary"}
            >
              1000 characters left
            </Typography> */}
          </Box>
        </Box>
      </Grid>
    </>
  );
}
