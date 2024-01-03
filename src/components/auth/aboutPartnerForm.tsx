import React from "react";
import {
  Box,
  Chip,
  Grid,
  InputLabel,
  Slider,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import ButtonContained from "@components/Layout/ButtonContained";
import { useTheme } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import OutlinedCheckbox from "@components/Layout/CustomOutlinedCheckbox";
import AutoCompleteSearch from "@components/Layout/CustomAutoCompleteDropDown";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@redux/Redux/app/hooks";
import Router from "next/router";
import { RecruiterType } from "@lib/enum";
import {
  getHiringExpertiseList,
  getIndustryPreferenceList,
  getRolePreferenceList,
  UpdateBasicInformationBySelf,
  getPartnerDetails,
} from "@redux/Redux/Actions/Partners";
import localStoreUtil from "@redux/Api/localstore.util";
import PartnerProfilePic from "@components/partner/partnerProfilePic";
import CustomTooltip from "@components/common/customTooltip";
import FormValidationAlert from "@components/common/formValidationAlert";
import ProfileSteper from "@components/common/profileSteper";
import useSnackBar from "@redux/hooks/useSnackBar";
import ErrorHandler from "@lib/errorHandler";

const useStyles = makeStyles()((theme) => {
  return {
    tab: {
      padding: "0px 7px",
      color: theme.palette.bgGray.main,
      border: `1px solid ${theme.palette.bgGray.main}`,
      borderRadius: "15px",
      marginBottom: "10px",
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
  };
});
const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 30,
    label: "30",
  },
  {
    value: 40,
    label: "40",
  },
  {
    value: 50,
    label: "50",
  },
];
function valuetext(value: number) {
  return `${value} years`;
}
const maxIndustries = 4;
const maxJobRoles = 6;
const industriesValidationMsg = `Minimum 1 and Maximum ${maxIndustries} Industry preferences are allowed.`;
const jobRolesValidationMsg = `Minimum 1 and Maximum ${maxJobRoles} Role preferences are allowed.`;
const ALPHA_NUMERIC_DASH_REGEX = /^[0-9-]+$/;
export default function AboutPartnerForm() {
  //Hooks
  const theme = useTheme();
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const { setSnackBar } = useSnackBar();

  //State
  const [selected1, setSelected1] = React.useState<any>([]);
  const [data, setData] = React.useState<any>({});
  const [selectedIndustries, setSelectedIndustries] = React.useState<any>([]);
  const [selectedRoles, setSelectedRoles] = React.useState<any>([]);
  const [hiringExpertise, setHiringExpertise] = React.useState<any>([]);
  const [rolePreferenceList, setRolePreferenceList] = React.useState<any[]>([]);
  const [roleRes, setRoleRes] = React.useState<any>([]);
  const [industryPreferenceList, setIndustryPreferenceList] = React.useState<
    any[]
  >([]);
  const [indusRes, setIndusRes] = React.useState<any>([]);
  const [errors, setError] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);

  const isFreelancer = data && data?.partnerType == RecruiterType.freelancer;

  //Handler
  const handleSelect = (event: any) => {
    hiringExpertise.forEach((element: any) => {
      if (element?.id === event?.id) {
        element.isSelect = !element?.isSelect;
      }
    });
    setSelected1((t: any) => {
      const newArr = [...t];
      const idx = newArr.indexOf(event?.id);
      if (idx != -1) {
        newArr.splice(idx, 1);
        return newArr;
      }
      return [...newArr, event?.id];
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const addRemoveIndustries = (v: any, newValue: any) => {
    if (selectedIndustries.includes(newValue)) {
      setSelectedIndustries(
        selectedIndustries.filter((k: any) => k !== newValue)
      );
    } else {
      if (selectedIndustries.length >= maxIndustries) return;
      setSelectedIndustries([...selectedIndustries, newValue]);
    }
  };

  const addRemoveRoles = (v: any, newValue: any) => {
    if (selectedRoles.includes(newValue)) {
      setSelectedRoles(selectedRoles.filter((k: any) => k !== newValue));
    } else {
      if (selectedRoles.length >= maxJobRoles) return;
      setSelectedRoles([...selectedRoles, newValue]);
    }
  };

  const validateForm = () => {
    let errors: any = {};
    let formIsValid = true;
    if (!data?.partnerName) {
      formIsValid = false;
      errors["partnerName"] = "Please enter partner name";
    }

    if (!isFreelancer) {
      if (!data?.teamSize) {
        formIsValid = false;
        errors["teamSize"] = "Please enter team size";
      }
      if (data?.teamSize && JSON.parse(data?.teamSize) < 0) {
        formIsValid = false;
        errors["invalidSize"] = "Invalid team size!";
      }
    }
    if (!data?.concurrentJobCapacity) {
      formIsValid = false;
      errors["concurrentJobCapacity"] =
        "Please enter number of jobs you can work on at a time";
    }
    if (
      data?.concurrentJobCapacity &&
      JSON.parse(data?.concurrentJobCapacity) < 0
    ) {
      formIsValid = false;
      errors["invalidJobCapacity"] = "Invalid current job capacity!";
    }
    if (selected1?.length === 0) {
      formIsValid = false;
      errors["selected1"] = "Please select Hiring Expertise";
    }
    if (
      selectedIndustries?.length === 0 ||
      selectedIndustries?.length > maxIndustries
    ) {
      formIsValid = false;
      errors["selectedIndustries"] = industriesValidationMsg;
    }
    if (selectedRoles?.length === 0 || selectedRoles?.length > maxJobRoles) {
      formIsValid = false;
      errors["selectedRoles"] = jobRolesValidationMsg;
    }
    if (!data?.aboutMe) {
      formIsValid = false;
      errors["aboutMe"] = "Please enter bio";
    }
    setError(errors);
    return formIsValid;
  };

  const step1 = async () => {
    let indId: Array<any> = [];
    let roleId: Array<any> = [];
    indusRes?.forEach((element: any) => {
      if (selectedIndustries.includes(element?.description)) {
        indId.push(element?.id);
      }
    });
    roleRes.forEach((element: any) => {
      if (selectedRoles.includes(element?.description)) {
        roleId.push(element?.id);
      }
    });

    if (validateForm()) {
      setLoading(true);
      try {
        const body = {
          partnerName: data?.partnerName,
          teamSize: data?.teamSize,
          concurrentJobCapacity: data?.concurrentJobCapacity,
          hiringExpertiseCtcWise:
            selected1?.length !== 0 ? selected1?.join(",") : "",
          expInYear: data?.expInYear || 12,
          webSite: data?.webSite,
          linkedInUrl: data?.linkedInUrl,
          industryPreferenceIds: indId?.join(","),
          rolePreferenceIds: roleId?.join(","),
          aboutMe: data?.aboutMe,
        };
        const updateBasicInformation = await dispatch(
          UpdateBasicInformationBySelf(body)
        );
        let error = await ErrorHandler(updateBasicInformation, setSnackBar);

        if (error) {
          setLoading(false);
          let isSuccessLogin: any = localStoreUtil.get_data("isSuccessLogin");
          if (isSuccessLogin == 1) {
            Router.push("/profile/update-profile-step-2");
            setSnackBar("success", "Basic detail info updated!");
            setLoading(false);
          } else {
            Router.push("/profile/verification");
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        setSnackBar("error", "Something went wrong !");
        setLoading(false);
      }
    }
  };

  const _getPartnerDetails = async () => {
    const _partnerDetails = await dispatch(getPartnerDetails());
    let _partnerDetailsData = _partnerDetails?.payload?.data;
    if (_partnerDetailsData?.social) {
      _partnerDetailsData = {
        ..._partnerDetailsData,
        ..._partnerDetailsData.social,
      };
    }
    if (_partnerDetailsData?.industryPreference) {
      setSelectedIndustries(
        _partnerDetailsData.industryPreference.map((t: any) => t.value)
      );
    }
    if (_partnerDetailsData?.rolePreference) {
      setSelectedRoles(
        _partnerDetailsData.rolePreference.map((t: any) => t.value)
      );
    }
    setData(_partnerDetailsData || {});
    return _partnerDetailsData;
  };
  React.useEffect(() => {
    const PageIndex = 1;
    const PageSize = 10;
    // const SearchText = "";
    const body = `?PageIndex=${PageIndex}&PageSize=${PageSize}`;
    (async () => {
      const _partnerDetailsData = await _getPartnerDetails();
      let _selectedHiringExpertise: any[] = [];
      if (_partnerDetailsData?.hiringExpertise) {
        _selectedHiringExpertise = _partnerDetailsData?.hiringExpertise.map(
          (t: any) => t.id
        );
      }
      const industry = await dispatch(getIndustryPreferenceList(body));
      const industryPreference: any = industry?.payload?.data;
      const indus: any = [];
      industryPreference?.length > 0 &&
        industryPreference?.map((item: any) => {
          return indus.push(item.description);
        });
      setIndustryPreferenceList(indus);
      setIndusRes(industryPreference);
      const hiring = await dispatch(getHiringExpertiseList());
      let hiringExpertise: any = hiring?.payload?.data;
      if (hiringExpertise?.length > 0) {
        hiringExpertise = hiringExpertise.map((item: any) => ({
          ...item,
          isSelect: _selectedHiringExpertise.includes(item.id),
        }));
      }
      setSelected1(_selectedHiringExpertise);
      setHiringExpertise(hiringExpertise);
      const role = await dispatch(getRolePreferenceList());
      const rolePreference: any = role?.payload?.data;
      const desc: any = [];
      rolePreference?.length > 0 &&
        rolePreference?.map((item: any) => {
          return desc.push(item?.description);
        });
      setRolePreferenceList(desc);
      setRoleRes(rolePreference || []);
    })();
  }, []);

  return (
    <>
      <Box p={2}>
        <ProfileSteper step={1} />
        <Box
          mt={2}
          mb={2}
          display="flex"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Typography fontSize="18px" fontWeight={"bold"}>
            Personal Details
          </Typography>
          <Typography color="error" variant="subtitle2">
            *{" "}
            <Typography
              component="span"
              color="textSecondary"
              variant="inherit"
            >
              Mandatory fields
            </Typography>
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <TextFieldComponent
              type="text"
              placeholder="Please enter name"
              width="100%"
              text={
                isFreelancer ? "Full Name" : "Name of your recruitment firm"
              }
              valid
              name="partnerName"
              onChange={handleChange}
              value={data?.partnerName}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.partnerName?.length > 0 ? "" : errors["partnerName"]}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12} display="flex">
            <CustomTooltip title="Upload partner logo">
              <Box
                display="flex"
                alignItems="center"
                alignSelf="flex-end"
                sx={{ cursor: "pointer" }}
              >
                <PartnerProfilePic
                  partnerLogo={data?.partnerLogo}
                  width={45}
                  height={45}
                  onSuccess={() => {
                    _getPartnerDetails();
                  }}
                />
              </Box>
            </CustomTooltip>
          </Grid>
          {!isFreelancer ? (
            <Grid item md={6} xs={12}>
              <TextFieldComponent
                type="number"
                text="Team Size"
                placeholder="Please enter team size"
                width="100%"
                valid
                name="teamSize"
                onChange={handleChange}
                labelSize={"14px"}
                value={data?.teamSize}
                inputProps={{ min: 0 }}
                onKeyDown={(event: any) => {
                  if (
                    event.code === "Minus" ||
                    event.code === "NumpadSubtract"
                  ) {
                    event.preventDefault();
                  }
                }}
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.teamSize?.length > 0 ? "" : errors["teamSize"]}
              </Typography>
              {/* {data?.teamSize && (
                <Typography variant="body2" textAlign={"start"} color={"error"}>
                  {JSON.parse(data?.teamSize) < 0 ? errors["invalidSize"] : ""}
                </Typography>
              )} */}
            </Grid>
          ) : null}

          <Grid item md={6} xs={12}>
            <TextFieldComponent
              type="number"
              text="Number of jobs you can work on at a time"
              placeholder="Please enter job work on at a time"
              width="100%"
              valid
              name="concurrentJobCapacity"
              onChange={handleChange}
              labelSize={"14px"}
              value={data?.concurrentJobCapacity}
              inputProps={{ min: 1 }}
              onKeyDown={(event: any) => {
                if (event.code === "Minus" || event.code === "NumpadSubtract") {
                  event.preventDefault();
                }
              }}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.concurrentJobCapacity?.length > 0
                ? ""
                : errors["concurrentJobCapacity"]}
            </Typography>
          </Grid>
          {isFreelancer ? <Grid item md={6} xs={12}></Grid> : null}
          <Grid item md={6} xs={12}>
            <TextFieldComponent
              type="text"
              text="LinkedIn Profile URL"
              placeholder=""
              width="100%"
              name="linkedInUrl"
              onChange={handleChange}
              labelSize={"14px"}
              value={data?.linkedInUrl}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.linkedInUrl?.length > 0 ? "" : errors["linkedInUrl"]}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextFieldComponent
              type="text"
              text="Website URL"
              placeholder=""
              width="100%"
              name="webSite"
              onChange={handleChange}
              labelSize={"14px"}
              value={data?.webSite}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.webSite?.length > 0 ? "" : errors["webSite"]}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Box mt={1} mb={1} display="flex" fontSize="14px" gap={0.5}>
                <InputLabel sx={{ fontSize: "12px" }}>
                  Hiring Expertise{" "}
                </InputLabel>
                <Typography color={theme.palette.error.main} fontSize={12}>
                  *
                </Typography>
              </Box>
              <Grid container spacing={1}>
                {hiringExpertise?.length > 0 &&
                  hiringExpertise?.map((item: any, i: number) => {
                    return (
                      <Grid item xs key={i}>
                        <OutlinedCheckbox
                          label={item.description}
                          selected={item?.isSelect}
                          handleSelect={() => handleSelect(item)}
                          name={item.code}
                          value={item.description}
                        />
                      </Grid>
                    );
                  })}
              </Grid>
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {selected1?.length > 0 ? "" : errors["selected1"]}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={12} xs={12}>
            <Box>
              <Box
                mt={1}
                display="flex"
                fontSize="14px"
                gap={0.5}
                alignItems="center"
              >
                <InputLabel sx={{ fontSize: "12px" }}>
                  Years of Recruitment Experience{" "}
                </InputLabel>
                <Typography color={theme.palette.error.main} fontSize={12}>
                  *
                </Typography>
              </Box>
              <Slider
                key={`slider-${data?.expInYear}`}
                color="primary"
                defaultValue={data?.expInYear || 12}
                getAriaValueText={valuetext}
                step={1}
                max={50}
                valueLabelDisplay="on"
                marks={marks}
                name="expInYear"
                onChange={handleChange}
                sx={{ height: "1px" }}
                value={data?.expInYear}
              />
            </Box>
          </Grid>
          <Grid item md={6} xs={12} lg={12}>
            <AutoCompleteSearch
              width={"100%"}
              text="Select Your Industry Preference"
              handleChange={addRemoveIndustries}
              options={industryPreferenceList.filter(
                (t) => !selectedIndustries?.includes(t)
              )}
              labelSize={"14px"}
              valid
              freeSolo={false}
              blurOnSelect
            />
          </Grid>
          <Grid item md={6} xs={12} lg={12} mt={1.5}>
            <InputLabel sx={{ fontWeight: 500, fontSize: "14px" }}>
              Popular Industry Preference
            </InputLabel>
            <Stack direction={"row"} spacing={1} flexWrap="wrap" mb={1} mt={1}>
              {industryPreferenceList?.length > 0 ? (
                industryPreferenceList?.map((v: any, i: number) => {
                  return (
                    <Chip
                      clickable
                      color="error"
                      label={v}
                      variant="outlined"
                      // disabled
                      className={
                        selectedIndustries?.includes(v)
                          ? classes.chipStylePro
                          : classes.chipStyle
                      }
                      onClick={() => {
                        addRemoveIndustries("", v);
                      }}
                      sx={{
                        height: "26px",
                      }}
                      style={{ marginBottom: "8px" }}
                      key={i}
                    />
                  );
                })
              ) : (
                <Typography
                  fontSize={"14px"}
                  variant={"caption"}
                  color={"GrayText"}
                >
                  No option selected !!{" "}
                </Typography>
              )}
            </Stack>
            {errors["selectedIndustries"] ? (
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {errors["selectedIndustries"]}
              </Typography>
            ) : (
              <FormValidationAlert variant={"standard"} elevation={0}>
                {industriesValidationMsg}
              </FormValidationAlert>
            )}
          </Grid>
          <Grid item md={6} xs={12} lg={12}>
            <AutoCompleteSearch
              width={"100%"}
              text="Select Role Preference"
              options={rolePreferenceList.filter(
                (t) => !selectedRoles?.includes(t)
              )}
              handleChange={addRemoveRoles}
              labelSize={"14px"}
              valid
              freeSolo={false}
              blurOnSelect
            />
          </Grid>
          <Grid item md={6} xs={12} lg={12} mt={1.5}>
            <InputLabel sx={{ fontWeight: 500, fontSize: "14px" }}>
              Popular Role Preference
            </InputLabel>
            <Stack
              direction={"row"}
              spacing={1}
              flexWrap="wrap"
              className="skill-tech"
              mb={{ lg: 1, md: 2 }}
              mt={1}
            >
              {rolePreferenceList.length > 0 ? (
                rolePreferenceList?.map((v: any, i: number) => {
                  return (
                    <Chip
                      clickable
                      color="error"
                      label={v}
                      variant="outlined"
                      sx={{
                        height: "26px",
                      }}
                      style={{ marginBottom: "8px" }}
                      className={
                        selectedRoles?.includes(v)
                          ? classes.chipStylePro
                          : classes.chipStyle
                      }
                      onClick={() => addRemoveRoles("", v)}
                      key={i}
                    />
                  );
                })
              ) : (
                <Typography
                  fontSize={"14px"}
                  variant={"caption"}
                  color={"GrayText"}
                >
                  No option selected !!{" "}
                </Typography>
              )}
            </Stack>
            {errors["selectedRoles"] ? (
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {errors["selectedRoles"]}
              </Typography>
            ) : (
              <FormValidationAlert variant={"standard"} elevation={0}>
                {jobRolesValidationMsg}
              </FormValidationAlert>
            )}
            <Grid item md={12} xs={12} lg={12} mt={3}>
              <TextFieldComponent
                type="text"
                text="Bio"
                placeholder="Something about yourself"
                width="100%"
                row={5}
                multiline
                labelSize={"14px"}
                onChange={handleChange}
                name="aboutMe"
                value={data?.aboutMe}
                valid
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.aboutMe?.length > 0 ? "" : errors["aboutMe"]}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box
        bgcolor={theme.palette.bgLightGray.main}
        width="100%"
        mt={1}
        p={1}
        position="sticky"
        bottom="0px"
        display="flex"
        justifyContent="end"
        alignItems="center"
      >
        <ButtonContained
          borderRadius="30px"
          text="Next"
          width="100px"
          loading={loading}
          onClick={step1}
        />
      </Box>
    </>
  );
}
