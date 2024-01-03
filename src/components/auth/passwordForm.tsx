import React, { useState } from "react";
import { Box, Typography, Card, CardContent, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import RadioGroup from "@mui/material/RadioGroup";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import Assets from "@components/common/image_container";
import RadioButton from "@components/Layout/RadioButton";
import ButtonContained from "@components/Layout/ButtonContained";
import { useAppSelector } from "@redux/Redux/app/hooks";
import { encryptText } from "@lib/encryptionHelpers";
import { useDispatch } from "react-redux";
import { createPassword, forgotPassword } from "@redux/Redux/Actions/AuthUser";
import { makeStyles } from "tss-react/mui";
import { responseEnum, VerificationType } from "@lib/enum";
import useSnackBar from "@redux/hooks/useSnackBar";
import ErrorHandler from "@lib/errorHandler";

const useStyles = makeStyles()((theme) => {
  return {
    logoMargin: {
      marginTop: "0px",
    },
    radioGroup: {
      flexDirection: "column",
      alignItems: "start",
      marginTop: "40px",
      background: "rgba(27, 163, 156, 0.1)",
      padding: "15px",
      paddingLeft: "25px",
      borderRadius: "10px",
    },
    radioLabel: {
      width: "100%",
      borderRadius: "0px",
      background: "rgba(27, 163, 156, 0.1)",
    },
  };
});

export default function PasswordForm() {
  //Hooks
  const theme = useTheme();
  const router = useRouter();
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const { setSnackBar } = useSnackBar();

  //State
  const [radio1, setRadio1] = useState<any>(false);
  const [radio2, setRadio2] = useState<any>(false);
  const [radio3, setRadio3] = useState<any>(false);
  const [radio4, setRadio4] = useState<any>(false);
  const [disable, setDisable] = useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const [errors, setError] = useState<any>({});
  const {
    token,
    verficationType: verificationType = VerificationType.AccountVerification,
  }: any = router.query;

  const createPasswordToken = useAppSelector(
    (state: any) =>
      state?.auth?.IsUserVerfied?.verfiedUser?.data?.createPasswordToken
  );

  //Handler
  const handleChangeInput = (e: any) => {
    console.log(e.target.name, "e.target.name");
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    const text = e.target.value;
    // var regEx = new Regex("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$");
    if (e.target.name === "password") {
      if (text?.match(/(?=.*?[a-z0-9])/)) {
        setRadio1(true);
      } else {
        setRadio1(false);
      }
      if (text?.match(/(?=.*?[A-Z])(?=.*?[a-z])/)) {
        setRadio2(true);
      } else {
        setRadio2(false);
      }
      if (text.length >= 8) {
        setRadio3(true);
      } else {
        setRadio3(false);
      }
      if (text?.match(/(?=.*?[#?!@$%^&*-])/)) {
        setRadio4(true);
      } else {
        setRadio4(false);
      }
    }

    if (
      radio1 &&
      radio2 &&
      radio3 &&
      radio4 &&
      data?.password === e.target.value
    ) {
      setDisable(false);
    }
  };

  const validateForm = () => {
    let errors: any = {};
    let formIsValid = true;

    if (!data?.password) {
      formIsValid = false;
      errors["password"] = "Please enter password";
    }

    if (!data?.confirmPassword) {
      formIsValid = false;
      errors["passwords"] = "Please enter confirm password";
    }
    setError(errors);

    return formIsValid;
  };

  const createYourAccount = async () => {
    if (validateForm()) {
      try {
        setLoading(true);
        const encryptedPassword = encryptText(data?.password);
        let body: any = {
          syncVal: encryptedPassword?.syncVal,
        };
        if (verificationType != VerificationType.AccountVerification) {
          body.verificationToken = decodeURIComponent(token);
          body.newPassword = encryptedPassword?.input;
        } else {
          body.token = decodeURIComponent(createPasswordToken);
          body.strongPassword = encryptedPassword?.input;
        }

        const fn =
          verificationType != VerificationType.AccountVerification
            ? forgotPassword
            : createPassword;
        const resPassword = await dispatch(fn(body));
        let error = await ErrorHandler(resPassword, setSnackBar);

        if (error) {
          setSnackBar(
            "success",
            "Password created successfully. Login with this new password"
          );
          setTimeout(() => {
            router.push("/login");
          }, 5000);
        } else {
          setLoading(false);
        }
      } catch {
        setSnackBar("error", "Something went wrong !");
        setLoading(false);
      }
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: (theme: any) => theme.palette.bgLightGray.main,
        textAlign: "center",
        width: "100%",
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box mb={4}>
          <Assets
            src={`/assets/img/myrcloud_logo.png`}
            className={classes.logoMargin}
            width={200}
          />
        </Box>
        <Typography
          variant="h6"
          fontWeight={"bold"}
          textAlign="center"
          gutterBottom
        >
          {verificationType != VerificationType.AccountVerification ? "Update your Password" : "Create your password"}
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          width={"100%"}
          mt={5}
        >
          <TextFieldComponent
            text="New password"
            type="password"
            placeholder="Ex: Powers@12345"
            width="100%"
            name="password"
            onChange={handleChangeInput}
            value={data?.password?.value}
            valid
            labelSize={"12px"}
            labelColor={theme.palette.bgGray.main}
            showPasswordToggle
          />
          <Typography variant="body2" textAlign={"start"} color={"error"}>
            {data?.password?.length > 0 ? "" : errors["password"]}
          </Typography>

          <TextFieldComponent
            text="Confirm password"
            type="password"
            placeholder="Ex: Powers@12345"
            width="100%"
            name="confirmPassword"
            onChange={handleChangeInput}
            value={data?.confirmPassword?.value}
            valid
            labelSize={"12px"}
            labelColor={theme.palette.bgGray.main}
            showPasswordToggle
          />
          <Typography variant="body2" textAlign={"start"} color={"error"}>
            {data?.confirmPassword?.length > 0 ? "" : errors["passwords"]}
          </Typography>

          <ButtonContained
            marginBottom="20px"
            marginTop="20px"
            disableElevation
            borderRadius="50px"
            color={(theme: any) => theme.palette.primary.main}
            variant="contained"
            height="41px"
            width="100%"
            text="Create Your Account"
            loading={loading}
            disabled={disable || loading}
            onClick={createYourAccount}
          />
          <Box
            p={1}
            bgcolor={(theme) => theme.palette.bgCyan.main}
            border={"1px solid #DDDDDD"}
            mt={4}
            borderRadius={"10px"}
          >
            <RadioGroup
              className={"checkbox_signup"}
              defaultValue="female"
              aria-labelledby="demo-customized-radios"
              name="customized-radios"
            >
              <Box flexDirection={"column"} display={"flex"}>
                <RadioButton
                  name="radio1"
                  label="A mixture of letters and numbers."
                  value="1"
                  count={radio1}
                  num="1"
                  bg={false}
                />
                <RadioButton
                  name="radio2"
                  label="A mixture of both uppercase and lowercase letters."
                  value="2"
                  count={radio2}
                  num="2"
                  bg={false}
                />
                <RadioButton
                  name="radio3"
                  label="At least 8 characters — the more characters, the better."
                  value="3"
                  count={radio3}
                  num="3"
                  bg={false}
                />
                <RadioButton
                  name="radio4"
                  label="Inclusion of at least one special character, e.g., ! @ # ? ]"
                  value="4"
                  count={radio4}
                  num="4"
                  bg={false}
                />
              </Box>
            </RadioGroup>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
