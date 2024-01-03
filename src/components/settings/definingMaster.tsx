import React from "react";
import { makeStyles } from "tss-react/mui";
import Typography from "@mui/material/Typography";
import { Box, Grid, Stack, useTheme } from "@mui/material";
import PaperContainer from "@components/common/paperContainer";
import AddIconComponent from "@components/Layout/AddIconComponent";
import UploadIconComponent from "@components/Layout/UploadIconComponent";
import TabPanel from "@components/common/tabPanelComponent";
import TabPanelComponent from "@components/Layout/TabPanel";
import PersonalDetailSettingComponent from "@components/common/personalDetailSettingComponent";
import CustomDrawer from "@components/common/CustomDrawer";
import CustomeDrawerHeader from "@components/common/customDrawerHeader";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import ButtonContained from "@components/Layout/ButtonContained";
import Assets from "@components/common/image_container";
import ButtonText from "@components/Layout/ButtonText";
import Dropzone, { useDropzone } from "react-dropzone";
import { IconWrapper } from "@components/common/customSvgIcon";
import FormTitleWithInfo from "@components/common/formTitleWithInfo";

const useStyles = makeStyles()((theme) => {
  return {
    tab1: {
      display: "flex",
      justifyContent: "space-between",
      minHeight: "38px",
      borderRadius: "5px",
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      color: "#FFFFFF",
    },
    tab2: {
      display: "flex",
      alignItems: "flex-start",
      minHeight: "38px",
      borderRadius: "5px",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      color: "#777777",
    },
    chipStyle: {
      color: theme.palette.bgGray.main,
      border: `1px solid ${theme.palette.bgGray.main}`,
    },
    chipStylePro: {
      color: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
      fontWeight: 600,
    },
    fileUpload: {
      padding: "5%",
      backgroundColor: "#F9F9F9",
      width: "100%",
      border: `1px dashed ${theme.palette.bgGray.main}`,
      borderRadius: "4px",
      position: "relative",
      marginBottom: 6,
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "16px",
      color: theme.palette.bgBlack.main,
      display: "flex",
      justifyContent: "center",
      gap: 20,
    },
  };
});

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function DefiningMaster() {
  //Hooks
  const { classes } = useStyles();
  const theme = useTheme();
  //State
  const [data, setData] = React.useState<any>({ location: "" });
  const [value, setValue] = React.useState<any>(0);
  const [isLocationOpen, setIsLocationOpen] = React.useState<boolean>(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] =
    React.useState<boolean>(false);
  const [bulkDocumenet, setBulkDocumenet] = React.useState(false);

  //Handler

  const onDrop = React.useCallback((acceptedFiles: any) => {
    setBulkDocumenet(acceptedFiles[0].name);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const addLocation = () => {
    setIsLocationOpen(true);
  };

  const uploadLocation = () => {
    setIsBulkUploadOpen(true);
  };

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  //Static Data
  const gender: any = [
    {
      title: "Gender",
      chip: ["Male", "Female", "Others"],
      plus: <AddIconComponent onClick={addLocation} />,
      upload: <UploadIconComponent onClick={uploadLocation} />,
    },
  ];

  const location = [
    {
      title: "Location",
      chip: ["Mumbai", "Pune", "Nasik"],
      plus: <AddIconComponent onClick={addLocation} />,
      upload: <UploadIconComponent onClick={uploadLocation} />,
    },
  ];
  const teamSize = [
    {
      title: "Team Size",
      chip: [],
      plus: <AddIconComponent onClick={addLocation} />,
      upload: <UploadIconComponent onClick={uploadLocation} />,
    },
  ];
  const jobOfWork = [
    {
      title: "Number of jobs you can work on at a time",
      chip: [],
      plus: <AddIconComponent onClick={addLocation} />,
      upload: <UploadIconComponent onClick={uploadLocation} />,
    },
  ];
  const hiringExpertise = [
    {
      title: "Hiring Experties",
      chip: [],
      plus: <AddIconComponent onClick={addLocation} />,
      upload: <UploadIconComponent onClick={uploadLocation} />,
    },
  ];

  const industryPreference = [
    {
      title: "Industry Preference",
      chip: [
        "Consumer",
        "Retail & Services",
        "Metals & Mining",
        "Oil & Gas",
        "Industrial & Manufacturing",
        "Healthcare & Pharma",
        "Real Estate and Infrastructure",
        "BPO",
        "IT",
      ],
      plus: <AddIconComponent onClick={addLocation} />,
      upload: <UploadIconComponent onClick={uploadLocation} />,
    },
  ];
  const rolePreference = [
    {
      title: "Role Preference",
      chip: [],
      plus: <AddIconComponent onClick={addLocation} />,
      upload: <UploadIconComponent onClick={uploadLocation} />,
    },
  ];
  const city = [
    {
      title: "Location",
      chip: ["Mumbai", "Pune", "Nasik"],
      plus: <AddIconComponent onClick={addLocation} />,
      upload: <UploadIconComponent onClick={uploadLocation} />,
    },
  ];

  const state = [
    {
      title: "State",
      chip: [],
      plus: <AddIconComponent onClick={addLocation} />,
      upload: <UploadIconComponent onClick={uploadLocation} />,
    },
  ];
  const country = [
    {
      title: "Country",
      chip: [],
      plus: <AddIconComponent onClick={addLocation} />,
      upload: <UploadIconComponent onClick={uploadLocation} />,
    },
  ];
  const placementFee = [
    {
      title: "Placement Fee",
      chip: [],
      plus: <AddIconComponent onClick={addLocation} />,
      upload: <UploadIconComponent onClick={uploadLocation} />,
    },
  ];
  const bankName = [
    {
      title: "Bank Name",
      chip: [],
      plus: <AddIconComponent onClick={addLocation} />,
      upload: <UploadIconComponent onClick={uploadLocation} />,
    },
  ];

  const allLocation = [
    {
      title: "",
      chip: [
        "Mumbai",
        "Pune",
        "Nasik",
        "Mumbai",
        "Pune",
        "Nasik",
        "Mumbai",
        "Pune",
        "Nasik",
        "Mumbai",
        "Pune",
      ],
      plus: "",
      upload: "",
    },
  ];
  return (
    <>
      <Grid container spacing={3} mt={0} alignItems={"flex-start"}>
        <Grid item lg={3} md={3} xs={12} sm={12}>
          <TabPanelComponent value={value} setValue={setValue} />
        </Grid>
        <Grid item lg={9} md={9} xs={12} sm={12}>
          <PaperContainer>
            <TabPanel value={value} index={0}>
              <Typography
                fontWeight={600}
                fontSize={18}
                color={(theme) => theme.palette.bgBlack.main}
              >
                Personal Details
              </Typography>
              <Box mt={2}>
                <PersonalDetailSettingComponent
                  data={gender}
                  handleClick={handleClick}
                  handleDelete={handleDelete}
                />
              </Box>
              <Box mt={2}>
                <PersonalDetailSettingComponent
                  data={teamSize}
                  handleClick={handleClick}
                  handleDelete={handleDelete}
                />
              </Box>
              <Box mt={2}>
                <PersonalDetailSettingComponent
                  data={jobOfWork}
                  handleClick={handleClick}
                  handleDelete={handleDelete}
                />
              </Box>
              <Box mt={2}>
                <PersonalDetailSettingComponent
                  data={location}
                  handleClick={handleClick}
                  handleDelete={handleDelete}
                />
              </Box>
              <Box mt={2}>
                <PersonalDetailSettingComponent
                  data={hiringExpertise}
                  handleClick={handleClick}
                  handleDelete={handleDelete}
                />
              </Box>
              <Box mt={2}>
                <PersonalDetailSettingComponent
                  data={industryPreference}
                  handleClick={handleClick}
                  // handleDelete={handleDelete}
                />
              </Box>
              <Box mt={2}>
                <PersonalDetailSettingComponent
                  data={rolePreference}
                  handleClick={handleClick}
                  handleDelete={handleDelete}
                />
              </Box>
              <Box mt={4}>
                <Box mb={2}>
                  <Typography
                    fontWeight={600}
                    fontSize={18}
                    color={(theme) => theme.palette.bgDarkBlack.main}
                  >
                    Compliance Information
                  </Typography>
                </Box>
                <PersonalDetailSettingComponent
                  data={city}
                  handleClick={handleClick}
                  handleDelete={handleDelete}
                />
              </Box>
              <Box mt={2}>
                <PersonalDetailSettingComponent
                  data={state}
                  handleClick={handleClick}
                  handleDelete={handleDelete}
                />
              </Box>
              <Box mt={2}>
                <PersonalDetailSettingComponent
                  data={country}
                  handleClick={handleClick}
                  handleDelete={handleDelete}
                />
              </Box>
              <Box mt={2}>
                <PersonalDetailSettingComponent
                  data={placementFee}
                  handleClick={handleClick}
                  handleDelete={handleDelete}
                />
              </Box>
              <Box mt={2}>
                <PersonalDetailSettingComponent
                  data={bankName}
                  handleClick={handleClick}
                  handleDelete={handleDelete}
                />
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
          </PaperContainer>
        </Grid>
      </Grid>
      {isLocationOpen && (
        <CustomDrawer
          isDrawerOpen={isLocationOpen}
          handleClose={() => {
            setIsLocationOpen(false);
          }}
          anchor={"right"}
        >
          <Box sx={{ marginTop: 0 }}>
            <CustomeDrawerHeader
              handleClose={() => setIsLocationOpen(false)}
              title="Location"
            />
            <Stack p={2}>
              <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                  <Box display={"flex"} gap={1}>
                    <TextFieldComponent
                      type="text"
                      width="100%"
                      valid
                      name="firstName"
                      placeholder={"Add New"}
                      value={data?.location}
                      onChange={handleChangeInput}
                    />
                    <AddIconComponent
                      onClick={() => {
                        ("");
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item md={12} xs={12} mt={2}>
                  <Box display={"flex"} justifyContent={"space-between"} mb={2}>
                    <Typography
                      fontSize={"14px"}
                      fontWeight={400}
                      color={theme.palette.bgGray.main}
                    >
                      All Locations
                    </Typography>
                    <Box display={"flex"} gap={2} alignItems={"center"}>
                      <Typography
                        fontSize={"14px"}
                        fontWeight={400}
                        color={theme.palette.primary.main}
                      >
                        Select All
                      </Typography>
                      <Assets
                        src={`/assets/img/Search.svg`}
                        height={18}
                        width={19}
                      />
                    </Box>
                  </Box>
                  <PersonalDetailSettingComponent
                    data={allLocation}
                    handleClick={handleClick}
                    handleDelete={handleDelete}
                  />
                </Grid>
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
              // onClick={addEmployee}
              color={"inherit"}
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
      {isBulkUploadOpen && (
        <CustomDrawer
          isDrawerOpen={isBulkUploadOpen}
          handleClose={() => {
            setIsBulkUploadOpen(false);
          }}
          anchor={"right"}
        >
          <Box sx={{ marginTop: 0 }}>
            <CustomeDrawerHeader
              handleClose={() => setIsBulkUploadOpen(false)}
              title="Bulk Upload Location"
            />
            <Stack p={2}>
              <Dropzone onDrop={async (acceptedFiles: any) => {}}>
                {({ getRootProps, getInputProps }) => (
                  <Box
                    className={classes.fileUpload}
                    {...getRootProps()}
                    marginTop={3}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <Typography>Drop the files here ...</Typography>
                    ) : (
                      <>
                        {bulkDocumenet ? (
                          <Typography component={"span"}>
                            You selected file {bulkDocumenet}
                          </Typography>
                        ) : (
                          <>
                            <Box
                              display={"flex"}
                              flexDirection={"column"}
                              textAlign={"center"}
                              gap={1}
                            >
                              <Typography component={"span"}>
                                Drag and Drop file here
                              </Typography>
                              <Typography component={"span"}>Or </Typography>
                              <Stack
                                display={"flex"}
                                flexDirection={"row"}
                                gap={2}
                                alignItems={"center"}
                              >
                                <IconWrapper
                                  fontSize="small"
                                  icon="upload"
                                  color={"primary"}
                                />
                                <Typography
                                  component={"span"}
                                  color={(theme) => theme.palette.primary.main}
                                >
                                  Browse Files{" "}
                                </Typography>
                              </Stack>
                            </Box>
                          </>
                        )}
                      </>
                    )}
                  </Box>
                )}
              </Dropzone>
              <FormTitleWithInfo subtitle="Upload in .xlxs or .xls format" />
              <Grid item md={12} xs={12} mt={2}>
                <Box display={"flex"} justifyContent={"space-between"} mb={2}>
                  <Typography
                    fontSize={"14px"}
                    fontWeight={400}
                    color={theme.palette.bgGray.main}
                  >
                    All Locations
                  </Typography>
                  <Box display={"flex"} gap={2} alignItems={"center"}>
                    <Typography
                      fontSize={"14px"}
                      fontWeight={400}
                      color={theme.palette.primary.main}
                    >
                      Select All
                    </Typography>
                    <Assets
                      src={`/assets/img/Search.svg`}
                      height={18}
                      width={19}
                    />
                  </Box>
                </Box>
                <PersonalDetailSettingComponent
                  data={allLocation}
                  handleClick={handleClick}
                  handleDelete={handleDelete}
                />
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
              // onClick={addEmployee}
              color={"inherit"}
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
}
