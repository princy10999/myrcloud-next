import ExpereinceEducationCard from "@components/addCandidate/expereinceEducationCard";
import { ParameterRating } from "@components/addCandidate/screening";
import VideoResume from "@components/candidate-step-1/video-resume-step-3";
import Screening from "@components/candidate-step-2/screening-step-1";
import { IconWrapper } from "@components/common/customSvgIcon";
import StyledTabs from "@components/common/styledTabs";
import TabPanel from "@components/common/tabPanelComponent";
import TextEditor from "@components/common/TextEditor";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  timelineItemClasses,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Rating,
  Slider,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "tss-react/mui";
import FileContainer from "./fileContainer";
const useStyles = makeStyles()((theme) => {
  return {
    customWidthDrawer: {
      width: "60%",
    },
  };
});
export type ViewCandidateDetialsDrawerProps = {
  open?: boolean;
  handleClose?: React.MouseEventHandler;
};

export default function ViewCandidateDetialsDrawer({
  open,
  handleClose,
}: ViewCandidateDetialsDrawerProps) {
  const { classes } = useStyles();
  const [value, setValue] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor={"right"}
      classes={{ paper: classes?.customWidthDrawer }}
    >
      <Box
        sx={{
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            fontSize: "14px",
            position: "absolute",
            top: 0,
            right: 0,
          }}
          onClick={handleClose}
        >
          <IconWrapper fontSize="inherit" icon="wrong" color="primary" />
        </IconButton>
        <Stack
          direction="row"
          padding={3}
          bgcolor={(theme) => theme.palette.bgLightGray.main}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction="row" alignItems={"center"}>
            <Box
              sx={{
                position: "relative",
              }}
            >
              <Avatar
                sx={{
                  height: "50px",
                  width: "50px",
                }}
                alt="Cindy Baker"
                src="/static/images/avatar/3.jpg"
              />
              <Box
                sx={{
                  backgroundColor: (theme) => theme.palette.bgTrendGreen.main,
                  color: (theme) => theme.palette.success.main,
                  fontSize: "10px",
                  fontWeight: "bold",
                  borderRadius: "50px",
                  textAlign: "center",
                  padding: "0px 8px",
                  position: "absolute",
                  bottom: -5,
                  left: 0,
                  right: 0,
                }}
              >
                Active
              </Box>
            </Box>
            <Typography fontSize={"18px"} fontWeight={600} marginLeft={2}>
              Erik Carlsom
            </Typography>
            <Typography
              variant="subtitle2"
              color={"textSecondary"}
              fontWeight={700}
              marginLeft={2}
              marginRight={2}
            >
              Rating 4
            </Typography>
            <Rating readOnly value={4} size="small"></Rating>
          </Stack>
          <Stack direction={"row"}>
            <IconButton
              sx={{
                backgroundColor: (theme) => theme.palette.bgWhite.main,
                margin: "4px",
              }}
            >
              <IconWrapper fontSize="small" icon="next-arrow" color="primary" />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: (theme) => theme.palette.bgWhite.main,
                margin: "4px",
              }}
            >
              <IconWrapper fontSize="small" icon="wrong" color="error" />
            </IconButton>
            {/* <IconButton
              sx={{
                backgroundColor: (theme) => theme.palette.bgWhite.main,
                margin: "4px",
              }}
            >
              <IconWrapper fontSize="small" icon="error" color="inherit" />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: (theme) => theme.palette.bgWhite.main,
                margin: "4px",
              }}
            >
              <IconWrapper fontSize="small" icon="database" color="warning" />
            </IconButton> */}
            <IconButton
              sx={{
                backgroundColor: (theme) => theme.palette.bgWhite.main,
                color: (theme) => theme.palette.bgPurple.main,
                margin: "4px",
              }}
            >
              <IconWrapper fontSize="small" icon="tag" color="inherit" />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: (theme) => theme.palette.bgWhite.main,
                color: (theme) => theme.palette.bgBlue.main,
                margin: "4px",
              }}
            >
              <IconWrapper fontSize="small" icon="e-mail" color="inherit" />
            </IconButton>
          </Stack>
        </Stack>
        <StyledTabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
        >
          <Tab label="Resume" value={0} />
          <Tab label="Candidate Preview" value={1} />
          <Tab label="Documents" value={2} />
          <Tab label="Activity" value={3} />
          <Tab label="Fitment" value={4} />
        </StyledTabs>
        <Divider />
        <TabPanel value={value} index={0}>
          <ResumePreview />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CandidatePreview />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DocumentSection />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <CandidateActivity />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <CandidateFitment />
        </TabPanel>
      </Box>
    </Drawer>
  );
}

const ResumePreview = () => {
  return (
    <Box>
      <Stack
        direction={"row"}
        sx={{
          float: "right",
        }}
      >
        {" "}
        <Button
          disableElevation
          size="small"
          variant={"text"}
          sx={{
            marginLeft: "8px",
            marginRight: "8px",
          }}
          startIcon={
            <IconWrapper fontSize="inherit" icon="download" color="inherit" />
          }
        >
          Download
        </Button>
      </Stack>
      {/* <DocPreview
        link={docArray[currIndex].fileUrl}
        iconName={getFileIcon({ fileName: docArray[currIndex].fileName })}
        octateFile={false}
      ></DocPreview> */}
    </Box>
  );
};

const CandidatePreview = () => {
  const pastExperiences = [
    {
      isEducation: false,
      Designation: "UI/UX Designer",
      institutionName: "Relevel by Unacademy · Full-time",
      duration: "Apr 2019 - Present · 3 yrs 6 mos",
      location: "Bangalore Area, India",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
    },
    {
      isEducation: false,
      Designation: "Creative Designer",
      institutionName: "Vmoksha Technologies Pvt. Ltd",
      duration: "Jan 2018 - Mar 2019 · 1 yr 3 mos",
      location: "Bangalore Area, India",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
    },
  ];

  const educationHistory = [
    {
      grade: "Grade: First Class (70%)",
      isEducation: true,
      courseName:
        "Bachelor of Engineering (BE), Electronics and Communications Engineering",
      institutionName: "KPR Institute of Engineering and Technology",
      duration: "2009 - 2013",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
    },
  ];
  return (
    <Box>
      <Stack direction={"row"} alignItems={"center"}>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Avatar
            sx={{
              height: "100px",
              width: "100px",
            }}
            alt="Cindy Baker"
            src="/static/images/avatar/3.jpg"
          />

          <IconButton
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.bgWhite.main,
              fontSize: "16px",
              height: "30px",
              width: "30px",
              position: "absolute",
              bottom: -5,
              left: 0,
              right: 0,
            }}
          >
            <IconWrapper fontSize="inherit" icon="edit" color="inherit" />
          </IconButton>
        </Box>
        <Stack direction={"column"} marginLeft={2}>
          <Typography variant="subtitle1" fontWeight={"bold"}>
            Erik Carlsom
          </Typography>
          <Typography
            variant="caption"
            color={"textSecondary"}
            fontWeight={"bold"}
          >
            Assistant Manager - Enterprise Global Channel Partner, EMA Partners
          </Typography>
          <Stack direction={"row"}>
            <TextWithIcon iconName="e-mail" value="erikcarl06@gmail.com" />
            <TextWithIcon iconName="phone" value="+91- 9004 7766 33" />
            <TextWithIcon iconName="geo" value="Mumbai" />
          </Stack>
          <TextWithIcon iconName="degree" value="MBA in Human Resources" />
          <TextWithIcon
            iconName="finance"
            value="Current: 8LPA | Expected: 12LPA"
          />
        </Stack>
      </Stack>
      <Box
        bgcolor={(theme) => theme.palette.bgLightGray.main}
        border={"1px solid #DDDDDD"}
        marginTop={3}
        borderRadius={"5px"}
        padding={1}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Stack direction={"column"} marginLeft={2}>
          <Typography variant="subtitle2" color={"textSecondary"}>
            Current Applied Position Details
          </Typography>
          <Typography variant="subtitle2" fontWeight={700} marginTop={1}>
            Assistant Store Manager (7587)
          </Typography>
          <Typography variant="subtitle2" color={"textSecondary"} marginTop={1}>
            DMart India, Bangalore{" "}
          </Typography>
          <Stack direction={"row"} alignItems={"center"} marginTop={1}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              marginRight={2}
              fontSize={"10px"}
            >
              <IconWrapper
                fontSize="inherit"
                icon="filled-circle"
                color="primary"
              />
              <Typography variant="body2" color={"primary"} marginLeft={1}>
                Active
              </Typography>
            </Stack>
            <Typography variant="body2" color={"textSecondary"}>
              Created 25 days ago
            </Typography>
          </Stack>
          <Typography variant="body2" color={"textSecondary"} marginTop={1}>
            Shared To: Beyond Careers Consultants
          </Typography>
        </Stack>
        <Button
          sx={{
            color: (theme) => theme.palette.bgBlue.main,
          }}
          size="small"
          startIcon={
            <IconWrapper fontSize="small" icon="download" color="inherit" />
          }
        >
          Download JD
        </Button>
      </Box>
      <Grid container xs={12} marginTop={3} spacing={1}>
        <Grid item xs={12} md={3}>
          <BoxWithIconValue
            fieldName="Date Of Birth"
            iconName="birthday"
            value="23/11/1995"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <BoxWithIconValue
            fieldName="Marital Status"
            iconName="family"
            value="Unmarried"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <BoxWithIconValue
            fieldName="Nationality"
            iconName="web"
            value="Indian"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <BoxWithIconValue fieldName="Gender" iconName="man" value="male" />
        </Grid>
        <Grid item xs={12} md={4}>
          <BoxWithIconValue
            fieldName="Serving Notice Period"
            iconName="file-ok"
            value="Yes"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <BoxWithIconValue
            fieldName="Notice Period(In Days)"
            iconName="calendar"
            value="45"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <BoxWithIconValue
            fieldName="Preferred Time to Connect"
            iconName="clock"
            value="2.30 - 3.30"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <BoxWithIconValue fieldName="Ex-Employee" iconName="geo" value="No" />
        </Grid>
        <Grid item xs={12} md={3}>
          <BoxWithIconValue
            fieldName="Physically Disabled"
            iconName="geo"
            value="No"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <BoxWithIconValue
            fieldName="Experience"
            iconName="business"
            value="2.8 Years"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <BoxWithIconValue
            fieldName="Relevant Experience"
            iconName="business"
            value="2.3 Years"
          />
        </Grid>
      </Grid>
      <Box marginTop={2}>
        <Typography variant="h6" fontWeight={"bold"} marginBottom={1}>
          Video Resume
        </Typography>
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/8rjHC9A6wLo"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Box>
      <Box marginTop={3}>
        <Typography variant="h6" fontWeight={"bold"} marginBottom={1}>
          Experience
        </Typography>
        <Divider />
        {pastExperiences && pastExperiences.length > 0
          ? pastExperiences.map((item, i) => {
              return (
                <ExpereinceEducationCard
                  key={i}
                  isEducation={item.isEducation}
                  Designation={item.Designation}
                  institutionName={item.institutionName}
                  duration={item.duration}
                  location={item.location}
                  description={item.description}
                  hideEdit={true}
                />
              );
            })
          : ""}
      </Box>
      <Box marginTop={3}>
        <Typography variant="h6" fontWeight={"bold"} marginBottom={1}>
          Education
        </Typography>
        <Divider />
        {educationHistory && educationHistory.length > 0
          ? educationHistory.map((item, i) => {
              return (
                <ExpereinceEducationCard
                  key={i}
                  isEducation={item.isEducation}
                  courseName={item.courseName}
                  institutionName={item.institutionName}
                  duration={item.duration}
                  grade={item.grade}
                  description={item.description}
                  hideEdit={true}
                />
              );
            })
          : ""}
      </Box>
      <Box marginTop={3}>
        <Typography variant="h6" fontWeight={"bold"} marginBottom={1}>
          Screening Questions
        </Typography>
        <Divider />
        <Box mt={1} mb={1}>
          <Typography
            display="flex"
            variant="caption"
            fontSize={14}
            fontWeight={700}
            color={(theme) => theme.palette.bgBlack.main}
            mb={2}
          >
            How would you describe your management style?
            <Typography color="red"> *</Typography>
          </Typography>

          <Box p={1} pt={0}>
            <Typography
              variant="caption"
              fontSize={12}
              fontWeight={400}
              color={(theme) => theme.palette.bgBlack.main}
              mb={2}
            >
              {`I'm always working to push myself out of my comfort level and I enjoy doing the same with my employees. They are often capable of achieving many challenging obstacles, so I use my transformational management style to help guide them through this challenging task when needed.`}
            </Typography>
          </Box>
        </Box>

        <Box mt={1} mb={1}>
          <Typography
            display="flex"
            variant="caption"
            fontSize={14}
            fontWeight={700}
            color={(theme) => theme.palette.bgBlack.main}
            mb={2}
          >
            Are you willing to relocate? <Typography color="red"> *</Typography>
          </Typography>

          <Box p={1} pt={0}>
            <Typography
              variant="caption"
              fontSize={12}
              fontWeight={400}
              color={(theme) => theme.palette.bgBlack.main}
              mb={2}
            >
              Yes
            </Typography>
          </Box>
        </Box>

        <Box mt={1} mb={1}>
          <Typography
            display="flex"
            variant="caption"
            fontSize={14}
            fontWeight={700}
            color={(theme) => theme.palette.bgBlack.main}
            mb={2}
          >
            Why are you leaving your current job?
            <Typography color="red"> *</Typography>
          </Typography>

          <Box p={1} pt={0}>
            <Typography
              variant="caption"
              fontSize={12}
              fontWeight={400}
              color={(theme) => theme.palette.bgBlack.main}
              mb={2}
            >
              {`I feel like I'm ready to take on more responsibility. I believe I've progressed as far as I can in my current role. I need a change of environment to motivate me.`}
            </Typography>
          </Box>
        </Box>

        <Grid item xs={12} marginTop={1}>
          <TextFieldComponent
            fontWeight={700}
            text=" What are your key strengths? "
            type="text"
            width="100%"
            name="que"
            value="Creativity, originality, open-mindedness, detail-oriented."
            // onChange={handleChangeInput}
            valid
          />
        </Grid>

        <Stack direction="column" marginTop={3}>
          <Typography variant="subtitle1" fontSize={"18px"} fontWeight={500}>
            Candidate Rating
          </Typography>
          <Grid container xs={12} marginTop={1}>
            {[
              "Industry Relevance",
              "Role Relevance",
              "Communication Skills",
              "Mandatory Requisition Match",
              "Education Rating",
            ].map((item, i) => {
              return <ParameterRating key={i} param={item} />;
            })}
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
                <Rating />
              </Grid>
            </Stack>
          </Grid>
        </Stack>
      </Box>
      <Box marginTop={3}>
        <Typography variant="h6" fontWeight={"bold"} marginBottom={1}>
          Candidate Story
        </Typography>
        <Box display="flex" color={(theme) => theme.palette.bgGray.main} mb={2}>
          <IconWrapper fontSize="small" icon="information" />
          <Typography
            variant="caption"
            marginLeft={"8px"}
            color={(theme) => theme.palette.bgGray.main}
          >
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequa
          </Typography>
        </Box>
        <TextEditor />
        {/* <Typography
          display="flex"
          justifyContent="flex-end"
          variant="caption"
          color={"textSecondary"}
        >
          1000 characters left
        </Typography> */}
      </Box>
    </Box>
  );
};

const DocumentSection = () => {
  return (
    <>
      <Typography variant="subtitle1" fontWeight={700} marginBottom={1}>
        Documents
      </Typography>
      <Stack marginTop={2}>
        <Typography variant="subtitle2" fontWeight={700}>
          Pan Card
        </Typography>
        <FileContainer
          iconName={"pdf"}
          fileName="pancard.pdf"
          fileSize="2MB"
          hideDelete={true}
        ></FileContainer>
      </Stack>
      <Stack marginTop={2}>
        <Typography variant="subtitle2" fontWeight={700}>
          Pan Card
        </Typography>
        <FileContainer
          iconName={"pdf"}
          fileName="aadhar.pdf"
          fileSize="2MB"
          hideDelete={true}
        ></FileContainer>
      </Stack>
    </>
  );
};

const TextWithIcon = ({ iconName, value }: any) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      marginRight={2}
      marginTop={1}
    >
      <IconWrapper fontSize="inherit" icon={iconName} color="disabled" />
      <Typography variant="caption" color={"textSecondary"} marginLeft={1}>
        {value}
      </Typography>
    </Stack>
  );
};

const CandidateActivity = () => {
  const timeLine = [
    {
      date: "01 Apr 2021",
      timeLog: [
        {
          time: "01:25 PM",
          stage: "Joined",
          coordiantor: "Anthea Corosini",
          details: "Application status changed on 1 Apr 2021, 10:33 IST",
        },
        {
          time: "01:25 PM",
          stage: "HR Round",
          coordiantor: "Anthea Corosini",
          details: "Updated Offer Details",
        },
      ],
    },
    {
      date: "10 Mar 2021",
      timeLog: [
        {
          time: "01:25 PM",
          stage: "Offer Accepted",
          coordiantor: "Anthea Corosini",
          details: "Application status changed on 10 Mar 2021, 06:18 IST",
        },
        {
          time: "01:25 PM",
          stage: "HR Round",
          coordiantor: "Anthea Corosini",
          details: "Application status changed on 10 Mar 2021, 06:17 IST",
        },
        {
          time: "01:25 PM",
          stage: "Round 4",
          coordiantor: "Anthea Corosini",
          details: "updated offer details",
        },
      ],
    },
  ];
  return (
    <Stack width={"100%"} alignItems={"flex-start"}>
      <Typography variant="subtitle1" fontWeight={700} marginBottom={1}>
        Activity Log
      </Typography>
      <Timeline>
        {timeLine.map((item, index) => {
          return (
            <>
              <Box
                key={index}
                bgcolor={(theme) => theme.palette.bgLightGray.main}
                padding={1}
                fontSize={"16px"}
                fontWeight={500}
              >
                {item.date}
              </Box>

              {item.timeLog.map((timeLog, id) => {
                return (
                  <TimelineItem key={id}>
                    <TimelineOppositeContent color="text.secondary">
                      {timeLog.time}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot color="primary" />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Stack>
                        <Typography variant="subtitle1" fontWeight={"bold"}>
                          {timeLog.stage}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          fontWeight={"bold"}
                          color={"textSecondary"}
                        >
                          {timeLog.coordiantor}
                        </Typography>
                        <Typography
                          fontSize={"14px"}
                          fontWeight={400}
                          color={"textSecondary"}
                        >
                          {timeLog.details}
                        </Typography>
                      </Stack>
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
            </>
          );
        })}
      </Timeline>
    </Stack>
  );
};

const CandidateFitment = () => {
  return (
    <>
      <Stack
        marginTop={2}
        alignItems={"center"}
        direction={"row"}
        justifyContent={"space-between"}
      >
        <Typography variant="h6" color={"textSecondary"} fontWeight={600}>
          Overall Candidate Fitment Score
        </Typography>
        <Box
          bgcolor={(theme) => theme.palette.primary.main}
          borderRadius={"10px"}
          height="75px"
          width="200px"
          fontSize={"32px"}
          color={(theme) => theme.palette.bgWhite.main}
          fontWeight={"bold"}
          textAlign={"center"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          86%
        </Box>
      </Stack>
      <Grid container xs={12} spacing={5} marginTop={1}>
        <Grid item xs={12} md={6}>
          <Stack
            marginTop={2}
            marginBottom={2}
            alignItems={"center"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Typography
              variant="body2"
              color={"textSecondary"}
              fontWeight={700}
            >
              Past Experience Match
            </Typography>
            <Typography fontSize={"18px"} color={"primary"} fontWeight={500}>
              30%
            </Typography>
          </Stack>

          <Slider defaultValue={30} color="primary" />
          <Stack
            marginTop={-1}
            alignItems={"center"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Typography variant="caption" color={"textSecondary"}>
              3
            </Typography>
            <Typography variant="caption" color={"textSecondary"}>
              7
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} alignSelf={"flex-end"}>
          <Stack
            marginTop={2}
            marginBottom={2}
            alignItems={"center"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Typography
              variant="body2"
              color={"textSecondary"}
              fontWeight={700}
            >
              Skill Match
            </Typography>
            <Typography fontSize={"18px"} color={"primary"} fontWeight={500}>
              60%
            </Typography>
          </Stack>
          <Grid item container xs={12}>
            <Grid
              item
              bgcolor={(theme) => theme.palette.bgLightBlue.main}
              xs={6}
              padding={1}
              sx={{
                borderTopLeftRadius: "5px",
                borderBottomLeftRadius: "5px",
              }}
            >
              <Typography variant="body2" fontWeight={700}>
                Java
              </Typography>
              <Typography
                variant="caption"
                color={"textSecondary"}
                fontWeight={500}
              >
                Must have skills
              </Typography>
            </Grid>
            <Grid
              item
              bgcolor={(theme) => theme.palette.bgTrendGreen.main}
              xs={6}
              padding={1}
              sx={{
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
              }}
            >
              <Typography variant="body2" fontWeight={700}>
                SQL
              </Typography>
              <Typography
                variant="caption"
                color={"textSecondary"}
                fontWeight={500}
              >
                Good to have skills
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} alignSelf={"flex-end"}>
          <Stack
            marginTop={2}
            marginBottom={2}
            alignItems={"center"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Typography
              variant="body2"
              color={"textSecondary"}
              fontWeight={700}
            >
              Past Title Match
            </Typography>
            <Typography fontSize={"18px"} color={"primary"} fontWeight={500}>
              10%
            </Typography>
          </Stack>
          <Grid
            item
            bgcolor={(theme) => theme.palette.bgTrendOrange.main}
            xs={12}
            padding={"12px 20px"}
            sx={{
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              SQL Developer
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const BoxWithIconValue = ({ iconName, fieldName, value }: any) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      border={"1px solid #DDDDDD"}
      padding={1}
      borderRadius={"5px"}
      width={"100%"}
    >
      <IconWrapper fontSize="medium" icon={iconName} color="disabled" />
      <Stack marginLeft={1}>
        <Typography variant="caption" color={"textSecondary"}>
          {fieldName}
        </Typography>
        <Typography variant="body2" fontWeight={700}>
          {value}
        </Typography>
      </Stack>
    </Stack>
  );
};
