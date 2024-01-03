import React from "react";
import TextFieldWithLabel from "@components/common/textFieldWithLabel";
import {
  Button,
  Divider,
  Grid,
  InputLabel,
  Switch,
  TextField,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { IconWrapper } from "@components/common/customSvgIcon";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@redux/Redux/app/hooks";
import {
  getCandidateQualification,
  updateCandidateQualification,
  uploadCandidateQualificationAttachment,
} from "@redux/Redux/Actions/Candidate";
import ExpereinceEducationCard from "../expereinceEducationCard";
import ButtonText from "@components/Layout/ButtonText";
import { makeStyles } from "tss-react/mui";
import Dropzone, { useDropzone } from "react-dropzone";
import { useRouter } from "next/router";
import { format } from "date-fns";
import ButtonOutlined from "@components/Layout/ButtonOutlined";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
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

const CertificateAndEducation = ({
  getCandidateAdditionalDetailsData,
}: any) => {
  //Hooks
  const setFullPageLoader = usePageLoader();
  const router: any = useRouter();
  const { classes, cx } = useStyles();
  const dispatch = useDispatch();
  const { setSnackBar } = useSnackBar();

  //State
  const [showEditForm, setShowEditForm] = React.useState(false);
  const [eduData, setEduData] = React.useState<any>([]);
  const [errors, setError] = React.useState<any>({});
  const [data, setData] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [dataArray, setDataArray] = React.useState<any>([]);
  const [index, setIndex] = React.useState<number>(0);

  //Handler
  const onDrop = React.useCallback((acceptedFiles: any) => {
    // setJdDocument(acceptedFiles[0].name);
    // setVideoJDDocument(acceptedFiles[0].name);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  const handleChangeInput = (e: any) => {
    const { name, value, checked } = e.target;
    if (name === "isGapInEducation") {
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
  const handleChangeStartDate = (e:any) => {
    setData({
      ...data,
      startDate:e,
    });
  }
  const handleChangeEndDate = (e:any) => {
    setData({
      ...data,
      endDate:e,
    });
  }

  const saveAddExperience = async () => {
    if (validateStep()) {
      if (!isEdit) {
        setDataArray([
          ...dataArray,
          {
            name: data?.name,
            degree: data?.degree,
            grade: data?.grade,
            skill: data?.skill,
            startDate: format(new Date(data?.startDate), "yyyy-MM-dd"),
            endDate:format(new Date(data?.startDate), "yyyy-MM-dd"),
            description: data?.description,
            attachments: [
              {
                fileName: data?.fileName,
                uploadedFileName: data?.fileName,
              },
            ],
          },
        ]);
      } else {
        dataArray[index].name = data?.name;
        (dataArray[index].degree = data?.degree),
          (dataArray[index].grade = data?.grade),
          (dataArray[index].skill = data?.skill),
          (dataArray[index].startDate = data?.startDate),
          (dataArray[index].endDate = data?.endDate),
          (dataArray[index].description = data?.description),
          (dataArray[index].attachments = [
            {
              fileName: data?.fileName,
              uploadedFileName: data?.fileName,
            },
          ]);
      }
      changeShowEditForm(false);
      setData({
        name: "",
        degree: "",
        grade: "",
        startDate: null,
        endDate: null,
        isTillDate: "",
        mediaUrl: "",
        description: "",
        skill: "",
      });
      setIsEdit(false);
      const allData = [
        ...dataArray,
        {
          name: data?.name,
          degree: data?.degree,
          grade: data?.grade,
          skill: data?.skill,
          startDate: data?.startDate,
          endDate: data?.endDate,
          description: data?.description,
          attachments: [
            {
              fileName: data?.fileName,
              uploadedFileName: data?.fileName,
            },
          ],
        },
      ]
      saveExperience(allData);
    }
  };
  const changeShowEditForm = (e: boolean) => {
    setShowEditForm(e);
  };
  const editExperience = (i: any) => {
    setData({
      ...data,
      name: dataArray[i]?.name,
      degree: dataArray[i]?.degree,
      grade: dataArray[i]?.grade,
      startDate: dataArray[i]?.startDate
        ? format(new Date(dataArray[i]?.startDate), "yyyy-MM-dd")
        : "",
      endDate: dataArray[i]?.endDate
        ? format(new Date(dataArray[i]?.endDate), "yyyy-MM-dd")
        : "",
      skill: dataArray[i]?.skill,
      description: dataArray[i]?.description,
      mediaUrl: dataArray[i]?.mediaUrl,
      fileName: dataArray[i]?.attachments[0]?.fileName,
      fileUrl: dataArray[i]?.attachments[0]?.fileUrl,
    });
    changeShowEditForm(true);
    setIsEdit(true);
    setIndex(i);
  };

  const validateStep = () => {
    let errors: any = {};
    let formIsValid = true;
    if (!data?.name) {
      formIsValid = false;
      errors["name"] = "* Enter name of school Or college";
    }
    if (!data?.degree) {
      formIsValid = false;
      errors["degree"] = "* Enter your qualification";
    }
    if (!data?.grade) {
      formIsValid = false;
      errors["grade"] = "* Enter grade ";
    }
    setError(errors);
    return formIsValid;
  };

  const saveExperience = async (allData?:any) => {
    try {
      setLoading(true);
      const body = {
        educationAndCertification:allData?allData: dataArray,
        isGapInEducation: data?.isGapInEducation,
        gapInEducationDescription: data?.gapInEducationDescription,
        candidateId: router?.query?.candidateId,
      };
      let response = await dispatch(updateCandidateQualification(body));
      let error = await ErrorHandler(response, setSnackBar);
      if (error) {
        setSnackBar("success", response?.payload?.message);
        setLoading(false);
        changeShowEditForm(false);
        const body = `?CandidateId=${router?.query?.candidateId}`;
        const educationHistoryData = await dispatch(
          getCandidateQualification(body)
        );
        console.log("educationHistoryData", educationHistoryData);

        // setEduData(educationHistoryData?.payload?.data)
        setDataArray(
          educationHistoryData?.payload?.data?.educationAndCertification?.map(
            (e: any) => {
              return {
                ...e,
                startDate: e?.startDate
                  ? format(new Date(e?.startDate), "yyyy-MM-dd")
                  : "",
                endDate: e?.endDate
                  ? format(new Date(e?.endDate), "yyyy-MM-dd")
                  : "",
              };
            }
          )
        );
      } else {
        setLoading(false);
      }
    } catch (error) {
      setSnackBar("error", "Something went wrong!!");
      setLoading(false);
    }
  };

  const cancelForm = () => {
    setShowEditForm(false);
    setIsEdit(false);
    setData({
      name: "",
      degree: "",
      grade: "",
      startDate: null,
      endDate: null,
      isTillDate: "",
      mediaUrl: "",
      description: "",
      skill: "",
    });
    setError({});
  };
  const deleteExperience = (y: any) => {
    setDataArray(
      dataArray.filter((e: any) => {
        return e?.name !== y?.name;
      })
    );
    saveExperience(dataArray.filter((e: any) => {
      return e?.name !== y?.name;
    }))
  };
  React.useEffect(() => {
    (async () => {
      const body = `?CandidateId=${router?.query?.candidateId}`;
      const educationHistoryData = await dispatch(
        getCandidateQualification(body)
      );
      setEduData(educationHistoryData?.payload?.data);
    })();
  }, [router?.pathname]);
  // React.useEffect(() => {
  //   if (dataArray?.length !== 0) {
  //     saveExperience();
  //   }
  // }, [dataArray?.length]);
  React.useEffect(() => {
    setDataArray(
      getCandidateAdditionalDetailsData?.educationAndCertificationDetails?.educationAndCertification?.map(
        (e: any) => {
          return {
            ...e,
            startDate: e?.startDate
              ? format(new Date(e?.startDate), "yyyy-MM-dd")
              : "",
            endDate: e?.endDate
              ? format(new Date(e?.endDate), "yyyy-MM-dd")
              : "",
          };
        }
      )
    );
  }, [getCandidateAdditionalDetailsData]);
  return (
    <Box>
      {showEditForm ? (
        <Stack direction={"column"} marginTop={2}>
          <Grid container xs={12} spacing={2} justifyContent={"space-between"}>
            <Grid item xs={12} md={6}>
              <TextFieldComponent
                type="text"
                // placeholder={"Name of School or College"}
                text="Name of School or College"
                width="100%"
                valid
                name="name"
                value={data?.name}
                onChange={handleChangeInput}
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.name?.length > 0 ? "" : errors["name"]}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldComponent
                type="text"
                // placeholder={"Degree"}
                text="Degree"
                width="100%"
                valid
                name="degree"
                value={data?.degree}
                onChange={handleChangeInput}
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.degree?.length > 0 ? "" : errors["degree"]}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldComponent
                type="text"
                // placeholder={"Degree"}
                text="Grade"
                width="100%"
                valid
                name="grade"
                value={data?.grade}
                onChange={handleChangeInput}
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.grade?.length > 0 ? "" : errors["grade"]}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldWithLabel
                inputLabel="Skills"
                isMandatory={true}
                name="skill"
                onChange={handleChangeInput}
                value={data?.skill}
              />
            </Grid>
            <Grid item xs={12} md={6}>
               <DatePickerCommon
                  inputLabel="Start date"
                    name="startDate"
                    onChange={handleChangeStartDate}
                    value={data?.startDate}
                    />
                     </Grid>
            <Grid item xs={12} md={6}>
            <DatePickerCommon 
                  inputLabel="End date"
                    name="endDate"
                    value={data?.endDate}
                    onChange={handleChangeEndDate}/>
                </Grid>
            <Grid item xs={12} md={12}>
              <TextFieldWithLabel
                inputLabel="Description"
                isMandatory={true}
                rows={2}
                multiline
                name="description"
                onChange={handleChangeInput}
                value={data?.description}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <InputLabel>Media</InputLabel>
              <Typography variant="body2" marginTop={1} color={"textSecondary"}>
                Add or link to external documents, photos, sites, videos, and
                presentations.
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: "30px",
                  marginTop: "8px",
                }}
                endIcon={
                  <IconWrapper
                    fontSize="small"
                    icon="plus-symbol"
                    color={"primary"}
                  />
                }
              >
                Add Media
              </Button>
            </Grid>
            <Grid item xs={12} md={12}>
              <Dropzone
                onDrop={async (acceptedFiles: any) => {
                  setFullPageLoader(true);
                  console.log("acceptedFiles", acceptedFiles);
                  var formData = new FormData();
                  if (router?.query?.candidateId) {
                    formData.append(
                      "CandidateId",
                      router?.query?.candidateId as string
                    );
                  }
                  for (const key in acceptedFiles) {
                    formData.append(
                      "Attachment",
                      acceptedFiles[key],
                      acceptedFiles[key]?.name
                    );
                  }
                  let resumeInfo: any;
                  resumeInfo = await dispatch(
                    uploadCandidateQualificationAttachment(formData)
                  );
                  setData({
                    ...data,
                    fileName: resumeInfo?.payload?.data?.fileName,
                    fileUrl: resumeInfo?.payload?.data?.fileUrl,
                  });
                  let error = await ErrorHandler(resumeInfo, setSnackBar);
                  if (error) {
                    setSnackBar("success", resumeInfo?.payload?.message);
                    setLoading(false);
                    setFullPageLoader(false);
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
                          <Typography component={"span"}>
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
            </Grid>
          </Grid>
        </Stack>
      ) : (
        ""
      )}
      <Stack direction={"row-reverse"} marginTop={2}>
        {/* <Button
          sx={{
            borderBottom: "1px dashed",
            marginLeft: "auto",
            borderRadius: 0,
          }}
          startIcon={
            showEditForm ? (
              <IconWrapper
                fontSize="small"
                icon="plus-symbol"
                color={"primary"}
              />
            ) : (
              <IconWrapper
                fontSize="small"
                icon="plus-symbol"
                color={"primary"}
              />
            )}
          onClick={showEditForm ? saveAddExperience : changeShowEditForm}
        >
          {showEditForm ? "Save new education" : "Add New"}
        </Button> */}
        <ButtonOutlined
          startIcon={
            showEditForm ? (
              <IconWrapper
                fontSize="small"
                icon="transaction-history"
                color={"primary"}
              />
            ) : (
              <IconWrapper
                fontSize="small"
                icon="plus-symbol"
                color={"primary"}
              />
            )
          }
          onClick={
            showEditForm ? saveAddExperience : () => changeShowEditForm(true)
          }
          text={showEditForm ? "Save new education" : "Add New"}
          width="auto"
          height="  "
          borderRadius={5}
          loading={loading}
        />
        {showEditForm ? (
          <ButtonOutlined
            onClick={cancelForm}
            text={"Cancel"}
            width="auto"
            height=""
            marginRight={1}
            borderRadius={5}
            loading={loading}
          />
        ) : (
          ""
        )}
      </Stack>
      <Divider
        sx={{
          marginTop: 2,
        }}
      ></Divider>
      {dataArray && dataArray.length > 0
        ? dataArray.map((item: any, i: any) => {
          return (
            <ExpereinceEducationCard
              key={i}
              isEducation={true}
              institutionName={item?.name}
              courseName={item?.degree}
              grade={item.grade}
              skill={item.skills}
              duration={`${item.startDate && format(new Date(item.startDate), "dd/MM/yyyy")} to ${item.endDate && format(new Date(item.endDate), "dd/MM/yyyy")}`}
              location={item?.location}
              description={item?.description}
              onEdit={() => editExperience(i)}
              onDelete={() => deleteExperience(item)}
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
            <Switch name="isGapInEducation" onChange={handleChangeInput} checked={data?.isGapInEducation}/>
            <Typography>Yes</Typography> */}
            <SwitchTitle 
           name="isGapInEducation" onChange={handleChangeInput} checked={data?.isGapInEducation} switchName1="No" switchName2="Yes"/>
          </Stack>
        </Stack>
        <Stack
          direction={"row"}
          marginTop={1}
          marginBottom={2}
          alignItems={"center"}
        >
          <IconWrapper fontSize="small" icon="information" color={"disabled"} />
          <Typography
            variant="caption"
            color={"textSecondary"}
            marginLeft={"8px"}
          >
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequa
          </Typography>
        </Stack>
        <TextField
          size="small"
          fullWidth
          rows={1}
          multiline
          name="gapInEducationDescription"
          onChange={handleChangeInput}
        />
      </Stack>
      <Stack direction={"row-reverse"} mt={2}>
        <ButtonOutlined
          text={"Save"}
          width="auto"
          height="35px"
          onClick={saveExperience}
          borderRadius={5}
          loading={loading}
        />
      </Stack>
    </Box>
  );
};

export default CertificateAndEducation;
