import React from "react";
import {
  Box,
  Typography,
  Grid,
  InputLabel,
  RadioGroup,
  Stack,
  useTheme,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Dropzone, { useDropzone } from "react-dropzone";
import { makeStyles } from "tss-react/mui";
import PlusButton from "@components/Layout/PlusButton";
import DropDownComponent from "@components/Layout/DropDownComponent";
import DropDownWithCheckbox from "@components/Layout/DropDownWithCheckbox";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import RadioButtonBox from "@components/Layout/RadioButtonBox";
import AutoCompleteSearch from "@components/Layout/CustomAutoCompleteDropDown";
import Chip from "@mui/material/Chip";
import ButtonText from "@components/Layout/ButtonText";
import TextEditor from "@components/common/TextEditor";
import CheckBoxCircle from "@components/Layout/CheckBoxCircle";
import { IconWrapper } from "@components/common/customSvgIcon";
import {
  createRequisitionWithJdParsing,
  getAllLanguageMaster,
  getAllQualificationMaster,
  getAllSkillMaster,
  getClient,
  getCreateRequisition,
  getJdByClientCodeAndJobTitle,
  getJobTitleByClientId,
  getRequisitionTranType,
  getUpdateRequisitionBasicDetail,
  UpdateRequisitionWithJdParsing,
} from "@redux/Redux/Actions/Client";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@redux/Redux/app/hooks";
import StyledAccordian from "@components/common/styledAccordian";
import StyledAccordianSummary from "@components/common/styledAccordianSummary";
import StyledAccordianDetails from "@components/common/styledAccordianDetail";
import { serialize } from "object-to-formdata";
import {
  getIndustryPreferenceList,
  getRolePreferenceList,
} from "@redux/Redux/Actions/Partners";
import { useRouter } from "next/router";
import { format } from "date-fns";
import FormTitleWithInfo from "@components/common/formTitleWithInfo";
import useSnackBar from "@redux/hooks/useSnackBar";
import usePageLoader from "@redux/hooks/usePageLoader";
import ErrorHandler from "@lib/errorHandler";
import ButtonOutlined from "@components/Layout/ButtonOutlined";
import DatePickerCommon from "@components/common/DatePickerCommon";
import { validURL } from "@lib/linkValidation";

const useStyles = makeStyles()((theme) => {
  return {
    fileUpload: {
      padding: "3%",
      width: "100%",
      border: `1px dashed ${theme.palette.bgGray.main}`,
      borderRadius: "4px",
      position: "relative",
      marginBottom: 6,
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "16px",
      color: theme.palette.bgBlack.main,
      backgroundColor: "#F9F9F9",
      display: "flex",
      justifyContent: "center",
      gap: 20,
    },
  };
});

export default function PositionDetail({ editRequisitionData }: any) {
  //Hooks
  const dispatch = useDispatch();
  const theme = useTheme();
  const { classes, cx } = useStyles();
  const router = useRouter();
  const { setSnackBar } = useSnackBar();
  const setFullPageLoader = usePageLoader();

  //State
  const [errors, setError] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [clientNameList, setClientNameList] = React.useState<any>([]);
  const [requisitionId, setRequisitionId] = React.useState<any>("");
  const [candidatepreferenceList, setCandidatepreferenceList] =
    React.useState<any>([]);
  const [requisitionpriorityList, setRequisitionpriorityList] =
    React.useState<any>([]);
  const [requisitionstatusList, setRequisitionstatusList] = React.useState<any>(
    []
  );
  const [industryPreferenceList, setIndustryPreferenceList] =
    React.useState<any>([]);
  const [workfromList, setWorkfromList] = React.useState<any>([]);
  const [count4, setCount4] = React.useState<any>("2");
  const [jdDocument, setJdDocument] = React.useState<any>();
  const [videoJDDocument, setVideoJDDocument] = React.useState<any>();
  const [additionDocuments, setAdditionalDocuments] = React.useState<any>();
  const [data, setData] = React.useState<any>({
    client: "",
    jobTitle: "",
    rolePreference: [],
    location: "",
    noOfPosition: "",
    employmentType: "",
    candidatePreference: "",
    ageRangeMin: "",
    ageRangeMax: "",
    industry: "",
    intendedDOJ: "",
    videoUrl: "",
    totalMinExperience: "",
    totalMaxExperience: "",
    relevantMinExperience: "",
    relevantMaxExperience: "",
    description: "",
  });
  const [selectLan, setSelectLan] = React.useState<any>([]);
    console.log("count4",data);
  const [edu, setEdu] = React.useState<any>("");
  const [lan, setLan] = React.useState<any>("");
  const [skillValue, setSkillValue] = React.useState<any>("");
  const [education, setEducation] = React.useState<any>([]);
  const [skillChip, setSkillChip] = React.useState<any>([]);
  const [preferredSkill, setPreferredSkill] = React.useState<any>([]);
  const [rolePreferenceList, setRolePreferenceList] = React.useState<any[]>([]);
  const [educationQualification, setEducationQualification] =
    React.useState<any>([]);
  const [jobTitleList, setJobTitleList] = React.useState<any>([]);
  const [description, setDescription] = React.useState("");

  const clientLists = useAppSelector(
    (state: any) => state?.client?.isGetClient?.clientList?.data
  );

  const requisitionTranTypeList = useAppSelector(
    (state: any) =>
      state?.client?.isGetRequisitionTranType?.requisitionTranTypeList?.data
  );

  const languageList = useAppSelector(
    (state: any) => state?.client?.isGetAllLanguageMaster?.languageList?.data
  );
  const skillList = useAppSelector(
    (state: any) => state?.client?.isGetAllSkillMaster?.skillList?.data
  );
  const allQualificationMasterList = useAppSelector(
    (state: any) =>
      state?.client?.isGetAllQualificationMaster?.AllQualificationMasterList
        ?.data
  );
  const allJobTitle = useAppSelector(
    (state: any) => state?.client?.isGetJobTitleByClientId?.getJobTitle?.data
  );

  const skills =
    skillList?.length !== 0 ? skillList?.map((e: any) => e?.title) : [];

  const language = languageList?.map((e: any) => e?.description);

  const candidatepreference = requisitionTranTypeList?.filter(
    (e: any) => e?.tranCode === "candidatepreference"
  );

  const employmentType = requisitionTranTypeList?.filter(
    (e: any) => e?.tranCode === "employmentType"
  );
  const requisitionclassification = requisitionTranTypeList?.filter(
    (e: any) => e?.tranCode === "requisitionclassification"
  );

  const requisitionpriority = requisitionTranTypeList?.filter(
    (e: any) => e?.tranCode === "requisitionpriority"
  );

  const requisitionstatus = requisitionTranTypeList?.filter(
    (e: any) => e?.tranCode === "requisitionstatus"
  );

  const workfrom = requisitionTranTypeList?.filter(
    (e: any) => e?.tranCode === "workfrom"
  );

  const clientId = clientLists?.filter(
    (e: any) => e?.clientName === data?.client
  );

  const EmploymentType = employmentType?.filter(
    (e: any) => e?.value === data?.employmentType
  );
  const employmentTypeList = employmentType?.map((e: any) => e?.value);
  const candidatePreferenceValue = candidatepreference?.filter(
    (e: any) => e?.value === data?.candidatePreference
  );

  //Handler
  const onDrop = React.useCallback((acceptedFiles: any) => {
    setJdDocument(acceptedFiles[0].name);
    setVideoJDDocument(acceptedFiles);
    setAdditionalDocuments(acceptedFiles[0].name);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4"],
    },
  });
  const handleEducationDelete = (chipToDelete: any) => () => {
    setEducation((item: any) =>
      education.filter((item: any) => item !== chipToDelete)
    );
  };
  const handleSkillDelete = (chipToDelete: any) => () => {
    setSkillChip(skillChip.filter((item: any) => item !== chipToDelete));
  };
  const handlePreferredSkillDelete = (chipToDelete: any) => () => {
    setPreferredSkill((item: any) =>
      preferredSkill.filter((item: any) => item !== chipToDelete)
    );
  };
  const handleCount = (e: any) => {
    setCount4(e?.target?.value);
  };
  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    if (name === "rolePreference") {
      let duplicateRemoved: any = [];
      value.forEach((item: any) => {
        if (duplicateRemoved.findIndex((o: any) => o === item) >= 0) {
          duplicateRemoved = duplicateRemoved.filter((x: any) => x === item);
        } else {
          duplicateRemoved.push(item);
        }
      });
      setData({
        ...data,
        [name]: duplicateRemoved,
      })
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };
  const handleChangeDate = (e: any) => {
    setData({
      ...data,
      intendedDOJ: e,
    });
  }

  const onEditorChange = async (event: any) => {
    setDescription(event);
  };
  const handleChangeInputForEducation = (e: any, value: any) => {
    setEdu(e?.target?.value);
  };

  const handleChangeForLang = (e: any, newValue: any) => {
    if (newValue) {
      setSelectLan([...selectLan, { value: newValue }]);
    }
  };
  const handleChangeInputForLang = (e: any, value: any) => {
    setLan(e?.target?.value);
  };
  const handleChangeForSkill = (e: any, newValue: any) => {
    if (newValue) {
      setSkillChip([...skillChip, newValue]);
    }
  };
  const handleChangeInputForSkill = (e: any, value: any) => {
    setSkillValue(e?.target?.value);
  };
  const handleChangeForEducation = (e: any, newValue: any) => {
    if (newValue) {
      if (!education?.includes(newValue)) {
        setEducation([...education, newValue]);
      }
    }
  };
  const addSkill = () => {
    if (edu) {
      if (!education?.includes(edu)) {
        setEducation([...education, edu]);
      }
    }
  };
  const addMainSkill = () => {
    if (skillValue) {
      if (!skillChip?.includes(skillValue)) {
        setSkillChip([...skillChip, skillValue]);
      }
    }
  };
  const setRequisitionData = (
    requisitionData: any,
    candidateDetails: any,
    location: any
  ) => {
    setData({
      ...data,
      client: requisitionData?.client?.clientName || "",
      noOfPosition: requisitionData?.positionCount,
      ageRangeMin: requisitionData?.age?.minRange,
      jobTitle: requisitionData?.jobTitle,
      employmentType: requisitionData?.employmentType?.value,
      candidatePreference: candidateDetails,
      ageRangeMax: requisitionData?.age?.maxRange,
      industry: requisitionData?.industry,
      intendedDOJ: requisitionData?.intendedDoj
        ? format(new Date(requisitionData?.intendedDoj), "yyyy-MM-dd")
        : "",
      videoUrl: "",
      totalMinExperience: requisitionData?.workExperience?.totalMinimumYear,
      totalMaxExperience: requisitionData?.workExperience?.totalMaximumYear,
      relevantMinExperience:
        requisitionData?.workExperience?.releventMinimumYear,
      relevantMaxExperience:
        requisitionData?.workExperience?.releventMaximumYear,
      description: requisitionData?.jobDescription,
      location: location || "",
      rolePreference: requisitionData?.rolePreference || [],
    });
    setEducation(requisitionData?.educations || []);
    setSkillChip(requisitionData?.skills?.requiredSkill || []);
    setPreferredSkill(requisitionData?.skills?.preferredSkill || []);
    setSelectLan(requisitionData?.languages || []);
  };

  const handleChangeJobTitle = async (e: any, newValue: any) => {
    const body = `?ClientId=${clientId?.[0]?.clientId}&JobTitle=${newValue}`;
    let response = await dispatch(getJdByClientCodeAndJobTitle(body));
    if (response?.payload?.data) {
      let requisitionData = response?.payload?.data;
      setRequisitionData(requisitionData, "", "");
    }
  };

  const handleChangeClient = async (e: any, newValue: any) => {
    setData({
      ...data,
      client: newValue,
    });
  };
  const handleChangeIndustry = async (e: any, newValue: any) => {
    setData({
      ...data,
      industry: newValue,
    });
  };

  const handleChangeJdDocument = async (e: any) => {
    let formData = new FormData();
    formData.append("ClientId", clientId[0]?.clientId);
    formData.append("JobTitle", data?.jobTitle);
    formData.append("JdFile", e[0], e[0].name);
    let response = await dispatch(createRequisitionWithJdParsing(formData));
    if (response?.payload?.data) {
      let requisitionData = response?.payload?.data?.jd;
      setRequisitionData(
        requisitionData,
        response?.payload?.data?.candidatePreference?.value,
        response?.payload?.data?.location
      );
    }
  };
  const handleChangeUpdateJdDocument = async (e: any) => {
    let formData = new FormData();
    formData.append(
      "requisitionId",
      requisitionId ? requisitionId : editRequisitionData?.requisitionId
    );
    formData.append("JdFile", e[0], e[0].name);
    let response = await dispatch(UpdateRequisitionWithJdParsing(formData));
    if (response?.payload?.data) {
      let requisitionData = response?.payload?.data?.jd;
      setRequisitionData(
        requisitionData,
        response?.payload?.data?.candidatePreference?.value,
        response?.payload?.data?.location
      );
    }
  };

  const validateStep1 = () => {
    let errors: any = {};
    let formIsValid = true;
    if (!data?.client) {
      formIsValid = false;
      errors["client"] = "* Please select client";
    }
    if (!data?.jobTitle) {
      formIsValid = false;
      errors["jobTitle"] = "* Please enter job title";
    }
    // if (!data?.location) {
    //   formIsValid = false;
    //   errors["location"] = "* please enter location";
    // }
    // if (!data?.ageRangeMin) {
    //   formIsValid = false;
    //   errors["ageRangeMin"] = "* please enter age range min";
    // }
    if (!data?.rolePreference) {
      formIsValid = false;
      errors["rolePreference"] = "* please enter rolePreference";
    }
    // if (!data?.ageRangeMax) {
    //   formIsValid = false;
    //   errors["ageRangeMax"] = "* please enter age range max";
    // }
    // if (+data?.ageRangeMax <= +data?.ageRangeMin) {
    //   formIsValid = false;
    //   errors["ageRangeMax2"] = "* please enter correct range max";
    // }
    // if (!data?.totalMaxExperience) {
    //   formIsValid = false;
    //   errors["totalMaxExperience"] = "* please enter total max experience";
    // }
    // if (+data?.totalMaxExperience <= +data?.totalMinExperience) {
    //   formIsValid = false;
    //   errors["totalMaxExperience2"] = "* please enter correct max experience";
    // }
    // if (!data?.totalMinExperience) {
    //   formIsValid = false;
    //   errors["totalMinExperience"] = "* please enter total min experience";
    // }
    if (!data?.relevantMinExperience) {
      formIsValid = false;
      errors["relevantMinExperience"] =
        "* Please enter relevant max experience";
    }
    if (!data?.relevantMaxExperience) {
      formIsValid = false;
      errors["relevantMaxExperience"] =
        "* Please enter relevant min experience";
    }
    if (+data?.relevantMaxExperience <= +data?.relevantMinExperience) {
      formIsValid = false;
      errors["relevantMaxExperience2"] =
        "* Please enter correct relevant min experience";
    }
    // if (!data?.noOfPosition) {
    //   formIsValid = false;
    //   errors["noOfPosition"] = "* please enter position";
    // }

    // if (!data?.employmentType) {
    //   formIsValid = false;
    //   errors["employmentType"] = "* please select employee type";
    // }
    if (!data?.industry) {
      formIsValid = false;
      errors["industry"] = "* please select industry";
    }
    // if (!data?.candidatePreference) {
    //   formIsValid = false;
    //   errors["candidatePreference"] = "* please select candidate preference";
    // }
    if (count4 === "1" && !videoJDDocument?.[0]?.name) {
      if (!data?.videoUrl) {
        formIsValid = false;
        errors["videoUrl"] = "* please enter video url";
      } else if (!validURL(data?.videoUrl)) {
        formIsValid = false;
        errors["videoUrls"] = "* Please enter correct URL";
      }
    }
    // if (description === "<p><br></p>" && !jdDocument) {
    //   formIsValid = false;
    //   errors["description"] = "* please enter description";
    // }
    if (selectLan?.length === 0) {
      formIsValid = false;
      errors["selectLan"] = "* Please select language";
    }
    if (skillChip?.length === 0) {
      formIsValid = false;
      errors["skillChip"] = "* Please select skill";
    }
    if (education?.length === 0) {
      formIsValid = false;
      errors["chip2"] = "* Please select education";
    }
    setError(errors);
    return formIsValid;
  };

  const createRequisition = async () => {
    if (validateStep1()) {
      setLoading(true);
      try {
        let getLang: any = [];
        languageList.forEach((element: any) => {
          selectLan.forEach((element1: any) => {
            if (element1.value === element.description) {
              getLang.push({
                id: element?.id,
                code: element?.code,
                value: element?.description,
                canRead: element1?.canRead ? true : false,
                canSpeak: element1?.canSpeak ? true : false,
                canWrite: element1?.canWrite ? true : false,
              });
            }
          });
        });
        let objData = {
          JobTitle: data?.jobTitle,
          PositionCount: data?.noOfPosition,
          "EmploymentType.Id": EmploymentType[0]?.id,
          "EmploymentType.Code": EmploymentType[0]?.code,
          "EmploymentType.Value": EmploymentType[0]?.value,
          "candidatePreferenceValue.Id": candidatePreferenceValue[0]?.id,
          "candidatePreferenceValue.Code": candidatePreferenceValue[0]?.code,
          "candidatePreferenceValue.Value": candidatePreferenceValue[0]?.value,
          "Age.MinRange": data?.ageRangeMin,
          "Age.MaxRange": data?.ageRangeMax,
          IntendedDoJ: format(new Date(data?.intendedDOJ), "yyyy-MM-dd"),
          JobDescription: jdDocument ? jdDocument : description,
          "RequiredExperience.TotalMinimumYear": data?.totalMinExperience,
          "RequiredExperience.TotalMaximumYear": data?.totalMaxExperience,
          "RequiredExperience.ReleventMinimumYear": data?.relevantMinExperience,
          "RequiredExperience.ReleventMaximumYear": data?.relevantMaxExperience,
          Educations: education,
          RolePreference: data?.rolePreference,
          Location: data?.location,
          Industry: data?.industry,
          "Skills.RequiredSkill": skillChip,
          "Skills.PreferredSkill": preferredSkill,
          Languages: getLang,
        } as any;

        if (videoJDDocument) objData["VideoJd.VideoJd"] = videoJDDocument;
        if (data?.videoUrl) objData["VideoJd.VideoLink"] = data?.videoUrl;

        if (!editRequisitionData) {
          (objData["Client.ClientId"] = clientId[0]?.clientId),
            (objData["Client.ClientName"] = clientId[0]?.clientName);
        } else {
          objData["requisitionId"] = requisitionId
            ? requisitionId
            : editRequisitionData?.requisitionId;
        }

        const formData = serialize(objData, { indices: true });
        let positionDetail: any;
        if (!editRequisitionData) {
          positionDetail = await dispatch(getCreateRequisition(formData));
        } else {
          positionDetail = await dispatch(
            getUpdateRequisitionBasicDetail(formData)
          );
        }
        let error = await ErrorHandler(positionDetail, setSnackBar);
        if (error) {
          setSnackBar("success", "Position details update successfully.");
          setLoading(false);
          if (!editRequisitionData) {
            setRequisitionId(positionDetail?.payload?.data?.requisitionId);
            router.push({
              pathname: "/client/edit-requisition",
              query: {
                requisitionId: positionDetail?.payload?.data?.requisitionId,
              },
            });
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        setSnackBar("error", "Something went wrong !");
        setLoading(false);
      }
    }
    setLoading(false);
  };

  const addLanguage = () => {
    setSelectLan([...selectLan, { value: lan }]);
  };

  const addRead = (e: any) => {
    let dummy = selectLan?.map((y: any) => {
      if (e?.value === y?.value) {
        return { ...e, canRead: e?.canRead ? !e?.canRead : true };
      }
      return y;
    });
    setSelectLan(dummy);
  };

  const addWrite = async (e: any) => {
    let dummy = await selectLan?.map((y: any) => {
      if (e?.value === y?.value) {
        return { ...e, canWrite: !e?.canWrite };
      }
      return y;
    });
    setSelectLan(dummy);
  };

  const addSpeak = (e: any) => {
    let dummy = selectLan?.map((y: any) => {
      if (e?.value === y?.value) {
        return { ...e, canSpeak: e?.canSpeak ? !e?.canSpeak : true };
      }
      return y;
    });
    setSelectLan(dummy);
  };
  const allowDrop = (e: any) => {
    if (!preferredSkill?.includes(e)) {
      setPreferredSkill([...preferredSkill, e]);
      setSkillChip(skillChip.filter((item: any) => item !== e));
    }
  };
  const handleAccordion =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const rolePreference = ["2 year", "6 month", "3 year"];

  React.useEffect(() => {
    setClientNameList(clientLists?.map((e: any) => e?.clientName));
    setRequisitionpriorityList(
      requisitionclassification?.map((e: any) => e?.value)
    );
    setRequisitionstatusList(requisitionstatus?.map((e: any) => e?.value));
    setWorkfromList(workfrom?.map((e: any) => e?.value));
  }, [clientLists]);
  React.useEffect(() => {
    setCandidatepreferenceList(requisitionTranTypeList?.filter(
      (e: any) => e?.tranCode === "candidatepreference"
    )?.map((e: any) => e?.value));
  }, [requisitionTranTypeList]);

  React.useEffect(() => {
    setEducationQualification(
      allQualificationMasterList?.map((e: any) => e?.code)
    );
  }, [allQualificationMasterList]);

  React.useEffect(() => {
    setJobTitleList(allJobTitle?.map((e: any) => e?.jobTitle));
  }, [allJobTitle]);

  React.useEffect(() => {
    if (editRequisitionData) {
      setRequisitionData(
        editRequisitionData?.jd,
        editRequisitionData?.candidatePreference?.value,
        editRequisitionData?.location
      );
    }
  }, [editRequisitionData]);
  React.useEffect(() => {
    (async () => {
      const body = `?PageIndex=1`;
      setFullPageLoader(true);
      await dispatch(getClient());
      await dispatch(getRequisitionTranType());
      await dispatch(getAllLanguageMaster());
      await dispatch(getAllSkillMaster());
      await dispatch(getAllQualificationMaster());
      const industry = await dispatch(getIndustryPreferenceList(body));
      const industryPreference: any = industry?.payload?.data;
      const indus: any = [];
      industryPreference?.length > 0 &&
        industryPreference?.map((item: any) => {
          return indus.push(item.description);
        });

      setIndustryPreferenceList(indus);
      const role = await dispatch(getRolePreferenceList());
      const rolePreference: any = role?.payload?.data;
      const desc: any = [];
      rolePreference?.length > 0 &&
        rolePreference?.map((item: any) => {
          return desc.push(item?.description);
        });
      setRolePreferenceList(desc);
      setFullPageLoader(false);
    })();
  }, []);
  React.useEffect(() => {
    const body = `?ClientId=${clientId?.[0]?.clientId}`;
    dispatch(getJobTitleByClientId(body));
  }, [data?.client]);

  return (
    <>
      <Box marginBottom={1.5}>
        <StyledAccordian
          expanded={expanded === "panel1"}
          onChange={handleAccordion("panel1")}
        >
          <StyledAccordianSummary
            expandIcon={<IconWrapper fontSize="11px" icon="down" />}
            aria-controls="panel1a-content"
            id="panel1"
          >
            <Typography fontWeight={"inherit"}>
              Position Details and Description
            </Typography>
          </StyledAccordianSummary>
          <StyledAccordianDetails>
            <FormTitleWithInfo
              title="Position Details"
              subtitle="Enter your position details below"
            />

            <Grid container spacing={2}>
              <Grid item md={4} xs={6} sm={6}>
                <AutoCompleteSearch
                  width={"100%"}
                  text="Client"
                  placeholder={"Select"}
                  handleChange={handleChangeClient}
                  options={clientNameList || []}
                  name="client"
                  defaultValue={data?.client || ""}
                  handleChangeInput={handleChangeInput}
                  valid
                />

                <Typography variant="body2" textAlign={"start"} color={"error"}>
                  {data?.client?.length > 0 ? "" : errors["client"]}
                </Typography>
              </Grid>
              <Grid item md={4} xs={6} sm={6}>
                <AutoCompleteSearch
                  width={"100%"}
                  text="Job Title"
                  placeholder={"Select"}
                  handleChange={handleChangeJobTitle}
                  options={jobTitleList}
                  name="jobTitle"
                  defaultValue={data?.jobTitle || ""}
                  inputValue1={data?.jobTitle}
                  handleChangeInput={handleChangeInput}
                  valid
                />
                <Typography variant="body2" textAlign={"start"} color={"error"}>
                  {data?.jobTitle?.length > 0 ? "" : errors["jobTitle"]}
                </Typography>
              </Grid>
              <Grid item md={4} xs={6} sm={6}>
                <DropDownWithCheckbox
                  text="Role Preference"
                  placeholder="Select"
                  width="100%"
                  options={rolePreferenceList}
                  name="rolePreference"
                  value={data?.rolePreference || ""}
                  onChange={handleChangeInput}
                  labelSize={"14px"}
                  labelColor={theme.palette.bgGray.main}
                valid
                // checked={rolePreferenceList.indexOf(values) > -1}
                />
                <Typography variant="body2" textAlign={"start"} color={"error"}>
                  {data?.rolePreference?.length > 0
                    ? ""
                    : errors["rolePreference"]}
                </Typography>
              </Grid>
              <Grid item md={4} xs={6} sm={6}>
                <TextFieldComponent
                  type="text"
                  text="Location"
                  width="100%"
                  name="location"
                  value={data?.location}
                  onChange={handleChangeInput}
                  labelSize={"14px"}
                  labelColor={theme.palette.bgGray.main}
                // valid
                />
                <Typography variant="body2" textAlign={"start"} color={"error"}>
                  {data?.location?.length > 0 ? "" : errors["location"]}
                </Typography>
              </Grid>
              <Grid item md={4} xs={6} sm={6} marginTop={0}>
                <TextFieldComponent
                  type="number"
                  text="No of Position(s)"
                  width="100%"
                  name="noOfPosition"
                  value={data?.noOfPosition}
                  labelSize={"14px"}
                  labelColor={theme.palette.bgGray.main}
                  onChange={handleChangeInput}
                  // valid
                  inputProps={{ min: 1 }}
                  onKeyDown={(event: any) => {
                    console.log("event.code",event.code);
                    
                    if (
                      event.code === "Minus" ||
                      (data?.noOfPosition?.length === 0 && event.code === "Numpad0") ||
                      event.code === "NumpadSubtract"
                    ) {
                      event.preventDefault();
                    }
                  }}
                />
                <Typography variant="body2" textAlign={"start"} color={"error"}>
                  {data?.noOfPosition?.length > 0 ? "" : errors["noOfPosition"]}
                </Typography>
              </Grid>
              <Grid item md={4} xs={6} sm={6}>
                <DropDownComponent
                  width="100%"
                  text="Employment Type"
                  values={employmentTypeList || []}
                  name="employmentType"
                  value={data?.employmentType}
                  onChange={handleChangeInput}
                  labelSize={"14px"}
                  labelColor={theme.palette.bgGray.main}
                // valid
                />
                <Typography variant="body2" textAlign={"start"} color={"error"}>
                  {data?.employmentType?.length > 0
                    ? ""
                    : errors["employmentType"]}
                </Typography>
              </Grid>
              <Grid item md={4} xs={6} sm={6}>
                <DropDownComponent
                  text="Candidate Preference"
                  placeholder="Select"
                  width="100%"
                  values={candidatepreferenceList || []}
                  name="candidatePreference"
                  value={data?.candidatePreference}
                  onChange={handleChangeInput}
                  labelSize={"14px"}
                  labelColor={theme.palette.bgGray.main}
                  valid
                />
                <Typography variant="body2" textAlign={"start"} color={"error"}>
                  {data?.candidatePreference?.length > 0
                    ? ""
                    : errors["candidatePreference"]}
                </Typography>
              </Grid>
              <Grid item md={4} xs={6} sm={6}>
                <Box mt={2} mb={1} display="flex" fontSize="14px">
                  <InputLabel sx={{ fontSize: "14px" }}>
                    {" "}
                    Candidate Age Range
                  </InputLabel>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Grid sx={{ width: "300px" }}>
                    <Box
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="center"
                      gap={"20px"}
                    >
                      <TextField
                        inputProps={{ min: 18 }}
                        type="number"
                        hiddenLabel
                        sx={{ width: "66px" }}
                        id="filled-hidden-label-normal"
                        variant="outlined"
                        name="ageRangeMin"
                        value={data?.ageRangeMin}
                        onChange={handleChangeInput}
                        placeholder="Min"
                        onKeyDown={(event: any) => {
                          if (
                            event.code === "Minus" ||
                            event.code === "NumpadSubtract"
                          ) {
                            event.preventDefault();
                          }
                        }}
                      />{" "}
                      -{" "}
                      <TextField
                        inputProps={{ min: data?.ageRangeMin + 1, max: 50 }}
                        type="number"
                        hiddenLabel
                        sx={{ width: "66px" }}
                        id="filled-hidden-label-normal"
                        variant="outlined"
                        name="ageRangeMax"
                        value={data?.ageRangeMax}
                        onChange={handleChangeInput}
                        placeholder="Max"
                        onKeyDown={(event: any) => {
                          if (
                            event.code === "Minus" ||
                            event.code === "NumpadSubtract"
                          ) {
                            event.preventDefault();
                          }
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      textAlign={"start"}
                      color={"error"}
                    >
                      {data?.ageRangeMin?.length > 0
                        ? ""
                        : errors["ageRangeMin"]}
                    </Typography>
                    <Typography
                      variant="body2"
                      textAlign={"start"}
                      color={"error"}
                    >
                      {data?.ageRangeMax?.length > 0
                        ? ""
                        : errors["ageRangeMax"]}
                    </Typography>
                    <Typography
                      variant="body2"
                      textAlign={"start"}
                      color={"error"}
                    >
                      {+data?.ageRangeMax >= +data?.ageRangeMin
                        ? ""
                        : errors["ageRangeMax2"]}
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
              <Grid item md={4} xs={6} sm={6}>
                {/* <TextFieldComponent
                  type="date"
                  text="Intended DOJ"
                  width="100%"
                  name="intendedDOJ"
                  value={data?.intendedDOJ}
                  labelSize={"14px"}
                  labelColor={theme.palette.bgGray.main}
                  onChange={handleChangeInput}
                /> */}
                <DatePickerCommon
                  inputLabel="Intended DOJ"
                  name="intendedDOJ"
                  onChange={handleChangeDate}
                  value={data?.intendedDOJ}
                />
                <Typography variant="body2" textAlign={"start"} color={"error"}>
                  {data?.intendedDOJ?.length > 0 ? "" : errors["intendedDOJ"]}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={8} xs={6} sm={6}>
                <AutoCompleteSearch
                  width={"100%"}
                  text="Industry"
                  placeholder={"Select"}
                  handleChange={handleChangeIndustry}
                  options={industryPreferenceList || []}
                  name="industry"
                  defaultValue={data?.industry || ""}
                  handleChangeInput={handleChangeInput}
                  valid
                />

                <Typography variant="body2" textAlign={"start"} color={"error"}>
                  {data?.industry?.length > 0 ? "" : errors["industry"]}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={12} xs={12} sm={12} mt={3}>
                <Dropzone
                  onDrop={(acceptedFiles: any) => {
                    setJdDocument(acceptedFiles);
                    {
                      !editRequisitionData
                        ? handleChangeJdDocument(acceptedFiles)
                        : handleChangeUpdateJdDocument(acceptedFiles);
                    }
                  }}
                  multiple={true}
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box className={classes.fileUpload} {...getRootProps()}>
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <Typography>Drop the files here ...</Typography>
                      ) : (
                        <>
                          {jdDocument ? (
                            <Stack
                              display={"flex"}
                              justifyContent={"space-between"}
                              p={2}
                            >
                              <Stack direction={"column"} marginLeft={2}>
                                <Typography variant="subtitle1">
                                  {jdDocument[0]?.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color={"textSecondary"}
                                >
                                  {jdDocument[0].size + " KB"}
                                </Typography>
                              </Stack>
                            </Stack>
                          ) : (
                            <>
                              <Box
                                display={"flex"}
                                justifyContent={"center"}
                                flexDirection={"column"}
                                gap={2}
                              >
                                <Box
                                  display={"flex"}
                                  gap={3}
                                  alignSelf={"center"}
                                >
                                  <Typography
                                    variant="body2"
                                    fontWeight={500}
                                    fontSize={"16px"}
                                  >
                                    Drag and Drop your JD file here
                                  </Typography>
                                  <Typography component={"span"}>
                                    Or{" "}
                                  </Typography>
                                  <IconWrapper
                                    fontSize="small"
                                    icon="upload"
                                    color="primary"
                                  />
                                  <Typography
                                    component={"span"}
                                    color={(theme) =>
                                      theme.palette.primary.main
                                    }
                                  >
                                    Browse Files{" "}
                                  </Typography>
                                </Box>
                                <Box display={"flex"} gap={1}>
                                  <IconWrapper
                                    fontSize="18px"
                                    icon="information"
                                  />
                                  <Typography
                                    variant="caption"
                                    color={(theme) => theme.palette.bgGray.main}
                                  >
                                    Information will get parsed from the JD
                                    File. Max. 5 MB; pdf, .doc, .docx format
                                  </Typography>
                                </Box>
                              </Box>
                            </>
                          )}
                        </>
                      )}
                    </Box>
                  )}
                </Dropzone>
                <Typography
                  justifyContent={"center"}
                  display={"flex"}
                  mt={2}
                  fontWeight={500}
                  variant="h6"
                >
                  Or
                </Typography>
              </Grid>
            </Grid>
            <TextEditor
              category={"Description"}
              onChange={(value: any) => onEditorChange(value)}
              defaultValue={data?.description}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {description !== "<p><br></p>" || jdDocument
                ? ""
                : errors["description"]}
            </Typography>

            <FormTitleWithInfo title="Video JD" />
            <Grid container spacing={2} mt={1}>
              <Grid item>
                <Box marginTop={1}>
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
                    <RadioButtonBox
                      value="1"
                      label="Yes"
                      handleChange={handleCount}
                      count={count4}
                      name="Yes"
                      num={1}
                      bg={true}
                    />
                    <RadioButtonBox
                      value="2"
                      label="No"
                      handleChange={handleCount}
                      count={count4}
                      name="No"
                      num={2}
                      bg={true}
                    />
                  </RadioGroup>
                </Box>
              </Grid>
            </Grid>
            <Box mt={4}>
              {" "}
              <Divider />
            </Box>
            {count4 === "1" && (
              <>
                <FormTitleWithInfo
                  title="Upload Video JD"
                  subtitle="Upload a brief, video-based overview for the job
              including the summary of the job description"
                />
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12} sm={12}>
                    <Box className={classes.fileUpload} {...getRootProps()}>
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <Typography>Drop the files here ...</Typography>
                      ) : (
                        <>
                          {videoJDDocument ? (
                            <Typography component={"span"}>
                              You selected file {videoJDDocument?.[0]?.name}
                            </Typography>
                          ) : (
                            <>
                              <Box
                                display={"flex"}
                                justifyContent={"center"}
                                flexDirection={"column"}
                                gap={2}
                              >
                                <Box display={"flex"} gap={3}>
                                  <Typography
                                    variant="body2"
                                    fontWeight={500}
                                    fontSize={"16px"}
                                  >
                                    Drag and Drop Video JD File here
                                  </Typography>
                                  <Typography component={"span"}>
                                    Or{" "}
                                  </Typography>
                                  <IconWrapper
                                    fontSize="small"
                                    icon="upload"
                                    color="primary"
                                  />
                                  <Typography
                                    component={"span"}
                                    color={(theme) =>
                                      theme.palette.primary.main
                                    }
                                  >
                                    Browse Files{" "}
                                  </Typography>
                                </Box>
                                <Box
                                  display={"flex"}
                                  gap={1}
                                  alignSelf={"center"}
                                >
                                  <Typography
                                    variant="caption"
                                    color={(theme) => theme.palette.bgGray.main}
                                  >
                                    Max file size: 10MB; .mp4 format
                                  </Typography>
                                  <IconWrapper
                                    fontSize="18px"
                                    icon="information"
                                  />
                                </Box>
                              </Box>
                            </>
                          )}
                        </>
                      )}
                    </Box>
                    <Typography
                      variant="body2"
                      textAlign={"start"}
                      color={"error"}
                    >
                      {videoJDDocument ? "" : errors["videoJDDocument"]}
                    </Typography>
                    <Typography
                      justifyContent={"center"}
                      display={"flex"}
                      mt={3}
                    >
                      Or
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12} sm={12}>
                    <TextFieldComponent
                      type="text"
                      placeholder={"Copy and paste candidate URL"}
                      text="Video URL"
                      width="100%"
                      valid
                      name="videoUrl"
                      value={data?.videoUrl}
                      onChange={handleChangeInput}
                      onPaste={(e: any) => {
                        const value = e?.clipboardData?.getData('text')
                        var videoId = "";
                        var fullPage =
                          /watch\?v=(.+)/.exec(value) ||
                          /youtu\.be\/(.+)/.exec(value) ||
                          /embed\/(.+?)"/.exec(value);
                        if (fullPage) {
                          videoId = fullPage[1];
                        }
                        if (videoId) {
                          var finalEmbedLink = `https://www.youtube.com/embed/${videoId}`;
                          setData({
                            ...data,
                            videoUrl: finalEmbedLink,
                          });
                        }
                      }}
                    />
                    <Typography
                      variant="body2"
                      textAlign={"start"}
                      color={"error"}
                    >
                      {data?.videoUrl?.length > 0 ? "" : errors["videoUrl"]}
                    </Typography>
                    <Typography variant="body2" textAlign={"start"} color={"error"}>
                      {validURL(data?.videoUrl) ? "" : errors["videoUrls"]}
                    </Typography>
                  </Grid>
                </Grid>
                {data?.videoUrl && (
                  <Grid container spacing={2}>
                    <Grid item md={12} xs={12} sm={12} mt={2}>
                      <Typography
                        fontSize={18}
                        fontWeight={500}
                        color={(theme) => theme.palette.bgBlack.main}
                      >
                        Preview Video JD
                      </Typography>
                    </Grid>
                    <Grid item md={12} xs={12} sm={12}>
                      <iframe
                        width="100%"
                        height="400"
                        src={data?.videoUrl || "Not Found"}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </Grid>
                  </Grid>
                )}
              </>
            )}
            <Grid container spacing={2}>
              <Grid item md={12} xs={12} sm={12} mt={2}>
                <FormTitleWithInfo
                  title="Work Experience"
                  subtitle="Please mention the required Work Experience for the
              requisition"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid
                item
                md={12}
                xs={12}
                sm={12}
                mt={2}
                flexDirection={"row"}
                display={"flex"}
                flexWrap={"wrap"}
              >
                <Stack>
                  <Typography
                    fontWeight={400}
                    fontSize={14}
                    color={(theme) => theme.palette.bgGray.main}
                  >
                    Total Experience in years
                  </Typography>
                  <Grid sx={{ width: "300px" }}>
                    <Box
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="center"
                      gap={"10px"}
                      marginTop={1}
                    >
                      <TextFieldComponent
                        inputProps={{ min: 0, max: 30 }}
                        type="number"
                        width="80px"
                        name="totalMinExperience"
                        value={data?.totalMinExperience}
                        onChange={handleChangeInput}
                        placeholder="Min"
                        onKeyDown={(event: any) => {
                          if (
                            event.code === "Minus" ||
                            event.code === "NumpadSubtract"
                          ) {
                            event.preventDefault();
                          }
                        }}
                      />{" "}
                      <Typography>-</Typography>
                      <TextFieldComponent
                        inputProps={{ min: data?.totalMaxExperience, max: 30 }}
                        type="number"
                        width="80px"
                        name="totalMaxExperience"
                        value={data?.totalMaxExperience}
                        onChange={handleChangeInput}
                        placeholder="Max"
                        onKeyDown={(event: any) => {
                          if (
                            event.code === "Minus" ||
                            event.code === "NumpadSubtract"
                          ) {
                            event.preventDefault();
                          }
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      textAlign={"start"}
                      color={"error"}
                    >
                      {data?.totalMinExperience?.length > 0
                        ? ""
                        : errors["totalMinExperience"]}
                    </Typography>
                    <Typography
                      variant="body2"
                      textAlign={"start"}
                      color={"error"}
                    >
                      {data?.totalMaxExperience?.length > 0
                        ? ""
                        : errors["totalMaxExperience"]}
                    </Typography>
                    <Typography
                      variant="body2"
                      textAlign={"start"}
                      color={"error"}
                    >
                      {+data?.totalMaxExperience >= +data?.totalMinExperience
                        ? ""
                        : errors["totalMaxExperience2"]}
                    </Typography>
                  </Grid>
                </Stack>
                <Stack>
                  <Box
                    display="flex"
                    flexDirection={"row"}
                  >
                    <Typography
                      fontWeight={400}
                      fontSize={14}
                      color={(theme) => theme.palette.bgGray.main}
                    >
                      Relevant Experience in Years
                    </Typography>
                    <Typography color="#EF627A" component={"caption"} variant={"body2"}>
                      *
                    </Typography>
                  </Box>
                  <Grid sx={{ width: "300px" }}>
                    <Box
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="center"
                      gap={"10px"}
                      marginTop={1}
                    >
                      <TextFieldComponent
                        inputProps={{ min: 0, max: 30 }}
                        type="number"
                        width="80px"
                        name="relevantMinExperience"
                        value={data?.relevantMinExperience}
                        onChange={handleChangeInput}
                        placeholder="Min"
                        onKeyDown={(event: any) => {
                          if (
                            event.code === "Minus" ||
                            event.code === "NumpadSubtract"
                          ) {
                            event.preventDefault();
                          }
                        }}
                      />{" "}
                      <Typography>-</Typography>
                      <TextFieldComponent
                        type="number"
                        inputProps={{
                          min: data?.relevantMaxExperience,
                          max: 30,
                        }}
                        width="80px"
                        name="relevantMaxExperience"
                        value={data?.relevantMaxExperience}
                        onChange={handleChangeInput}
                        placeholder="Max"
                        onKeyDown={(event: any) => {
                          if (
                            event.code === "Minus" ||
                            event.code === "NumpadSubtract"
                          ) {
                            event.preventDefault();
                          }
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      textAlign={"start"}
                      color={"error"}
                    >
                      {data?.relevantMinExperience?.length > 0
                        ? ""
                        : errors["relevantMinExperience"]}
                    </Typography>
                    <Typography
                      variant="body2"
                      textAlign={"start"}
                      color={"error"}
                    >
                      {data?.relevantMaxExperience?.length > 0
                        ? ""
                        : errors["relevantMaxExperience"]}
                    </Typography>
                    <Typography
                      variant="body2"
                      textAlign={"start"}
                      color={"error"}
                    >
                      {+data?.relevantMaxExperience >=
                        +data?.relevantMinExperience
                        ? ""
                        : errors["relevantMaxExperience2"]}
                    </Typography>
                  </Grid>
                </Stack>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={12} xs={12} sm={12} mt={2}>
                <FormTitleWithInfo
                  title="Education"
                  subtitle=" Please enter the required education qualification"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
                sm={12}
                sx={{ display: "flex", direction: "row", alignItems: "center" }}
              >
                <Box className="search_filed" width={"100%"}>
                  <AutoCompleteSearch
                    width={"90%"}
                    placeholder={"Enter education qualification"}
                    handleChange={handleChangeForEducation}
                    options={educationQualification}
                    handleChangeInput={handleChangeInputForEducation}
                    freeSolo={false}
                    blurOnSelect
                  />
                </Box>
                <PlusButton onClick={addSkill} />
              </Grid>
              <Typography
                marginLeft={3}
                marginTop={1}
                variant="body2"
                textAlign={"start"}
                color={"error"}
              >
                {data?.chip2?.length > 0 ? "" : errors["chip2"]}
              </Typography>
              <Grid item md={12} xs={12} sm={12}>
                <Stack
                  display={"flex"}
                  direction={"row"}
                  spacing={1}
                  flexWrap="wrap"
                  mb={1}
                  mt={1}
                >
                  {education.map((item: any) => {
                    return (
                      <Chip
                        key={item}
                        color="primary"
                        variant="outlined"
                        label={item}
                        onDelete={handleEducationDelete(item)}
                      />
                    );
                  })}
                </Stack>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={12} xs={12} sm={12} mt={2}>
                <FormTitleWithInfo
                  title="Skills"
                  subtitle="Please Prioritize Skills By Dragging Them"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
                sm={12}
                sx={{ display: "flex", direction: "row", alignItems: "center" }}
              >
                <Box className="search_filed" width={"100%"}>
                  <AutoCompleteSearch
                    options={skills}
                    placeholder={"Enter skill"}
                    width={"90%"}
                    handleChange={handleChangeForSkill}
                    handleChangeInput={handleChangeInputForSkill}
                    freeSolo={false}
                    blurOnSelect
                  />
                </Box>
                <PlusButton onClick={addMainSkill} />
              </Grid>
            </Grid>
            <Typography
              marginTop={1}
              variant="body2"
              textAlign={"start"}
              color={"error"}
            >
              {data?.skillChip?.length > 0 ? "" : errors["skillChip"]}
            </Typography>
            <Box>
              <Typography
                marginTop={3}
                font-weight="400"
                font-size="12px"
                line-height="110%"
                color={(theme) => theme.palette.bgGray.main}
              >
                Must Have
              </Typography>
              <Grid container spacing={2}>
                <Grid item md={12} xs={12} sm={12}>
                  <Stack
                    direction={"row"}
                    spacing={1}
                    flexWrap="wrap"
                    mb={1}
                    mt={1}
                  >
                    {skillChip.map((item: any) => {
                      return (
                        <Chip
                          draggable
                          onDrag={() => allowDrop(item)}
                          key={item}
                          color="primary"
                          variant="outlined"
                          label={item}
                          onDelete={handleSkillDelete(item)}
                          style={{ marginTop: "5px" }}
                        />
                      );
                    })}
                  </Stack>
                </Grid>
              </Grid>
              <Typography
                marginTop={2}
                font-weight="400"
                font-size="12px"
                line-height="110%"
                color={(theme) => theme.palette.bgGray.main}
              >
                Other skills
              </Typography>
              <Grid container spacing={2}>
                <Grid item md={12} xs={12} sm={12}>
                  <Stack
                    direction={"row"}
                    spacing={1}
                    flexWrap="wrap"
                    mb={1}
                    mt={1}
                  >
                    {preferredSkill.map((item: any) => {
                      return (
                        <Chip
                          key={item}
                          color="primary"
                          variant="outlined"
                          label={item}
                          onDelete={handlePreferredSkillDelete(item)}
                          style={{ marginTop: "5px" }}
                        />
                      );
                    })}
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Grid container>
              <Grid item md={12} xs={12} sm={12} mt={2}>
                <FormTitleWithInfo
                  title="Languages Skills"
                  subtitle="Please select the required language skills"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
                sm={12}
                sx={{ display: "flex", direction: "row", alignItems: "center" }}
              >
                <Box className="search_filed" width={"100%"}>
                  <AutoCompleteSearch
                    width={"90%"}
                    placeholder={"Search language skills"}
                    handleChange={handleChangeForLang}
                    options={language}
                    handleChangeInput={handleChangeInputForLang}
                    freeSolo={false}
                    blurOnSelect
                  />
                </Box>
                <PlusButton onClick={addLanguage} />
              </Grid>
            </Grid>
            <Typography
              marginTop={1}
              variant="body2"
              textAlign={"start"}
              color={"error"}
            >
              {data?.selectLan?.length > 0 ? "" : errors["selectLan"]}
            </Typography>
            <Typography
              marginTop={3}
              marginBottom={3}
              font-weight="400"
              font-size="12px"
              line-height="110%"
              color={(theme) => theme.palette.bgGray.main}
            >
              Selected languages
            </Typography>
            {selectLan?.map((e: any) => {
              return (
                <Box
                  key={e}
                  display="flex"
                  alignItems="center"
                  marginBottom={2}
                >
                  <Typography
                    fontSize="14px"
                    width="104px"
                    fontWeight={700}
                    color={(theme) => theme.palette.bgBlack.main}
                  >
                    {e?.value}
                  </Typography>
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
                    <CheckBoxCircle
                      labelPlacement="start"
                      value={1}
                      label="Read"
                      handleChange={() => addRead(e)}
                      name="ERead"
                      bg={true}
                      checked={e?.canRead}
                      disabled={false}
                    />
                    <CheckBoxCircle
                      labelPlacement="start"
                      value={2}
                      label="Write"
                      handleChange={() => addWrite(e)}
                      name="EWrite"
                      bg={true}
                      checked={e?.canWrite}
                      disabled={false}
                    />
                    <CheckBoxCircle
                      labelPlacement="start"
                      value={3}
                      label="Speak"
                      handleChange={() => addSpeak(e)}
                      name="ESpeak"
                      bg={true}
                      checked={e?.canSpeak}
                      disabled={false}
                    />
                  </RadioGroup>
                </Box>
              );
            })}
            <Box display="flex" justifyContent={"flex-end"} marginTop={5}>
              <ButtonOutlined
                text={"Save"}
                width="auto"
                height="35px"
                borderRadius={5}
                onClick={createRequisition}
                loading={loading}
              />
            </Box>
          </StyledAccordianDetails>
        </StyledAccordian>
      </Box>
    </>
  );
}
