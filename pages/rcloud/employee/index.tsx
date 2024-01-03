import React from "react";
import { Box, Button, Typography, Stack, Grid, useTheme } from "@mui/material";
import StandardLayout from "@components/Layout/StandardLayout";
import Assets from "@components/common/image_container";
import ButtonOutlined from "@components/Layout/ButtonOutlined";
import { IconWrapper } from "@components/common/customSvgIcon";
import ButtonContained from "@components/Layout/ButtonContained";
import PaperContainer from "@components/common/paperContainer";
import CustomDrawer from "@components/common/CustomDrawer";
import CustomeDrawerHeader from "@components/common/customDrawerHeader";
import Dropzone, { useDropzone } from "react-dropzone";
import { makeStyles } from "tss-react/mui";
import FormTitleWithInfo from "@components/common/formTitleWithInfo";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import DropDownComponent from "@components/Layout/DropDownComponent";
import DatePickerCommon from "@components/common/DatePickerCommon";
import { format } from "date-fns";

const useStyles = makeStyles()((theme) => {
  return {
    fileUpload: {
      padding: "6%",
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

const Index = () => {
  //Hooks
  const { classes, cx } = useStyles();
  const theme = useTheme();
  //State
  const [isBulkDrawer, setIsBulkDrawer] = React.useState(false);
  const [bulkDocumenet, setBulkDocumenet] = React.useState(false);
  const [isEmployeeDrawer, setIsEmployeeDrawer] = React.useState(false);
  const [errors, setError] = React.useState<any>({});
  const [data, setData] = React.useState<any>({
    firstName: "",
    lastName: "",
    role: "",
    group: "",
    email: "",
    employeeCode: "",
    date: "",
    reportingManager: "",
    employeeType: "",
  });
  //Handler
  const onDrop = React.useCallback((acceptedFiles: any) => {
    setBulkDocumenet(acceptedFiles[0].name);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleChangeDate = (e:any) => {
    setData({
      ...data,
      dateOfJoining:e,
    });
  }
  console.log("data",data);
  
  const validateStep = () => {
    let errors: any = {};
    let formIsValid = true;
    if (!data?.firstName) {
      formIsValid = false;
      errors["firstName"] = "* Enter first name";
    }
    if (!data?.lastName) {
      formIsValid = false;
      errors["lastName"] = "* Enter laste name";
    }
    if (!data?.role) {
      formIsValid = false;
      errors["role"] = "* select role";
    }
    if (!data?.group) {
      formIsValid = false;
      errors["group"] = "* select group";
    }
    if (!data?.email) {
      formIsValid = false;
      errors["email"] = "* Enter email";
    }

    setError(errors);
    return formIsValid;
  };

  const addEmployee = () => {
    if (validateStep()) {
      console.log("Added");
    }
  };
  //   React.useEffect(() => {
  //     document.body.style.backgroundColor = "white";
  //     return () => {
  //       document.body.style.backgroundColor = "";
  //     };
  //   }, []);
  const role = ["1", "2", "3", "4"];
  const group = ["A", "B", "C", "D"];
  return (
    <StandardLayout
      title="MyRCloud Dashboard (For Flow connectivity Purposes)"
      menuCode="rcloud"
    >
      <PaperContainer>
      <Box height="calc(100vh - 140px)">
      <Stack
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={2}>
          <Assets
            src={`/assets/img/adding-team.svg`}
            height={376}
            width={565}
          />
          <Typography fontSize={"32px"} fontWeight={700}>
            Start adding your team
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"} gap={2}>
            <ButtonOutlined
              text="Bulk Upload"
              borderRadius="24px"
              height="35px"
              width="150px"
              endIcon={
                <IconWrapper
                  icon="upload"
                  color={"primary"}
                  fontSize={"small"}
                />
              }
              onClick={() => setIsBulkDrawer(true)}
            />
            <ButtonContained
              text="Add Employees"
              borderRadius="24px"
              height="35px"
              width="160px"
              endIcon={
                <IconWrapper
                  icon="plus-symbol"
                  color={"inherit"}
                  fontSize={"small"}
                />
              }
              onClick={() => setIsEmployeeDrawer(true)}
            />
          </Box>
        </Stack>
      
      {isBulkDrawer && (
        <CustomDrawer
          isDrawerOpen={isBulkDrawer}
          handleClose={() => {
            setIsBulkDrawer(false);
          }}
          anchor={"right"}
        >
          <Box sx={{ marginTop: 0 }}>
            <CustomeDrawerHeader
              handleClose={() => setIsBulkDrawer(false)}
              title="Bulk Upload Employee"
            />
            <Stack p={2}>
              <Dropzone onDrop={async (acceptedFiles: any) => {}}>
                {({ getRootProps, getInputProps }) => (
                  <Box
                    className={classes.fileUpload}
                    {...getRootProps()}
                    marginTop={5}
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
                            {/* <Box>
                              <Box textAlign={"start"}>
                                <Typography>Download Sample File</Typography>
                              </Box>
                              <Box>
                                
                              </Box>
                            </Box> */}
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
            </Stack>
          </Box>
          <Box
            bgcolor={theme.palette.bgLightGray.main}
            width="100%"
            mt={0.5}
            position="sticky"
            bottom="0px"
          >
            <Box
              width="100%"
              bgcolor={theme.palette.bgLightGray.main}
              border-top="1px solid #DDDDDD"
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            >
              <ButtonContained
                marginBottom="12px"
                marginTop="12px"
                borderRadius="30px"
                text="Submit"
                marginRight="20px"
                width="15%"
                height="38px"
              />
            </Box>
          </Box>
        </CustomDrawer>
      )}

      {isEmployeeDrawer && (
        <CustomDrawer
          isDrawerOpen={isEmployeeDrawer}
          handleClose={() => {
            setIsEmployeeDrawer(false);
          }}
          anchor={"right"}
        >
          <Box sx={{ marginTop: 0 }}>
            <CustomeDrawerHeader
              handleClose={() => setIsEmployeeDrawer(false)}
              title="Add Employee"
            />
            <Stack p={2} mt={5}>
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                {" "}
                <Typography fontSize={"18px"} fontWeight={500}>
                  Employee Information
                </Typography>
                <Box display={"flex"} flexDirection={"row"} gap={0.5}>
                  <Typography
                    fontSize={"20px"}
                    color={theme.palette.error.main}
                  >
                    *
                  </Typography>
                  <Typography fontSize={"14px"}>
                    All Fields are Mandatory
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={2} mt={1}>
                <Grid item md={6} xs={12}>
                  <TextFieldComponent
                    type="text"
                    width="100%"
                    text={"First Name"}
                    valid
                    name="firstName"
                    value={data?.firstName}
                    onChange={handleChangeInput}
                  />
                  <Typography
                    variant="body2"
                    textAlign={"start"}
                    color={"error"}
                  >
                    {data?.firstName?.length > 0 ? "" : errors["firstName"]}
                  </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextFieldComponent
                    type="text"
                    width="100%"
                    text={"Last Name"}
                    valid
                    name="lastName"
                    value={data?.lastName}
                    onChange={handleChangeInput}
                  />
                  <Typography
                    variant="body2"
                    textAlign={"start"}
                    color={"error"}
                  >
                    {data?.lastName?.length > 0 ? "" : errors["lastName"]}
                  </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextFieldComponent
                    type="text"
                    width="100%"
                    text={"Employee Code"}
                    name="employeeCode"
                    value={data?.employeeCode}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <DropDownComponent
                    width="100%"
                    text="Role"
                    values={role}
                    name="role"
                    defaultValue={"Select"}
                    labelSize={"14px"}
                    value={data?.role}
                    onChange={handleChangeInput}
                    valid
                  />
                  <Typography
                    variant="body2"
                    textAlign={"start"}
                    color={"error"}
                  >
                    {data?.role?.length > 0 ? "" : errors["role"]}
                  </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <DropDownComponent
                    width="100%"
                    text="Group"
                    values={group}
                    name="group"
                    defaultValue={"Select"}
                    labelSize={"14px"}
                    value={data?.group}
                    onChange={handleChangeInput}
                    valid
                  />
                  <Typography
                    variant="body2"
                    textAlign={"start"}
                    color={"error"}
                  >
                    {data?.group?.length > 0 ? "" : errors["group"]}
                  </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <DatePickerCommon 
                  inputLabel="Date of Joining"
                    width="100%"
                    name="dateOfJoining"
                    value={data?.dateOfJoining}
                    onChange={handleChangeDate}/>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextFieldComponent
                    type="email"
                    text="Email"
                    width="100%"
                    name="email"
                    valid
                    value={data?.email}
                    onChange={handleChangeInput}
                  />
                  <Typography
                    variant="body2"
                    textAlign={"start"}
                    color={"error"}
                  >
                    {data?.email?.length > 0 ? "" : errors["email"]}
                  </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextFieldComponent
                    type="text"
                    width="100%"
                    text={"Reporting Manager"}
                    name="reportingManager"
                    value={data?.reportingManager}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <DropDownComponent
                    width="100%"
                    text="Employment Type"
                    values={role}
                    name="employeeType"
                    defaultValue={"Select"}
                    labelSize={"14px"}
                    value={data?.employeeType}
                    onChange={handleChangeInput}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Box>
          <Box
            bgcolor={theme.palette.bgLightGray.main}
            width="100%"
            mt={0.5}
            position="sticky"
            bottom="0px"
          >
            <Box
              width="100%"
              bgcolor={theme.palette.bgLightGray.main}
              border-top="1px solid #DDDDDD"
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            >
              <ButtonContained
                marginBottom="12px"
                marginTop="12px"
                borderRadius="30px"
                text="Submit"
                marginRight="20px"
                width="15%"
                height="38px"
                onClick={addEmployee}
              />
            </Box>
          </Box>
        </CustomDrawer>
      )}
      </Box>
      </PaperContainer>
    </StandardLayout>
  );
};

export default Index;
