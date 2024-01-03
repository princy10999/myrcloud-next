import React from "react";
import FullPageLayout from "@components/Layout/FullPageLayout";
import { makeStyles } from "tss-react/mui";
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from "@mui/material";
import TabPanel from "@components/common/tabPanelComponent";
import TabPanelComponent from "@components/Layout/TabPanel";
import DropDownComponent from '@components/Layout/DropDownComponent';
import StyledAccordian from "@components/common/styledAccordian";
import StyledAccordianSummary from "@components/common/styledAccordianSummary";
import StyledAccordianDetails from "@components/common/styledAccordianDetail";
import { IconWrapper } from "@components/common/customSvgIcon";
import ButtonContained from "@components/Layout/ButtonContained";
import ButtonOutlined from "@components/Layout/ButtonOutlined";
import SwitchTitle from "@components/Layout/SwitchTitle";

const useStyles = makeStyles()((theme) => {
  return {
    main: {
      ".mui-hpgf8j": { padding: "0px!important" },
    }
  };
});

const data = [
  {
    title: "Full Name",
    label: 'Mandatory',
  },
  {
    title: "Gender",
    label: 'Non Mandatory',
  },
  {
    title: "Team Size",
    label: ' Mandatory',
  },
  {
    title: "Number of jobs you can work on at a time",
    label: 'Mandatory',
  },
  {
    title: "Location",
    label: ' Mandatory',
  },
  {
    title: "LinkedIn Profile URL",
    label: ' Mandatory',
  },
  {
    title: "Hiring Expertise",
    label: 'Non Mandatory',
  },
  {
    title: "Years of Recruitment Experience",
    label: ' Mandatory',
  },
  {
    title: "Select Your Industry Preference",
    label: 'Non Mandatory',
  },
  {
    title: "Select Role Preference",
    label: 'Non Mandatory',
  },
  {
    title: "Bio",
    label: ' Mandatory',
  },
]
const information = [
  {
    title: "Address Line 1",
    label: 'Mandatory',
  },
  {
    title: "Address Line 2",
    label: 'Mandatory',
  },
  {
    title: "City",
    label: 'Non Mandatory',
  },
  {
    title: "Pin Code",
    label: 'Mandatory',
  },
  {
    title: "State",
    label: 'Non Mandatory',
  },
  {
    title: "Country",
    label: 'Mandatory',
  },
];
const document = [
  {
    title: "Terms Document",
    label: 'Mandatory',
  },
  {
    title: "PAN Card",
    label: 'Non Mandatory',
  },
  {
    title: "Aadhar Card",
    label: ' Mandatory',
  },
];
export default function ComponentConfiguration() {
  const theme = useTheme();
  const { classes } = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [value, setValue] = React.useState<any>(0);

  const clientName = ['arjun', 'rampal', 'bharat', 'mukesh'];
  const handleChange = (event: any, newValue: any) => {
    console.info("You clicked the Chip.");
  };

  const handleClick = (event: any, newValue: any) => {
    console.info("You clicked the Chip.");
  };

  const handleAccordion =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
        <DropDownComponent
          width="20%"
          text="Client Name"
          values={clientName}
          name="clientName"
          defaultValue={"Select"}
          labelSize={"16px"}
          fontWeight={400}
          //  value={role}
          labelColor={theme.palette.bgBlack.main}
          onChange={handleChange} />
      </Box>
      <Grid container spacing={3} mt={0} alignItems={"flex-start"}>
        <Grid item lg={3} md={3} xs={12} sm={12} >
          <TabPanelComponent value={value} setValue={setValue} />
        </Grid>
        <Grid item lg={9} md={9} xs={12} sm={12} >
          <TabPanel value={value} index={0}>
            <Box marginBottom={1.5} className={classes.main}>
              <StyledAccordian
                expanded={expanded === "panel1"}
                onChange={handleAccordion("panel1")}
              >
                <StyledAccordianSummary
                  expandIcon={<IconWrapper fontSize="11px" icon="down" />}
                  aria-controls="panel1a-content"
                  id="panel1"
                >
                  <Box display="flex" width="100%" justifyContent="space-between" alignItems="center" px={1}>
                    <Typography fontWeight={"inherit"} >
                      Position Details
                    </Typography>
                    <Box display="flex" alignItems={'center'} gap={2}>
                      <Typography color={(theme) => theme.palette.bgGray.main}>Make all Mandatory</Typography>
                      <SwitchTitle title="" switchName2="Mandatory" />
                    </Box>
                  </Box>
                </StyledAccordianSummary>
                <StyledAccordianDetails>
                  <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {data?.map((item: any) => (
                      <>
                        <Grid item xs={2} sm={4} md={4}>
                          <SwitchTitle title={item?.title} switchName2={item?.label} />
                        </Grid>
                      </>
                    ))}
                  </Grid>
                </StyledAccordianDetails>
              </StyledAccordian>
            </Box>
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
                  <Box display="flex" width="100%" justifyContent="space-between" alignItems="center" px={1}>
                    <Typography fontWeight={"inherit"} >
                      Compliance Information
                    </Typography>
                    <Box display="flex" alignItems={'center'} gap={2}>
                      <Typography color={(theme) => theme.palette.bgGray.main}>Make all Mandatory</Typography>
                      <SwitchTitle title="" switchName2="Mandatory" />
                    </Box>
                  </Box>
                </StyledAccordianSummary>
                <StyledAccordianDetails>
                  <Grid container spacing={{ xs: 3, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {information?.map((item: any) => (
                      <>
                        <Grid item xs={2} sm={4} md={4}>
                          <SwitchTitle title={item?.title} switchName2={item?.label} />
                        </Grid>
                      </>
                    ))}
                  </Grid>
                </StyledAccordianDetails>
              </StyledAccordian>
            </Box>
            <Box marginBottom={1.5}>
              <StyledAccordian
                expanded={expanded === "panel3"}
                onChange={handleAccordion("panel3")}
              >
                <StyledAccordianSummary
                  expandIcon={<IconWrapper fontSize="11px" icon="down" />}
                  aria-controls="panel1a-content"
                  id="panel3"
                >
                  <Box display="flex" width="100%" justifyContent="space-between" alignItems="center" px={1}>
                    <Typography fontWeight={"inherit"} >
                      Documents
                    </Typography>
                    <Box display="flex" alignItems={'center'} gap={2}>
                      <Typography color={(theme) => theme.palette.bgGray.main}>Make all Mandatory</Typography>
                      <SwitchTitle title="" switchName2="Mandatory" />
                    </Box>
                  </Box>
                </StyledAccordianSummary>
                <StyledAccordianDetails>
                  <Box>
                    <Box display="flex" justifyContent="space-between" flexWrap="nowrap">
                      {document?.map((item: any) => {
                        return (
                          <>
                            <SwitchTitle title={item.title} switchName2={item.label} />
                          </>
                        )
                      })}
                    </Box>
                  </Box>
                </StyledAccordianDetails>
              </StyledAccordian>
            </Box>
          </TabPanel>
        </Grid>
      </Grid>
      <Box
        gap={3}
        width="100%"
        bottom="0px"
        display="flex"
        justifyContent="end"
        alignItems="center"
      >
        <ButtonOutlined
          borderRadius="30px"
          text="Cancel"
          width="100px"
          onClick={handleClick}
        />
        <ButtonContained
          borderRadius="30px"
          text="Save"
          width="100px"
          onClick={handleClick}
        />
      </Box>
    </>
  );
}
