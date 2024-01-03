import React, { useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { useRouter } from "next/router";
import Assets from "@components/common/image_container";
import { useDispatch } from "react-redux";
import {
  verifyUserAccount,
  resendVerificationLink,
} from "src/Redux/Actions/AuthUser";
import FullWidthLoaderButton from "@components/common/FullWidthLoaderButton";
import { loginEnum, responseEnum, VerificationType } from "@lib/enum";
import { makeStyles } from "tss-react/mui";
import { encryptText } from "@lib/encryptionHelpers";
import useSnackBar from "@redux/hooks/useSnackBar";
import ErrorHandler from "@lib/errorHandler";

const useStyles = makeStyles()((theme: any) => {
  return {
    img: {
      width: "100%",
      height: "100%",
      [theme.breakpoints.up("xs")]: {
        width: "80%",
        height: "40%",
      },
      [theme.breakpoints.up("sm")]: {
        width: "80%",
        height: "40%",
      },
      [theme.breakpoints.up("md")]: {
        width: "30%",
        height: "30%",
      },
    },
  };
});

export default function Verification() {
  //Hooks
  const router = useRouter();
  const theme = useTheme();
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const { setSnackBar } = useSnackBar();
  //State
  const [loading, setLoading] = React.useState(false);
  const [verificationStatus, setVerificationStatus] = React.useState("");
  const [showResendVerification, setShowResendVerification] =
    React.useState(false);

  const {
    token,
    email,
    verficationType: verificationType = VerificationType.AccountVerification,
  }: any = router.query;

  //Handler
  const confirmUser = async () => {
    try {
      if (verificationType != VerificationType.AccountVerification) {
        router.push(
          `/password?token=${encodeURIComponent(
            token
          )}&verficationType=${verificationType}`
        );
        return;
      }
      const body = {
        verificationToken: decodeURIComponent(token),
      };
      let verify = await dispatch(verifyUserAccount(body));
      if (verify?.payload?.code === responseEnum.SuccessCode) {
        setVerificationStatus("verified");
        setTimeout(() => {
          router.push("/password");
        }, 5000);
      } else {
        setVerificationStatus("failed");
        if (verify?.payload?.status === responseEnum.InternalServerCode) {
          setSnackBar("error", verify?.payload?.statusText);
        } else {
          if (
            verify?.payload?.data == loginEnum.PartnerSelfVerificationPending
          ) {
            setShowResendVerification(true);
          }
          setSnackBar("error", verify?.payload?.message);
        }
      }
    } catch {
      setSnackBar("error", "Something went wrong!!!");
    }
  };

  const _resendVerificationLink = async () => {
    try {
      if (!(email || "").trim()) return;
      setLoading(true);
      const encrypted = encryptText(email);
      const body = {
        syncVal: encrypted.syncVal,
        verificationType: verificationType,
        emailId: encrypted.input,
      };
      const res = await dispatch(resendVerificationLink(body));
      let error = await ErrorHandler(res, setSnackBar);

      if (error) {
        setSnackBar(
          "success",
          "Verification link sent to you email successfully"
        );
        setLoading(false);
      } else {
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setSnackBar("error", "Something went wrong !");
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.bgWhite.main;
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    if (token) {
      setLoading(true);
      (async () => {
        confirmUser();
      })();
    } else {
      setShowResendVerification(true);
    }
  }, [router.isReady]);

  return (
    <Grid container mt={0} display={"flex"} flexDirection={"column"}>
      <Grid item md={12} xs={6} sm={8}>
        <Assets
          style={{ margin: "12px" }}
          src={`/assets/img/myrcloud_logo.png`}
          height={"60px"}
        />
      </Grid>
      <Grid item md={12} xs={12} sm={8} textAlign={"center"}>
        <Box>
          <Assets src={`/assets/img/email_card.gif`} className={classes.img} />
        </Box>
        <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
          <Typography
            variant={"h4"}
            fontWeight="bold"
            gutterBottom
            fontSize={{
              xl: "40px",
              lg: "25px",
              md: "25px",
              sm: "20px",
              xs: "20px",
            }}
          >
            {router.isReady && token ? (
              verificationStatus == "" ? (
                "Please wait, we are verifying your account..."
              ) : verificationStatus == "verified" ? (
                "You account is verified, page will redirect to create new password"
              ) : (
                <Box color="error.main" component="span">
                  This link is expired! Please click on Resend Verification Link
                  button for new verification link
                </Box>
              )
            ) : (
              "Verify your email address"
            )}
          </Typography>
          <Typography>
            {email && (
              <Typography component={"span"}>
                You have entered{" "}
                <Typography
                  component={"span"}
                  sx={{ color: (theme) => theme.palette.bgBlue.main }}
                >
                  {email}
                </Typography>{" "}
                as the email address for your account.
              </Typography>
            )}
            {router.isReady && !token ? (
              <Typography component={"p"}>
                Please verify your email by clicking on verification link sent
                on your email address.
              </Typography>
            ) : null}
          </Typography>
        </Box>
        {router.isReady && showResendVerification ? (
          <FullWidthLoaderButton
            type="button"
            text="Resend Verification link"
            open={loading}
            borderRadius="24px"
            height="42px"
            width="400px"
            handleClose={() => setLoading(false)}
            onClick={() => {
              _resendVerificationLink();
            }}
          />
        ) : null}
      </Grid>
    </Grid>
  );
}
