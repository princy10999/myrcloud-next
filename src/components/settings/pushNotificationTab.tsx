import React from "react";
import {
  Grid,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
  Box,
  RadioGroup,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IconWrapper } from "@components/common/customSvgIcon";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { makeStyles } from "tss-react/mui";
import CustomDrawer from "@components/common/CustomDrawer";
import CustomeDrawerHeader from "@components/common/customDrawerHeader";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import ButtonText from "@components/Layout/ButtonText";
import ButtonContained from "@components/Layout/ButtonContained";
import RadioButtonNoOutline from "@components/Layout/RadioButtonNoOutline";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@components/common/tabPanelComponent";

const useStyles = makeStyles()((theme) => {
  return {
    actionIcon: {
      display: "flex",
      justifyContent: "space-between",
      minHeight: "38px",
      borderRadius: "5px",
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      color: "#FFFFFF",
    },
  };
});
const mainData = [
  {
    tabName: "Candidate",
    Id: "panel-1",
    table: [
      {
        id: 1,
        templateName: "Rejection Mail to Candidate",
        createdDate: "20/01/2022 at 01:24:24 PM - Admin",
        modifyDate: "27/01/2022 at 5:02:24 PM - Admin",
      },
      {
        id: 2,
        templateName: "Rejection Mail to Candidate",
        createdDate: "20/01/2022 at 01:24:24 PM - Admin",
        modifyDate: "27/01/2022 at 5:02:24 PM - Admin",
      },
      {
        id: 3,
        templateName: "Rejection Mail to Candidate",
        createdDate: "20/01/2022 at 01:24:24 PM - Admin",
        modifyDate: "27/01/2022 at 5:02:24 PM - Admin",
      },
    ],
  },
  {
    tabName: "Client",
    Id: "panel-2",
    table: [
      {
        id: 1,
        templateName: "Rejection Mail to Candidate",
        createdDate: "20/01/2022 at 01:24:24 PM - Admin",
        modifyDate: "27/01/2022 at 5:02:24 PM - Admin",
      },
      {
        id: 2,
        templateName: "Rejection Mail to Candidate",
        createdDate: "20/01/2022 at 01:24:24 PM - Admin",
        modifyDate: "27/01/2022 at 5:02:24 PM - Admin",
      },
      {
        id: 3,
        templateName: "Rejection Mail to Candidate",
        createdDate: "20/01/2022 at 01:24:24 PM - Admin",
        modifyDate: "27/01/2022 at 5:02:24 PM - Admin",
      },
    ],
  },
  {
    tabName: "Partner",
    Id: "panel-3",
    table: [
      {
        id: 1,
        templateName: "Rejection Mail to Candidate",
        createdDate: "20/01/2022 at 01:24:24 PM - Admin",
        modifyDate: "27/01/2022 at 5:02:24 PM - Admin",
      },
      {
        id: 2,
        templateName: "Rejection Mail to Candidate",
        createdDate: "20/01/2022 at 01:24:24 PM - Admin",
        modifyDate: "27/01/2022 at 5:02:24 PM - Admin",
      },
      {
        id: 3,
        templateName: "Rejection Mail to Candidate",
        createdDate: "20/01/2022 at 01:24:24 PM - Admin",
        modifyDate: "27/01/2022 at 5:02:24 PM - Admin",
      },
    ],
  },
];

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  "&:nth-of-type(1)": {
    backgroundColor: "#eaf1fb",
  },
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const PushNotificationTab = () => {
  //Hooks
  const theme = useTheme();
  const { classes } = useStyles();

  //State
  const [isTemplateOpen, setIsTemplateOpen] = React.useState<boolean>(false);
  const [errors, setError] = React.useState<any>({});
  const [data, setData] = React.useState<any>({
    templateName: "",
    fromName: "",
    fromEmailId: "",
    ccEmailID: "",
    subject: "",
    setEmailTemplate: "",
    enableEmail: "",
    mailText: "",
  });

  //Handler
  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const [tab, setTab] = React.useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: any) => {
    setTab(newValue);
  };
  const emailTabs = [
    {
      name: "Mail Text",
    },
    {
      name: "Mail Preview",
    },
    {
      name: "Promotion",
    },
  ];
  return (
    <>
      <Grid container lg={12} md={12} xs={12} spacing={2}>
        <Typography fontSize="22px" fontWeight={600} mt={4}>
          Push Notification
        </Typography>
        <Grid xs={12} bgcolor={"white"} mt={4}>
          <Box p={3}>
            <Typography fontSize="18px" fontWeight={500}>
              Push Notification Category
            </Typography>
          </Box>
          {mainData.map((item, index) => (
            <Accordion elevation={0} key={index}>
              <AccordionSummary
                aria-controls={item?.Id}
                id={item?.Id}
                // sx={{ flexDirection: "row-reverse" }}
              >
                <Stack display={"flex"} flexDirection={"column"}>
                  <Typography
                    fontSize={"14px"}
                    fontWeight={400}
                    color={theme?.palette?.bgBlack?.main}
                  >
                    {item?.tabName}
                  </Typography>
                  <Typography
                    fontSize={"12px"}
                    fontWeight={400}
                    color={theme?.palette?.bgBlue?.main}
                  >{`Hide ${item?.table?.length} Templates`}</Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontSize: "18px", p: 3 }}>
                        Template Name
                      </TableCell>
                      <TableCell sx={{ fontSize: "18px", p: 3 }}>
                        Created Date
                      </TableCell>
                      <TableCell sx={{ fontSize: "18px", p: 3 }}>
                        Last Modified Date
                      </TableCell>
                      <TableCell sx={{ fontSize: "18px", p: 3 }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {item?.table?.map((row, index) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ py: "28px" }}
                        >
                          {row.templateName}
                        </TableCell>
                        <TableCell>{row.createdDate}</TableCell>
                        <TableCell>{row.modifyDate}</TableCell>
                        <TableCell>
                          <IconWrapper
                            style={{ cursor: "pointer" }}
                            fontSize="small"
                            icon="edit"
                            onClick={() => {
                              setIsTemplateOpen(true);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
      {isTemplateOpen && (
        <CustomDrawer
          isDrawerOpen={isTemplateOpen}
          handleClose={() => {
            setIsTemplateOpen(false);
          }}
          anchor={"right"}
        >
          <Box sx={{ marginTop: 0 }}>
            <CustomeDrawerHeader
              handleClose={() => setIsTemplateOpen(false)}
              otherText={
                <>
                  <Box display={"flex"}>
                    <Typography
                      variant="h6"
                      display="block"
                      color={(theme) => theme.palette.bgGray.main}
                      fontWeight="bold"
                    >
                      Email Template:
                    </Typography>
                    <Typography
                      variant="h6"
                      display="block"
                      color={(theme) => theme.palette.bgBlack.main}
                      fontWeight="bold"
                    >
                      Save Feedback Mail to Recruiter
                    </Typography>
                  </Box>
                </>
              }
            />
            <Stack p={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextFieldComponent
                    type="text"
                    width="100%"
                    text={"Template Name"}
                    name="templateName"
                    value={data?.templateName}
                    onChange={handleChangeInput}
                  />
                </Grid>
                {/* <Grid item md={4} xs={12}>
                  <TextFieldComponent
                    type="text"
                    width="100%"
                    text={"From Name"}
                    name="fromName"
                    value={data?.fromName}
                    onChange={handleChangeInput}
                    valid
                  />
                  <Typography
                    variant="body2"
                    textAlign={"start"}
                    color={"error"}
                  >
                    {data?.fromName?.length > 0 ? "" : errors["fromName"]}
                  </Typography>
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextFieldComponent
                    type="text"
                    width="100%"
                    text={"From Email ID"}
                    name="fromEmailId"
                    value={data?.fromEmailId}
                    onChange={handleChangeInput}
                    valid
                  />
                  <Typography
                    variant="body2"
                    textAlign={"start"}
                    color={"error"}
                  >
                    {data?.fromEmailId?.length > 0 ? "" : errors["fromEmailId"]}
                  </Typography>
                </Grid> */}
                {/* <Grid item md={12} xs={12}>
                  <TextFieldComponent
                    type="text"
                    width="100%"
                    text={
                      "CC Emaild ID (use comma for multiple Email ID’s, maximum 10 Email ID’s allowed)"
                    }
                    name="ccEmailID"
                    value={data?.ccEmailID}
                    onChange={handleChangeInput}
                    placeholder={"Enter multiple Email ID’s seprated by ,"}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextFieldComponent
                    type="text"
                    width="100%"
                    text={"Subject"}
                    name="subject"
                    value={data?.subject}
                    onChange={handleChangeInput}
                    placeholder={"subject"}
                    valid
                  />
                  <Typography
                    variant="body2"
                    textAlign={"start"}
                    color={"error"}
                  >
                    {data?.subject?.length > 0 ? "" : errors["subject"]}
                  </Typography>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Box display="flex" alignItems="center">
                    <RadioGroup
                      className="checkbox_signup"
                      aria-labelledby="demo-customized-radios"
                      name="customized-radios"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "row",
                      }}
                    >
                      <RadioButtonNoOutline
                        labelPlacement="end"
                        value={1}
                        label="Set this From Name and From Email ID for all email templates."
                        name="setEmailTemplate"
                        bg={true}
                        checked={data?.setEmailTemplate}
                        disabled={false}
                        handleChange={() => {
                          ("");
                        }}
                      />
                      <RadioButtonNoOutline
                        labelPlacement="end"
                        value={2}
                        label="Enable this mail"
                        name="enableEmail"
                        bg={true}
                        checked={data?.enableEmail}
                        disabled={false}
                        handleChange={() => {
                          ("");
                        }}
                      />
                    </RadioGroup>
                  </Box>
                </Grid> */}
                <Grid item md={12} xs={12}>
                <TextFieldComponent
                text="Push Notification Text"
                      type="text"
                      width="100%"
                      name="mailText"
                      value={data?.mailText}
                      onChange={handleChangeInput}
                      multiline
                      rows={9}
                    />
                    <Box display={"flex"} flexDirection={"row"} mt={1}>
                      <Box display={"flex"} flexDirection={"row"} gap={0.5}>
                        <Typography
                          fontSize={"20px"}
                          color={theme.palette.error.main}
                        >
                          *
                        </Typography>
                        <Typography fontSize={"14px"}>
                          Please enter text or html tags for formatting.
                        </Typography>
                      </Box>
                    </Box>
                </Grid>
                {/* <Grid item md={12} xs={12}>
                  <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    textColor="inherit"
                    variant="scrollable"
                    indicatorColor="primary"
                    TabIndicatorProps={{
                      style: { bottom: 6 },
                    }}
                  >
                    {emailTabs?.map((item: any, idx: number) => {
                      return (
                        <Tab
                          key={idx}
                          label={item.name}
                          sx={{ textTransform: "none" }}
                        />
                      );
                    })}
                  </Tabs>
                  <TabPanel value={tab} index={0}>
                    
                  </TabPanel>
                  <TabPanel value={tab} index={1}>
                    <TextFieldComponent
                      type="text"
                      width="100%"
                      name="mailText"
                      value={data?.mailText}
                      onChange={handleChangeInput}
                      multiline
                      rows={9}
                    />
                  </TabPanel>
                </Grid> */}
              </Grid>
            </Stack>
          </Box>

          <Box
            width="100%"
            border-top="1px solid #DDDDDD"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            mt={4}
          >
            <ButtonText
              borderRadius="30px"
              text="Cancel"
              marginRight="20px"
              width="15%"
              height="33px"
              color={"inherit"}
              onClick={() => setIsTemplateOpen(false)}
            />
            <ButtonContained
              borderRadius="30px"
              text="Save"
              marginRight="20px"
              width="15%"
              height="33px"
              // onClick={addEmployee}
            />
          </Box>
        </CustomDrawer>
      )}
    </>
  );
};

export default PushNotificationTab;
