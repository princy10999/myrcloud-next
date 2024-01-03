import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  useTheme,
  Link as MuiLink,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ButtonContained from "@components/Layout/ButtonContained";
import TextFieldComponent from "@components/Layout/TextFieldComponent";
import { makeStyles } from "tss-react/mui";
import { useDispatch } from "react-redux";
import { encryptText } from "@lib/encryptionHelpers";
import { loginEnum, PersonaType } from "@lib/enum";
import Router from "next/router";
import { getPartnerDetails } from "@redux/Redux/Actions/Partners";
import { userLogin } from "@redux/Redux/Actions/AuthUser";
import localStoreUtil from "@redux/Api/localstore.util";
import { getTokenClaimObject } from "@redux/Api/ClientHelper";
import useSnackBar from "@redux/hooks/useSnackBar";
import ErrorHandler from "@lib/errorHandler";

const useStyles = makeStyles()((theme) => {
  return {
    link: {
      textDecoration: "none",
      color: "inherit",
    },
    loginHeading: {
      marginBottom: "-10px",
    },
  };
});

export default function LoginForm() {
  //Hooks
  const dispatch = useDispatch();
  const theme = useTheme();
  const { classes, cx } = useStyles();
  const { setSnackBar } = useSnackBar();

  //State
  const [data, setData] = useState<any>({
    userName: "",
    password: "",
  });
  const [errors, setError] = useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(false);

  // const login = useAppSelector((state) => state?.auth?.IsLogin?.user);

  //Handler
  const handleChangeInput = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let errors: any = {};
    let formIsValid = true;

    if (!data?.userName) {
      formIsValid = false;
      errors["userName"] = "* Please enter email-Id";
    }

    if (!data?.password) {
      formIsValid = false;
      errors["password"] = "* Please enter password";
    }
    setError(errors);
    return formIsValid;
  };

  const forgotPassword = () => {
    Router.push("/forgot-password");
  };

  const doLogin = async (e: any) => {
    e.preventDefault();
    localStoreUtil.remove_data("isSuccessLogin");
    if (validateForm()) {
      setLoading(true);
      try {
        const encryptedPassword = encryptText(data?.password);
        const body = {
          syncVal: encryptedPassword.syncVal,
          userName: data?.userName,
          password: encryptedPassword.input,
          sourcePlatform: "web",
        };
        let login = await dispatch(userLogin(body));

        let error = await ErrorHandler(login, setSnackBar);
        if (error) {
          const tokenClaims = getTokenClaimObject();
          if (!tokenClaims) {
            throw new Error("");
          }
          if (tokenClaims?.SourceId == PersonaType.Partner) {
            await dispatch(getPartnerDetails());
            if (
              login?.payload.data?.successCode ===
              loginEnum.PartnerProfileCreationPending
            ) {
              Router.push("/profile");
            } else if (
              login?.payload.data?.successCode ===
              loginEnum.PartnerVerificationPending
            ) {
              Router.push("/profile/verification");
            } else if (
              login?.payload.data?.successCode === loginEnum.LoginSuccess
            ) {
              localStoreUtil.store_data("isSuccessLogin", 1);
              Router.push("/partner");
            }
          } else if (tokenClaims?.SourceId == PersonaType.MyRCloud) {
            Router.push("/rcloud");
          } else if (tokenClaims?.SourceId == PersonaType.Client) {
            Router.push("/client");
          }
        } else {
          setLoading(false);
        }
        setLoading(false);
      } catch (error) {
        setSnackBar("error", "Something went wrong");
        setLoading(false);
      }
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: (theme) => theme.palette.bgLightGray.main,
        textAlign: "center",
        width: "100%",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <CardContent
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          mt: 10,
        }}
      >
        <Typography fontWeight={"bold"} textAlign="center" gutterBottom>
          Welcome back
        </Typography>
        <Typography variant="caption" textAlign="center" component="p">
          Build and scale your recruitment business
        </Typography>
        <Box>
          <Box
            onSubmit={doLogin}
            component="form"
            noValidate
            autoComplete="off"
            width={"100%"}
            mt={3}
          >
            <TextFieldComponent
              text="Email ID"
              type="text"
              placeholder="Please enter email-Id"
              width="100%"
              name="userName"
              value={data?.userName.value}
              onChange={handleChangeInput}
              valid
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.userName?.length > 0 ? "" : errors["userName"]}
            </Typography>
            <TextFieldComponent
              text="Password"
              type="password"
              placeholder="Please enter password"
              width="100%"
              name="password"
              value={data?.password?.value}
              onChange={handleChangeInput}
              valid
              labelSize={"14px"}
              labelColor={theme.palette.bgGray.main}
              showPasswordToggle
            />
            <Typography variant="body2" textAlign={"start"} color={"error"}>
              {data?.password?.length > 0 ? "" : errors["password"]}
            </Typography>
            <Box
              display={"flex"}
              justifyContent="space-between"
              alignItems={"center"}
              mb={1}
              mt={4}
            >
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox size="small" defaultChecked />}
                  label={
                    <Typography color="textSecondary" variant="subtitle2">
                      Remember me
                    </Typography>
                  }
                />
              </FormGroup>
              <Button type="button" onClick={forgotPassword}>
                Forgot Password?
              </Button>
            </Box>
            <ButtonContained
              marginBottom="20px"
              marginTop="20px"
              borderRadius="50px"
              height="35px"
              width="100%"
              text="Login"
              type="submit"
              loading={loading}
              disabled={loading}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
