import TextFieldWithLabel from "@components/common/textFieldWithLabel";
import DropDownComponent from "@components/Layout/DropDownComponent";
import { CheckBoxOutlined } from "@mui/icons-material";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
  Box,
  Stack,
  styled,
  useTheme,
} from "@mui/material";
import React from "react";
import { IconWrapper } from "@components/common/customSvgIcon";
import { useDispatch } from "react-redux";
import {
  getAllEmploymentTypeMaster,
  getCandidateJobExperience,
  UpdateCandidateJobExperience,
} from "@redux/Redux/Actions/Candidate";
import { useAppSelector } from "@redux/Redux/app/hooks";
import ExpereinceEducationCard from "../expereinceEducationCard";
import ButtonOutlined from "@components/Layout/ButtonOutlined";
import { responseEnum } from "@lib/enum";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import { getRequisitionTranType } from "@redux/Redux/Actions/Client";
import { format } from "date-fns";
import { useRouter } from "next/router";
import useSnackBar from "@redux/hooks/useSnackBar";
import ErrorHandler from "@lib/errorHandler";
import DatePickerCommon from "@components/common/DatePickerCommon";
const Experience = ({ getCandidateAdditionalDetailsData }: any) => {
  //Hooks
  const dispatch = useDispatch();
  const router: any = useRouter();
  const theme = useTheme();
  const { setSnackBar } = useSnackBar();

  //States
  const [showEditForm, setShowEditForm] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<any>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorType, setErrorType] = React.useState<any>("");
  const [errors, setError] = React.useState<any>({});
  const [open, setOpen] = React.useState<boolean>(false);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>({
    startDate: null,
    endDate: null,
    isTillDate: false,
  });
  const [exp, setExp] = React.useState<any>([]);
  const [dataArray, setDataArray] = React.useState<any>([]);
  const [index, setIndex] = React.useState<number>(0);
  const getCandidateJobExperienceData = useAppSelector(
    (state: any) =>
      state?.partner?.isGetCandidateJobExperience?.getCandidateJobExperienceData
        ?.data
  );

  //Handler
  const handleChangeInput = (e: any) => {
    const { name, value, checked } = e.target;
    if (name === "isTillDate" || name === "isGapInExperience") {
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

  const deleteExperience = (y: any) => {
    console.log("yyyyyyyyyyyyy", y, dataArray);
    setDataArray(
      dataArray.filter((e: any) => {
        return e?.jobTitle !== y?.jobTitle && e?.description !== y?.description;
      })
      );
      saveExperience(dataArray.filter((e: any) => {
        return e?.jobTitle !== y?.jobTitle && e?.description !== y?.description;
      }))
  };
  const validateStep = () => {
    let errors: any = {};
    let formIsValid = true;
    if (!data?.jobTitle) {
      formIsValid = false;
      errors["jobTitle"] = "* Enter job title";
    }
    if (!data?.employmentType) {
      formIsValid = false;
      errors["employmentType"] = "* select employment type";
    }
    if (!data?.companyName) {
      formIsValid = false;
      errors["companyName"] = "* Enter company name";
    }
    setError(errors);
    return formIsValid;
  };
  const requisitionTranTypeList = useAppSelector(
    (state: any) =>
      state?.client?.isGetRequisitionTranType?.requisitionTranTypeList?.data
  );

  const employmentType = requisitionTranTypeList?.filter(
    (e: any) => e?.tranCode === "employmentType"
  );
  const employmentTypeList = employmentType?.map((e: any) => e?.value);
  const EmploymentType = employmentType?.filter(
    (e: any) => e?.value === data?.employmentType
  );

  const saveAddExperience = async () => {
    if (validateStep()) {
      if (!isEdit) {
        setDataArray([
          ...dataArray,
          {
            jobTitle: data?.jobTitle,
            employmentTypeId: EmploymentType[0]?.id,
            employmentType: EmploymentType[0]?.value,
            companyName: data?.companyName,
            startDate: format(new Date(data?.startDate), "yyyy-MM-dd"),
            endDate: data?.isTillDate
              ? format(new Date(), "yyyy-MM-dd")
              : format(new Date(data?.endDate), "yyyy-MM-dd"),
            isTillDate: data?.isTillDate ? data?.isTillDate : false,
            location: data?.location,
            description: data?.description,
          },
        ]);
      } else {
        (dataArray[index].jobTitle = data?.jobTitle),
          (dataArray[index].employmentTypeId = EmploymentType[0]?.id),
          (dataArray[index].employmentType = EmploymentType[0]?.value),
          (dataArray[index].companyName = data?.companyName),
          (dataArray[index].startDate = data?.startDate),
          (dataArray[index].endDate = data?.endDate),
          (dataArray[index].isTillDate = data?.isTillDate),
          (dataArray[index].location = data?.location),
          (dataArray[index].description = data?.description);
      }
      changeShowEditForm(false);
      setData({
        jobTitle: "",
        employmentType: "",
        companyName: "",
        startDate: null,
        endDate: null,
        isTillDate: false,
        location: "",
        description: "",
      });
      setIsEdit(false);
      let allData = [...dataArray,
      {
        jobTitle: data?.jobTitle,
        employmentTypeId: EmploymentType[0]?.id,
        employmentType: EmploymentType[0]?.value,
        companyName: data?.companyName,
        startDate: format(new Date(data?.startDate), "yyyy-MM-dd"),
        endDate: data?.isTillDate
          ? format(new Date(), "yyyy-MM-dd")
          : format(new Date(data?.endDate), "yyyy-MM-dd"),
        isTillDate: data?.isTillDate ? data?.isTillDate : false,
        location: data?.location,
        description: data?.description,
      }]
      saveExperience(allData);
    }
  }
  const editExperience = (i: any) => {
    setData({
      ...data,
      jobTitle: dataArray[i]?.jobTitle,
      employmentType: dataArray[i]?.employmentType,
      companyName: dataArray[i]?.companyName,
      startDate: dataArray[i]?.startDate
        ? format(new Date(dataArray[i]?.startDate), "yyyy-MM-dd")
        : "",
      endDate: dataArray[i]?.endDate
        ? format(new Date(dataArray[i]?.endDate), "yyyy-MM-dd")
        : "",
      isTillDate: dataArray[i]?.isTillDate,
      location: dataArray[i]?.location,
      description: dataArray[i]?.description,
    });
    changeShowEditForm(true);
    setIsEdit(true);
    setIndex(i);
  };
  const saveExperience = async (allData?: any) => {
    console.log("allData",allData);
    
    setLoading(true);
    try {
      const body = {
        experience: allData ? allData : dataArray,
        candidateId: router?.query?.candidateId,
      };
      let response = await dispatch(UpdateCandidateJobExperience(body));

      let error = await ErrorHandler(response, setSnackBar);

      if (error) {
        setSnackBar("success", response?.payload?.message);
        setLoading(false);
        const body = `?CandidateId=${router?.query?.candidateId} `;
        let expr = await dispatch(getCandidateJobExperience(body));
        console.log("expr", expr);
        setDataArray(
          expr?.payload?.data?.experience?.map((e: any) => {
            return {
              ...e,
              startDate: e?.startDate
                ? format(new Date(e?.startDate), "yyyy-MM-dd")
                : "",
              endDate: e?.endDate
                ? format(new Date(e?.endDate), "yyyy-MM-dd")
                : "",
            };
          })
        );
        changeShowEditForm(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setSnackBar("error", "Something went wrong!!");
      setLoading(false);
    }
    setLoading(false);
  };
  const changeShowEditForm = (e: boolean) => {
    setShowEditForm(e);
  };
  React.useEffect(() => {
    (async () => {
      {
        router?.query?.candidateId && dispatch(getAllEmploymentTypeMaster());
      }
    })();
  }, [router?.pathname]);

  React.useEffect(() => {
    dispatch(getRequisitionTranType());
  }, []);
  // React.useEffect(() => {
  //   if (dataArray?.length !== 0) {
  //     saveExperience();
  //   }
  // }, [dataArray?.length]);
  React.useEffect(() => {
    setDataArray(
      getCandidateAdditionalDetailsData?.experienceDetails?.experience?.map(
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
          <Grid container xs={12} spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <TextFieldComponent
                type="text"
                text="Job Title"
                placeholder="enter your name"
                width="100%"
                name="jobTitle"
                value={data?.jobTitle}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
                valid
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.jobTitle?.length > 0 ? "" : errors["jobTitle"]}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <DropDownComponent
                width="100%"
                text="Employment type"
                values={employmentTypeList || []}
                onChange={handleChangeInput}
                name="employmentType"
                value={data?.employmentType}
                defaultValue={"Select"}
                labelSize={"14px"}
                valid
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.employmentType?.length > 0
                  ? ""
                  : errors["employmentType"]}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextFieldComponent
                type="text"
                text="Company name"
                placeholder="enter your companyName"
                width="100%"
                name="companyName"
                value={data?.companyName}
                onChange={handleChangeInput}
                labelSize={"14px"}
                labelColor={theme.palette.bgGray.main}
                valid
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.companyName?.length > 0 ? "" : errors["companyName"]}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextFieldComponent
                type="text"
                width="100%"
                text="Location"
                onChange={handleChangeInput}
                name="location"
                value={data?.location}
                labelSize={"14px"}
                placeholder="enter your location"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Stack>
              <DatePickerCommon
                  inputLabel="Start date"
                    name="startDate"
                    onChange={handleChangeStartDate}
                    value={data?.startDate}
                    />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checkedIcon={<CheckBoxOutlined />}
                      name="isTillDate"
                      onChange={handleChangeInput}
                      checked={data?.isTillDate}
                    />
                  }
                  label="I am currently working in this role"
                />
              </Stack>
            </Grid>
            {!data?.isTillDate && (
              <Grid item xs={12} sm={6} md={6}>
                <DatePickerCommon 
                  inputLabel="End date"
                    name="endDate"
                    value={data?.endDate}
                    onChange={handleChangeEndDate}/>
              </Grid>
            )}
            <Grid item xs={12} md={12}>
              <TextFieldWithLabel
                inputLabel="Description"
                isMandatory={true}
                rows={4}
                multiline
                name="description"
                value={data?.description}
                onChange={handleChangeInput}
              />
            </Grid>
          </Grid>
        </Stack>
      ) : (
        ""
      )}
      <Stack direction={"row-reverse"} marginTop={2}>
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
          onClick={() =>
            showEditForm ? saveAddExperience() : changeShowEditForm(true)
          }
          text={showEditForm ? "Save new experience" : "Add New"}
          width="auto"
          height="  "
          borderRadius={5}
          loading={loading}
        />
        {showEditForm ? (
          <ButtonOutlined
            onClick={() => changeShowEditForm(false)}
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
              isEducation={item?.isEducation}
              jobTitle={item?.jobTitle}
              Designation={item?.employmentType}
              institutionName={item?.companyName}
              duration={`${item.startDate && format(new Date(item.startDate), "dd/MM/yyyy")} to ${item.endDate && format(new Date(item.endDate), "dd/MM/yyyy")}`}
              location={item?.location}
              description={item?.description}
              onEdit={() => editExperience(i)}
              onDelete={() => deleteExperience(item)}
            />
          );
        })
        : ""}
    </Box>
  );
};

export default Experience;
