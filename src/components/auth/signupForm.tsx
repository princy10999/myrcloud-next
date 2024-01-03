import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  InputLabel,
} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import { useAppSelector } from "@redux/Redux/app/hooks";
import ButtonContained from "@components/Layout/ButtonContained";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import RadioButton from "@components/Layout/RadioButton";
import Assets from "@components/common/image_container";
import Link from "next/link";
import { useDispatch } from "react-redux";
import Router from "next/router";
import { responseEnum, PlacementFeeType } from "@lib/enum";
import {
  signUpPartner,
  partnerSignupByPSM,
} from "@redux/Redux/Actions/AuthUser";
import { getPartnerType } from "@redux/Redux/Actions/Partners";
import CustomeDrawerHeader from "@components/common/customDrawerHeader";
import CustomDrawer from "@components/common/CustomDrawer";
import Terms_And_Condition from "@pages/terms-and-condition";
import useSnackBar from "@redux/hooks/useSnackBar";
import ErrorHalding from "@lib/errorHandler";

export default function SignUpForm({ createByPsm = false, onClose }: any) {
  //Hooks
  const theme = useTheme();
  const dispatch = useDispatch();
  const { setSnackBar } = useSnackBar();

  //State
  const [count, setCount] = React.useState<any>("1");
  const [errors, setError] = React.useState<any>({});
  const [partners, setPartners] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>({
    partnerName: "",
    userName: "",
    emailId: "",
    mobileNumber: "",
  });

  const partnerTypes = useAppSelector(
    (state: any) => state?.auth?.IsPartnerType?.userData
  );

  //Handler
  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    if (name === "mobileNumber" && value.length > 10) {
      return;
    }
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleChange = (e: any, index: number) => {
    setCount(e?.target?.value);
    partners.forEach((element: any, i: number) => {
      if (i === index) {
        partners[i].isActive = true;
      } else {
        partners[i].isActive = false;
      }
    });
    setError({});
    setData({ partnerName: "", userName: "", emailId: "", mobileNumber: "" });
  };

  var validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var mobNumber = /^[1-9]{1}[0-9]{9}$/;
  var nameRegex =
    /^[a-zA-Z][a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-][a-zA-Z\s]+$/u;

  const validateForm = () => {
    let errors: any = {};
    let formIsValid = true;

    if (count === "1") {
      if (!data?.partnerName) {
        formIsValid = false;
        errors["partnerName"] = "* Enter partner name";
      }
    }

    if (!data?.userName) {
      formIsValid = false;
      errors["userName"] = "* Enter full name";
    } else if (!data?.userName?.match(nameRegex)) {
      formIsValid = false;
      errors["invalidUserName"] = "* invalid username!";
    }

    if (!data?.emailId) {
      formIsValid = false;
      errors["emailId"] = "* Enter email Id";
    } else if (!data?.emailId?.match(validRegex)) {
      formIsValid = false;
      errors["invalidEmaild"] = "* invalid email address!";
    }

    if (!data?.mobileNumber) {
      formIsValid = false;
      errors["mobileNumber"] = "* Enter mobile Number";
    } else if (!data?.mobileNumber?.match(mobNumber)) {
      formIsValid = false;
      errors["invalidMobileNumber"] = "* Enter valid Mobile Number";
    }

    if (createByPsm) {
      if (!data?.placementFeeType) {
        formIsValid = false;
        errors["placementFeeType"] = "* select placement fee type";
      } else if (!data?.placementFee) {
        formIsValid = false;
        errors["placementFeeType"] = "* enter placement fee";
      } else if (data?.placementFeeType == PlacementFeeType.Percentage) {
        if (isNaN(data?.placementFee)) {
          formIsValid = false;
          errors["placementFeeType"] =
            "* enter valid placement fee between 0 to 100";
        } else {
          if (
            !(
              Number(data?.placementFee) >= 0 &&
              Number(data?.placementFee) <= 100
            )
          ) {
            formIsValid = false;
            errors["placementFeeType"] =
              "* enter valid placement fee between 0 to 100";
          }
        }
      } else if (data?.placementFeeType == PlacementFeeType.Fixed) {
        if (isNaN(data?.placementFee)) {
          formIsValid = false;
          errors["placementFeeType"] =
            "* enter valid placement fee between 0 to 100";
        } else {
          if (Number(data?.placementFee) <= 0) {
            formIsValid = false;
            errors["placementFeeType"] = "* enter valid placement fee";
          }
        }
      }
    }

    setError(errors);
    return formIsValid;
  };

  const doSignup = async () => {
    setLoading(true);
    try {
      const body: any = {
        partnerType: parseInt(count),
        partnerName: data?.partnerName,
        spokePerson: {
          userName: data?.userName,
          emailId: data?.emailId,
          mobileNumber: data?.mobileNumber,
        },
      };
      if (createByPsm) {
        body.placementFeeType = Number(data?.placementFeeType);
        body.placementFee = Number(data?.placementFee || 0);
      }
      const fn = !createByPsm ? signUpPartner : partnerSignupByPSM;
      let signUp = await dispatch(fn(body));

      if (signUp?.payload?.code === responseEnum.SuccessCode) {
        if (createByPsm) {
          setSnackBar("success", "Partner added successfully");
          onClose();
          return;
        }
        const link = signUp?.payload?.data?.link?.split("?");
        const emailParam = `email=${encodeURIComponent(
          body.spokePerson.emailId || ""
        )}`;
        if (
          process.env.NEXT_PUBLIC_SKIP_EMAIL_VERIFICATION == "1" &&
          link.length > 1
        ) {
          Router.push(`/verification?${link[1]}`);
        } else {
          Router.push(`/verification?${emailParam}`);
        }
      } else {
        if (
          signUp?.payload?.data?.data?.status === responseEnum.ValidationCode
        ) {
          setSnackBar(
            "error",
            signUp?.payload?.data?.data?.errors["SpokePerson.EmailId"] ||
              "" +
                signUp?.payload?.data?.data?.errors[
                  "SpokePerson.MobileNumber"
                ] ||
              ""
          );
          setLoading(false);
        } else if (
          signUp?.payload?.status === responseEnum.InternalServerCode
        ) {
          setSnackBar("error", signUp?.payload?.statusText);
          setLoading(false);
        } else {
          setSnackBar("error", signUp?.payload?.message);
          setLoading(false);
        }
      }
    } catch (e) {
      setSnackBar("error", "Something Went Wrong!!");
      setLoading(false);
    }
    setLoading(false);
  };

  const signUpData = async (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      if (createByPsm) {
        doSignup();
      } else {
        setIsDrawerOpen(true);
      }
    }
  };

  React.useEffect(() => {
    dispatch(getPartnerType());
  }, [dispatch]);
  React.useEffect(() => {
    let typeData = partnerTypes.map((ele: any, index: number) => ({
      isActive: index === 0 ? true : false,
      ...ele,
    }));
    setPartners(typeData);
  }, [partnerTypes]);

  return (
    <>
      <Card
        elevation={0}
        sx={{
          backgroundColor: (theme) => theme.palette.bgLightGray.main,
          textAlign: "center",
          width: "100%",
          height: "100vh",
          overflowY: "scroll",
        }}
      >
        <CardContent
          sx={{
            p: 3,
          }}
        >
          {!createByPsm && (
            <>
              <Box mt={5} mb={2}>
                <Assets width={"180px"} src={`/assets/img/myrcloud_logo.png`} />
              </Box>
              <Typography
                variant="h6"
                fontWeight={"bold"}
                textAlign="center"
                gutterBottom
              >
                Recruiters
              </Typography>
              <Typography
                variant="caption"
                textAlign="center"
                gutterBottom
                component="p"
              >
                Build and scale your recruitment business
              </Typography>
            </>
          )}
          <Box
            mt={!createByPsm ? 5 : 2}
            component="form"
            display={"flex"}
            gap={{ sm: 2, xs: 2 }}
            flexDirection={{ sm: "column", xs: "column" }}
          >
            <RadioGroup
              className="checkbox_signup"
              defaultValue="female"
              aria-labelledby="demo-customized-radios"
              name="customized-radios"
            >
              {partners &&
                partners?.map((user: any, index: number) => {
                  return (
                    <>
                      <RadioButton
                        value={user?.partnerTypeId}
                        label={user?.description}
                        handleChange={(e: any) => handleChange(e, index)}
                        count={user?.isActive}
                        name={user?.partnerTypeCode}
                        num={user?.partnerTypeId}
                        bg={true}
                        key={index}
                        signUpBorder={user?.isActive}
                      />
                    </>
                  );
                })}
            </RadioGroup>
          </Box>
          <Box
            onSubmit={signUpData}
            component="form"
            noValidate
            autoComplete="off"
            width={"100%"}
            mt={3}
          >
            {count === "1" && (
              <>
                <TextFieldComponent
                  text="Name of your recruitment firm"
                  type="text"
                  placeholder="Please enter name"
                  width="100%"
                  name="partnerName"
                  value={data?.partnerName?.value}
                  onChange={handleChangeInput}
                  valid={true}
                  labelSize={"14px"}
                  labelColor={theme.palette.bgGray.main}
                />
                <Typography variant="body2" textAlign={"start"} color={"error"}>
                  {data?.partnerName?.length > 0 ? "" : errors["partnerName"]}
                </Typography>
              </>
            )}
            <TextFieldComponent
              text="Full Name"
              type="text"
              placeholder="Please enter name"
              width="100%"
              valid={true}
              name="userName"
              value={data?.userName}
              onChange={handleChangeInput}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.userName?.length > 0 ? "" : errors["userName"]}
            </Typography>
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.userName?.match(nameRegex)
                ? ""
                : errors["invalidUserName"]}
            </Typography>

            <TextFieldComponent
              text="Email ID"
              type="email"
              placeholder="Please enter email"
              width="100%"
              name="emailId"
              valid={true}
              value={data?.emailId}
              onChange={handleChangeInput}
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.emailId?.length > 0 ? "" : errors["emailId"]}
            </Typography>
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.emailId?.match(validRegex) ? "" : errors["invalidEmaild"]}
            </Typography>
            <TextFieldComponent
              text="Phone number"
              type="number"
              placeholder="Please enter phone number"
              width="100%"
              name="mobileNumber"
              value={data?.mobileNumber}
              onChange={handleChangeInput}
              inputProps={{ maxlength: 10 }}
              labelSize={"14px"}
              valid={true}
              labelColor={theme.palette.bgGray.main}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.mobileNumber?.length > 0 ? "" : errors["mobileNumber"]}
            </Typography>
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.mobileNumber?.match(mobNumber)
                ? ""
                : errors["invalidMobileNumber"]}
            </Typography>
            {createByPsm && (
              <PlacementFeeForm
                data={data}
                errors={errors}
                handleChangeInput={handleChangeInput}
              />
            )}

            <ButtonContained
              marginBottom="20px"
              marginTop="20px"
              type="submit"
              valid={true}
              borderRadius="50px"
              height="35px"
              width="100%"
              text={!createByPsm ? "Sign Up" : "Create"}
              loading={loading}
            />
            {!createByPsm && (
              <Typography
                className="anchor-link"
                textAlign="center"
                gutterBottom
                fontSize={"16px"}
              >
                Already user? <Link href="/login">Login</Link>
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
      {isDrawerOpen && (
        <CustomDrawer
          isDrawerOpen={isDrawerOpen}
          handleClose={() => {
            setIsDrawerOpen(false);
          }}
          anchor={"right"}
        >
          <Box sx={{ marginTop: 0 }}>
            <CustomeDrawerHeader
              handleClose={() => setIsDrawerOpen(false)}
              title="Terms and Conditions"
              sub
            />
            <Terms_And_Condition
              onClose={(status: any) => {
                if (status) {
                  setIsDrawerOpen(false);
                  doSignup();
                } else {
                  setIsDrawerOpen(false);
                }
              }}
            />
          </Box>
        </CustomDrawer>
      )}
    </>
  );
}

export const PlacementFeeForm = ({ data, errors, handleChangeInput }: any) => {
  const theme = useTheme();
  return (
    <>
      <Box textAlign="left">
        <Box>
          <Box
            mt={1.5}
            mb={1}
            display="flex"
            fontSize="12px"
            flexDirection={"row"}
          >
            <InputLabel
              sx={{
                fontSize: "14px",
                color: theme.palette.bgGray.main,
              }}
            >
              Placement Fee
            </InputLabel>

            <Typography color="#EF627A" component={"caption"} variant={"body2"}>
              *
            </Typography>
          </Box>
          <FormControl>
            <RadioGroup row value={data?.placementFeeType}>
              <FormControlLabel
                value={PlacementFeeType.Percentage}
                control={
                  <Radio
                    size="small"
                    color="primary"
                    name="placementFeeType"
                    onChange={handleChangeInput}
                  />
                }
                label="Percentage"
              />
              <FormControlLabel
                value={PlacementFeeType.Fixed}
                control={
                  <Radio
                    size="small"
                    color="primary"
                    name="placementFeeType"
                    onChange={handleChangeInput}
                  />
                }
                label="Fixed"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        {data?.placementFeeType && (
          <TextFieldComponent
            type="text"
            placeholder="Please enter placement fee"
            valid={true}
            name="placementFee"
            width="100%"
            value={data?.placementFee}
            onChange={handleChangeInput}
            labelSize={"14px"}
            labelColor={theme.palette.bgGray.main}
          />
        )}
      </Box>
      <Typography variant="body2" textAlign={"start"} color={"error"}>
        {errors["placementFeeType"]}
      </Typography>
    </>
  );
};
