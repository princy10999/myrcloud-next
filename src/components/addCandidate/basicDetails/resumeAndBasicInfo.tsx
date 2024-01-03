import React, { useEffect } from "react";
import DropDownComponent from "@components/Layout/DropDownComponent";
import { InfoOutlined } from "@mui/icons-material";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import { makeStyles } from "tss-react/mui";
import Dropzone, { useDropzone } from "react-dropzone";
import { format } from "date-fns";
import ButtonText from "@components/Layout/ButtonText";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
  Box,
  Stack,
  styled,
  useTheme,
} from "@mui/material";
import { IconWrapper } from "@components/common/customSvgIcon";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  createCandidate,
  createResume,
  getAllMaritalStatus,
  getAllNationalities,
  getCandidateDetails,
  getGenders,
  updateCandidate,
  uploadResume,
} from "@redux/Redux/Actions/Candidate";
import { useAppSelector } from "@redux/Redux/app/hooks";
import ToastMessage from "@components/common/ToastMessage";
import { responseEnum } from "@lib/enum";
import ButtonOutlined from "@components/Layout/ButtonOutlined";
import InputFiledWIthPhoneCode from "@components/Layout/InputFiledWIthPhoneCode";
import FormTitleWithInfo from "@components/common/formTitleWithInfo";
import useSnackBar from "@redux/hooks/useSnackBar";
import ErrorHandler from "@lib/errorHandler";
import usePageLoader from "@redux/hooks/usePageLoader";
import DatePickerCommon from "@components/common/DatePickerCommon";
import SwitchTitle from "@components/Layout/SwitchTitle";

const useStyles = makeStyles()((theme) => {
  return {
    fileUpload: {
      padding: "4%",
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
const ResumeAndBasicInfo = ({
  jdData,
  getCandidateAdditionalDetailsData,
}: any) => {
  // Hooks
  const setFullPageLoader = usePageLoader();
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const { classes, cx } = useStyles();
  const { setSnackBar } = useSnackBar();

  //State
  const [jdDocument, setJdDocument] = React.useState();
  const [videoJDDocument, setVideoJDDocument] = React.useState();
  const [errors, setError] = React.useState<any>({});
  const [toastMessage, setToastMessage] = React.useState<any>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorType, setErrorType] = React.useState<any>("");
  const [open, setOpen] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    date: "",
    maritalStatus: "",
    nationality: "",
    gender: "",
    yearOfExperience: "",
    currentLocation: "",
    currentOrganization: "",
    noticePeriod: "",
    linkedInUrl: "",
    currentSalary: "",
    expectedSalary: "",
    preferredTime: "",
    videoUrl: "",
  });

  const nation = ["Indian", "NRI", "Non-NRI"];
  const organization = ["Indian", "Aferican", "American"];

  const onDrop = React.useCallback((acceptedFiles: any) => {
    setJdDocument(acceptedFiles[0].name);
    setVideoJDDocument(acceptedFiles[0].name);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  const getAllNationalitiesList = useAppSelector(
    (state: any) =>
      state?.partner?.isGetAllNationalities?.getAllNationalitiesList?.data
  );
  const getAllMaritalStatusList = useAppSelector(
    (state: any) =>
      state?.partner?.isGetAllMaritalStatus?.getAllMaritalStatusList?.data
  );
  const getGendersList = useAppSelector(
    (state: any) => state?.partner?.isGetGenders?.getGendersList?.data
  );
  const status = getAllMaritalStatusList?.map((e: any) => e?.description);

  const gender =
    getGendersList && getGendersList?.map((e: any) => e?.description);

  const storeStatus = getAllMaritalStatusList?.filter(
    (e: any) => e?.description === data?.maritalStatus
  );
  const storeGender = getGendersList?.filter(
    (e: any) => e?.description === data?.gender
  );

  const handleChangeInput = (e: any) => {
    const { name, value, checked } = e.target;
    if (name === "isPhysicallyDisabled" || name === "isExEmployee") {
      setData({
        ...data,
        [name]: checked,
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };
  const handleChangeDate = (e:any) => {
    setData({
      ...data,
      date:e,
    });
  }
  var mobNumber = /^[1-9]{1}[0-9]{9}$/;

  const validateStep = () => {
    let errors: any = {};
    let formIsValid = true;
    if (!data?.firstName) {
      formIsValid = false;
      errors["firstName"] = "* Enter first name";
    }
    if (!data?.middleName) {
      formIsValid = false;
      errors["middleName"] = "* Enter middle name";
    }
    if (!data?.lastName) {
      formIsValid = false;
      errors["lastName"] = "* Enter last name";
    }
    if (!data?.email) {
      formIsValid = false;
      errors["email"] = "* Enter email";
    }
    if (!data?.phoneNumber) {
      formIsValid = false;
      errors["phoneNumber"] = "* Enter mobile Number";
    } else if (!data?.phoneNumber?.match(mobNumber)) {
      formIsValid = false;
      errors["invalidMNumber"] = "* Invalid Mobile Number";
    } else if (data?.phoneNumber?.length != 10) {
      formIsValid = false;
      errors["mobileNumbers"] = "* Mobile number must have 10 digits";
    }
    if (!data?.date) {
      formIsValid = false;
      errors["date"] = "* Please select date";
    }
    if (!data?.nationality) {
      formIsValid = false;
      errors["nation"] = "* Please select nationality";
    }
    if (!data?.yearOfExperience) {
      formIsValid = false;
      errors["experience"] = "*Enter experience";
    }
    if (!data?.linkedInUrl) {
      formIsValid = false;
      errors["url"] = "* Enter url";
    }
    if (!data?.currentSalary) {
      formIsValid = false;
      errors["salary"] = "* Enter current salary";
    }
    if (!data?.expectedSalary) {
      formIsValid = false;
      errors["ExpSalary"] = "* Enter expected salary";
    }
    if (!data?.preferredTime) {
      formIsValid = false;
      errors["preTime"] = "*Enter Preferred time";
    }
    setError(errors);
    return formIsValid;
  };
  const create_Candidate = async () => {
    setLoading(true);
    try {
      if (validateStep()) {
        const body = {
          firstName: data?.firstName,
          middleName: data?.middleName,
          lastName: data?.lastName,
          ISDCode: data?.ISdcode,
          MobileNumber: data?.phoneNumber,
          emailId: data?.email,
          dateOfBirth: data?.date
            ? format(new Date(data?.date), "yyyy-MM-dd")
            : "",
          maritalStatus: storeStatus[0],
          nationality: data?.nationality,
          gender: storeGender[0],
          yearsOfExperience: data?.yearOfExperience,
          currentLocation: data?.currentLocation,
          currentOrgName: data?.currentOrganization,
          isServingNoticePeriod:
            data?.isServingNoticePeriod === "yes" ? true : false,
          noticePeriodInDays: data?.noticePeriod ? data?.noticePeriod : 0,
          linkedInUrl: data?.linkedInUrl,
          currentSalary: data?.currentSalary,
          expectedSalary: data?.expectedSalary,
          preferredTimeToConnect: data?.preferredTime,
          isPhysicallyDisabled: data?.isPhysicallyDisabled,
          isExEmployee: data?.isExEmployee,
          exEmployeeDetails: data?.exEmployeeDetails,
          requisitionId: router?.query?.requisitionId,
          candidateId: router?.query?.candidateId && router?.query?.candidateId,
        };
        let resumeAndBasicInfo: any;
        if (!router?.query?.candidateId) {
          resumeAndBasicInfo = await dispatch(createCandidate(body));
        } else {
          resumeAndBasicInfo = await dispatch(updateCandidate(body));
        }
        let error = await ErrorHandler(resumeAndBasicInfo, setSnackBar);

        if (error) {
          setSnackBar("success", resumeAndBasicInfo?.payload?.message);
          setLoading(false);
          const body = `?RequisitionId=${router?.query?.requisitionId}&CandidateId=${router?.query?.candidateId} `;
          {
            router?.query?.candidateId && dispatch(getCandidateDetails(body));
          }
          if (resumeAndBasicInfo?.payload?.data?.candidateId) {
            router.push({
              pathname: "/partner/edit-candidate",
              query: {
                requisitionId: router?.query?.requisitionId,
                partnerId: router?.query?.partnerId,
                candidateId: resumeAndBasicInfo?.payload?.data?.candidateId,
              },
            });
          }
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      setSnackBar("error", "Something went wrong!!");
      setLoading(false);
    }

    setLoading(false);
  };
  useEffect(() => {
    dispatch(getAllMaritalStatus());
    dispatch(getAllNationalities());
    dispatch(getGenders());
  }, []);
  console.log("router?.query?.candidateId", router);
  React.useEffect(() => {
    if (getCandidateAdditionalDetailsData) {
      setData({
        firstName: getCandidateAdditionalDetailsData?.basicInfo?.firstName,
        middleName: getCandidateAdditionalDetailsData?.basicInfo?.middleName,
        lastName: getCandidateAdditionalDetailsData?.basicInfo?.lastName,
        ISdcode: getCandidateAdditionalDetailsData?.basicInfo?.isdCode,
        phoneNumber: getCandidateAdditionalDetailsData?.basicInfo?.mobileNumber,
        email: getCandidateAdditionalDetailsData?.basicInfo?.emailId,
        date: getCandidateAdditionalDetailsData?.basicInfo?.dateOfBirth
          ? format(
            new Date(
              getCandidateAdditionalDetailsData?.basicInfo?.dateOfBirth
            ),
            "yyyy-MM-dd"
          )
          : "",
        maritalStatus:
          getCandidateAdditionalDetailsData?.basicInfo?.maritalStatus?.value,
        nationality: getCandidateAdditionalDetailsData?.basicInfo?.nationality,
        gender: getCandidateAdditionalDetailsData?.basicInfo?.gender?.value,
        yearOfExperience:
          getCandidateAdditionalDetailsData?.basicInfo?.yearsOfExperience,
        currentLocation:
          getCandidateAdditionalDetailsData?.basicInfo?.currentLocation,
        currentOrganization:
          getCandidateAdditionalDetailsData?.basicInfo?.currentOrgName,
        isServingNoticePeriod: getCandidateAdditionalDetailsData?.basicInfo
          ?.isServingNoticePeriod
          ? "yes"
          : "no",
        noticePeriod:
          getCandidateAdditionalDetailsData?.basicInfo?.noticePeriodInDays,
        linkedInUrl: getCandidateAdditionalDetailsData?.basicInfo?.linkedInUrl,
        currentSalary:
          getCandidateAdditionalDetailsData?.basicInfo?.otherDetails
            ?.currentSalary,
        expectedSalary:
          getCandidateAdditionalDetailsData?.basicInfo?.otherDetails
            ?.expectedSalary,
        preferredTime:
          getCandidateAdditionalDetailsData?.basicInfo?.otherDetails
            ?.preferredTimeToConnect,
        isPhysicallyDisabled:
          getCandidateAdditionalDetailsData?.basicInfo?.otherDetails
            ?.isPhysicallyDisabled,
        isExEmployee:
          getCandidateAdditionalDetailsData?.basicInfo?.otherDetails
            ?.isExEmployee,
        exEmployeeDetails:
          getCandidateAdditionalDetailsData?.basicInfo?.exEmployeeDetails,
        resume: getCandidateAdditionalDetailsData?.basicInfo?.resume,
        fileName: getCandidateAdditionalDetailsData?.basicInfo?.resumeFileName
          ? getCandidateAdditionalDetailsData?.basicInfo?.resumeFileName
          : getCandidateAdditionalDetailsData?.basicInfo?.resume,
      });
    }
  }, [getCandidateAdditionalDetailsData]);
  console.log("getCandidateAdditionalDetailsData", data);
  return (
    <Box>
      <ToastMessage
        open={open}
        message={toastMessage}
        handleClose={() => setOpen(false)}
        severity={errorType}
      />
      <Stack direction={"column"}>
        <FormTitleWithInfo
          title="Upload your resume here"
          subtitle="A Max file size of 5MB and it must be in PDF or DOC format."
        />
        <Grid container spacing={3}>
          <Grid item md={12} xs={12} sm={12} mt={3}>
            <Dropzone
              onDrop={async (acceptedFiles: any) => {
                setFullPageLoader(true);
                console.log("acceptedFiles", acceptedFiles);
                var formData = new FormData();
                formData.append(
                  "RequisitionId",
                  router?.query?.requisitionId as string
                );
                if (router?.query?.candidateId) {
                  formData.append(
                    "candidateId",
                    router?.query?.candidateId as string
                  );
                }
                for (const key in acceptedFiles) {
                  formData.append(
                    "Resume",
                    acceptedFiles[key],
                    acceptedFiles[key]?.name
                  );
                }
                let resumeInfo: any;
                console.log("resumeInfo", resumeInfo);

                if (router?.query?.candidateId) {
                  resumeInfo = await dispatch(uploadResume(formData));
                } else {
                  resumeInfo = await dispatch(createResume(formData));
                }
                let error = await ErrorHandler(resumeInfo, setSnackBar);
                if (error) {
                  setSnackBar("success", resumeInfo?.payload?.message);
                  setLoading(false);
                  setFullPageLoader(false);
                  const body = `?RequisitionId=${router?.query?.requisitionId}&CandidateId=${router?.query?.candidateId} `;
                  {
                    router?.query?.candidateId &&
                      dispatch(getCandidateDetails(body));
                  }
                  if (resumeInfo?.payload?.data?.candidateId) {
                    router.push({
                      pathname: "/partner/edit-candidate",
                      query: {
                        requisitionId: router?.query?.requisitionId,
                        partnerId: router?.query?.partnerId,
                        candidateId: resumeInfo?.payload?.data?.candidateId,
                      },
                    });
                  }
                } else {
                  setLoading(false);
                  setFullPageLoader(false);
                }
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <Box className={classes.fileUpload} {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <Typography>Drop the files here ...</Typography>
                  ) : (
                    <>
                      {data?.fileName ? (
                        <Typography
                          component={"span"}
                          style={{ lineBreak: "anywhere" }}
                        >
                          You selected file {data?.fileName}
                        </Typography>
                      ) : (
                        <>
                          <Typography component={"span"}>
                            Drag and Drop file here
                          </Typography>
                          <Typography component={"span"}>Or </Typography>

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
                        </>
                      )}
                    </>
                  )}
                </Box>
              )}
            </Dropzone>
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {jdDocument ? "" : errors["jdDocument"]}
            </Typography>
            <Typography
              justifyContent={"center"}
              display={"flex"}
              mt={2}
              mb={1}
              fontWeight={400}
              fontSize={"16px"}
            >
              Or
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={4}>
            <TextFieldComponent
              type="text"
              text="First Name"
              placeholder="enter your name"
              width="100%"
              name="firstName"
              value={data?.firstName}
              onChange={handleChangeInput}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
              valid
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.firstName?.length > 0 ? "" : errors["firstName"]}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextFieldComponent
              type="text"
              text="Middle Name"
              placeholder="enter your name"
              width="100%"
              name="middleName"
              value={data?.middleName}
              onChange={handleChangeInput}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
              valid
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.middleName?.length > 0 ? "" : errors["middleName"]}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextFieldComponent
              type="text"
              text="Last Name"
              placeholder="enter your name"
              width="100%"
              name="lastName"
              value={data?.lastName}
              onChange={handleChangeInput}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
              valid
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.lastName?.length > 0 ? "" : errors["lastName"]}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <InputFiledWIthPhoneCode
              type="number"
              text="Phone Number"
              placeholder="enter your phone number"
              width="100%"
              name="phoneNumber"
              type2="number"
              value={data?.phoneNumber}
              value2={data?.ISdcode}
              onChange={handleChangeInput}
              name2="ISdcode"
              valid
              inputProps={{ maxlength: 10 }}
              inputProps2={{ min: 0, maxlength: 3 }}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
            />
            {/* <TextFieldComponent
              type="number"
              text="Phone Number"
              placeholder="enter your phone number"
              width="100%"
              name="phoneNumber"
              value={data?.phoneNumber}
              onChange={handleChangeInput}
              valid
              inputProps={{ maxlength: 10 }}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
            /> */}
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.phoneNumber?.length > 0 ? "" : errors["phoneNumber"]}
            </Typography>
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.phoneNumber?.match(mobNumber)
                ? ""
                : errors["invalidMNumber"]}
            </Typography>
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.phoneNumber?.length != 10 ? errors["mobileNumbers"] : ""}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextFieldComponent
              type="email"
              text="Email"
              placeholder="enter your email"
              width="100%"
              name="email"
              value={data?.email}
              onChange={handleChangeInput}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
              valid
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.email?.length > 0 ? "" : errors["email"]}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
             <DatePickerCommon
                  inputLabel="Date"
                  placeholder="enter your date"
                  value={data?.date}
                  onChange={handleChangeDate}
                    />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.date?.length > 0 ? "" : errors["date"]}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <DropDownComponent
              width="100%"
              text="Marital Status"
              values={status}
              onChange={handleChangeInput}
              name="maritalStatus"
              value={data?.maritalStatus}
              defaultValue={"Select"}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <DropDownComponent
              width="100%"
              text="Nationality"
              values={nation}
              onChange={handleChangeInput}
              name="nationality"
              value={data?.nationality}
              defaultValue={"Select"}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
              valid
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.nationality?.length > 0 ? "" : errors["nation"]}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <DropDownComponent
              width="100%"
              text="Gender"
              values={gender}
              onChange={handleChangeInput}
              name="gender"
              value={data?.gender}
              defaultValue={"Select"}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextFieldComponent
              inputProps={{ min: 0, max: 40 }}
              type="number"
              text="Years of Experience"
              placeholder="enter your experience"
              width="100%"
              name="yearOfExperience"
              value={data?.yearOfExperience}
              onChange={handleChangeInput}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
              valid
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.yearOfExperience?.length > 0 ? "" : errors["experience"]}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextFieldComponent
              type="text"
              text="Current Location"
              placeholder="enter your location"
              width="100%"
              name="currentLocation"
              value={data?.currentLocation}
              onChange={handleChangeInput}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextFieldComponent
              width="100%"
              text="Current Organization Name"
              values={organization}
              onChange={handleChangeInput}
              name="currentOrganization"
              value={data?.currentOrganization}
              defaultValue={"Select"}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <FormControl>
              <FormLabel>
                <Box
                  color={(theme) => theme.palette.bgBlack.main}
                  mt={2}
                  mb={1}
                >
                  Serving Notice Period
                </Box>
              </FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  value="yes"
                  control={
                    <Radio
                      size="small"
                      color="primary"
                      name="isServingNoticePeriod"
                      onChange={handleChangeInput}
                    />
                  }
                  label="Yes"
                />
                <FormControlLabel
                  value="no"
                  control={
                    <Radio
                      size="small"
                      color="primary"
                      name="isServingNoticePeriod"
                      onChange={handleChangeInput}
                    />
                  }
                  label="No"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextFieldComponent
              inputProps={{ min: 0 }}
              type="number"
              text="Notice Period(In Days)"
              width="100%"
              name="noticePeriod"
              value={data?.noticePeriod}
              onChange={handleChangeInput}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextFieldComponent
              type="text"
              text="LinkedIn URL"
              width="100%"
              name="linkedInUrl"
              placeholder="Copy and Paste Candidate URL"
              value={data?.linkedInUrl}
              onChange={handleChangeInput}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
              valid
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.linkedInUrl?.length > 0 ? "" : errors["url"]}
            </Typography>
          </Grid>
        </Grid>
      </Stack>
      <Stack direction={"column"} marginTop={2}>
        <FormTitleWithInfo
          title="Additional Details"
          subtitle="Candidate expectation and their previous history"
        />
        <Grid container xs={12} spacing={3}>
          <Grid item xs={12} sm={4} md={4}>
            <TextFieldComponent
              type="number"
              text="Current Salary (Annually)"
              width="100%"
              name="currentSalary"
              placeholder="Ex. 12 Lacs"
              value={data?.currentSalary}
              onChange={handleChangeInput}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
              valid
              inputProps={{ min: 0 }}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.currentSalary?.length > 0 ? "" : errors["salary"]}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextFieldComponent
              type="number"
              text="Expected Salary (Annually)"
              width="100%"
              name="expectedSalary"
              placeholder="Ex. 20 Lacs"
              value={data?.expectedSalary}
              onChange={handleChangeInput}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
              valid
              inputProps={{ min: 0 }}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.expectedSalary?.length > 0 ? "" : errors["ExpSalary"]}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextFieldComponent
              type="text"
              text="Preferred Time to Connect"
              width="100%"
              name="preferredTime"
              value={data?.preferredTime}
              onChange={handleChangeInput}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
              valid
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.preferredTime?.length > 0 ? "" : errors["preTime"]}
            </Typography>
          </Grid>
        </Grid>
      </Stack>
      <Stack direction={"column"} marginTop={2}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {/* <Typography fontSize={"18px"} fontWeight={600}>
            Physically Disabled
          </Typography> */}

          <FormTitleWithInfo title="Physically Disabled" />
          <Stack direction="row" spacing={1} alignItems="center">
            {/* <Typography>No</Typography>
            <AntSwitch
              defaultChecked={data?.isPhysicallyDisabled}
              value={data?.isPhysicallyDisabled}
              inputProps={{ "aria-label": "ant design" }}
              name="isPhysicallyDisabled"
              onChange={handleChangeInput}
            />
            <Typography>Yes</Typography> */}
            <SwitchTitle 
            defaultChecked={data?.isPhysicallyDisabled}
              value={data?.isPhysicallyDisabled}
              name="isPhysicallyDisabled"
              onChange={handleChangeInput} switchName1="No" switchName2="Yes"/>
          </Stack>
        </Stack>
        <Stack
          direction={"row"}
          marginTop={1}
          marginBottom={2}
          alignItems={"center"}
        >
          <IconWrapper fontSize="small" icon="information" color="disabled" />
          <Typography
            variant="caption"
            color={"textSecondary"}
            marginLeft={"8px"}
          >
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequa
          </Typography>
        </Stack>
      </Stack>
      <Stack direction={"column"} marginTop={2}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <FormTitleWithInfo
            title={`Are you an ex-employee of ${jdData?.jd?.client?.clientName}`}
          />
          <Stack direction="row" spacing={1} alignItems="center">
            {/* <Typography>No</Typography>
            <AntSwitch
              defaultChecked={data?.isExEmployee}
              value={data?.isExEmployee}
              inputProps={{ "aria-label": "ant design" }}
              name="isExEmployee"
              onChange={handleChangeInput}
            />
            <Typography>Yes</Typography> */}
              <SwitchTitle 
           defaultChecked={data?.isExEmployee}
           value={data?.isExEmployee}
           name="isExEmployee"
           onChange={handleChangeInput}
            switchName1="No" switchName2="Yes"/>
          </Stack>
        </Stack>
        {data?.isExEmployee && (
          <TextField
            size="small"
            fullWidth
            rows={2}
            multiline
            name="exEmployeeDetails"
            onChange={handleChangeInput}
          />
        )}
      </Stack>
      <Stack direction={"row-reverse"} mt={2}>
        <ButtonOutlined
          text={"Save"}
          width="auto"
          height="35px"
          onClick={create_Candidate}
          borderRadius={5}
          loading={loading}
        />
      </Stack>
    </Box>
  );
};

export default ResumeAndBasicInfo;
