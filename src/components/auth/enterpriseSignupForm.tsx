import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { useAppSelector } from "@redux/Redux/app/hooks";
import ButtonContained from "@components/Layout/ButtonContained";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import Assets from "@components/common/image_container";
import { useDispatch } from "react-redux";
import ToastMessage from "@components/common/ToastMessage";
import { responseEnum } from "@lib/enum";
import { signUpPartner } from "@redux/Redux/Actions/AuthUser";
import { getPartnerType } from "@redux/Redux/Actions/Partners";
import DropDownComponent from "@components/Layout/DropDownComponent";
import { IconWrapper } from "@components/common/customSvgIcon";


export default function EnterpriseSignupForm() {
  const dispatch = useDispatch();
  const [count, setCount] = React.useState<any>("1");
  const [errors, setError] = React.useState<any>({});
  const [open, setOpen] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<any>("");
  const [errorType, setErrorType] = React.useState<any>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>({
    orgName: "",
    empCount: "",
    sector: "",
    userName: "",
    designation: "",
    emailId: "",
    mobileNumber: "",
  });

  const partnerTypes = useAppSelector(
    (state: any) => state?.auth?.IsPartnerType?.userData
  );

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleChange = (e: any) => {
    setError({});
    setCount(e?.target?.value);
  };

  var validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var mobNumber = /^[1-9]{1}[0-9]{9}$/;

  const validateForm = () => {
    let errors: any = {};
    let formIsValid = true;

    if (count === "1") {
      if (!data?.partnerName) {
        formIsValid = false;
        errors["partnerName"] = "Please enter partnername";
      }
    }
    if (!data?.userName) {
      formIsValid = false;
      errors["userName"] = "Please enter username";
    }
    if (!data?.emailId) {
      formIsValid = false;
      errors["emailId"] = "Please enter emailId";
    } else if (!data?.emailId?.match(validRegex)) {
      formIsValid = false;
      errors["invalidEmaild"] = "Invalid email address!";
    }
    if (!data?.mobileNumber) {
      formIsValid = false;
      errors["mobileNumber"] = "Please enter mobile Number";
    } else if (!data?.mobileNumber?.match(mobNumber)) {
      formIsValid = false;
      errors["invalidMNumber"] = "Invalid Mobile Number";
    } else if (data?.mobileNumber?.length != 10) {
      formIsValid = false;
      errors["mobileNumbers"] = "Mobile number must have 10 digits";
    }
    setError(errors);
    return formIsValid;
  };

  const signUpData = async () => {
    if (true || validateForm()) {
      setFormSubmitted(true);
    }
  };

  React.useEffect(() => {
    dispatch(getPartnerType());
  }, [dispatch]);

  return (
    <Card
      elevation={0}
      sx={{
        textAlign: "left",
        width: "100%",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <ToastMessage
        open={open}
        message={toastMessage}
        handleClose={() => setOpen(false)}
        severity={errorType}
      />
      <CardContent
        sx={{
          p: 3,
          height: "100%",
        }}
      >
        {formSubmitted ? (
          <Box
            display="flex"
            height="100%"
            justifyContent={"center"}
            alignItems="center"
          >
            <Box maxWidth={"400px"} textAlign="center">
              <IconWrapper
                icon="ok"
                color="primary"
                style={{ fontSize: "8rem" }}
              />
              <Typography mt={2} fontWeight="bold" variant="h5">
                Thank you for your request. Our team will get in touch with you
                within 48 hrs
              </Typography>
            </Box>
          </Box>
        ) : (
          <>
            <Box mt={5} mb={2}>
              <Assets width={"150px"} src={`/assets/img/myrcloud_logo.png`} />
            </Box>
            <Typography
              variant="subtitle1"
              fontWeight={"bold"}
              textAlign="center"
              gutterBottom
            >
              Enterprises
            </Typography>
            <Typography
              variant="caption"
              textAlign="center"
              gutterBottom
              component="p"
            >
              Transform the way you Recruit
            </Typography>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              width={"100%"}
              mt={3}
            >
              <TextFieldComponent
                text="Name of the organization"
                type="text"
                placeholder="Please enter name"
                width="100%"
                name="orgName"
                value={data?.orgName?.value}
                onChange={handleChangeInput}
                valid={false}
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.orgName?.length > 0 ? "" : errors["orgName"]}
              </Typography>
              <DropDownComponent
                text="Sector"
                values={["BFSI"]}
                value={data?.sector?.value}
                defaultValue={"BFSI"}
                width="100%"
                valid
                name="sector"
                onChange={handleChangeInput}
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.sector?.length > 0 ? "" : errors["sector"]}
              </Typography>
              <DropDownComponent
                text="Employee Count"
                values={["0-10", "11-50", "51-500", "More than 500"]}
                value={data?.empCount?.value}
                defaultValue={"0-10"}
                width="100%"
                valid
                name="empCount"
                onChange={handleChangeInput}
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.empCount?.length > 0 ? "" : errors["empCount"]}
              </Typography>
              <TextFieldComponent
                text="Your Name"
                type="text"
                placeholder="Please enter name"
                width="100%"
                name="userName"
                value={data?.userName?.value}
                onChange={handleChangeInput}
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.userName?.length > 0 ? "" : errors["userName"]}
              </Typography>
              <TextFieldComponent
                text="Designation"
                type="text"
                placeholder="Please enter your designation"
                width="100%"
                name="designation"
                value={data?.designation?.value}
                onChange={handleChangeInput}
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.designation?.length > 0 ? "" : errors["designation"]}
              </Typography>
              <TextFieldComponent
                text="Business Email"
                type="email"
                placeholder="Please enter email"
                width="100%"
                name="emailId"
                value={data?.emailId?.value}
                onChange={handleChangeInput}
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.emailId?.length > 0 ? "" : errors["emailId"]}
              </Typography>
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.emailId?.match(validRegex)
                  ? ""
                  : errors["invalidEmaild"]}
              </Typography>
              <TextFieldComponent
                text="Contact Number"
                type="tel"
                placeholder="Please enter contact number"
                width="100%"
                name="mobileNumber"
                value={data?.mobileNumber?.value}
                onChange={handleChangeInput}
                inputProps={{ maxlength: 10 }}
              />
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.mobileNumber?.length > 0 ? "" : errors["mobileNumber"]}
              </Typography>
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.mobileNumber?.match(mobNumber)
                  ? ""
                  : errors["invalidMNumber"]}
              </Typography>
              <Typography variant="body2" textAlign={"start"} color={"error"}>
                {data?.mobileNumber?.length != 10
                  ? errors["mobileNumbers"]
                  : ""}
              </Typography>
              <ButtonContained
                marginBottom="20px"
                marginTop="20px"
                type="button"
                borderRadius="50px"
                height="35px"
                width="100%"
                text="Send Request"
                loading={loading}
                onClick={signUpData}
              />
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}
