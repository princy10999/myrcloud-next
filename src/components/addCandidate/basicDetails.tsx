import StyledAccordian from "@components/common/styledAccordian";
import StyledAccordianDetails from "@components/common/styledAccordianDetail";
import StyledAccordianSummary from "@components/common/styledAccordianSummary";
import { SaveOutlined } from "@mui/icons-material";
import { Button, Typography, Box, Stack } from "@mui/material";
import React from "react";
import { IconWrapper } from "@components/common/customSvgIcon";
import ResumeAndBasicInfo from "./basicDetails/resumeAndBasicInfo";
import VideoResume from "./basicDetails/videoResume";
import Experience from "./basicDetails/experience";
import CertificateAndEducation from "./basicDetails/certificateAndEducation";
import Address from "./basicDetails/address";
import { useRouter } from "next/router";

export default function BasicDetails({jdData, getCandidateAdditionalDetailsData}:any) {
  const router = useRouter()
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleAccordion =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      // if(router?.query?.candidateId){
        setExpanded(newExpanded ? panel : false);
      // }
    };

  return (
    <Box marginTop={2}>
      <StyledAccordian
        expanded={expanded === "panel1"}
        onChange={handleAccordion("panel1")}
      >
        <StyledAccordianSummary
          expandIcon={<IconWrapper fontSize="11px" icon="down" />}
          aria-controls="panel1a-content"
          id="panel6"
        >
          <Typography fontWeight={"inherit"}>
            Resume and Basic Information
          </Typography>
        </StyledAccordianSummary>
        <StyledAccordianDetails>
          <ResumeAndBasicInfo jdData={jdData} getCandidateAdditionalDetailsData={getCandidateAdditionalDetailsData}/>
        </StyledAccordianDetails>
      </StyledAccordian>
      <StyledAccordian disabled={router?.query?.candidateId ? false : true}>
        <StyledAccordianSummary
          expandIcon={<IconWrapper fontSize="11px" icon="down" />}
        >
          <Typography fontWeight={"inherit"}>Video Resume</Typography>
        </StyledAccordianSummary>
        <StyledAccordianDetails>
          <VideoResume getCandidateAdditionalDetailsData={getCandidateAdditionalDetailsData}/>
        </StyledAccordianDetails>
      </StyledAccordian >
      <StyledAccordian disabled={router?.query?.candidateId ? false : true}>
        <StyledAccordianSummary
          expandIcon={<IconWrapper fontSize="11px" icon="down" />}
        >
          <Typography fontWeight={"inherit"}>Experience</Typography>
        </StyledAccordianSummary>
        <StyledAccordianDetails>
          <Experience getCandidateAdditionalDetailsData={getCandidateAdditionalDetailsData}/>
        </StyledAccordianDetails>
      </StyledAccordian>
      <StyledAccordian disabled={router?.query?.candidateId ? false : true}>
        <StyledAccordianSummary
          expandIcon={<IconWrapper fontSize="11px" icon="down" />}
        >
          <Typography fontWeight={"inherit"}>
            Certification and Education
          </Typography>
        </StyledAccordianSummary>
        <StyledAccordianDetails>
          <CertificateAndEducation getCandidateAdditionalDetailsData={getCandidateAdditionalDetailsData}/>
        </StyledAccordianDetails>
      </StyledAccordian>
      <StyledAccordian disabled={router?.query?.candidateId ? false : true}>
        <StyledAccordianSummary
          expandIcon={<IconWrapper fontSize="11px" icon="down" />}
        >
          <Typography fontWeight={"inherit"}>Address</Typography>
        </StyledAccordianSummary>
        <StyledAccordianDetails>
          <Address getCandidateAdditionalDetailsData={getCandidateAdditionalDetailsData}/>
        </StyledAccordianDetails>
      </StyledAccordian>
      <Stack direction={"row-reverse"}>
        {/* <Button
          variant="outlined"
          size="large"
          sx={{ borderRadius: "30px", marginTop: 1 }}
          startIcon={<SaveOutlined />}
          // onClick={validateStep}
        >
          Save as Draft
        </Button> */}
      </Stack>
    </Box>
  );
}
